/**
 * PubMed E-utilities service for the quiz generation script.
 * Fetches evidence-grounded abstracts for a given medical diagnosis,
 * preferring: Systematic Reviews > RCTs/Meta-analyses > Reviews > other.
 */

import * as xml2js from "xml2js";

const API_KEY = "985ff7efe1c70c8c64780c14a48710843b08";
const BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

export interface PubMedPaper {
  pmid: string;
  title: string;
  abstract: string;          // truncated to ~300 words
  publicationType: string;   // "Systematic Review" | "Randomized Controlled Trial" | etc.
  year: string;
}

// Publication type filters in priority order
const PUB_TYPE_TIERS = [
  { label: "Systematic Review", filter: "systematic+review[pt]+OR+meta-analysis[pt]" },
  { label: "RCT",               filter: "randomized+controlled+trial[pt]" },
  { label: "Review",            filter: "review[pt]" },
];

function truncateToWords(text: string, maxWords = 300): string {
  const words = text.trim().split(/\s+/);
  return words.length <= maxWords ? text : words.slice(0, maxWords).join(" ") + "…";
}

async function esearch(term: string, filter?: string, retmax = 5): Promise<string[]> {
  const query = filter ? `${term}+AND+(${filter})` : term;
  const url = `${BASE}/esearch.fcgi?db=pubmed&term=${query}&retmax=${retmax}&retmode=json&sort=relevance&api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json() as { esearchresult: { idlist: string[] } };
  return data.esearchresult.idlist;
}

async function efetch(ids: string[]): Promise<PubMedPaper[]> {
  if (ids.length === 0) return [];
  const url = `${BASE}/efetch.fcgi?db=pubmed&id=${ids.join(",")}&rettype=abstract&retmode=xml&api_key=${API_KEY}`;
  const res = await fetch(url);
  const xmlText = await res.text();

  const parsed = await xml2js.parseStringPromise(xmlText, { explicitArray: true });
  const articles = parsed?.PubmedArticleSet?.PubmedArticle ?? [];

  return articles.map((node: any): PubMedPaper => {
    const citation = node.MedlineCitation?.[0];
    const article = citation?.Article?.[0];

    const pmid = citation?.PMID?.[0]?._ ?? citation?.PMID?.[0] ?? "unknown";
    const title = (article?.ArticleTitle?.[0]?._ ?? article?.ArticleTitle?.[0] ?? "").replace(/<[^>]+>/g, "").trim();

    // Abstract — may be structured (array of sections) or plain
    const abstractNodes: any[] = article?.Abstract?.[0]?.AbstractText ?? [];
    const abstractText = abstractNodes
      .map((n: any) => (typeof n === "string" ? n : n._ ?? ""))
      .join(" ")
      .trim();

    // Publication types
    const ptNodes: any[] = article?.PublicationTypeList?.[0]?.PublicationType ?? [];
    const pubTypes = ptNodes.map((n: any) => (typeof n === "string" ? n : n._ ?? "").trim());
    const publicationType = (() => {
      if (pubTypes.some(t => /systematic review/i.test(t))) return "Systematic Review";
      if (pubTypes.some(t => /meta-analysis/i.test(t))) return "Meta-Analysis";
      if (pubTypes.some(t => /randomized controlled trial/i.test(t))) return "Randomized Controlled Trial";
      if (pubTypes.some(t => /clinical trial/i.test(t))) return "Clinical Trial";
      if (pubTypes.some(t => /review/i.test(t))) return "Review";
      return pubTypes[0] ?? "Journal Article";
    })();

    const year =
      citation?.Article?.[0]?.Journal?.[0]?.JournalIssue?.[0]?.PubDate?.[0]?.Year?.[0] ??
      citation?.DateCompleted?.[0]?.Year?.[0] ?? "";

    return {
      pmid,
      title,
      abstract: truncateToWords(abstractText),
      publicationType,
      year,
    };
  }).filter((p: PubMedPaper) => p.abstract.length > 50); // skip papers with no abstract
}

/**
 * Fetch up to `limit` PubMed papers for a diagnosis.
 * Cascades through publication type tiers, filling up to `limit` unique papers.
 */
export async function fetchPubMedEvidence(
  diagnosis: string,
  limit = 3
): Promise<PubMedPaper[]> {
  // Sanitise term for URL — strip parentheses, strip secondary conditions after &
  const primaryDiagnosis = diagnosis
    .split(/[&(]/)[0]
    .replace(/[^a-zA-Z0-9 '-]/g, " ")
    .trim();
  const encodedTerm = encodeURIComponent(primaryDiagnosis);

  const seenIds = new Set<string>();
  const papers: PubMedPaper[] = [];

  // Pass 1: cascade through high-quality publication types
  for (const tier of PUB_TYPE_TIERS) {
    if (papers.length >= limit) break;
    const needed = limit - papers.length;
    try {
      const ids = (await esearch(encodedTerm, tier.filter, needed + 2))
        .filter(id => !seenIds.has(id))
        .slice(0, needed);
      if (ids.length === 0) continue;
      const fetched = await efetch(ids);
      for (const p of fetched) {
        if (!seenIds.has(p.pmid) && papers.length < limit) {
          seenIds.add(p.pmid);
          papers.push(p);
        }
      }
    } catch {
      // silently skip failed tier
    }
  }

  // Pass 2: fill remaining slots with any relevant paper (no filter)
  if (papers.length < limit) {
    try {
      const needed = limit - papers.length;
      const ids = (await esearch(encodedTerm, undefined, needed + 5))
        .filter(id => !seenIds.has(id))
        .slice(0, needed);
      const fetched = await efetch(ids);
      for (const p of fetched) {
        if (!seenIds.has(p.pmid) && papers.length < limit) {
          seenIds.add(p.pmid);
          papers.push(p);
        }
      }
    } catch {
      // no results at all — generation will proceed without PubMed grounding
    }
  }

  return papers;
}
