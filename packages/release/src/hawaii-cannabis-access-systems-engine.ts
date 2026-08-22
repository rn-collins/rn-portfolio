export type HawaiiAccessScenarioId =
  | 'ISLAND-NORTH-PROVIDER-GAP'
  | 'ISLAND-EAST-TRANSPORT-CONSTRAINT'
  | 'ISLAND-SOUTH-SUPPLY-DISCONTINUITY'
  | 'ISLAND-WEST-INFRASTRUCTURE-OUTAGE'
  | 'ISLAND-CENTRAL-COMMUNITY-REVIEW';

type DimensionId =
  | 'PATIENT-ACCESS'
  | 'PROVIDER-AVAILABILITY'
  | 'INTERISLAND-TRANSPORT'
  | 'SUPPLY-CONTINUITY'
  | 'POLICY-ADMINISTRATION'
  | 'COMMUNITY-CONTEXT'
  | 'INFRASTRUCTURE';
type SignalState = 'RECORDED' | 'UNKNOWN' | 'CONSTRAINED' | 'REVIEW-REQUIRED';
type Dimension = { id: DimensionId; state: SignalState; evidenceIds: readonly string[]; relationshipIds: readonly string[]; note: string };
type Evidence = { id: string; dimension: DimensionId | 'FIXTURE-PROVENANCE'; state: 'PRESENT'; source: string; observedAt: '2026-08-21'; note: string };
type Relationship = { id: string; from: DimensionId; to: DimensionId; state: 'OBSERVED' | 'BLOCKED' | 'REVIEW'; note: string };

export type HawaiiAccessInput = {
  fixtureId: 'SYNTHETIC-HAWAII-ACCESS-SYSTEMS-072';
  scenarioId: HawaiiAccessScenarioId;
  assessedAt: '2026-08-21';
  geography: { id: string; label: string; synthetic: true; realIslandRecord: false; statewideRepresentativeness: false };
  program: { id: 'SYNTHETIC-ARCHIPELAGO-PROGRAM-072'; fictional: true; legalAuthority: 'NONE' };
  dimensions: readonly Dimension[];
  evidence: readonly Evidence[];
  relationships: readonly Relationship[];
  inherited: { policySystem: 'cap:045'; geographicSystem: 'cap:046'; communityContextSystem: 'cap:047'; limits: readonly string[] };
};

type AuditEntry = { sequence: number; stage: DimensionId | 'RELATIONSHIPS' | 'ISLAND-DIFFERENCE' | 'UNKNOWNS'; event: string; outcome: 'RECORDED' | 'HELD' | 'BLOCKED'; claimScope: 'SYNTHETIC SYSTEM SIGNAL ONLY' };
export type HawaiiAccessResult = {
  status: 'PROVIDER GAP SIGNAL' | 'TRANSPORT CONSTRAINT SIGNAL' | 'SUPPLY DISCONTINUITY SIGNAL' | 'INFRASTRUCTURE OUTAGE SIGNAL' | 'COMMUNITY REVIEW SIGNAL' | 'INVALID';
  patientAccess: readonly string[];
  providerAvailability: readonly string[];
  interislandTransport: readonly string[];
  supplyContinuity: readonly string[];
  policyAdministration: readonly string[];
  communityContext: readonly string[];
  infrastructure: readonly string[];
  relationships: readonly string[];
  islandDifference: readonly string[];
  unknowns: readonly string[];
  alerts: readonly string[];
  nonClaims: readonly string[];
  audit: readonly AuditEntry[];
  engineVersion: string;
};

export const HAWAII_ACCESS_ENGINE_VERSION = '072.1.0';
const dimensionIds: readonly DimensionId[] = ['PATIENT-ACCESS', 'PROVIDER-AVAILABILITY', 'INTERISLAND-TRANSPORT', 'SUPPLY-CONTINUITY', 'POLICY-ADMINISTRATION', 'COMMUNITY-CONTEXT', 'INFRASTRUCTURE'];
const limits = [
  'FIVE FIXED SYNTHETIC GENERALIZED ISLAND SCENARIOS ONLY; NO REAL PERSON PROVIDER PRODUCT PROGRAM OR ISLAND RECORD',
  'EACH ISLAND SIGNAL REMAINS DISTINCT; A STATEWIDE POLICY RECORD DOES NOT ESTABLISH AN ISLAND-SPECIFIC REALITY',
  'COMMUNITY CONTEXT IS A REVIEW PLACEHOLDER AND DOES NOT CLAIM NATIVE HAWAIIAN AUTHORITY CONSENT ENDORSEMENT KNOWLEDGE OR REPRESENTATIVENESS',
  'NO CURRENT-LAW ELIGIBILITY ACCESS CLINICAL SAFETY DIAGNOSIS TREATMENT DOSAGE OR PRODUCT CLAIM'
] as const;
const inherited = { policySystem: 'cap:045', geographicSystem: 'cap:046', communityContextSystem: 'cap:047', limits } as const;
const ev = (id: string, dimension: Evidence['dimension'], note: string): Evidence => ({ id, dimension, state: 'PRESENT', source: `synthetic://072/${id.toLowerCase()}`, observedAt: '2026-08-21', note });
const rel = (id: string, from: DimensionId, to: DimensionId, state: Relationship['state'], note: string): Relationship => ({ id, from, to, state, note });
const provenance = ev('EVD-072-PROVENANCE', 'FIXTURE-PROVENANCE', 'SYNTHETIC FIXTURE PROVENANCE; NOT REAL-WORLD VERIFICATION');
const make = (scenarioId: HawaiiAccessScenarioId, label: string, states: Partial<Record<DimensionId, SignalState>>, evidence: readonly Evidence[], relationships: readonly Relationship[]): HawaiiAccessInput => ({
  fixtureId: 'SYNTHETIC-HAWAII-ACCESS-SYSTEMS-072', scenarioId, assessedAt: '2026-08-21',
  geography: { id: `SYNTHETIC-${scenarioId}`, label, synthetic: true, realIslandRecord: false, statewideRepresentativeness: false },
  program: { id: 'SYNTHETIC-ARCHIPELAGO-PROGRAM-072', fictional: true, legalAuthority: 'NONE' },
  dimensions: dimensionIds.map(id => ({ id, state: states[id] ?? 'UNKNOWN', evidenceIds: evidence.filter(x => x.dimension === id).map(x => x.id), relationshipIds: relationships.filter(x => x.from === id || x.to === id).map(x => x.id), note: `${id} SYNTHETIC SIGNAL; NOT A DETERMINATION` })),
  evidence: [...evidence, provenance], relationships, inherited
});

export const HAWAII_ACCESS_SCENARIOS: Readonly<Record<HawaiiAccessScenarioId, HawaiiAccessInput>> = {
  'ISLAND-NORTH-PROVIDER-GAP': make('ISLAND-NORTH-PROVIDER-GAP', 'Synthetic generalized island — North', { 'PATIENT-ACCESS': 'REVIEW-REQUIRED', 'PROVIDER-AVAILABILITY': 'CONSTRAINED', 'POLICY-ADMINISTRATION': 'RECORDED', 'COMMUNITY-CONTEXT': 'REVIEW-REQUIRED' }, [ev('EVD-072-NORTH-POLICY', 'POLICY-ADMINISTRATION', 'FICTIONAL STATEWIDE ADMINISTRATIVE RECORD'), ev('EVD-072-NORTH-PROVIDER', 'PROVIDER-AVAILABILITY', 'FICTIONAL CAPACITY SIGNAL; NO PROVIDER VERIFICATION')], [rel('REL-072-NORTH-1', 'PROVIDER-AVAILABILITY', 'PATIENT-ACCESS', 'BLOCKED', 'FICTIONAL PROVIDER CAPACITY GAP')]),
  'ISLAND-EAST-TRANSPORT-CONSTRAINT': make('ISLAND-EAST-TRANSPORT-CONSTRAINT', 'Synthetic generalized island — East', { 'PATIENT-ACCESS': 'CONSTRAINED', 'PROVIDER-AVAILABILITY': 'RECORDED', 'INTERISLAND-TRANSPORT': 'CONSTRAINED', 'POLICY-ADMINISTRATION': 'RECORDED', 'COMMUNITY-CONTEXT': 'REVIEW-REQUIRED' }, [ev('EVD-072-EAST-TRANSPORT', 'INTERISLAND-TRANSPORT', 'FICTIONAL SCHEDULE DISCONTINUITY'), ev('EVD-072-EAST-PROVIDER', 'PROVIDER-AVAILABILITY', 'FICTIONAL DIRECTORY SIGNAL')], [rel('REL-072-EAST-1', 'INTERISLAND-TRANSPORT', 'PATIENT-ACCESS', 'BLOCKED', 'FICTIONAL TRANSPORT PATH INTERRUPTED')]),
  'ISLAND-SOUTH-SUPPLY-DISCONTINUITY': make('ISLAND-SOUTH-SUPPLY-DISCONTINUITY', 'Synthetic generalized island — South', { 'PATIENT-ACCESS': 'REVIEW-REQUIRED', 'INTERISLAND-TRANSPORT': 'RECORDED', 'SUPPLY-CONTINUITY': 'CONSTRAINED', 'POLICY-ADMINISTRATION': 'RECORDED', 'COMMUNITY-CONTEXT': 'REVIEW-REQUIRED' }, [ev('EVD-072-SOUTH-SUPPLY', 'SUPPLY-CONTINUITY', 'FICTIONAL SUPPLY INTERRUPTION; NO PRODUCT CLAIM'), ev('EVD-072-SOUTH-TRANSPORT', 'INTERISLAND-TRANSPORT', 'FICTIONAL TRANSPORT SNAPSHOT')], [rel('REL-072-SOUTH-1', 'INTERISLAND-TRANSPORT', 'SUPPLY-CONTINUITY', 'BLOCKED', 'FICTIONAL ROUTE-TO-SUPPLY DEPENDENCY')]),
  'ISLAND-WEST-INFRASTRUCTURE-OUTAGE': make('ISLAND-WEST-INFRASTRUCTURE-OUTAGE', 'Synthetic generalized island — West', { 'PATIENT-ACCESS': 'CONSTRAINED', 'POLICY-ADMINISTRATION': 'REVIEW-REQUIRED', 'COMMUNITY-CONTEXT': 'REVIEW-REQUIRED', 'INFRASTRUCTURE': 'CONSTRAINED' }, [ev('EVD-072-WEST-INFRA', 'INFRASTRUCTURE', 'FICTIONAL CONNECTIVITY OUTAGE'), ev('EVD-072-WEST-ADMIN', 'POLICY-ADMINISTRATION', 'FICTIONAL ADMINISTRATIVE PROCESS SIGNAL')], [rel('REL-072-WEST-1', 'INFRASTRUCTURE', 'POLICY-ADMINISTRATION', 'BLOCKED', 'FICTIONAL DIGITAL PROCESS INTERRUPTION'), rel('REL-072-WEST-2', 'POLICY-ADMINISTRATION', 'PATIENT-ACCESS', 'REVIEW', 'ACCESS IMPACT UNRESOLVED')]),
  'ISLAND-CENTRAL-COMMUNITY-REVIEW': make('ISLAND-CENTRAL-COMMUNITY-REVIEW', 'Synthetic generalized island — Central', { 'PATIENT-ACCESS': 'REVIEW-REQUIRED', 'PROVIDER-AVAILABILITY': 'RECORDED', 'INTERISLAND-TRANSPORT': 'RECORDED', 'SUPPLY-CONTINUITY': 'RECORDED', 'POLICY-ADMINISTRATION': 'RECORDED', 'COMMUNITY-CONTEXT': 'REVIEW-REQUIRED', 'INFRASTRUCTURE': 'RECORDED' }, [ev('EVD-072-CENTRAL-CONTEXT', 'COMMUNITY-CONTEXT', 'FICTIONAL REVIEW PLACEHOLDER; NO CULTURAL AUTHORITY OR CONSENT CLAIM'), ev('EVD-072-CENTRAL-SYSTEM', 'INFRASTRUCTURE', 'FICTIONAL SYSTEM SNAPSHOT')], [rel('REL-072-CENTRAL-1', 'COMMUNITY-CONTEXT', 'PATIENT-ACCESS', 'REVIEW', 'LOCAL REVIEW REMAINS OPEN; NO REPRESENTATIVENESS CLAIM')])
};

const invalid = (): HawaiiAccessResult => ({ status: 'INVALID', patientAccess: [], providerAvailability: [], interislandTransport: [], supplyContinuity: [], policyAdministration: [], communityContext: [], infrastructure: [], relationships: [], islandDifference: [], unknowns: [], alerts: ['INVALID SYNTHETIC INPUT'], nonClaims: ['NO REAL-WORLD ACCESS LEGAL CULTURAL OR CLINICAL CONCLUSION'], audit: [], engineVersion: HAWAII_ACCESS_ENGINE_VERSION });
const exact = (actual: unknown, expected: unknown): boolean => { if (expected === null || typeof expected !== 'object') return actual === expected; if (!actual || typeof actual !== 'object') return false; if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length && expected.every((v, i) => exact(actual[i], v)); if (Array.isArray(actual)) return false; const a = actual as Record<string, unknown>, e = expected as Record<string, unknown>, keys = Object.keys(e); return Object.keys(a).length === keys.length && keys.every(k => Object.prototype.hasOwnProperty.call(a, k) && exact(a[k], e[k])); };
function evaluate(candidate: unknown): HawaiiAccessResult {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return invalid();
  const object = candidate as Record<string, unknown>;
  if (typeof object.scenarioId !== 'string' || !Object.prototype.hasOwnProperty.call(HAWAII_ACCESS_SCENARIOS, object.scenarioId)) return invalid();
  const input = HAWAII_ACCESS_SCENARIOS[object.scenarioId as HawaiiAccessScenarioId];
  if (!exact(object, input)) return invalid();
  const statuses: Record<HawaiiAccessScenarioId, HawaiiAccessResult['status']> = { 'ISLAND-NORTH-PROVIDER-GAP': 'PROVIDER GAP SIGNAL', 'ISLAND-EAST-TRANSPORT-CONSTRAINT': 'TRANSPORT CONSTRAINT SIGNAL', 'ISLAND-SOUTH-SUPPLY-DISCONTINUITY': 'SUPPLY DISCONTINUITY SIGNAL', 'ISLAND-WEST-INFRASTRUCTURE-OUTAGE': 'INFRASTRUCTURE OUTAGE SIGNAL', 'ISLAND-CENTRAL-COMMUNITY-REVIEW': 'COMMUNITY REVIEW SIGNAL' };
  const by = (id: DimensionId) => { const d = input.dimensions.find(x => x.id === id)!; return [`${id} · ${d.state} · EVIDENCE ${d.evidenceIds.length} · RELATIONSHIPS ${d.relationshipIds.length}`]; };
  const audit: AuditEntry[] = input.dimensions.map((d, i) => ({ sequence: i + 1, stage: d.id, event: `ASSESS ${d.id}`, outcome: d.state === 'CONSTRAINED' ? 'BLOCKED' : d.state === 'UNKNOWN' || d.state === 'REVIEW-REQUIRED' ? 'HELD' : 'RECORDED', claimScope: 'SYNTHETIC SYSTEM SIGNAL ONLY' }));
  audit.push({ sequence: 8, stage: 'RELATIONSHIPS', event: `RECORD ${input.relationships.length} SYNTHETIC RELATIONSHIPS`, outcome: input.relationships.some(x => x.state === 'BLOCKED') ? 'BLOCKED' : 'HELD', claimScope: 'SYNTHETIC SYSTEM SIGNAL ONLY' }, { sequence: 9, stage: 'ISLAND-DIFFERENCE', event: 'PRESERVE ISLAND-SPECIFIC DIFFERENCE', outcome: 'HELD', claimScope: 'SYNTHETIC SYSTEM SIGNAL ONLY' }, { sequence: 10, stage: 'UNKNOWNS', event: 'PRESERVE ALL REAL-WORLD UNKNOWNS', outcome: 'HELD', claimScope: 'SYNTHETIC SYSTEM SIGNAL ONLY' });
  return { status: statuses[input.scenarioId], patientAccess: by('PATIENT-ACCESS'), providerAvailability: by('PROVIDER-AVAILABILITY'), interislandTransport: by('INTERISLAND-TRANSPORT'), supplyContinuity: by('SUPPLY-CONTINUITY'), policyAdministration: by('POLICY-ADMINISTRATION'), communityContext: by('COMMUNITY-CONTEXT'), infrastructure: by('INFRASTRUCTURE'), relationships: input.relationships.map(x => `${x.id} · ${x.from} → ${x.to} · ${x.state} · ${x.note}`), islandDifference: [`${input.geography.label} · SYNTHETIC · NOT REPRESENTATIVE`, 'ONE STATEWIDE POLICY CAN PRODUCE DIFFERENT OPERATIONAL SIGNALS BY ISLAND; THIS FIXTURE DOES NOT DESCRIBE REAL CONDITIONS'], unknowns: ['ANY CURRENT HAWAIʻI LAW POLICY PROGRAM RULE ELIGIBILITY OR ACCESS CONDITION', 'ANY REAL ISLAND PROVIDER TRANSPORT SUPPLY INFRASTRUCTURE PATIENT OR COMMUNITY CONDITION', 'ANY NATIVE HAWAIIAN OR LOCAL COMMUNITY AUTHORITY CONSENT ENDORSEMENT KNOWLEDGE OR REPRESENTATIVENESS', 'ANY CLINICAL SAFETY EFFECTIVENESS OUTCOME OR PRODUCT SUITABILITY'], alerts: [`${statuses[input.scenarioId]} · SYNTHETIC GENERALIZED ISLAND ONLY · FAIL CLOSED`], nonClaims: ['NO REAL PATIENT PERSON PROVIDER PRODUCT INVENTORY PROGRAM OR ISLAND DATA', 'NO LEGAL ADVICE CURRENT-LAW COMPLIANCE ELIGIBILITY OR ACCESS DETERMINATION', 'NO MEDICAL ADVICE DIAGNOSIS TREATMENT DOSAGE PRODUCT SAFETY OR EFFECTIVENESS CLAIM', 'NO NATIVE HAWAIIAN CULTURAL AUTHORITY COMMUNITY CONSENT ENDORSEMENT OR REPRESENTATIVENESS CLAIM'], audit, engineVersion: HAWAII_ACCESS_ENGINE_VERSION };
}
export function buildHawaiiCannabisAccessSystemsMap(candidate: unknown): HawaiiAccessResult { try { return evaluate(candidate); } catch { return invalid(); } }
