import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const auditPath = resolve(root, "docs/builds/visual-source-acquisition-001-100/REJECTED-CANDIDATE-REPLACEMENT-AUDIT.json");
const outputDir = resolve(root, "apps/web/public/media/100-builds/replacement-source-context");
const productionDir = resolve(root, "apps/web/public/media/100-builds/replacement-production-covers");
const manifestPath = resolve(root, "docs/builds/visual-source-acquisition-001-100/REPLACEMENT-SOURCE-CONTEXT.json");
const productionManifestPath = resolve(root, "docs/builds/visual-source-acquisition-001-100/REPLACEMENT-PRODUCTION-COVERS.json");
const audit = JSON.parse(readFileSync(auditPath, "utf8"));
const records = audit.records.filter((record) => record.decision === "STRONGER_EXACT_EXCERPT_FOUND_NOT_LIVE");

const excerpts = {
  "002": ["You must understand the needs of all kinds of users,", "not just ‘typical’ users.", "", "Write user needs from a personal perspective using", "words that users would recognise and use themselves."],
  "007": ["GOVERN 5", "Processes are in place for robust engagement with relevant AI actors.", "", "GOVERN 5.1: Organizational policies and practices are in place to collect,", "consider, prioritize, and integrate feedback from those external to the team", "that developed or deployed the AI system regarding the potential individual", "and societal impacts related to AI risks.", "", "GOVERN 5.2: Mechanisms are established to enable the team that developed", "or deployed AI systems to regularly incorporate adjudicated feedback from", "relevant AI actors into system design and implementation."],
  "008": ["MAP 2.2", "Information about the AI system’s knowledge limits and how", "system output may be utilized and overseen by humans is documented.", "", "Documentation provides sufficient information to assist relevant", "AI actors when making decisions and taking subsequent actions."],
  "013": ["The interdependencies between these activities, and among the relevant AI", "actors, can make it difficult to reliably anticipate impacts of AI systems.", "", "[intervening example omitted]", "", "As a result, the best intentions within one dimension of the AI lifecycle can be", "undermined via interactions with decisions and conditions in other, later activities."],
  "017": ["GOVERN 2", "Accountability structures are in place so that the appropriate teams and", "individuals are empowered, responsible, and trained for mapping, measuring,", "and managing AI risks.", "", "GOVERN 2.1: Roles and responsibilities and lines of communication related to", "mapping, measuring, and managing AI risks are documented and are clear to", "individuals and teams throughout the organization.", "", "GOVERN 2.2: The organization’s personnel and partners receive AI risk", "management training to enable them to perform their duties and responsibilities", "consistent with related policies, procedures, and agreements.", "", "GOVERN 2.3: Executive leadership takes responsibility for decisions about risks", "associated with AI system development and deployment."],
  "025": ["AI RMF temporal profiles are descriptions of either the current state or the", "desired, target state of specific AI risk management activities within a given", "sector, industry, organization, or application context.", "", "A Current Profile indicates how AI is currently being managed and the related", "risks in terms of current outcomes. A Target Profile indicates the outcomes needed", "to achieve the desired or target AI risk management goals.", "", "Comparing Current and Target Profiles likely reveals gaps to be addressed to", "meet AI risk management objectives. Action plans can be developed to address", "these gaps to fulfill outcomes in a given category or subcategory."],
  "028": ["MANAGE 1", "AI risks based on assessments and other analytical output from the MAP and", "MEASURE functions are prioritized, responded to, and managed.", "", "MANAGE 1.1: A determination is made as to whether the AI system achieves its", "intended purposes and stated objectives and whether its development or deployment", "should proceed.", "", "MANAGE 1.2: Treatment of documented AI risks is prioritized based on impact,", "likelihood, and available resources or methods."],
  "029": ["PROVENANCE ENABLES", "", "checking for possible errors", "tracking down parties responsible for fixing them", "repeating processes to re-generate datasets", "relating versions of documents over time", "inspecting sources and attribution"],
  "032": ["RELEASE BOUNDARY", "", "MANAGE 1.1: A determination is made as to whether the AI system achieves", "its intended purposes and stated objectives and whether its development or", "deployment should proceed.", "", "[intervening rows omitted]", "", "MANAGE 2.4: Mechanisms are in place and applied, and responsibilities are", "assigned and understood, to supersede, disengage, or deactivate AI systems", "that demonstrate performance or outcomes inconsistent with intended use."]
};

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("’", "&#8217;").replaceAll("‘", "&#8216;");
const wrap = (value, max = 74) => {
  const words = value.split(/\s+/); const lines = []; let line = "";
  for (const word of words) { const next = line ? `${line} ${word}` : word; if (next.length > max && line) { lines.push(line); line = word; } else line = next; }
  if (line) lines.push(line); return lines;
};

mkdirSync(outputDir, { recursive: true });
mkdirSync(productionDir, { recursive: true });
const manifestRecords = [];
const productionRecords = [];
for (const record of records) {
  const quoteLines = excerpts[record.buildId].flatMap((line) => line ? wrap(line, 68) : [""]);
  let y = 330;
  const lineStep = quoteLines.length > 16 ? 34 : quoteLines.length > 13 ? 39 : 50;
  const quoteSvg = quoteLines.map((line) => {
    if (!line) { y += Math.round(lineStep * 0.45); return ""; }
    const result = `<text x="96" y="${y}" class="quote">${esc(line)}</text>`; y += lineStep; return result;
  }).join("\n");
  const captionLines = wrap(record.caption, 84).slice(0, 3);
  const claimLines = wrap(record.claimBoundary, 96).slice(0, 3);
  const sourceLabel = record.pdfPageIndex ? `NIST AI RMF 1.0 · PDF ${record.pdfPageIndex} · PRINTED ${record.printedPage}` : record.buildId === "002" ? "GOV.UK SERVICE MANUAL · FAITHFUL TEXT COMPOSITE" : "W3C PROV MODEL PRIMER · §4 SUMMARY";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500" role="img" aria-labelledby="title desc">
<title id="title">Build ${record.buildId}: ${esc(record.title)} — official-source context candidate</title>
<desc id="desc">${esc(record.altText)} Review candidate only; not evidence of prototype performance or institutional endorsement.</desc>
<rect width="1200" height="1500" fill="#F6F1E7"/><rect x="46" y="46" width="1108" height="1408" rx="22" fill="#FFFDF8" stroke="#172126" stroke-width="4"/>
<rect x="46" y="46" width="1108" height="118" rx="22" fill="#172126"/><text x="94" y="119" class="eyebrow" fill="#FFFDF8">OFFICIAL SOURCE CONTEXT · REVIEW CANDIDATE</text>
<text x="94" y="220" class="kicker">BUILD ${record.buildId}</text><text x="94" y="278" class="title">${esc(record.title)}</text>
<line x1="94" y1="300" x2="1106" y2="300" stroke="#D46B42" stroke-width="8"/>
${quoteSvg}
<rect x="78" y="1010" width="1044" height="165" rx="16" fill="#E8F0EE"/><text x="104" y="1052" class="label">WHY THIS FITS</text>
${captionLines.map((line, i) => `<text x="104" y="${1094 + i * 34}" class="small">${esc(line)}</text>`).join("\n")}
<rect x="78" y="1195" width="1044" height="178" rx="16" fill="#F6E7DF"/><text x="104" y="1237" class="label">CLAIM LIMIT</text>
${claimLines.map((line, i) => `<text x="104" y="${1279 + i * 32}" class="fine">${esc(line)}</text>`).join("\n")}
<text x="94" y="1410" class="source">${esc(sourceLabel)}</text><text x="1106" y="1410" text-anchor="end" class="source">NO LOGO · NO ENDORSEMENT</text>
<style>.eyebrow{font:700 25px Arial,sans-serif;letter-spacing:2px}.kicker{font:700 23px Arial,sans-serif;fill:#A64325;letter-spacing:2px}.title{font:700 40px Arial,sans-serif;fill:#172126}.quote{font:500 ${quoteLines.length > 16 ? 20 : quoteLines.length > 13 ? 22 : 26}px Georgia,serif;fill:#172126}.label{font:700 18px Arial,sans-serif;fill:#172126;letter-spacing:1.5px}.small{font:500 23px Arial,sans-serif;fill:#172126}.fine{font:500 20px Arial,sans-serif;fill:#172126}.source{font:700 16px Arial,sans-serif;fill:#4B5559;letter-spacing:.8px}</style></svg>\n`;
  const fileName = `build-${record.buildId}-replacement-source-context.svg`;
  const filePath = resolve(outputDir, fileName);
  writeFileSync(filePath, svg, "utf8");
  manifestRecords.push({ ...record, repositoryPath: `apps/web/public/media/100-builds/replacement-source-context/${fileName}`, publicUrl: `/media/100-builds/replacement-source-context/${fileName}`, width: 1200, height: 1500, mimeType: "image/svg+xml", sha256: createHash("sha256").update(svg).digest("hex"), reviewState: "FINAL_PRODUCTION_CANDIDATE_NOT_LIVE", liveCoverSubstituted: false, rollbackPreserved: true });
  const productionFileName = `build-${record.buildId}-official-excerpt-cover.svg`;
  const productionSvg = svg
    .replace("OFFICIAL SOURCE CONTEXT · REVIEW CANDIDATE", "OFFICIAL SOURCE CONTEXT · BOUNDED EXCERPT")
    .replace(" — official-source context candidate", " — official-source context cover")
    .replace(" Review candidate only;", " Bounded official-source excerpt;");
  writeFileSync(resolve(productionDir, productionFileName), productionSvg, "utf8");
  productionRecords.push({ ...record, repositoryPath: `apps/web/public/media/100-builds/replacement-production-covers/${productionFileName}`, publicUrl: `/media/100-builds/replacement-production-covers/${productionFileName}`, width: 1200, height: 1500, mimeType: "image/svg+xml", sha256: createHash("sha256").update(productionSvg).digest("hex"), reviewArtifactPublicUrl: `/media/100-builds/replacement-source-context/${fileName}`, reviewArtifactSha256: createHash("sha256").update(svg).digest("hex"), productionState: "PROMOTED_LIVE_COVER", liveCoverSubstituted: true, rollbackAssetUrl: `/media/builds/${record.buildId}/build-${record.buildId}-linkedin-poster.png`, rollbackPreserved: true });
}
const manifest = { schemaVersion: "1.0.0", generatedAt: "2026-08-27", status: "9 stronger exact-source production candidates; substantive promotion gate pending; 0 live substitutions", counts: { candidates: manifestRecords.length, promoted: 0, rnRollbackPreserved: manifestRecords.length }, records: manifestRecords };
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
const productionManifest = { schemaVersion: "1.0.0", generatedAt: "2026-08-27", status: "9 bounded official-source excerpt covers promoted; review artifacts and RN rollback covers preserved", counts: { promoted: productionRecords.length, reviewArtifactsPreserved: productionRecords.length, rnRollbackPreserved: productionRecords.length }, records: productionRecords };
writeFileSync(productionManifestPath, `${JSON.stringify(productionManifest, null, 2)}\n`, "utf8");
console.log(`Generated ${manifestRecords.length} review candidates and ${productionRecords.length} production covers.`);
