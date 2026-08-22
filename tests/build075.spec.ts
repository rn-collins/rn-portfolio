import { test, expect } from '@playwright/test';
import { compareRegulatoryDesigns, REGULATORY_DESIGN_DIMENSIONS, REGULATORY_DESIGN_MODELS, REGULATORY_DESIGN_PRESETS } from '../packages/release/src/regulatory-design-comparison-engine';

test('075 compares exactly five synthetic models across eight categorical dimensions without ranking', () => {
  expect(REGULATORY_DESIGN_MODELS).toHaveLength(5); expect(REGULATORY_DESIGN_DIMENSIONS).toHaveLength(8);
  const result = compareRegulatoryDesigns(REGULATORY_DESIGN_PRESETS['MODEL-ALPHA-BASELINE']);
  expect(result.displayedModels.map(model => model.id)).toEqual(['MODEL-ALPHA','MODEL-BETA','MODEL-GAMMA','MODEL-DELTA','MODEL-EPSILON']);
  expect(result.rows.map(row => row.dimension)).toEqual(['GOVERNANCE','INSTITUTIONS','LICENSING','ENFORCEMENT','RIGHTS','DATA','FINANCING','IMPLEMENTATION']);
  expect(JSON.stringify(result)).not.toMatch(/weighted|score|winner|best model/i);
  expect(result.alerts).toContain('COMPARISONS EXPOSE TRADEOFFS; THEY DO NOT RANK MODELS');
});

test('075 licensing swap is deterministic, inspectable, and limited to one dimension', () => {
  const before = compareRegulatoryDesigns(REGULATORY_DESIGN_PRESETS['MODEL-ALPHA-BASELINE']);
  const after = compareRegulatoryDesigns(REGULATORY_DESIGN_PRESETS['ALPHA-WITH-BETA-LICENSING']);
  expect(before.focalModel?.choices.LICENSING).toBe('OPEN-ENTRY'); expect(after.focalModel?.choices.LICENSING).toBe('LIMITED-PERMITS');
  expect(after.changedDimensions).toEqual(['LICENSING']);
  for (const dimension of REGULATORY_DESIGN_DIMENSIONS.filter(x => x !== 'LICENSING')) expect(after.focalModel?.choices[dimension]).toBe(before.focalModel?.choices[dimension]);
  expect(after.tradeoffs).toContain('No effectiveness, compliance, access, equity, safety, rights, enforcement, or outcome effect is inferred');
});

test('075 fails closed on malformed, hostile, real, authority-bearing, and drifted inputs', () => {
  const fixture = REGULATORY_DESIGN_PRESETS['MODEL-ALPHA-BASELINE']; const hostile = { ...fixture }; Object.defineProperty(hostile, 'models', { get() { throw new Error('hostile'); } });
  const values = [null, undefined, [], {}, 'law', { ...fixture, fixtureId: 'REAL' }, { ...fixture, presetId: 'OTHER' }, { ...fixture, extra: true }, { ...fixture, admission: { ...fixture.admission, rankingClaim: true } }, { ...fixture, admission: { ...fixture.admission, currentLawClaim: true } }, { ...fixture, inherited: { ...fixture.inherited, policyLandscape: 'cap:999' } }, { ...fixture, models: [...fixture.models, fixture.models[0]] }, hostile, new Proxy(fixture, { get() { throw new Error('proxy'); } })];
  for (const value of values) { expect(() => compareRegulatoryDesigns(value)).not.toThrow(); expect(compareRegulatoryDesigns(value).status).toBe('INVALID'); }
});

test('075-A exports exact admission, artifacts, and lineage', async ({ page }) => {
  await page.goto('/100-builds/075/a'); await page.getByLabel('DESIGN BASELINE').selectOption('MODEL-BETA-BASELINE');
  await expect(page.getByRole('heading', { name: 'MODEL-BETA-BASELINE COMPARISON' })).toBeVisible();
  const event = page.waitForEvent('download'); await page.getByRole('button', { name: 'EXPORT COMPARISON WORKSPACE' }).click(); const download = await event;
  expect(download.suggestedFilename()).toBe('synthetic-regulatory-design-comparison.json');
  const parsed = JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8'));
  expect(parsed.version).toBe('075.1.0'); expect(parsed.canonical).toEqual({ uses: ['010','058','059','069'], creates: 'cap:075' });
  expect(parsed.artifacts).toEqual(['Regulatory Design Ontology','Comparison Workspace']);
  expect(parsed.admission).toEqual({ syntheticModelsOnly: true, exactModelCount: 5, sharedGoalIsIllustrative: true, containsRealJurisdictionData: false, currentLawClaim: false, legalAdvice: 'NONE', complianceDetermined: false, modelRanked: false, superiorityDetermined: false, effectivenessDetermined: false, rightsAdequacyDetermined: false, enforcementOutcomeDetermined: false, equityDetermined: false, safetyDetermined: false, accessDetermined: false, outcomesDetermined: false, scoresModels: false, failClosed: true });
});

test('075 exposes boundaries, works at 320px, and B narrates the licensing swap', async ({ page }) => {
  await page.goto('/100-builds/075/a'); await expect(page.getByText('synthetic', { exact: false }).first()).toBeVisible(); await expect(page.getByText('not current law', { exact: false }).first()).toBeVisible();
  await page.setViewportSize({ width: 320, height: 760 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await page.goto('/100-builds/075/b'); await page.getByRole('button', { name: 'SWAP LICENSING MACHINE' }).click(); await expect(page.getByRole('status')).toContainText('Licensing changed from OPEN-ENTRY to LIMITED-PERMITS');
});
