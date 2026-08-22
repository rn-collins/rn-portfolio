export type RegulatoryDesignDimension = 'GOVERNANCE' | 'INSTITUTIONS' | 'LICENSING' | 'ENFORCEMENT' | 'RIGHTS' | 'DATA' | 'FINANCING' | 'IMPLEMENTATION';
export type SyntheticModelId = 'MODEL-ALPHA' | 'MODEL-BETA' | 'MODEL-GAMMA' | 'MODEL-DELTA' | 'MODEL-EPSILON';
export type RegulatoryDesignPresetId = 'MODEL-ALPHA-BASELINE' | 'MODEL-BETA-BASELINE' | 'ALPHA-WITH-BETA-LICENSING';
type DesignChoices = Readonly<Record<RegulatoryDesignDimension, string>>;
type SyntheticModel = { id: SyntheticModelId; label: string; sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL'; choices: DesignChoices; evidenceIds: readonly string[] };
export type RegulatoryDesignInput = {
  fixtureId: 'SYNTHETIC-REGULATORY-DESIGN-075';
  presetId: RegulatoryDesignPresetId;
  models: readonly SyntheticModel[];
  ontology: readonly RegulatoryDesignDimension[];
  inherited: { governancePatterns: 'cap:010'; policyLandscape: 'cap:058'; comparisonMethod: 'cap:059'; implementationTracker: 'cap:069' };
  admission: { syntheticOnly: true; sharedGoalIsIllustrative: true; realJurisdictionClaim: false; currentLawClaim: false; rankingClaim: false; superiorityClaim: false; legalAdvice: 'NONE' };
};
type ComparisonRow = { dimension: RegulatoryDesignDimension; focalChoice: string; comparisonChoices: readonly { modelId: SyntheticModelId; choice: string }[]; observedVariation: string };
export type RegulatoryDesignResult = {
  status: `${RegulatoryDesignPresetId} COMPARISON` | 'INVALID'; presetId: RegulatoryDesignPresetId | 'INVALID'; focalModel: SyntheticModel | null;
  displayedModels: readonly SyntheticModel[]; rows: readonly ComparisonRow[]; changedDimensions: readonly RegulatoryDesignDimension[];
  tradeoffs: readonly string[]; audit: readonly string[]; alerts: readonly string[]; nonClaims: readonly string[]; engineVersion: typeof REGULATORY_DESIGN_ENGINE_VERSION;
};

export const REGULATORY_DESIGN_ENGINE_VERSION = '075.1.0' as const;
export const REGULATORY_DESIGN_DIMENSIONS: readonly RegulatoryDesignDimension[] = Object.freeze(['GOVERNANCE', 'INSTITUTIONS', 'LICENSING', 'ENFORCEMENT', 'RIGHTS', 'DATA', 'FINANCING', 'IMPLEMENTATION']);
const choices = (values: readonly string[]): DesignChoices => Object.freeze(Object.fromEntries(REGULATORY_DESIGN_DIMENSIONS.map((dimension, index) => [dimension, values[index]])) as Record<RegulatoryDesignDimension, string>);
export const REGULATORY_DESIGN_MODELS: readonly SyntheticModel[] = Object.freeze([
  { id: 'MODEL-ALPHA', label: 'Model Alpha', sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL', choices: choices(['CENTRAL-RULES','SINGLE-AGENCY','OPEN-ENTRY','ADMINISTRATIVE-REVIEW','NOTICE-AND-APPEAL','PUBLIC-AGGREGATES','GENERAL-FUND','PHASED-ROLL-OUT']), evidenceIds: ['SYN-075-A-01','SYN-075-A-02'] },
  { id: 'MODEL-BETA', label: 'Model Beta', sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL', choices: choices(['CENTRAL-RULES','MULTI-AGENCY','LIMITED-PERMITS','RISK-TIERED-INSPECTION','NOTICE-HEARING-APPEAL','REGULATOR-HELD','FEE-FUNDED','PILOT-THEN-SCALE']), evidenceIds: ['SYN-075-B-01','SYN-075-B-02'] },
  { id: 'MODEL-GAMMA', label: 'Model Gamma', sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL', choices: choices(['LOCAL-DELEGATION','LOCAL-BOARDS','LOCAL-AUTHORIZATION','LOCAL-INSPECTION','LOCAL-REVIEW-PATH','FEDERATED-REPORTING','SHARED-FUNDING','STAGGERED-LOCAL-LAUNCH']), evidenceIds: ['SYN-075-C-01','SYN-075-C-02'] },
  { id: 'MODEL-DELTA', label: 'Model Delta', sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL', choices: choices(['CO-GOVERNANCE','INDEPENDENT-AUTHORITY','CONDITIONAL-PERMITS','INDEPENDENT-AUDIT','NOTICE-REVIEW-OMBUDS','PUBLIC-DASHBOARD','LEVY-AND-APPROPRIATION','MILESTONE-GATES']), evidenceIds: ['SYN-075-D-01','SYN-075-D-02'] },
  { id: 'MODEL-EPSILON', label: 'Model Epsilon', sharedGoal: 'SYNTHETIC-SHARED-POLICY-GOAL', choices: choices(['FRAMEWORK-PLUS-STANDARDS','ACCREDITED-DELEGATES','ACCREDITATION','AUDIT-AND-CORRECTIVE-PLAN','NOTICE-APPEAL-EXTERNAL-REVIEW','DISCLOSURE-STANDARD','MIXED-FUNDING','PARALLEL-WORKSTREAMS']), evidenceIds: ['SYN-075-E-01','SYN-075-E-02'] },
]);
const base = { fixtureId: 'SYNTHETIC-REGULATORY-DESIGN-075', models: REGULATORY_DESIGN_MODELS, ontology: REGULATORY_DESIGN_DIMENSIONS, inherited: { governancePatterns: 'cap:010', policyLandscape: 'cap:058', comparisonMethod: 'cap:059', implementationTracker: 'cap:069' }, admission: { syntheticOnly: true, sharedGoalIsIllustrative: true, realJurisdictionClaim: false, currentLawClaim: false, rankingClaim: false, superiorityClaim: false, legalAdvice: 'NONE' } } as const;
export const REGULATORY_DESIGN_PRESETS: Readonly<Record<RegulatoryDesignPresetId, RegulatoryDesignInput>> = Object.freeze({
  'MODEL-ALPHA-BASELINE': Object.freeze({ ...base, presetId: 'MODEL-ALPHA-BASELINE' }),
  'MODEL-BETA-BASELINE': Object.freeze({ ...base, presetId: 'MODEL-BETA-BASELINE' }),
  'ALPHA-WITH-BETA-LICENSING': Object.freeze({ ...base, presetId: 'ALPHA-WITH-BETA-LICENSING' }),
});
const invalid = (): RegulatoryDesignResult => ({ status: 'INVALID', presetId: 'INVALID', focalModel: null, displayedModels: [], rows: [], changedDimensions: [], tradeoffs: [], audit: [], alerts: ['INVALID OR UNADMITTED SYNTHETIC INPUT','NO COMPARISON PRODUCED'], nonClaims: ['NO REAL-LAW, LEGAL-ADVICE, COMPLIANCE, RANKING, SUPERIORITY, EFFECTIVENESS, RIGHTS-ADEQUACY, ENFORCEMENT-OUTCOME, EQUITY, SAFETY, ACCESS, OR OUTCOME CLAIM'], engineVersion: REGULATORY_DESIGN_ENGINE_VERSION });
function evaluate(candidate: unknown): RegulatoryDesignResult {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return invalid();
  const object = candidate as Record<string, unknown>; const preset = REGULATORY_DESIGN_PRESETS[object.presetId as RegulatoryDesignPresetId];
  if (!preset || JSON.stringify(object) !== JSON.stringify(preset)) return invalid();
  const focalId: SyntheticModelId = preset.presetId === 'MODEL-BETA-BASELINE' ? 'MODEL-BETA' : 'MODEL-ALPHA';
  const original = preset.models.find(model => model.id === focalId)!;
  const beta = preset.models.find(model => model.id === 'MODEL-BETA')!;
  const swapped = preset.presetId === 'ALPHA-WITH-BETA-LICENSING';
  const focalModel: SyntheticModel = swapped ? { ...original, choices: Object.freeze({ ...original.choices, LICENSING: beta.choices.LICENSING }) } : original;
  const rows = REGULATORY_DESIGN_DIMENSIONS.map(dimension => ({ dimension, focalChoice: focalModel.choices[dimension], comparisonChoices: preset.models.filter(model => model.id !== focalId).map(model => ({ modelId: model.id, choice: model.choices[dimension] })), observedVariation: `SYNTHETIC VARIATION: ${new Set(preset.models.map(model => model.choices[dimension])).size} DISTINCT DESIGN CHOICES` }));
  return { status: `${preset.presetId} COMPARISON`, presetId: preset.presetId, focalModel, displayedModels: preset.models, rows, changedDimensions: swapped ? ['LICENSING'] : [], tradeoffs: swapped ? ['LICENSING changed from OPEN-ENTRY to LIMITED-PERMITS','Permit scarcity and administrative selection work enter the synthetic machine','No effectiveness, compliance, access, equity, safety, rights, enforcement, or outcome effect is inferred'] : ['Different institutions allocate coordination work differently','Different data choices allocate transparency and administrative burden differently','These are exposed design tensions, not scored outcomes'], audit: ['VALIDATED EXACT FROZEN FIXTURE','CONFIRMED EXACTLY FIVE SYNTHETIC MODELS','COMPARED EIGHT ONTOLOGY DIMENSIONS','PRESERVED SOURCE ORDER; NO SCORE OR RANK','PRESERVED NON-CLAIM BOUNDARY'], alerts: ['SYNTHETIC REGULATORY DESIGN DEMONSTRATION ONLY','COMPARISONS EXPOSE TRADEOFFS; THEY DO NOT RANK MODELS'], nonClaims: ['NO REAL JURISDICTION OR CURRENT-LAW CLAIM','NO LEGAL ADVICE, COMPLIANCE OR RIGHTS-ADEQUACY DETERMINATION','NO SUPERIORITY, EFFECTIVENESS OR ENFORCEMENT-OUTCOME CLAIM','NO EQUITY, SAFETY, ACCESS OR OUTCOME CLAIM'], engineVersion: REGULATORY_DESIGN_ENGINE_VERSION };
}
export function compareRegulatoryDesigns(candidate: unknown): RegulatoryDesignResult { try { return evaluate(candidate); } catch { return invalid(); } }
