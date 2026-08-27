import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const path = new URL("../docs/builds/visual-source-acquisition-001-100/REJECTED-CANDIDATE-REPLACEMENT-AUDIT.json", import.meta.url);
const audit = JSON.parse(readFileSync(path, "utf8"));
const expected = ["002", "007", "008", "009", "011", "013", "017", "020", "021", "025", "028", "029", "032"];
const passing = new Set(["002", "007", "008", "013", "017", "025", "028", "029", "032"]);

assert.deepEqual(audit.records.map((record) => record.buildId), expected, "audit must contain the exact 13 rejected builds in order");
assert.equal(audit.counts.audited, audit.records.length);
assert.equal(audit.counts.strongerExactExcerptFound, passing.size);
assert.equal(audit.counts.noMateriallyBetterExcerpt, expected.length - passing.size);
assert.equal(audit.counts.livePromotionsAuthorizedByThisAudit, 0);
assert.equal(audit.sourceIntegrity.nistAiRmf.sha256, "7576edb531d9848825814ee88e28b1795d3a84b435b4b797d3670eafdc4a89f1");
assert.equal(audit.sourceIntegrity.govUkUserNeeds.sha256, "96bd362e5c203cb0ba31a168e94e95ff562fa75b7cd0549285525865b6578513");
assert.equal(audit.sourceIntegrity.w3cProvPrimer.sha256, "4db54135a6f06bbee1983e079c6d9bd3d54e5b45eb6ed0f5686e922c665b8c4a");

for (const record of audit.records) {
  assert.equal(passing.has(record.buildId), record.decision === "STRONGER_EXACT_EXCERPT_FOUND_NOT_LIVE", `${record.buildId}: decision mismatch`);
  if (!passing.has(record.buildId)) {
    assert.ok(record.reason?.length > 60, `${record.buildId}: rejected route requires a substantive reason`);
    continue;
  }
  for (const key of ["sourceUrl", "cropBoundary", "caption", "altText", "attribution", "claimBoundary"]) {
    assert.ok(record[key]?.length > 30, `${record.buildId}: missing ${key}`);
  }
  assert.ok(record.pdfPageIndex || record.selector, `${record.buildId}: missing exact PDF page or HTML selector`);
}

console.log("Rejected-candidate replacement audit valid: 13 audited, 9 stronger excerpt routes, 4 RN-live, 0 promotions authorized.");
