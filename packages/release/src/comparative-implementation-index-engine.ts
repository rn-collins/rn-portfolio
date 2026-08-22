export type ImplementationDimension =
  | 'LEGAL-AUTHORIZATION'
  | 'OPERATIONAL-AVAILABILITY'
  | 'AFFORDABILITY'
  | 'WORKFORCE'
  | 'EQUITY'
  | 'SAFETY'
  | 'OUTCOMES';

export type SyntheticJurisdictionId =
  | 'JURISDICTION-ALPHA'
  | 'JURISDICTION-BETA'
  | 'JURISDICTION-GAMMA'
  | 'JURISDICTION-DELTA'
  | 'JURISDICTION-EPSILON';

export type ComparisonLens = 'ENACTMENT-LED' | 'IMPLEMENTATION-LED' | 'READINESS-BALANCED';
type Score = 0 | 1 | 2 | 3 | 4;
type Jurisdiction = { id: SyntheticJurisdictionId; label: string; scores: Readonly<Record<ImplementationDimension, Score>>; evidenceIds: readonly string[] };
export type ImplementationIndexInput = {
  fixtureId: 'SYNTHETIC-COMPARATIVE-IMPLEMENTATION-074';
  presetId: ComparisonLens;
  jurisdictions: readonly Jurisdiction[];
  evidenceRules: readonly string[];
  inherited: { accessModel: 'cap:047'; evidenceRegistry: 'cap:063'; implementationTracker: 'cap:069' };
  admission: { syntheticOnly: true; rankingClaim: false; decisionClaim: false; currentLawClaim: false };
};
type OrderedJurisdiction = Jurisdiction & { weightedDemoScore: number; position: number; calculation: readonly string[] };
export type ImplementationIndexResult = {
  status: 'ENACTMENT-LED DEMO ORDER' | 'IMPLEMENTATION-LED DEMO ORDER' | 'BALANCED DEMO ORDER' | 'INVALID';
  lens: ComparisonLens | 'INVALID'; weights: Readonly<Record<ImplementationDimension, number>> | Record<string, never>;
  orderedJurisdictions: readonly OrderedJurisdiction[]; evidenceScoringRules: readonly string[]; audit: readonly string[];
  alerts: readonly string[]; nonClaims: readonly string[]; engineVersion: typeof IMPLEMENTATION_INDEX_ENGINE_VERSION;
};

export const IMPLEMENTATION_INDEX_ENGINE_VERSION = '074.1.0' as const;
export const IMPLEMENTATION_DIMENSIONS: readonly ImplementationDimension[] = ['LEGAL-AUTHORIZATION', 'OPERATIONAL-AVAILABILITY', 'AFFORDABILITY', 'WORKFORCE', 'EQUITY', 'SAFETY', 'OUTCOMES'];
const rules = [
  '0 = NO SYNTHETIC EVIDENCE RECORDED',
  '1 = EARLY SYNTHETIC SIGNAL',
  '2 = PARTIAL SYNTHETIC IMPLEMENTATION SIGNAL',
  '3 = SUBSTANTIAL SYNTHETIC IMPLEMENTATION SIGNAL',
  '4 = COMPLETE SYNTHETIC FIXTURE SIGNAL',
  'MISSING OR UNRECOGNIZED EVIDENCE FAILS CLOSED; NO IMPUTATION',
] as const;
const scores = (values: readonly Score[]): Readonly<Record<ImplementationDimension, Score>> => Object.freeze(Object.fromEntries(IMPLEMENTATION_DIMENSIONS.map((dimension, index) => [dimension, values[index]])) as Record<ImplementationDimension, Score>);
export const IMPLEMENTATION_JURISDICTIONS: readonly Jurisdiction[] = Object.freeze([
  { id: 'JURISDICTION-ALPHA', label: 'Jurisdiction Alpha', scores: scores([4, 1, 1, 1, 1, 2, 0]), evidenceIds: ['SYN-ALPHA-01', 'SYN-ALPHA-02'] },
  { id: 'JURISDICTION-BETA', label: 'Jurisdiction Beta', scores: scores([3, 4, 3, 4, 3, 3, 3]), evidenceIds: ['SYN-BETA-01', 'SYN-BETA-02'] },
  { id: 'JURISDICTION-GAMMA', label: 'Jurisdiction Gamma', scores: scores([2, 3, 4, 3, 4, 4, 4]), evidenceIds: ['SYN-GAMMA-01', 'SYN-GAMMA-02'] },
  { id: 'JURISDICTION-DELTA', label: 'Jurisdiction Delta', scores: scores([1, 2, 2, 2, 2, 3, 2]), evidenceIds: ['SYN-DELTA-01', 'SYN-DELTA-02'] },
  { id: 'JURISDICTION-EPSILON', label: 'Jurisdiction Epsilon', scores: scores([0, 1, 3, 1, 3, 2, 1]), evidenceIds: ['SYN-EPSILON-01', 'SYN-EPSILON-02'] },
]);
const base = { fixtureId: 'SYNTHETIC-COMPARATIVE-IMPLEMENTATION-074', jurisdictions: IMPLEMENTATION_JURISDICTIONS, evidenceRules: rules, inherited: { accessModel: 'cap:047', evidenceRegistry: 'cap:063', implementationTracker: 'cap:069' }, admission: { syntheticOnly: true, rankingClaim: false, decisionClaim: false, currentLawClaim: false } } as const;
export const IMPLEMENTATION_INDEX_PRESETS: Readonly<Record<ComparisonLens, ImplementationIndexInput>> = Object.freeze({
  'ENACTMENT-LED': Object.freeze({ ...base, presetId: 'ENACTMENT-LED' }),
  'IMPLEMENTATION-LED': Object.freeze({ ...base, presetId: 'IMPLEMENTATION-LED' }),
  'READINESS-BALANCED': Object.freeze({ ...base, presetId: 'READINESS-BALANCED' }),
});
const weights: Readonly<Record<ComparisonLens, Readonly<Record<ImplementationDimension, number>>>> = Object.freeze({
  'ENACTMENT-LED': Object.freeze({ 'LEGAL-AUTHORIZATION': 70, 'OPERATIONAL-AVAILABILITY': 5, AFFORDABILITY: 5, WORKFORCE: 5, EQUITY: 5, SAFETY: 5, OUTCOMES: 5 }),
  'IMPLEMENTATION-LED': Object.freeze({ 'LEGAL-AUTHORIZATION': 10, 'OPERATIONAL-AVAILABILITY': 20, AFFORDABILITY: 15, WORKFORCE: 15, EQUITY: 15, SAFETY: 10, OUTCOMES: 15 }),
  'READINESS-BALANCED': Object.freeze({ 'LEGAL-AUTHORIZATION': 15, 'OPERATIONAL-AVAILABILITY': 15, AFFORDABILITY: 14, WORKFORCE: 14, EQUITY: 14, SAFETY: 14, OUTCOMES: 14 }),
});
const invalid = (): ImplementationIndexResult => ({ status: 'INVALID', lens: 'INVALID', weights: {}, orderedJurisdictions: [], evidenceScoringRules: [], audit: [], alerts: ['INVALID OR UNADMITTED SYNTHETIC INPUT', 'NO ORDER OR SCORE PRODUCED'], nonClaims: ['NO REAL JURISDICTION, CURRENT-LAW, IMPLEMENTATION, ACCESS, EQUITY, SAFETY, OUTCOME, LEGAL, MEDICAL, OR DECISION CLAIM'], engineVersion: IMPLEMENTATION_INDEX_ENGINE_VERSION });
function evaluate(candidate: unknown): ImplementationIndexResult {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return invalid();
  const object = candidate as Record<string, unknown>; const preset = IMPLEMENTATION_INDEX_PRESETS[object.presetId as ComparisonLens];
  if (!preset || JSON.stringify(object) !== JSON.stringify(preset)) return invalid();
  const selectedWeights = weights[preset.presetId];
  const orderedJurisdictions = preset.jurisdictions.map(jurisdiction => {
    const calculation = IMPLEMENTATION_DIMENSIONS.map(dimension => `${dimension}: ${jurisdiction.scores[dimension]} × ${selectedWeights[dimension]}`);
    const weightedDemoScore = IMPLEMENTATION_DIMENSIONS.reduce((sum, dimension) => sum + jurisdiction.scores[dimension] * selectedWeights[dimension], 0) / 4;
    return { ...jurisdiction, weightedDemoScore, position: 0, calculation };
  }).sort((a, b) => b.weightedDemoScore - a.weightedDemoScore || a.id.localeCompare(b.id)).map((item, index) => ({ ...item, position: index + 1 }));
  const statuses = { 'ENACTMENT-LED': 'ENACTMENT-LED DEMO ORDER', 'IMPLEMENTATION-LED': 'IMPLEMENTATION-LED DEMO ORDER', 'READINESS-BALANCED': 'BALANCED DEMO ORDER' } as const;
  return { status: statuses[preset.presetId], lens: preset.presetId, weights: selectedWeights, orderedJurisdictions, evidenceScoringRules: preset.evidenceRules, audit: ['VALIDATED EXACT SYNTHETIC FIXTURE', 'APPLIED EXPOSED WEIGHTS', 'CALCULATED FIVE SYNTHETIC DEMO SCORES', 'APPLIED DETERMINISTIC ID TIEBREAK', 'PRESERVED NON-CLAIM BOUNDARY'], alerts: ['SYNTHETIC DESCRIPTIVE DEMONSTRATION ONLY', 'ORDER IS NOT A REAL RANKING OR READINESS DETERMINATION'], nonClaims: ['NO REAL JURISDICTION OR CURRENT-LAW CLAIM', 'NO REAL IMPLEMENTATION, ACCESS, AFFORDABILITY, WORKFORCE, EQUITY, SAFETY, OR OUTCOME CLAIM', 'NO LEGAL OR MEDICAL ADVICE', 'NO FUNDING, POLICY, CLINICAL, OR OPERATIONAL DECISION SUPPORT'], engineVersion: IMPLEMENTATION_INDEX_ENGINE_VERSION };
}
export function buildComparativeImplementationIndex(candidate: unknown): ImplementationIndexResult { try { return evaluate(candidate); } catch { return invalid(); } }
