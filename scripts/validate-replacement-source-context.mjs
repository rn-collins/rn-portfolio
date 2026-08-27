import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const manifest = JSON.parse(readFileSync(resolve(root, "docs/builds/visual-source-acquisition-001-100/REPLACEMENT-SOURCE-CONTEXT.json"), "utf8"));
const production = JSON.parse(readFileSync(resolve(root, "docs/builds/visual-source-acquisition-001-100/REPLACEMENT-PRODUCTION-COVERS.json"), "utf8"));
const expected = ["002", "007", "008", "013", "017", "025", "028", "029", "032"];
assert.deepEqual(manifest.records.map((record) => record.buildId), expected);
assert.equal(manifest.counts.candidates, 9);
assert.equal(manifest.counts.promoted, 0);
for (const record of manifest.records) {
  const bytes = readFileSync(resolve(root, record.repositoryPath));
  const svg = bytes.toString("utf8");
  assert.equal(createHash("sha256").update(bytes).digest("hex"), record.sha256, `${record.buildId}: checksum`);
  assert.match(svg, /^<svg[^>]+width="1200" height="1500"/);
  assert.match(svg, /role="img" aria-labelledby="title desc"/);
  assert.match(svg, /<title id="title">.+<\/title>/s);
  assert.match(svg, /<desc id="desc">.+<\/desc>/s);
  assert.match(svg, /CLAIM LIMIT/);
  assert.match(svg, /NO LOGO · NO ENDORSEMENT/);
  assert.doesNotMatch(svg, /<script|<foreignObject|href=|xlink:href=/i);
  assert.equal(record.liveCoverSubstituted, false);
  assert.equal(record.rollbackPreserved, true);
}
assert.deepEqual(production.records.map((record) => record.buildId), expected);
assert.equal(production.counts.promoted, 9);
for (const record of production.records) {
  const bytes = readFileSync(resolve(root, record.repositoryPath));
  const svg = bytes.toString("utf8");
  assert.equal(createHash("sha256").update(bytes).digest("hex"), record.sha256, `${record.buildId}: production checksum`);
  assert.match(svg, /OFFICIAL SOURCE CONTEXT · BOUNDED EXCERPT/);
  assert.doesNotMatch(svg, /REVIEW CANDIDATE/);
  assert.match(svg, /role="img" aria-labelledby="title desc"/);
  assert.match(svg, /CLAIM LIMIT/);
  assert.doesNotMatch(svg, /<script|<foreignObject|href=|xlink:href=/i);
  assert.equal(record.liveCoverSubstituted, true);
  assert.equal(record.rollbackPreserved, true);
  assert.ok(record.reviewArtifactPublicUrl && record.reviewArtifactSha256 && record.rollbackAssetUrl);
}
console.log("Replacement source-context valid: 9 review SVGs plus 9 promoted production SVGs; exact hashes; review artifacts and RN rollbacks preserved.");
