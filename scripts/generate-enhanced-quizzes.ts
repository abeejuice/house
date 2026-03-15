/**
 * Pre-generates 10 PubMed-grounded MCQs per House MD case, anchored to NMC competencies.
 * Run with:  npm run generate:enhanced-quizzes
 * Output:    src/data/enhancedQuizzes.ts
 *
 * Rate-limit strategy:
 *   - Free tier: 10K input tokens/min
 *   - Each call: ~5-7K tokens (2 cases × ~2.5K each)
 *   - Delay: 70s between batches of 2 cases
 *   - Total: ~182 cases ÷ 2 = 91 batches × 70s ≈ ~106 minutes
 *
 * Checkpoint: progress saved after every batch → safe to resume after failure.
 * Resume: existing enhancedQuizzes.ts is read on startup to skip completed cases.
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { fetchPubMedEvidence } from "./pubmedService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "../.env") });

// ─── Types (mirrors src/data/quizzes.ts) ──────────────────────────────────────

type EnhancedOptionType = "correct" | "similar_wrong" | "misconception" | "wildly_wrong";

interface EnhancedQuizOption {
  text: string;
  type: EnhancedOptionType;
  distanceScore: 0 | 1 | 2 | 3;
  distanceLabel: string;
  explanation: string;
}

interface PubMedSource {
  pmid: string;
  title: string;
  publicationType: string;
}

interface EnhancedQuizQuestion {
  question: string;
  bloomLevel: string;
  competencyCode: string;
  competencyText: string;
  options: EnhancedQuizOption[];
  pubmedSource: PubMedSource;
}

interface MappedCompetency {
  code: string;
  subject: string;
  topic: string;
  domain: string;
  isCore: boolean;
  text: string;
}

interface Case {
  id: string;
  season: number;
  episode: string;
  patient: string;
  diagnosis: string;
}

// ─── Tool schema for structured output ────────────────────────────────────────

const QUIZ_TOOL = {
  name: "save_quiz_questions",
  description: "Save the generated MCQ quiz questions for a House MD case.",
  input_schema: {
    type: "object" as const,
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            bloomLevel: {
              type: "string",
              enum: ["Recall", "Understanding", "Application", "Analysis", "Evaluation"],
            },
            competencyCode: { type: "string" },
            options: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  type: {
                    type: "string",
                    enum: ["correct", "similar_wrong", "misconception", "wildly_wrong"],
                  },
                  explanation: { type: "string" },
                },
                required: ["text", "type", "explanation"],
              },
            },
            pubmedPmid: { type: "string" },
          },
          required: ["question", "bloomLevel", "competencyCode", "options", "pubmedPmid"],
        },
      },
    },
    required: ["questions"],
  },
};

// ─── Load cases from TypeScript source ─────────────────────────────────────────

function loadCases(): Case[] {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../src/data/cases.ts"), "utf-8"
  );
  return [...content.matchAll(
    /\{ id: "([^"]+)", season: (\d+), episode: "([^"]+)", patient: "([^"]+)", diagnosis: "([^"]+)"/g
  )].map(m => ({
    id: m[1], season: Number(m[2]), episode: m[3], patient: m[4], diagnosis: m[5],
  }));
}

// ─── Load competency map ──────────────────────────────────────────────────────

function loadCompetencyMap(): Record<string, MappedCompetency[]> {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../src/data/competencyMap.ts"), "utf-8"
  );

  // Parse entries like:  "s1e1": [ ... ],
  const map: Record<string, MappedCompetency[]> = {};

  // Extract all case IDs present in the map
  const idMatches = [...content.matchAll(/"(s\de\d+[a-z]?)": \[/g)];
  for (const idMatch of idMatches) {
    const caseId = idMatch[1];
    // Extract all competency objects for this case using a block parser
    const startIdx = idMatch.index! + idMatch[0].length;
    // Find the closing ] for this entry
    let depth = 1;
    let i = startIdx;
    while (i < content.length && depth > 0) {
      if (content[i] === "[") depth++;
      else if (content[i] === "]") depth--;
      i++;
    }
    const block = content.slice(startIdx, i - 1);
    // Parse individual competency objects
    const comps: MappedCompetency[] = [];
    for (const m of block.matchAll(
      /\{ code: "([^"]+)", subject: "([^"]+)", topic: "([^"]+)", domain: "([^"]+)", isCore: (true|false), text: "([^"]+)" \}/g
    )) {
      comps.push({
        code: m[1], subject: m[2], topic: m[3], domain: m[4],
        isCore: m[5] === "true", text: m[6],
      });
    }
    map[caseId] = comps;
  }
  return map;
}

// ─── Load existing output to support resume ────────────────────────────────────

function loadExistingOutput(): Record<string, EnhancedQuizQuestion[]> {
  const outPath = path.resolve(__dirname, "../src/data/enhancedQuizzes.ts");
  try {
    const content = fs.readFileSync(outPath, "utf-8");
    // Extract the inline JSON-like object — parse case IDs that are already present
    const existing: Record<string, EnhancedQuizQuestion[]> = {};
    const caseMatches = [...content.matchAll(/"(s\de\d+[a-z]?)": \[/g)];
    // If we find entries, this is a previously generated file with data
    // For simplicity: if the file is non-empty beyond the stub, extract case IDs
    for (const m of caseMatches) {
      existing[m[1]] = []; // mark as done (actual data not needed for skipping)
    }
    return existing;
  } catch {
    return {};
  }
}

// ─── Distance metadata ─────────────────────────────────────────────────────────

const DISTANCE: Record<EnhancedOptionType, { score: 0 | 1 | 2 | 3; label: string }> = {
  correct:       { score: 0, label: "Correct" },
  similar_wrong: { score: 1, label: "Close but wrong" },
  misconception: { score: 2, label: "Common misconception" },
  wildly_wrong:  { score: 3, label: "Way off" },
};

// ─── Render quiz data as TypeScript ──────────────────────────────────────────

function renderTS(allQuizzes: Record<string, EnhancedQuizQuestion[]>): string {
  const cases = Object.entries(allQuizzes);
  const inner = cases.map(([id, qs]) => {
    const qsStr = qs.map(q => {
      const opts = q.options.map(o => {
        return `          {
            text: ${JSON.stringify(o.text)},
            type: "${o.type}",
            distanceScore: ${o.distanceScore},
            distanceLabel: ${JSON.stringify(o.distanceLabel)},
            explanation: ${JSON.stringify(o.explanation)},
          }`;
      }).join(",\n");
      return `    {
      question: ${JSON.stringify(q.question)},
      bloomLevel: "${q.bloomLevel}",
      competencyCode: "${q.competencyCode}",
      competencyText: ${JSON.stringify(q.competencyText)},
      options: [
${opts}
      ],
      pubmedSource: {
        pmid: "${q.pubmedSource.pmid}",
        title: ${JSON.stringify(q.pubmedSource.title)},
        publicationType: "${q.pubmedSource.publicationType}",
      },
    }`;
    }).join(",\n");
    return `  // ${id}\n  ${JSON.stringify(id)}: [\n${qsStr}\n  ]`;
  }).join(",\n\n");

  return `// AUTO-GENERATED by scripts/generate-enhanced-quizzes.ts
// Do not edit manually — re-run the script to regenerate.
import type { EnhancedQuizQuestion } from './quizzes';

export const enhancedQuizzes: Record<string, EnhancedQuizQuestion[]> = {
${inner}
};
`;
}

// ─── Main generation logic ─────────────────────────────────────────────────────

async function generateForBatch(
  client: Anthropic,
  cases: Case[],
  competencyMap: Record<string, MappedCompetency[]>,
): Promise<Record<string, EnhancedQuizQuestion[]>> {
  const results: Record<string, EnhancedQuizQuestion[]> = {};

  for (const c of cases) {
    const comps = competencyMap[c.id] ?? [];
    if (comps.length === 0) {
      console.log(`  ⚠  No competencies for ${c.id} — skipping`);
      results[c.id] = [];
      continue;
    }

    // Fetch PubMed evidence
    console.log(`  📚 Fetching PubMed for "${c.diagnosis}"…`);
    const papers = await fetchPubMedEvidence(c.diagnosis, 3);
    console.log(`     → ${papers.length} paper(s) found`);

    // Build competency list string (max 10 competencies to keep tokens down)
    const compSubset = comps.slice(0, 10);
    const compList = compSubset.map(comp =>
      `${comp.code} | ${comp.subject} | ${comp.domain} | ${comp.text}`
    ).join("\n");

    // Build PubMed context string
    const pubmedContext = papers.length > 0
      ? papers.map(p =>
          `PMID ${p.pmid} [${p.publicationType}, ${p.year}]\nTitle: ${p.title}\nAbstract: ${p.abstract}`
        ).join("\n\n---\n\n")
      : "No PubMed evidence available — use clinical knowledge.";

    const prompt = `You are a medical education expert creating evidence-grounded MCQ questions for nursing/medical students based on House MD cases.

CASE: ${c.episode} (Season ${c.season})
PATIENT: ${c.patient}
FINAL DIAGNOSIS: ${c.diagnosis}

NMC COMPETENCIES FOR THIS CASE (use these as anchors for questions):
${compList}

PUBMED EVIDENCE:
${pubmedContext}

Generate EXACTLY 10 MCQ questions. Requirements:
1. Each question MUST be anchored to one of the NMC competency codes listed above
2. Questions must span different Bloom's levels: Recall (1-2), Understanding (2-3), Application (3-4), Analysis (2-3), Evaluation (1)
3. Each question has EXACTLY 4 options:
   - "correct": the evidence-based correct answer
   - "similar_wrong": plausible but wrong (close differential)
   - "misconception": a common clinical misconception
   - "wildly_wrong": clearly incorrect but educational to debunk
4. Ground at least 5 questions in the PubMed evidence (use the PMID)
5. Questions should test clinical reasoning, not just rote recall
6. Keep question stems clinical and scenario-based where possible
7. Explanations must be specific and educational (2-3 sentences each)

Call the save_quiz_questions tool with your 10 questions.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      tools: [QUIZ_TOOL],
      tool_choice: { type: "any" },
      messages: [{ role: "user", content: prompt }],
    });

    // Extract tool result
    const toolUse = response.content.find(b => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      console.log(`  ⚠  No tool call for ${c.id}`);
      results[c.id] = [];
      continue;
    }

    const raw = (toolUse.input as { questions: Array<{
      question: string;
      bloomLevel: string;
      competencyCode: string;
      options: Array<{ text: string; type: string; explanation: string }>;
      pubmedPmid: string;
    }> }).questions;

    // Build a PMID → paper map for lookups
    const pmidMap = new Map(papers.map(p => [p.pmid, p]));
    // Fallback paper for questions that reference unknown PMIDs
    const fallbackPaper = papers[0];

    const questions: EnhancedQuizQuestion[] = raw.map(q => {
      const paper = pmidMap.get(q.pubmedPmid) ?? fallbackPaper;
      const anchoredComp = compSubset.find(c => c.code === q.competencyCode) ?? compSubset[0];

      return {
        question: q.question,
        bloomLevel: q.bloomLevel,
        competencyCode: anchoredComp.code,
        competencyText: anchoredComp.text,
        options: q.options.map(o => {
          const type = o.type as EnhancedOptionType;
          return {
            text: o.text,
            type,
            distanceScore: DISTANCE[type]?.score ?? 3,
            distanceLabel: DISTANCE[type]?.label ?? "Unknown",
            explanation: o.explanation,
          };
        }),
        pubmedSource: paper
          ? { pmid: paper.pmid, title: paper.title, publicationType: paper.publicationType }
          : { pmid: "", title: "Clinical knowledge", publicationType: "Textbook" },
      };
    });

    results[c.id] = questions;
    console.log(`  ✓  ${c.id}: ${questions.length} questions`);
  }

  return results;
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const allCases = loadCases();
  const competencyMap = loadCompetencyMap();
  const existing = loadExistingOutput();

  const outPath = path.resolve(__dirname, "../src/data/enhancedQuizzes.ts");
  const allQuizzes: Record<string, EnhancedQuizQuestion[]> = {};

  // Seed with any previously generated data
  Object.assign(allQuizzes, existing);

  const todo = allCases.filter(c => !(c.id in existing));
  console.log(`\n📋 ${todo.length} cases to generate (${allCases.length - todo.length} already done)\n`);

  const BATCH_SIZE = 2;
  const DELAY_MS = 70_000; // 70s between batches

  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    const batch = todo.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(todo.length / BATCH_SIZE);

    console.log(`\n─── Batch ${batchNum}/${totalBatches}: ${batch.map(c => c.id).join(", ")} ───`);

    try {
      const batchResults = await generateForBatch(client, batch, competencyMap);
      Object.assign(allQuizzes, batchResults);

      // Checkpoint
      fs.writeFileSync(outPath, renderTS(allQuizzes), "utf-8");
      console.log(`  💾 Checkpoint saved (${Object.keys(allQuizzes).length} cases total)`);
    } catch (err: any) {
      console.error(`  ✗  Batch ${batchNum} failed:`, err.message ?? err);
      // Save what we have so far
      fs.writeFileSync(outPath, renderTS(allQuizzes), "utf-8");
    }

    // Rate-limit delay (skip after last batch)
    if (i + BATCH_SIZE < todo.length) {
      console.log(`  ⏳ Waiting ${DELAY_MS / 1000}s for rate limit…`);
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  fs.writeFileSync(outPath, renderTS(allQuizzes), "utf-8");
  console.log(`\n✅ Done. ${Object.keys(allQuizzes).length} cases written to src/data/enhancedQuizzes.ts`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
