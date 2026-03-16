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

### Pointer-responsive glow cards

Every case card responds to cursor movement with a soft radial glow that appears to originate from inside the card and tracks the pointer using spring physics. Built with `useMotionValue` + `useSpring` + `useTransform` from Motion — zero React re-renders on pointer movement.

### Interactive Knowledge Map

A force-directed graph of all 182 cases and 13 NMC subject domains. Two interaction modes:

- **Subject-click (orange)** — focus a subject hub to see all cases that touch it; active edges glow and widen
- **Case-click (indigo)** — select any case satellite to see which subjects it covers, highlighted in a distinct indigo colour
- **Edge hover** — hovering any edge shows the NMC competency code and description that connects that case to that subject

### Adaptive home screen recommendations

The dashboard's case grid is dynamic:
- **New users** see a curated starter set of 6 high-interest cases
- **Returning users** see 6 cases from their weakest subject area, ranked untried-first then by lowest score — so the hardest gap always surfaces to the top

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

### v2.7 — Current

#### House's Verdict panel — 57 accuracy-range taunts

Replaced the "Diagnostic Accuracy" and "Points Earned" stat cards with a dynamic **Dr. House's Verdict** panel. The card reads your overall accuracy and delivers an in-character House MD taunt from a pool of 57 quotes across six accuracy bands.

**Accuracy ranges:**

| Range | Tone |
|---|---|
| 0 cases | Cold dismissal — "A blank chart. The only diagnosis I can make is a severe case of inaction." |
| 1–30% | Brutal — "I've seen better diagnostic reasoning from a Magic 8-Ball. And it's cheaper." |
| 31–50% | Resigned — "You're getting warmer. The way Antarctica is getting warmer — technically true, not useful." |
| 51–70% | Backhanded — "You're passing. Not thriving. Just passing. Like a kidney stone." |
| 71–85% | Grudging respect — "Don't get cocky. It's probably still lupus." |
| 86–100% | Reluctant compliment — "...I'm mildly disgusted by how right you are." |

**Animation behaviour (three phases):**

1. **Scan** (~1.4 s on mount): monospace label rapidly cycles through differential terms (`LUPUS... SARCOIDOSIS... VASCULITIS...`)
2. **Typewriter**: the selected quote types out character-by-character with a blinking cursor
3. **Idle**: quote sits static; auto-fades to the next quote every 8 seconds — pauses on hover

Tap the `→` button or click/tap the card in idle phase to manually advance to the next quote.

**Performance & accessibility:**
- Zero new dependencies — uses existing `motion/react`
- `prefers-reduced-motion`: scan and typewriter skipped; quote appears instantly; no auto-cycle
- Hover pauses auto-cycle via a `useRef` flag (no re-renders)
- All `setInterval` / `setTimeout` instances cleaned up on unmount

**Layout:** The two removed cards are replaced by the verdict panel spanning 2 columns (`md:col-span-2 lg:col-span-2`) alongside the retained "Cases Completed" and "Total Cases" cards.

---

### v2.6

#### GalenAI branding + site rename

**Site renamed to "It's Not Lupus"**

The app is now called *It's Not Lupus* — a nod to the most iconic running joke in House MD and the diagnostic instinct the show (and this quiz) tries to build. Browser tab reads "It's Not Lupus | GalenAI".

**GalenAI logo integrated**

GalenAI — the company that built this app — is now represented in two places:

- **Sidebar header**: The placeholder "H" square is replaced with the GalenAI icon mark (the stylised anatomical `G` in `#eb602d` orange-red), next to the new site name
- **Sidebar footer**: A subtle GalenAI full wordmark sits at the bottom of the sidebar at 60% opacity, serving as a clean attribution without competing with the navigation

Both SVG assets (`galen-icon.svg`, `galen-wordmark.svg`) are served from `public/` as static files.

---

### v2.5

#### Bug fixes — layout & sidebar

**White patch at bottom of screen**

Scrolling to the bottom of any long page (Home, Season views) revealed a white strip below the content. Root cause: `<main>` in `App.tsx` lacked an explicit background colour, so the browser's default white page background showed through the dark `#050505` root when the scrollable content area ended above the viewport floor. Fixed by adding `bg-[#050505]` to the `<main>` element.

**Removed decorative sidebar profile block**

The bottom-left corner of the sidebar contained a non-functional "MD" avatar, "Fellow" label, "Princeton-Plainsboro" subtitle, and a Sign Out button with no backing logic. Removed entirely from `Sidebar.tsx` along with the now-unused `LogOut` import.

---

### v2.4

#### Pointer-responsive glow on case cards

Added a tactile "internal light source" effect to every `CaseCard`. A soft radial gradient glow appears when the cursor enters a card, tracks the pointer position in real time using spring physics, and fades out cleanly when the cursor leaves.

**How it works:**
- `useMotionValue` tracks the raw pixel offset of the cursor from the card center (x and y)
- `useSpring` (stiffness 200, damping 25) smooths the movement so the glow follows with natural lag rather than snapping
- `useTransform` derives a `radial-gradient` CSS string from the spring values, repositioning the gradient centre to match the cursor percentage within the card
- A separate opacity spring (`glowOpacity`) starts at 0, animates to 1 on `pointerenter`, and back to 0 on `pointerleave` — so the glow fades in and out rather than abruptly appearing or persisting after hover

**Performance:**
- All MotionValues live outside React state — pointer movement causes zero component re-renders
- `getBoundingClientRect` is a read-only DOM query (no layout write), called per `pointermove` event scoped to one card
- `overflow: hidden` + `isolation: isolate` on the card root clips the glow and prevents z-index bleed
- Glow layer skipped entirely on touch-only devices (`window.matchMedia('(hover: hover)')`) — no regression on mobile

**Tunable via CSS variables in `src/index.css`:**

| Variable | Default | Effect |
|---|---|---|
| `--glow-color-r/g/b` | `242 125 38` (orange) | Glow colour channels |
| `--glow-opacity` | `0.13` | Peak glow intensity |
| `--glow-radius` | `380px` | Spread of the radial gradient |

---

### v2.3

#### Quiz engine — option shuffle, draft/submit flow, results differentiation

**Bug fix: answer was always Option A**

Every question in `enhancedQuizzes.ts` stores the correct option at index 0. Since React renders arrays in order, the right answer was permanently locked to the first position. Fixed with a Fisher-Yates shuffle applied once per quiz session when questions load:

```ts
const randomized = enhanced.map(q => ({ ...q, options: shuffleArray(q.options) }));
```

Options are shuffled into a random order (A/B/C/D) on every quiz attempt. Scoring is unaffected — the grading logic checks `opt.type` (`"correct"`, `"similar_wrong"`, etc.), not array position.

**UX fix: accidental clicks were immediately final**

Previously a single click instantly locked the answer, showed the explanation, and disabled all other buttons with no way to reconsider. Replaced with a two-stage draft/submit flow (enhanced mode only):

| Stage | Behaviour |
|---|---|
| Click an option | Orange border highlight on selected option — other options still clickable and changeable |
| Click a different option | Highlight moves, no penalty |
| Click "Submit Answer" | Answer locks in, explanation animates in, Next/View Results button appears |

The existing `selectedOption` state is now the *locked* answer. A new `draftOption` state tracks the tentative selection before submission.

**UX improvement: results page visual differentiation**

The per-question review cards in the results screen previously looked identical regardless of outcome. Now:

- **Correct answers** → subtle emerald border + background (`border-emerald-500/30 bg-emerald-500/5`) — confirms correct reasoning at a glance
- **Wrong answers** → heavy rose border + background (`border-rose-500/50 bg-rose-500/5`) — immediately scannable while scrolling; expands into the existing split-pane "Your Answer / Correct Answer" layout

The split-pane layout for wrong answers was already implemented; this change makes the outer card visually signal the outcome so users can speed-scroll the review and stop only at their mistakes.

---

### v2.2

#### Knowledge Map — bidirectional selection & edge tooltips

The Knowledge Map now has a full two-mode interaction model and competency-aware edges.

**Subject-click mode (orange)**
- Clicking a subject hub focuses it: connected case satellites stay fully lit, all others fade to near-invisible (0.05 alpha, down from 0.08 for stronger contrast)
- Active edges glow at **0.7 alpha and 2 px width** (was flat 0.15/0.5 px) so the connections are clearly visible
- The focused hub gets a bright outline ring to confirm selection; click again to deselect

**Case-click mode (indigo) — new**
- Clicking any case satellite now highlights that case plus its connected subject hubs in **indigo** — a distinct colour from the orange subject-focus mode so the two states are never confused
- The selected case gets a layered indigo glow ring; connected subjects get a softer indigo halo
- Active edges turn indigo at 0.7 alpha; unrelated nodes fade away

**Edge hover tooltips — new**
- Hovering any visible edge now shows a pill tooltip positioned at the midpoint of that edge
- Tooltip displays the NMC competency code (e.g. `IM17.13`) and its full description text (e.g. "Describe the pharmacology, dose, adverse reactions and regimens of drugs used in the treatment of bacterial, tubercular and viral meningitis")
- This makes explicit *why* a case is connected to a subject — not just that it is

**GraphLink data enrichment**
- `GraphLink` now carries `competencyCode` and `competencyText` fields populated at graph-build time from the first competency entry that creates each case→subject edge
- These fields power the edge tooltips without any runtime lookup

**Focus indicator pill**
- The top-right pill now shows subject name (orange) or episode name (indigo) depending on the active mode, with a single ✕ button that clears both states

---

#### Home screen — adaptive case recommendations

The "Start Here" section on the dashboard is no longer a static hard-coded list.

**New users (0 cases attempted)**
- Section title: **"Start Here"** with a green "High Grade Data" badge
- Shows the existing curated starter set of 6 cases (unchanged experience for first-time users)

**Returning users (1+ cases attempted)**
- Section title: **"Targeted Practice"** with a rose **"Weakest: [Subject]"** badge identifying the specific subject area with the lowest accuracy across all attempted cases
- Cards show the top 6 cases from that weakest subject, sorted untried-first then by lowest accuracy — so you always see the most relevant gap in your knowledge
- Implemented via a new exported `getRecommendedCases()` function in `graphBuilder.ts`, which reuses the existing private `subjectAccuracyMap` and `casesForSubject` helpers

---

### v2.1

#### Data quality: PubMed source audit (173 cases reviewed)

A full audit of all `pubmedSource` fields revealed three categories of error, all resolved:

**Category A — Empty/placeholder PMIDs fixed (13 cases)**

| Case | Clinical topic | New source |
|------|---------------|------------|
| s1e6 | Wilson's disease | PMID 37311952 — SR + meta-analysis |
| s3e18 | Methyl bromide toxicity | PMID 23800997 — Review |
| s3e22 | Caustic ingestion / GI injury | PMID 39982600 — Practice Guideline |
| s4e6 | Thallium poisoning | PMID 22837270 — EXTRIP Practice Guideline |
| s4e12 | Nephroptosis | PMID 29637838 — Review |
| s5e3 | Gastric bezoar | PMID 25901212 — Review |
| s5e19 | Leptospirosis neurology | PMID 25813883 — Systematic Review |
| s6e18 | Anabolic steroid adverse effects | PMID 39945139 — SR + meta-analysis |
| s6e22 | Fat embolism syndrome | PMID 33880141 — Review |
| s7e7 | Rickettsialpox | PMID 9098640 — Review |
| s7e18 | Q fever endocarditis | PMID 34052129 — Review |
| s8e20 | Triclosan / thyroid disruption | PMID 33519715 — SR + meta-analysis |
| s8e22 | Hypersensitivity pneumonitis | PMID 34370035 — Systematic Review |

**Category B — Confirmed wrong / retracted sources replaced (2 cases)**

| Case | Old PMID | Problem | New source |
|------|----------|---------|------------|
| s7e13 | 19454071 | ARDS article assigned to a foreign body aspiration case | PMID 37473440 — SR + meta-analysis on CT for paediatric FBA |
| s7e22 | 38792919 | Article was **retracted** (periodontal disease) | PMID 39979548 — SR + meta-analysis on amoebic liver abscess |

**Category C — Topic mismatches and weak sources upgraded (5 cases)**

| Case | Old source | Problem | New source |
|------|-----------|---------|------------|
| s7e10 | PMID 36433668 — photodermatoses | Case is about variegate porphyria | PMID 27982422 — porphyria review |
| s7e3 | PMID 33197553 — RhoA inhibitors | Case is about post-traumatic syringomyelia | PMID 12852875 — syringomyelia review |
| s5e15 | PMID 25906751 — prostate cancer gene | Highly specific gene paper, not a SR | PMID 23527602 — Wiskott-Aldrich SR |
| s8e1 | PMID 32891740 — veterinary mast cell | Veterinary article (wrong species) | PMID 28770635 — mastocytosis meta-analysis |
| s7e21 | PMID 8765116 — 1996 case report | Bottom of evidence hierarchy, 30 yrs old | PMID 33047541 — 2020 cantharidin review |

#### Bug fixes — `QuizView.tsx`

- **Fixed crash on missing explanation** — explanation block is now conditionally rendered; previously a missing `explanation` field would throw a runtime error
- **Fixed premature answer reveal** — option rows no longer colour-code themselves (correct/wrong/close) before an answer is confirmed; this was effectively showing the right answer before the user committed to a choice
- **Added "Exit Case" button** — `ArrowLeft` back button added to the quiz header so users can leave mid-quiz without needing to know about the separate close control

---

### v2.0

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
