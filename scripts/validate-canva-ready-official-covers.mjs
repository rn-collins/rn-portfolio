#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const atRoot = path => resolve(root, path);

const ledgerPath = "docs/builds/visual-source-acquisition-001-100/packages.json";
const manifestPath = "docs/builds/visual-source-acquisition-001-100/CANVA-READY-OFFICIAL-COVERS.json";
const ledger = JSON.parse(readFileSync(atRoot(ledgerPath), "utf8"));
const manifest = JSON.parse(readFileSync(atRoot(manifestPath), "utf8"));
const fail = message => { throw new Error("[canva-ready-official-covers] " + message); };
const sha256 = value => createHash("sha256").update(value).digest("hex");
const requireText = (value, label) => {
  if (typeof value !== "string" || !value.trim()) fail(label + " must be non-empty text");
  if (/[<>][^]*script/i.test(value) || /javascript:/i.test(value)) fail(label + " contains unsafe executable text");
};
const live = ledger.records.filter(record => record.liveCoverSubstituted === true)
  .sort((a, b) => a.buildId.localeCompare(b.buildId));
if (live.length !== 26) fail("ledger must expose exactly 26 live official/source-context covers");
if (manifest.schemaVersion !== "1.0.0" || manifest.sourceLedgerPath !== ledgerPath) fail("manifest provenance mismatch");
if (manifest.expected?.records !== 26 || manifest.records?.length !== 26) fail("manifest count mismatch");
const ids = manifest.records.map(record => record.buildId);
if (new Set(ids).size !== 26 || ids.join(",") !== live.map(record => record.buildId).join(",")) fail("manifest build IDs do not exactly match live ledger");
for (const [index, record] of manifest.records.entries()) {
  const source = live[index];
  const expectedSourcePath = source.liveCover.repositoryPath || ("apps/web/public" + source.liveCover.assetUrl);
  const expectedRollback = source.rollbackCover?.assetUrl || source.liveCover.rollbackAssetUrl || source.cover.assetUrl;
  const expectedExportPath = `apps/web/public/media/100-builds/canva-ready-official-covers/build-${record.buildId}-canva-ready.svg`;
  const expectedExportUrl = `/media/100-builds/canva-ready-official-covers/build-${record.buildId}-canva-ready.svg`;
  const sidecarPath = `docs/builds/visual-source-acquisition-001-100/canva-ready-official-covers/build-${record.buildId}.json`;
  if (record.sourceAssetPath !== expectedSourcePath || record.sourceAssetUrl !== source.liveCover.assetUrl) fail(record.buildId + " source linkage mismatch");
  if (record.exportPath !== expectedExportPath || record.exportUrl !== expectedExportUrl) fail(record.buildId + " export path mismatch");
  if (record.width !== 1200 || record.height !== 1500 || !record.liveStatePreserved) fail(record.buildId + " export profile mismatch");
  if (record.sourceSha256 !== source.liveCover.sha256 || record.exportSha256 !== source.liveCover.sha256) fail(record.buildId + " declared hash mismatch");
  if (record.rollbackAssetUrl !== expectedRollback) fail(record.buildId + " rollback mismatch");
  for (const key of ["altText","caption","credit","sourceUrl","claimBoundary","noEndorsement"]) {
    requireText(record[key], record.buildId + "." + key);
    if (record[key] !== source.liveCover[key]) fail(record.buildId + "." + key + " drifted from live ledger");
  }
  if (!/^https:\/\//.test(record.sourceUrl)) fail(record.buildId + " sourceUrl must be HTTPS");
  const sourceBytes = readFileSync(atRoot(record.sourceAssetPath));
  const exportBytes = readFileSync(atRoot(record.exportPath));
  if (sha256(sourceBytes) !== record.sourceSha256 || sha256(exportBytes) !== record.exportSha256) fail(record.buildId + " byte hash mismatch");
  if (!sourceBytes.equals(exportBytes)) fail(record.buildId + " export must be byte-identical to approved live source cover");
  const svg = exportBytes.toString("utf8");
  if (!/<svg\b[^>]*\bwidth=["']1200["'][^>]*\bheight=["']1500["'][^>]*\bviewBox=["']0 0 1200 1500["']/i.test(svg)) fail(record.buildId + " SVG geometry mismatch");
  if (!/<title\b/i.test(svg) || !/<desc\b/i.test(svg)) fail(record.buildId + " SVG requires accessible title and description");
  if (/<script\b|<foreignObject\b|\bon\w+\s*=|javascript:|\b(?:href|src)\s*=\s*["\']https?:\/\//i.test(svg)) fail(record.buildId + " SVG contains executable or network-active content");
  if (statSync(atRoot(record.exportPath)).size === 0) fail(record.buildId + " empty export");
  const sidecar = JSON.parse(readFileSync(atRoot(sidecarPath), "utf8"));
  if (JSON.stringify(sidecar) !== JSON.stringify(record)) fail(record.buildId + " sidecar drift");
}
console.log(`Validated ${manifest.records.length} Canva-ready official/source-context covers (1200x1500, byte-identical, metadata-complete, inert).`);
