import { test, expect } from '@playwright/test';
import { buildPsychedelicAccessEquityIndex, PSYCHEDELIC_EQUITY_SCENARIOS } from '../packages/release/src/psychedelic-access-equity-index-engine';

test('073 produces five deterministic synthetic access-gap outcomes', () => {
  const expected = { 'COST-BARRIER': 'COST ACCESS GAP SIGNAL', 'GEOGRAPHIC-DISTANCE': 'GEOGRAPHIC ACCESS GAP SIGNAL', 'LANGUAGE-ACCESS': 'LANGUAGE ACCESS GAP SIGNAL', 'DISABILITY-ACCOMMODATION': 'DISABILITY ACCESS GAP SIGNAL', 'WORKFORCE-LEGAL-RISK': 'WORKFORCE AND LEGAL RISK GAP SIGNAL' } as const;
  expect(Object.keys(PSYCHEDELIC_EQUITY_SCENARIOS)).toHaveLength(5);
  for (const [id, status] of Object.entries(expected)) expect(buildPsychedelicAccessEquityIndex(PSYCHEDELIC_EQUITY_SCENARIOS[id as keyof typeof expected]).status).toBe(status);
});

test('073 preserves eight indicators, non-aggregating methodology, and audit order', () => {
  const result = buildPsychedelicAccessEquityIndex(PSYCHEDELIC_EQUITY_SCENARIOS['DISABILITY-ACCOMMODATION']);
  expect(result.audit.map(x => x.stage)).toEqual(['COST', 'GEOGRAPHY', 'ELIGIBILITY', 'CULTURE', 'DISABILITY', 'LANGUAGE', 'WORKFORCE', 'LEGAL-RISK', 'INDICATOR-SET', 'METHODOLOGY', 'UNKNOWNS']);
  expect(result.indicatorSet).toHaveLength(8);
  expect(result.disability[0]).toContain('CONSTRAINED');
  expect(result.indexMethodology).toContain('NO AGGREGATION · NO WEIGHTING · NO RANKING · NO CERTIFICATION');
  expect(result.nonClaims).toContain('NO PROTECTED-TRAIT INFERENCE OR INDIVIDUAL CLASSIFICATION');
});

test('073 fails closed on hostile, real, authority-bearing, and drifted input', () => {
  const fixture = PSYCHEDELIC_EQUITY_SCENARIOS['COST-BARRIER'];
  const hostile = { ...fixture }; Object.defineProperty(hostile, 'evidence', { get() { throw new Error('hostile'); } });
  const values = [null, undefined, [], {}, 'equity', { ...fixture, fixtureId: 'REAL' }, { ...fixture, scenarioId: 'OTHER' }, { ...fixture, extra: true }, { ...fixture, context: { ...fixture.context, realPersonRecord: true } }, { ...fixture, context: { ...fixture.context, realJurisdictionRecord: true } }, { ...fixture, program: { ...fixture.program, legalAuthority: 'REAL' } }, { ...fixture, methodology: { ...fixture.methodology, ranking: 'ENABLED' } }, { ...fixture, inherited: { ...fixture.inherited, evidenceRegistry: 'cap:999' } }, hostile, new Proxy(fixture, { get() { throw new Error('proxy'); } })];
  for (const value of values) { expect(() => buildPsychedelicAccessEquityIndex(value)).not.toThrow(); expect(buildPsychedelicAccessEquityIndex(value).status).toBe('INVALID'); }
});

test('073-A exports exact admission and lineage', async ({ page }) => {
  await page.goto('/100-builds/073/a');
  await page.getByLabel('EQUITY SCENARIO').selectOption('LANGUAGE-ACCESS');
  await expect(page.getByRole('heading', { name: 'LANGUAGE ACCESS GAP SIGNAL' })).toBeVisible();
  const event = page.waitForEvent('download'); await page.getByRole('button', { name: 'EXPORT EQUITY INDEX' }).click();
  const download = await event; expect(download.suggestedFilename()).toBe('synthetic-psychedelic-access-equity-index.json');
  const parsed = JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8'));
  expect(parsed.version).toBe('073.1.0');
  expect(parsed.canonical).toEqual({ uses: ['030', '045', '047', '063'], creates: 'cap:073' });
  expect(parsed.artifacts).toEqual(['Equity Indicator Set', 'Index Methodology']);
  expect(parsed.admission).toEqual({ syntheticGeneralizedContexts: true, exactScenarioCount: 5, containsRealPersonData: false, containsRealPatientData: false, containsRealProviderData: false, containsRealJurisdictionData: false, protectedTraitInference: false, currentLawClaim: false, eligibilityDetermined: false, accessDetermined: false, equityCertified: false, jurisdictionRanked: false, clinicalDetermination: false, safetyDetermined: false, culturalAuthorityClaim: false, communityConsentClaim: false, representativenessClaim: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', failClosed: true });
});

test('073 exposes boundaries and B redraws access without real-world claims', async ({ page }) => {
  await page.goto('/100-builds/073/a');
  await expect(page.getByText('synthetic', { exact: false })).toBeVisible();
  await expect(page.getByText('not legal advice', { exact: false })).toBeVisible();
  await expect(page.getByText('not medical advice', { exact: false })).toBeVisible();
  await page.setViewportSize({ width: 320, height: 760 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await page.goto('/100-builds/073/b');
  await page.getByRole('button', { name: 'REDRAW ACCESS MAP' }).click();
  await expect(page.getByRole('status')).toContainText(/COST|GEOGRAPHIC|LANGUAGE|DISABILITY|WORKFORCE/);
});
