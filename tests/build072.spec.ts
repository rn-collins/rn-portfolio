import { test, expect } from '@playwright/test';
import { buildHawaiiCannabisAccessSystemsMap, HAWAII_ACCESS_SCENARIOS } from '../packages/release/src/hawaii-cannabis-access-systems-engine';

test('072 produces five deterministic synthetic island outcomes', () => {
  const expected = { 'ISLAND-NORTH-PROVIDER-GAP': 'PROVIDER GAP SIGNAL', 'ISLAND-EAST-TRANSPORT-CONSTRAINT': 'TRANSPORT CONSTRAINT SIGNAL', 'ISLAND-SOUTH-SUPPLY-DISCONTINUITY': 'SUPPLY DISCONTINUITY SIGNAL', 'ISLAND-WEST-INFRASTRUCTURE-OUTAGE': 'INFRASTRUCTURE OUTAGE SIGNAL', 'ISLAND-CENTRAL-COMMUNITY-REVIEW': 'COMMUNITY REVIEW SIGNAL' } as const;
  expect(Object.keys(HAWAII_ACCESS_SCENARIOS)).toHaveLength(5);
  for (const [id, status] of Object.entries(expected)) expect(buildHawaiiCannabisAccessSystemsMap(HAWAII_ACCESS_SCENARIOS[id as keyof typeof expected]).status).toBe(status);
});

test('072 preserves dimensions, relationships, island difference, and audit order', () => {
  const result = buildHawaiiCannabisAccessSystemsMap(HAWAII_ACCESS_SCENARIOS['ISLAND-WEST-INFRASTRUCTURE-OUTAGE']);
  expect(result.audit.map(x => x.stage)).toEqual(['PATIENT-ACCESS', 'PROVIDER-AVAILABILITY', 'INTERISLAND-TRANSPORT', 'SUPPLY-CONTINUITY', 'POLICY-ADMINISTRATION', 'COMMUNITY-CONTEXT', 'INFRASTRUCTURE', 'RELATIONSHIPS', 'ISLAND-DIFFERENCE', 'UNKNOWNS']);
  expect(result.infrastructure[0]).toContain('CONSTRAINED');
  expect(result.relationships).toHaveLength(2);
  expect(result.islandDifference[1]).toContain('DOES NOT DESCRIBE REAL CONDITIONS');
  expect(result.nonClaims).toContain('NO NATIVE HAWAIIAN CULTURAL AUTHORITY COMMUNITY CONSENT ENDORSEMENT OR REPRESENTATIVENESS CLAIM');
});

test('072 fails closed on hostile, real, and drifted input', () => {
  const fixture = HAWAII_ACCESS_SCENARIOS['ISLAND-NORTH-PROVIDER-GAP'];
  const hostile = { ...fixture }; Object.defineProperty(hostile, 'evidence', { get() { throw new Error('hostile'); } });
  for (const value of [null, undefined, [], {}, 'island', { ...fixture, fixtureId: 'REAL' }, { ...fixture, scenarioId: 'OTHER' }, { ...fixture, extra: true }, { ...fixture, geography: { ...fixture.geography, realIslandRecord: true } }, { ...fixture, program: { ...fixture.program, legalAuthority: 'REAL' } }, { ...fixture, inherited: { ...fixture.inherited, policySystem: 'cap:999' } }, hostile, new Proxy(fixture, { get() { throw new Error('proxy'); } })]) {
    expect(() => buildHawaiiCannabisAccessSystemsMap(value)).not.toThrow();
    expect(buildHawaiiCannabisAccessSystemsMap(value).status).toBe('INVALID');
  }
});

test('072-A exports exact admission and lineage', async ({ page }) => {
  await page.goto('/100-builds/072/a');
  await page.getByLabel('ISLAND SIGNAL').selectOption('ISLAND-SOUTH-SUPPLY-DISCONTINUITY');
  await expect(page.getByRole('heading', { name: 'SUPPLY DISCONTINUITY SIGNAL' })).toBeVisible();
  const event = page.waitForEvent('download'); await page.getByRole('button', { name: 'EXPORT ISLAND MAP' }).click();
  const download = await event; expect(download.suggestedFilename()).toBe('synthetic-hawaii-cannabis-access-map.json');
  const parsed = JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8'));
  expect(parsed.version).toBe('072.1.0');
  expect(parsed.canonical).toEqual({ uses: ['045', '046', '047'], creates: 'cap:072' });
  expect(parsed.artifacts).toEqual(['Hawaiʻi Access Graph', 'Island Comparison View']);
  expect(parsed.admission).toEqual({ syntheticGeneralizedIslands: true, exactScenarioCount: 5, containsRealPatientData: false, containsRealProviderData: false, containsRealProductData: false, containsRealIslandRecords: false, currentLawClaim: false, eligibilityDetermined: false, accessDetermined: false, clinicalDetermination: false, safetyDetermined: false, culturalAuthorityClaim: false, communityConsentClaim: false, representativenessClaim: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', failClosed: true });
});

test('072 exposes boundaries and B reveals island difference without real-world claims', async ({ page }) => {
  await page.goto('/100-builds/072/a');
  await expect(page.getByText('synthetic', { exact: false })).toBeVisible();
  await expect(page.getByText('not legal advice', { exact: false })).toBeVisible();
  await expect(page.getByText('not medical advice', { exact: false })).toBeVisible();
  await page.setViewportSize({ width: 320, height: 760 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await page.goto('/100-builds/072/b');
  await page.getByRole('button', { name: 'REVEAL NEXT ISLAND' }).click();
  await expect(page.getByRole('status')).toContainText(/PROVIDER|TRANSPORT|SUPPLY|INFRASTRUCTURE|COMMUNITY/);
});
