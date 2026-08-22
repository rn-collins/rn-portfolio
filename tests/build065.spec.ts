import { test, expect } from '@playwright/test';
import {
  buildPsychedelicCareContinuityRecord,
  CARE_CONTINUITY_SCENARIOS,
} from '../packages/release/src/psychedelic-care-continuity-engine';

const current = CARE_CONTINUITY_SCENARIOS['CONTINUITY-CURRENT'];

test('065 keeps continuity failures distinct', () => {
  expect(buildPsychedelicCareContinuityRecord(current)).toMatchObject({ status: 'CONTINUITY CURRENT', engineVersion: '065.1.0' });
  expect(buildPsychedelicCareContinuityRecord(CARE_CONTINUITY_SCENARIOS['HANDOFF-UNACCEPTED']).status).toBe('HANDOFF REVIEW');
  expect(buildPsychedelicCareContinuityRecord(CARE_CONTINUITY_SCENARIOS['PERMISSION-WITHDRAWN']).status).toBe('PERMISSION HOLD');
  expect(buildPsychedelicCareContinuityRecord(CARE_CONTINUITY_SCENARIOS['FOLLOWUP-OVERDUE']).status).toBe('FOLLOWUP ESCALATION');
  expect(buildPsychedelicCareContinuityRecord(CARE_CONTINUITY_SCENARIOS['CRISIS-OUTSIDE-SCOPE']).status).toBe('EMERGENCY ROUTE REQUIRED');
});

test('065 fails closed hostile and drift', () => {
  const throwing = { ...current, record: { ...current.record } };
  Object.defineProperty(throwing.record, 'toJSON', { value() { throw new Error('must not run'); } });
  const values = [
    null, undefined, [], {}, 'care',
    { ...current, fixtureId: 'REAL' },
    { ...current, scenarioId: 'OTHER' },
    { ...current, extra: true },
    { ...current, record: { ...current.record, participantId: 'REAL-PERSON' } },
    { ...current, record: { ...current.record, careBoundary: { ...current.record.careBoundary, state: 'ACCEPTED', acceptedAt: null } } },
    { ...current, inherited: { ...current.inherited, handoffContract: 'cap:016' } },
    { ...current, inherited: { ...current.inherited, consentRightsContract: 'cap:020' } },
    { ...current, inherited: { ...current.inherited, changeEngine: '029.1.0' } },
    { ...current, inherited: { ...current.inherited, portabilityEngine: '035.1.0' } },
    { ...current, inherited: { ...current.inherited, resilienceEngine: '036.1.0' } },
    { ...current, assessedAt: NaN },
    { ...current, assessedAt: 1n },
    throwing,
    new Proxy(current, { get() { throw new Error('proxy'); } }),
  ];
  for (const value of values) expect(() => buildPsychedelicCareContinuityRecord(value)).not.toThrow();
  for (const value of values) expect(buildPsychedelicCareContinuityRecord(value).status).toBe('INVALID');
});

test('065-A blocks withdrawn permission and exports lineage', async ({ page }) => {
  await page.goto('/100-builds/065/a');
  await page.getByLabel('CONTINUITY STATE').selectOption('PERMISSION-WITHDRAWN');
  await expect(page.getByRole('heading', { name: 'PERMISSION HOLD' })).toBeVisible();
  await expect(page.getByText('VALIDITY NOT ASSESSED', { exact: false })).toBeVisible();
  const event = page.waitForEvent('download');
  await page.getByRole('button', { name: 'EXPORT CONTINUITY RECORD' }).click();
  const download = await event;
  expect(download.suggestedFilename()).toBe('synthetic-psychedelic-care-continuity-record.json');
  const parsed = JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string, 'utf8'));
  expect(parsed.version).toBe('065.1.0');
  expect(parsed.canonical.uses).toEqual(['017', '023', '029', '035', '036']);
  expect(parsed.canonical.creates).toBe('cap:065');
  expect(parsed.privacy).toMatchObject({ containsRealPeople: false, containsHealthData: false, persistence: 'NONE' });
  expect(parsed.exportDisposition).toBe('HOLD — PERMISSION REVIEW');
});

test('065-A presents emergency limitation without implying monitoring', async ({ page }) => {
  await page.goto('/100-builds/065/a');
  await page.getByLabel('CONTINUITY STATE').selectOption('CRISIS-OUTSIDE-SCOPE');
  await expect(page.getByRole('heading', { name: 'EMERGENCY ROUTE REQUIRED' })).toBeVisible();
  await expect(page.getByText('DO NOT RELY ON THIS FIXTURE FOR URGENT OR EMERGENCY HELP')).toBeVisible();
  await expect(page.getByText('CONTACT LOCAL EMERGENCY SERVICES OR AN APPROPRIATE CRISIS SERVICE NOW')).toBeVisible();
  await expect(page.getByText('MONITORING · NOT PROVIDED', { exact: false })).toBeVisible();
});

test('065 reflows and B advances past the session boundary', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/100-builds/065/a');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await page.goto('/100-builds/065/b');
  await page.getByRole('button', { name: 'ADVANCE CARE CLOCK' }).click();
  await expect(page.getByRole('status')).toContainText('HANDOFF-UNACCEPTED');
});
