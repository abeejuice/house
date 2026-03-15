
import { Case } from "../data/cases";
import {
  staticQuizzes,
  QuizQuestion,
  EnhancedQuizQuestion,
  DISTANCE_SCORE,
  DISTANCE_LABEL,
} from "../data/quizzes";

export type { QuizQuestion, QuizOption } from "../data/quizzes";
export type { EnhancedQuizQuestion, EnhancedQuizOption } from "../data/quizzes";

// Lazily loaded — avoids bundling 2.7 MB of quiz data on initial page load
let _enhancedQuizzesCache: Record<string, EnhancedQuizQuestion[]> | null = null;

async function loadEnhancedQuizzes(): Promise<Record<string, EnhancedQuizQuestion[]>> {
  if (!_enhancedQuizzesCache) {
    const mod = await import("../data/enhancedQuizzes");
    _enhancedQuizzesCache = mod.enhancedQuizzes;
  }
  return _enhancedQuizzesCache;
}

/**
 * Returns enhanced quiz questions (10 PubMed-grounded, NMC-anchored) if available,
 * falling back to legacy static quizzes, then live AI generation.
 */
export async function getQuizForCase(caseData: Case): Promise<QuizQuestion[]> {
  // 1. Pre-generated enhanced quizzes (preferred)
  const quizzes = await loadEnhancedQuizzes();
  const enhanced = quizzes[caseData.id];
  if (enhanced && enhanced.length > 0) {
    return enhanced.map(enhancedToLegacy);
  }

  // 2. Legacy static quizzes
  if (staticQuizzes[caseData.id]) {
    return staticQuizzes[caseData.id];
  }

  // 3. AI generation fallback (Gemini)
  return generateAIQuiz(caseData);
}

/**
 * Returns enhanced questions directly (for components that use the richer type).
 */
export async function getEnhancedQuizForCase(caseData: Case): Promise<EnhancedQuizQuestion[] | null> {
  const quizzes = await loadEnhancedQuizzes();
  const enhanced = quizzes[caseData.id];
  return enhanced && enhanced.length > 0 ? enhanced : null;
}

// ─── Adapter: EnhancedQuizQuestion → legacy QuizQuestion ──────────────────────

function enhancedToLegacy(q: EnhancedQuizQuestion): QuizQuestion {
  return {
    question: q.question,
    bloomLevel: q.bloomLevel,
    options: q.options.map(o => ({
      text: o.text,
      type: o.type === "correct" ? "correct" : "distractor",
      explanation: o.explanation,
    })),
  };
}

// ─── Live AI fallback ──────────────────────────────────────────────────────────

async function generateAIQuiz(caseData: Case): Promise<QuizQuestion[]> {
  try {
    const { GoogleGenAI, Type } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY ?? "" });

    const prompt = `You are a Senior Medical Board Examiner. Generate a 5-question clinical diagnostic quiz for: ${caseData.diagnosis}.
Do NOT mention the diagnosis in any question or option. Follow Bloom's Taxonomy (Recall→Evaluation).
Each question has 4 options: correct, distractor, common misconception, wildly wrong.
Provide a detailed explanation for every option.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
                    explanation: { type: Type.STRING },
                  },
                  required: ["text", "type", "explanation"],
                },
              },
            },
            required: ["question", "bloomLevel", "options"],
          },
        },
      },
    });

    return JSON.parse(response.text ?? "[]");
  } catch {
    return [];
  }
}
