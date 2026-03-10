
import { GoogleGenAI, Type } from "@google/genai";
import { Case } from "../data/cases";
import { staticQuizzes, QuizQuestion } from "../data/quizzes";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export type { QuizQuestion, QuizOption } from "../data/quizzes";

export async function getQuizForCase(caseData: Case): Promise<QuizQuestion[]> {
  // Check for static, hand-crafted quiz first
  if (staticQuizzes[caseData.id]) {
    return staticQuizzes[caseData.id];
  }

  // Fallback to high-quality AI generation if not found
  const prompt = `
    You are a Senior Medical Board Examiner and Specialist Physician. 
    Generate a 5-question clinical diagnostic quiz for the condition: ${caseData.diagnosis}.
    
    CRITICAL STANDARDS:
    - Use high-grade medical terminology (e.g., "pathognomonic", "acroparesthesia", "biliary excretion").
    - Do NOT mention the diagnosis (${caseData.diagnosis}) in any question or option text.
    - Follow the "House M.D." style: focus on the "Great Imitator" aspects or subtle clinical traps.
    
    THEME (Strict 5-Level Bloom's Taxonomy):
    1. Question 1: RECALL - Focus on the molecular basis, genetic locus, or primary vector/pathogen.
    2. Question 2: UNDERSTANDING - Explain the 'Why'. Why does this specific symptom occur? (Pathophysiology).
    3. Question 3: APPLICATION - A clinical scenario: "A patient with X presents with Y, what is the next best step?"
    4. Question 4: ANALYSIS - Differentiating from a 'Clinical Mimic' or interpreting a specific lab/imaging finding.
    5. Question 5: INTUITION - A subtle, "fun" diagnostic clue (e.g., a specific smell, a historical name, or a unique physical sign).
    
    OPTION LOGIC (Exactly 4 options):
    - CORRECT: Medically accurate and precise.
    - DISTRACTOR: Plausible but incorrect (e.g., seen in a related condition).
    - COMMON MISCONCEPTION: A trap based on typical diagnostic errors.
    - WILDLY WRONG: Clearly incorrect but medically themed.
    
    Provide a detailed medical explanation for EVERY option.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            bloomLevel: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  type: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["text", "type", "explanation"]
              }
            }
          },
          required: ["question", "bloomLevel", "options"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse quiz response", e);
    return [];
  }
}
