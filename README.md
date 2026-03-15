<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# House MD Diagnostic

**Case-based clinical reasoning quizzes for all 182 House MD episodes**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white&labelColor=20232a)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white&labelColor=20232a)

</div>

---

## What is this?

A clinical reasoning study tool built around every case from House MD (S1–S8). Each episode becomes a 10-question diagnostic quiz grounded in real medical literature — designed to build the same kind of systematic differential diagnosis thinking House models in the show.

It's not trivia. The questions test whether you understand *why* a diagnosis fits, not just what the answer is.

---

## Features

### 1,820 PubMed-grounded questions across 182 cases

Every question is anchored to a real PubMed citation (PMID + publication type). Questions follow Bloom's Taxonomy across six cognitive levels:

| Level | Focus |
|---|---|
| Recall | Core pathophysiology facts |
| Understanding | Mechanism and presentation |
| Application | Clinical decision-making |
| Analysis | Differential reasoning |
| Evaluation | Critical appraisal of evidence |

### Weighted clinical reasoning score

Answering isn't binary. Each option is classified and scored:

| Option type | Points | What it means |
|---|---|---|
| Correct | 3 | Right answer, right reasoning |
| Close | 2 | Plausible but wrong |
| Misconception | 1 | Common clinical error |
| Way off | 0 | Unrelated distractor |

Max score per case: **30 points**. The scoring rewards partial understanding rather than penalising all wrong answers equally.

### NMC competency mapping

Each question is tagged with a Nursing and Midwifery Council (NMC) competency code from the MI (Medical Investigation), PH (Patient History), AC (Acute Care), and IN (Intervention) series. The results screen shows which competencies you demonstrated.

### Persistent progress tracking

Progress is saved to `localStorage` — scores survive page refreshes and browser restarts. Best-attempt semantics: retaking a quiz only updates your score if you improve.

The dashboard shows live stats:
- Cases completed (out of 182)
- Weighted accuracy %
- Total clinical reasoning points earned

### Case archive with search

"View All Cases" opens a searchable archive of all 182 cases grouped by season. Filter by episode title, diagnosis, or patient name. Each card shows a completion badge once you've finished that case's quiz.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| UI framework | React 19 + TypeScript | |
| Styling | Tailwind CSS v4 | |
| Animations | Motion (Framer Motion) | |
| Icons | Lucide React | |
| Build | Vite 6 | Dynamic import for quiz data chunk |
| Quiz data | `enhancedQuizzes.ts` (2.6 MB) | Lazy-loaded — main bundle stays at ~985 KB |
| AI generation | Google Gemini 2.0 Flash | Used to generate quiz content offline |
| Progress | `localStorage` | No backend required |

---

## Run locally

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/abeejuice/house.git
cd house
npm install
npm run dev
```

Set your Gemini API key only if you want to regenerate quiz content (not needed to run the app):

```bash
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local
```

Production build:

```bash
npm run build
```

---

## Project structure

```
src/
├── components/
│   ├── AllCasesView.tsx      # Searchable archive of all 182 cases by season
│   ├── CaseCard.tsx          # Case tile with completion badge
│   ├── HomeView.tsx          # Dashboard with live stats
│   ├── NMCCompetencies.tsx   # NMC competency panel on results screen
│   ├── QuizView.tsx          # Quiz engine (enhanced + legacy modes)
│   ├── SeasonView.tsx        # Season grid with completion counter + search
│   └── Sidebar.tsx           # Navigation (dashboard + seasons 1–8)
├── context/
│   └── ProgressContext.tsx   # React Context + useProgress() hook
├── data/
│   ├── cases.ts              # 182 case definitions (id, season, episode, diagnosis)
│   ├── competencyMap.ts      # NMC competency code → description lookup
│   ├── enhancedQuizzes.ts    # 1,820 questions (lazy-loaded chunk)
│   └── quizzes.ts            # Type definitions + legacy static quizzes
├── services/
│   ├── nmcService.ts         # NMC competency lookup
│   ├── progressService.ts    # localStorage I/O, stats computation
│   └── quizService.ts        # Quiz loader (enhanced → legacy → AI fallback)
└── scripts/
    ├── generate-enhanced-quizzes.ts   # Gemini quiz generation script
    ├── generate-competency-map.ts     # NMC competency extractor
    └── pubmedService.ts               # PubMed E-utilities wrapper
```

---

## Changelog

### v2.0 — Current

Complete rebuild of the quiz and data layer.

**Content**
- Added 1,820 PubMed-grounded questions covering all 182 cases (S1–S8)
- Expanded `cases.ts` from ~10 entries to all 182 episodes with corrected diagnoses
- Added NMC competency mapping across ~40 codes

**Quiz engine**
- New enhanced quiz mode with weighted distance scoring (0–3 pts per question)
- Per-answer explanations shown immediately after selection
- PubMed citation badge on each question (PMID, title, publication type)
- NMC competency panel on the results screen
- Quiz data lazy-loaded via dynamic `import()` — main bundle reduced from 3.6 MB to 985 KB

**Progress tracking**
- `localStorage`-backed progress (key: `housemd_progress`)
- Best-attempt semantics — retaking never overwrites a higher score
- Live dashboard stats: cases completed, accuracy %, points earned
- Per-case completion badges on `CaseCard`
- Season completion counters on `SeasonView`

**Navigation**
- "View All Cases" now opens `AllCasesView` — all 182 cases grouped by season
- Search in `AllCasesView` and `SeasonView` now functional (episode / diagnosis / patient)

---

### v1.0 — Initial release

- React + Vite + Tailwind scaffold
- Sidebar navigation (Dashboard + Seasons 1–8)
- ~10 hand-written cases with 5-question static quizzes
- Basic correct/incorrect scoring
- Live Gemini AI quiz generation as fallback for cases without static quizzes
