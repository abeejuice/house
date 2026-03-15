/**
 * One-time script: maps every House MD diagnosis to NMC competency codes.
 * Run with:  npm run generate:competency-map
 * Output:    src/data/competencyMap.ts
 *
 * Strategy: Batches of 5 diagnoses, pre-filters competencies by keyword per
 * batch to keep each API call under 8K tokens (fits free tier 10K/min limit).
 * Checkpoints progress so a failed run can resume.
 */

import Anthropic from "@anthropic-ai/sdk";
import Database from "better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "../.env") });

// ─── Types ───────────────────────────────────────────────────────────────────

interface NMCComp {
  competency_code: string;
  competency_text: string;
  domain: string;
  is_core: number;
  sc: string;   // subject code
  sn: string;   // subject name
  topic: string;
}

interface Case {
  id: string;
  season: number;
  episode: string;
  patient: string;
  diagnosis: string;
}

// ─── 1. Load data ─────────────────────────────────────────────────────────────

function loadCompetencies(): NMCComp[] {
  const db = new Database(
    path.resolve(__dirname, "../../nmc-competency-selector/src/data/competencies-2019.db"),
    { readonly: true }
  );
  const rows = db.prepare(`
    SELECT c.competency_code, c.competency_text, c.domain, c.is_core,
           s.code as sc, s.name as sn, t.name as topic
    FROM competencies c
    JOIN topics t ON c.topic_id = t.id
    JOIN subjects s ON t.subject_id = s.id
    WHERE c.deleted_at IS NULL
    ORDER BY c.competency_code
  `).all() as NMCComp[];
  db.close();
  return rows;
}

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

// ─── 2. Keyword-based competency pre-filter ────────────────────────────────────
// Keeps each API call under ~8K tokens by only sending relevant competencies.

// Medical category → NMC subject codes that cover it
const CATEGORY_SUBJECTS: Record<string, string[]> = {
  parasite:    ["MI", "IM", "CM"],
  bacterial:   ["MI", "IM", "PA"],
  viral:       ["MI", "IM", "PA", "PE"],
  fungal:      ["MI", "IM", "PA"],
  zoonotic:    ["MI", "CM", "IM"],
  poisoning:   ["FM", "PH", "IM"],
  toxin:       ["FM", "PH", "IM"],
  overdose:    ["FM", "PH", "IM", "PS"],
  autoimmune:  ["IM", "PA", "DR"],
  cancer:      ["IM", "PA", "BI"],
  genetic:     ["BI", "IM", "PE"],
  metabolic:   ["BI", "IM", "PE"],
  cardiac:     ["IM", "PY"],
  neuro:       ["IM", "AN", "PA"],
  respiratory: ["IM", "PA"],
  renal:       ["IM", "PA"],
  hematology:  ["IM", "PA", "BI"],
  endocrine:   ["IM", "BI"],
  skin:        ["DR", "IM"],
  psych:       ["PS", "IM"],
  paediatric:  ["PE", "IM"],
  obstetric:   ["OG", "IM"],
  ortho:       ["OR", "IM"],
  ent:         ["EN", "IM"],
};

// Keyword triggers for each category
const KEYWORD_TRIGGERS: Array<[string[], string]> = [
  [["malaria","filariasis","trypanosomiasis","kala","leishmania","cysticercosis","tapeworm","amoeba","giardia","toxoplasma","babesia","trichinella","strongyloides","baylisascaris","echinococcosis","schistosomiasis","ascariasis","entamoeba"], "parasite"],
  [["staphylococcus","streptococcus","clostridium","salmonella","brucella","listeria","legionella","psittacosis","plague","cholera","typhoid","typhus","rickettsia","leptospira","syphilis","gonorrhea","chlamydia","diphtheria","pertussis","meningococcal","pneumococcal"], "bacterial"],
  [["rabies","herpes","hepatitis","sspe","measles","varicella","ebola","rickettsialpox","encephalitis","zika","dengue","hiv","covid","influenza","adenovirus"], "viral"],
  [["fungal","aspergillus","candida","cryptococcus","histoplasma","blastomycosis","sporotrichosis","mucormycosis","zygomycosis"], "fungal"],
  [["organophosphate","naphthalene","cadmium","lead","mercury","arsenic","thallium","gold","copper","radiation","sickness"], "poisoning"],
  [["poisoning","toxicity","overdose","toxic","venom","bite","sting","ergot","cantharides","colchicine"], "toxin"],
  [["lupus","autoimmune","antiphospholipid","henoch","wegener","granulomatosis","vasculitis","sarcoidosis","sjögren","behcet","myasthenia","crohn","ibd"], "autoimmune"],
  [["cancer","carcinoma","tumor","lymphoma","leukemia","melanoma","sarcoma","myeloma","neoplasm","malignant","adenoma"], "cancer"],
  [["wilson","fabry","gaucher","familial","hereditary","genetic","syndrome","merrf","cipa","chimerism"], "genetic"],
  [["porphyria","coproporphyria","phenylketonuria","metabolic","enzyme","deficiency","hyperammonemia","hypoglycemia"], "metabolic"],
  [["cardiac","heart","endocarditis","pericarditis","myocarditis","arrhythmia","aneurysm","embolism","thrombosis","kawasaki","angioma"], "cardiac"],
  [["neuro","brain","meningitis","encephalitis","seizure","epilepsy","sclerosis","syringomyelia","meningioma","stroke","parkinson","alzheimer","coma","paralysis"], "neuro"],
  [["respiratory","pneumonia","pulmonary","asthma","copd","pleural","bronchitis","pneumonitis"], "respiratory"],
  [["renal","kidney","nephrotic","nephritis","uremia","ckd","glomerulo"], "renal"],
  [["anemia","hemolysis","hemophilia","thrombocytopenia","purpura","coagulation","hematol","leukemia","lymphoma","histiocytosis","porphyria"], "hematology"],
  [["diabetes","thyroid","addison","cushing","adrenal","pituitary","parathyroid","endocrine","hormonal"], "endocrine"],
  [["skin","dermatitis","eczema","psoriasis","rash","urticaria","leprosy","dermatol"], "skin"],
  [["psych","schizophrenia","depression","anxiety","bipolar","munchausen","dissociative","psychosis"], "psych"],
  [["paediatric","infant","child","congenital","neonatal","kawasaki"], "paediatric"],
  [["obstetric","pregnancy","eclampsia","maternal","endometriosis","ovarian","uterine"], "obstetric"],
];

function detectCategories(diagnosis: string): string[] {
  const lower = diagnosis.toLowerCase();
  const found = new Set<string>();
  for (const [keywords, category] of KEYWORD_TRIGGERS) {
    if (keywords.some(kw => lower.includes(kw))) {
      found.add(category);
    }
  }
  // Always include IM (General Medicine) — it covers most conditions
  found.add("neuro"); // IM subject
  return [...found];
}

function selectCompetencies(diagnoses: Case[], allComps: NMCComp[]): NMCComp[] {
  // Collect all relevant subject codes for this batch
  const subjects = new Set<string>(["IM"]); // always include General Medicine
  for (const c of diagnoses) {
    const cats = detectCategories(c.diagnosis);
    for (const cat of cats) {
      for (const s of (CATEGORY_SUBJECTS[cat] ?? [])) subjects.add(s);
    }
  }

  // Get competencies from those subjects
  let filtered = allComps.filter(c => subjects.has(c.sc));

  // Further filter by text relevance — check if any diagnosis keyword appears in competency text
  const diagKeywords = diagnoses.flatMap(d =>
    d.diagnosis.toLowerCase()
      .replace(/[()&,]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 4 && !["disease","syndrome","disorder","deficiency","poisoning","secondary","infection"].includes(w))
  );

  // Score each competency: +2 if keyword match, +1 if core
  const scored = filtered.map(c => {
    const text = c.competency_text.toLowerCase();
    const matches = diagKeywords.filter(kw => text.includes(kw)).length;
    return { comp: c, score: matches * 2 + (c.is_core ? 1 : 0) };
  });

  // Sort by score desc, take top 120 to stay under token budget
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 120).map(s => s.comp);
}

function formatForPrompt(comps: NMCComp[]): string {
  return comps.map(c => {
    const text = c.competency_text.replace(/\r\n/g, " ").replace(/\n/g, " ").trim();
    return `${c.competency_code}|${c.sn}|${c.topic}|${c.domain}|${c.is_core ? "★" : "○"}|${text}`;
  }).join("\n");
}

// ─── 3. API call with rate limiting ────────────────────────────────────────────

const client = new Anthropic();

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mapBatch(
  cases: Case[],
  allComps: NMCComp[],
  attempt = 0
): Promise<Record<string, string[]>> {
  const selectedComps = selectCompetencies(cases, allComps);
  const compText = formatForPrompt(selectedComps);
  const codeSet = new Set(selectedComps.map(c => c.competency_code));

  const diagList = cases.map(c =>
    `${c.id}|S${c.season} "${c.episode}"|${c.diagnosis}`
  ).join("\n");

  const prompt = `You are an NMC MBBS curriculum expert mapping House MD diagnoses to NMC competency codes.

For each case below, identify the most relevant NMC competency codes from the provided list.
Return ONLY a JSON object mapping case_id to an array of competency codes.
Rules:
- 3-10 codes per case
- Only use codes from the provided list
- Include codes from multiple subjects when the condition spans them
- Prioritise ★ (core) competencies

NMC COMPETENCIES (${selectedComps.length} relevant):
${compText}

CASES:
${diagList}`;

  try {
    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      tools: [{
        name: "submit_mapping",
        description: "Submit the competency mapping for the provided cases",
        input_schema: {
          type: "object" as const,
          properties: {
            mapping: {
              type: "object" as const,
              additionalProperties: { type: "array", items: { type: "string" } },
            },
          },
          required: ["mapping"],
        },
      }],
      tool_choice: { type: "any" as const },
      messages: [{ role: "user", content: prompt }],
    });

    // Extract rate limit info from headers for logging
    const tokensUsed = resp.usage.input_tokens + resp.usage.output_tokens;

    const toolUse = resp.content.find(b => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") throw new Error("No tool call in response");

    const raw = (toolUse.input as { mapping: Record<string, string[]> }).mapping;

    // Validate: remove any hallucinated codes not in our filtered set
    const cleaned: Record<string, string[]> = {};
    for (const [id, codes] of Object.entries(raw)) {
      cleaned[id] = codes.filter(code => codeSet.has(code));
    }

    return cleaned;
  } catch (err: any) {
    if (err?.status === 429) {
      const retryAfter = (attempt + 1) * 65; // back off 65s, 130s, ...
      console.log(`   ⏳ Rate limited — waiting ${retryAfter}s before retry ${attempt + 1}...`);
      await sleep(retryAfter * 1000);
      return mapBatch(cases, allComps, attempt + 1);
    }
    throw err;
  }
}

// ─── 4. Generate TypeScript output ────────────────────────────────────────────

function generateTypeScript(
  mapping: Record<string, string[]>,
  allComps: NMCComp[],
  cases: Case[]
): string {
  const codeIndex = new Map(allComps.map(c => [c.competency_code, c]));
  const total = Object.values(mapping).reduce((n, v) => n + v.length, 0);

  const lines = [
    `// AUTO-GENERATED by scripts/generate-competency-map.ts`,
    `// ${new Date().toISOString().slice(0, 10)} — ${Object.keys(mapping).length} cases, ${total} competency links`,
    ``,
    `export interface MappedCompetency {`,
    `  code: string;`,
    `  subject: string;`,
    `  topic: string;`,
    `  domain: string;`,
    `  isCore: boolean;`,
    `  text: string;`,
    `}`,
    ``,
    `export const competencyMap: Record<string, MappedCompetency[]> = {`,
  ];

  for (const [caseId, codes] of Object.entries(mapping)) {
    const c = cases.find(x => x.id === caseId);
    lines.push(`  // S${c?.season} "${c?.episode}" — ${c?.diagnosis}`);
    lines.push(`  "${caseId}": [`);
    for (const code of codes) {
      const comp = codeIndex.get(code);
      if (!comp) continue;
      const text = comp.competency_text.replace(/\r\n/g, " ").replace(/\n/g, " ").replace(/"/g, '\\"').trim();
      lines.push(`    { code: "${code}", subject: "${comp.sn}", topic: "${comp.topic}", domain: "${comp.domain}", isCore: ${comp.is_core === 1}, text: "${text}" },`);
    }
    lines.push(`  ],`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`export function getCompetenciesForCase(caseId: string): MappedCompetency[] {`);
  lines.push(`  return competencyMap[caseId] ?? [];`);
  lines.push(`}`);

  return lines.join("\n");
}

// ─── 5. Main ──────────────────────────────────────────────────────────────────

const CHECKPOINT_PATH = path.resolve(__dirname, "../src/data/competencyMap.checkpoint.json");
const OUT_PATH = path.resolve(__dirname, "../src/data/competencyMap.ts");
const BATCH_SIZE = 5;
const DELAY_BETWEEN_BATCHES_MS = 65_000; // 65s to safely stay under 10K tokens/min

async function main() {
  console.log("🔬 NMC Competency Map Generator (batched)\n");

  const allComps = loadCompetencies();
  console.log(`📚 ${allComps.length} NMC competencies loaded`);

  const cases = loadCases();
  console.log(`🎬 ${cases.length} House MD cases loaded\n`);

  // Load checkpoint if it exists
  let mapping: Record<string, string[]> = {};
  if (fs.existsSync(CHECKPOINT_PATH)) {
    mapping = JSON.parse(fs.readFileSync(CHECKPOINT_PATH, "utf-8"));
    console.log(`📂 Resuming from checkpoint: ${Object.keys(mapping).length} cases already done\n`);
  }

  const remaining = cases.filter(c => !mapping[c.id]);
  const batches: Case[][] = [];
  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    batches.push(remaining.slice(i, i + BATCH_SIZE));
  }

  console.log(`📋 ${remaining.length} cases to process in ${batches.length} batches`);
  console.log(`⏱  ~${Math.ceil(batches.length * DELAY_BETWEEN_BATCHES_MS / 60000)} minutes estimated\n`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const names = batch.map(c => c.diagnosis).join(", ");
    process.stdout.write(`Batch ${i + 1}/${batches.length}: ${names.slice(0, 80)}... `);

    const result = await mapBatch(batch, allComps);
    Object.assign(mapping, result);

    // Save checkpoint after every batch
    fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(mapping, null, 2));
    const codes = Object.values(result).flat().length;
    console.log(`✅ ${codes} codes`);

    // Rate limit delay (skip after last batch)
    if (i < batches.length - 1) {
      process.stdout.write(`   ⏳ Waiting 65s for rate limit reset...`);
      await sleep(DELAY_BETWEEN_BATCHES_MS);
      process.stdout.write(` done\n`);
    }
  }

  const missed = cases.filter(c => !mapping[c.id]).map(c => c.id);
  if (missed.length > 0) {
    console.log(`\n⚠️  Missed ${missed.length} cases: ${missed.join(", ")}`);
  }

  const ts = generateTypeScript(mapping, allComps, cases);
  fs.writeFileSync(OUT_PATH, ts, "utf-8");

  // Clean up checkpoint
  if (fs.existsSync(CHECKPOINT_PATH)) fs.unlinkSync(CHECKPOINT_PATH);

  const total = Object.values(mapping).reduce((n, v) => n + v.length, 0);
  console.log(`\n✅ Done! ${Object.keys(mapping).length} cases mapped, ${total} competency links`);
  console.log(`💾 Written to ${OUT_PATH}`);
}

main().catch(err => { console.error("❌", err); process.exit(1); });
