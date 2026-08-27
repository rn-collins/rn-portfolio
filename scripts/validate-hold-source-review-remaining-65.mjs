#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const acquisitionDir = path.join(root, "docs/builds/visual-source-acquisition-001-100");
const packages = JSON.parse(fs.readFileSync(path.join(acquisitionDir, "packages.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(acquisitionDir, "HOLD-SOURCE-REVIEW-REMAINING-65.json"), "utf8"));
const excluded = new Set(["010","030","036","038","039","040","041","049","055","057","058"]);
const expected = packages.records
  .filter((record) => record.acquisitionDisposition === "HOLD" && !excluded.has(record.buildId))
  .map((record) => record.buildId)
  .sort();
const actual = review.records.map((record) => record.buildId).sort();
const fail = (message) => { throw new Error(`remaining-65 HOLD review: ${message}`); };

if (review.scope.total !== 65 || review.records.length !== 65) fail("expected exactly 65 records");
if (JSON.stringify(expected) !== JSON.stringify(actual)) fail("record IDs diverge from canonical HOLD ledger");
if (new Set(actual).size !== 65) fail("duplicate build IDs");
const allowed = new Set(["EXACT_CANDIDATE_FOUND_HOLD","RIGHTS_BLOCKED","CONTEXTUAL_MISMATCH","NO_EXACT_SOURCE"]);
for (const record of review.records) {
  if (!allowed.has(record.classification)) fail(`${record.buildId}: invalid classification`);
  if (record.rights.status !== "HOLD") fail(`${record.buildId}: rights must remain HOLD`);
  for (const key of ["externalSelected","externalStaged","liveCoverSubstituted","canvaGenerated","promotionAuthorized"]) {
    if (record.controls[key] !== false) fail(`${record.buildId}: ${key} must be false`);
  }
  if (record.fallback.decision !== "RETAIN_RN_ORIGINAL") fail(`${record.buildId}: RN fallback not retained`);
  if (!record.searchEvidence || record.searchEvidence.canonicalEvidenceSource !== "packages.json visualCandidateSearch.searched") fail(`${record.buildId}: missing canonical search evidence`);
  if (!Array.isArray(record.searchEvidence.attemptedOfficialRoutes) || record.searchEvidence.attemptedOfficialRoutes.length < 1) fail(`${record.buildId}: no attempted official route recorded`);
  if (record.searchEvidence.attemptedRouteCount !== record.searchEvidence.attemptedOfficialRoutes.length) fail(`${record.buildId}: attempted route count is stale`);
  for (const attempt of record.searchEvidence.attemptedOfficialRoutes) {
    if (!attempt.sourcePageUrl || !/^https:\/\//.test(attempt.sourcePageUrl)) fail(`${record.buildId}: attempted route lacks an HTTPS official source`);
    if (!attempt.query || !attempt.result || !attempt.searchBreadth) fail(`${record.buildId}: attempted route evidence is incomplete`);
  }
  const url = record.candidate.sourcePageUrl;
  if (url && !/^https:\/\//.test(url)) fail(`${record.buildId}: source URL must use https`);
  if (record.candidate.fetched === false && record.candidate.sha256 !== null) fail(`${record.buildId}: unfetched source must not claim a hash`);
  if (record.classification === "NO_EXACT_SOURCE" && record.candidate.exactAssetUrl !== null) fail(`${record.buildId}: no-exact-source record has exact asset URL`);
  if (record.classification === "RIGHTS_BLOCKED" && !record.candidate.exactAssetUrl) fail(`${record.buildId}: rights-blocked record lacks exact asset URL`);
}
const derived = review.records.reduce((acc, record) => {
  acc[record.classification] = (acc[record.classification] || 0) + 1;
  return acc;
}, {});
if (JSON.stringify(derived) !== JSON.stringify(review.counts)) fail("classification counts are stale");
console.log(`remaining-65 HOLD review valid: ${actual.length} records · ${JSON.stringify(derived)}`);
