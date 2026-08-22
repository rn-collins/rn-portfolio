import { test, expect } from '@playwright/test';
import { buildComparativeImplementationIndex, IMPLEMENTATION_INDEX_PRESETS, IMPLEMENTATION_JURISDICTIONS } from '../packages/release/src/comparative-implementation-index-engine';

test('074 compares exactly five deterministic synthetic jurisdictions and visibly reorders them', () => {
  expect(IMPLEMENTATION_JURISDICTIONS).toHaveLength(5);
  const enactment = buildComparativeImplementationIndex(IMPLEMENTATION_INDEX_PRESETS['ENACTMENT-LED']);
  const implementation = buildComparativeImplementationIndex(IMPLEMENTATION_INDEX_PRESETS['IMPLEMENTATION-LED']);
  expect(enactment.orderedJurisdictions.map(x => x.id)).toEqual(['JURISDICTION-ALPHA', 'JURISDICTION-BETA', 'JURISDICTION-GAMMA', 'JURISDICTION-DELTA', 'JURISDICTION-EPSILON']);
  expect(implementation.orderedJurisdictions.map(x => x.id)).toEqual(['JURISDICTION-GAMMA', 'JURISDICTION-BETA', 'JURISDICTION-DELTA', 'JURISDICTION-EPSILON', 'JURISDICTION-ALPHA']);
});

test('074 exposes every score, weight, rule, calculation, and non-claim', () => {
  const result = buildComparativeImplementationIndex(IMPLEMENTATION_INDEX_PRESETS['IMPLEMENTATION-LED']);
  expect(Object.keys(result.weights)).toHaveLength(7);
  expect(Object.values(result.weights).reduce((sum, value) => sum + value, 0)).toBe(100);
  expect(result.evidenceScoringRules).toHaveLength(6);
  expect(result.orderedJurisdictions.every(x => x.calculation.length === 7 && x.evidenceIds.length > 0)).toBeTruthy();
  expect(result.alerts).toContain('ORDER IS NOT A REAL RANKING OR READINESS DETERMINATION');
  expect(result.nonClaims).toContain('NO LEGAL OR MEDICAL ADVICE');
});

test('074 fails closed on hostile, real, authority-bearing, and drifted input', () => {
  const fixture = IMPLEMENTATION_INDEX_PRESETS['ENACTMENT-LED'];
  const hostile = { ...fixture }; Object.defineProperty(hostile, 'jurisdictions', { get() { throw new Error('hostile'); } });
  const values = [null, undefined, [], {}, 'ready', { ...fixture, fixtureId: 'REAL' }, { ...fixture, presetId: 'OTHER' }, { ...fixture, extra: true }, { ...fixture, admission: { ...fixture.admission, rankingClaim: true } }, { ...fixture, admission: { ...fixture.admission, currentLawClaim: true } }, { ...fixture, inherited: { ...fixture.inherited, evidenceRegistry: 'cap:999' } }, { ...fixture, jurisdictions: [...fixture.jurisdictions, fixture.jurisdictions[0]] }, hostile, new Proxy(fixture, { get() { throw new Error('proxy'); } })];
  for (const value of values) { expect(() => buildComparativeImplementationIndex(value)).not.toThrow(); expect(buildComparativeImplementationIndex(value).status).toBe('INVALID'); }
});

test('074-A exports exact admission, artifacts, and lineage', async ({ page }) => {
  await page.goto('/100-builds/074/a');
  await page.getByLabel('COMPARISON LENS').selectOption('IMPLEMENTATION-LED');
  await expect(page.getByRole('heading', { name: 'IMPLEMENTATION-LED DEMO ORDER' })).toBeVisible();
  const event = page.waitForEvent('download'); await page.getByRole('button', { name: 'EXPORT COMPARATIVE INDEX' }).click();
  const download = await event; expect(download.suggestedFilename()).toBe('synthetic-comparative-implementation-index.json');
  const parsed = JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8'));
  expect(parsed.version).toBe('074.1.0');
  expect(parsed.canonical).toEqual({ uses: ['047', '063', '069'], creates: 'cap:074' });
  expect(parsed.artifacts).toEqual(['Comparative Implementation Index', 'Evidence Scoring Rules']);
  expect(parsed.admission).toEqual({ syntheticJurisdictionsOnly: true, exactJurisdictionCount: 5, containsRealJurisdictionData: false, currentLawClaim: false, legalAuthorizationDetermined: false, implementationMaturityDetermined: false, operationalAvailabilityDetermined: false, affordabilityDetermined: false, workforceReadinessDetermined: false, equityCertified: false, safetyDetermined: false, outcomesDetermined: false, realJurisdictionRanked: false, decisionClaim: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', transparentWeights: true, transparentScoringRules: true, failClosed: true });
});

test('074 exposes boundaries, works at 320px, and B shifts the order', async ({ page }) => {
  await page.goto('/100-builds/074/a');
  await expect(page.getByText('synthetic', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('not a real ranking', { exact: false }).first()).toBeVisible();
  await page.setViewportSize({ width: 320, height: 760 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await page.goto('/100-builds/074/b');
  await page.getByRole('button', { name: 'SHIFT TO IMPLEMENTATION' }).click();
  await expect(page.getByRole('status')).toContainText('Jurisdiction Gamma');
});
