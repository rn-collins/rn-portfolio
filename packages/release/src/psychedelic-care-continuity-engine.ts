export type ScenarioId =
  | 'CONTINUITY-CURRENT'
  | 'HANDOFF-UNACCEPTED'
  | 'PERMISSION-WITHDRAWN'
  | 'FOLLOWUP-OVERDUE'
  | 'CRISIS-OUTSIDE-SCOPE';

type CareRecord = {
  episodeId: 'SYNTHETIC-EPISODE-065';
  participantId: 'SYNTHETIC-PARTICIPANT-065';
  stage: 'POST-SESSION';
  sessionOccurredAt: '2026-08-18';
  continuityCheckedAt: '2026-08-21';
  careBoundary: {
    handoffId: 'HANDOFF-065-01';
    subject: 'POST-SESSION CONTINUITY SUMMARY';
    sendingRole: 'SYNTHETIC-SESSION-TEAM';
    receivingRole: 'SYNTHETIC-FOLLOWUP-TEAM';
    retainedResponsibility: 'SENDER RETAINS RESPONSIBILITY UNTIL ACCEPTANCE';
    evidencePackage: readonly ['SUMMARY-065-01', 'PERMISSION-065-01', 'FOLLOWUP-065-01'];
    permissionBasis: 'PERMISSION-065-01';
    acceptanceTest: 'RECEIVER ACKNOWLEDGES SUBJECT OWNER DUE DATE AND EXCEPTION ROUTE';
    deadline: '2026-08-20';
    incidentDuty: 'USE DECLARED EMERGENCY ROUTE; THIS FIXTURE DOES NOT MONITOR OR RESPOND';
    recordLocator: 'synthetic://065/handoff-01';
    recoursePath: 'SYNTHETIC-CONTINUITY-SUPERVISOR';
    state: 'ACCEPTED' | 'UNACCEPTED';
    acceptedAt: '2026-08-19' | null;
  };
  permission: {
    permissionId: 'PERMISSION-065-01';
    purpose: 'SHARE SYNTHETIC CONTINUITY SUMMARY FOR DECLARED FOLLOWUP';
    dataClasses: readonly ['SYNTHETIC SESSION SUMMARY', 'SYNTHETIC FOLLOWUP PLAN'];
    recipient: 'SYNTHETIC-FOLLOWUP-TEAM';
    grantedAt: '2026-08-18';
    state: 'CURRENT' | 'WITHDRAWN';
    withdrawnAt: '2026-08-21' | null;
    downstreamReview: 'NONE' | 'OPEN';
    retention: 'FIXTURE SESSION ONLY; NO PERSISTENCE';
    validity: 'NOT ASSESSED';
  };
  followup: {
    followupId: 'FOLLOWUP-065-01';
    kind: 'SYNTHETIC CHECK-IN';
    owner: 'SYNTHETIC-FOLLOWUP-ROLE';
    dueAt: '2026-08-20';
    state: 'COMPLETED' | 'OVERDUE';
    completedAt: '2026-08-20' | null;
    completionEvidence: 'synthetic://065/followup-01' | null;
    escalationOwner: 'SYNTHETIC-CONTINUITY-SUPERVISOR';
  };
  safetyBoundary: {
    signal: 'NONE' | 'SYNTHETIC-CRISIS-SIGNAL';
    monitoring: 'NOT PROVIDED';
    emergencyResponse: 'NOT PROVIDED';
    route: 'CONTACT LOCAL EMERGENCY SERVICES OR AN APPROPRIATE CRISIS SERVICE NOW';
    platformInstruction: 'DO NOT RELY ON THIS FIXTURE FOR URGENT OR EMERGENCY HELP';
  };
  change: {
    changeId: 'CHANGE-065-01';
    changedObject: 'NONE' | 'PERMISSION-065-01';
    state: 'NONE' | 'OPEN';
    affected: readonly [] | readonly ['HANDOFF-065-01', 'FOLLOWUP-065-01'];
  };
  portability: {
    packageId: 'PACKAGE-065-01';
    schemaVersion: 'care-continuity-065-v1';
    format: 'JSON';
    replay: 'FIXED SYNTHETIC FIXTURE ONLY';
    rightsState: 'DECLARED FIXTURE STATE ONLY';
  };
  resilience: {
    mode: 'CLIENT-LOCAL FIXTURE';
    persistentStore: false;
    networkRequiredAfterLoad: false;
    queue: 'NONE';
    realOfflineExecution: 'NOT PROVEN';
  };
};

export type CareContinuityInput = {
  fixtureId: 'SYNTHETIC-PSYCHEDELIC-CARE-065';
  scenarioId: ScenarioId;
  assessedAt: '2026-08-21';
  record: CareRecord;
  inherited: {
    handoffContract: 'cap:017';
    consentRightsContract: 'cap:023';
    changeEngine: '029.2.0';
    portabilityEngine: '035.2.0';
    resilienceEngine: '036.2.0';
    limits: readonly [
      'A MAPPED HANDOFF IS NOT LEGAL COMPLIANCE PROFESSIONAL APPROVAL AUTHORIZATION OR COMPLETE RESPONSIBILITY',
      'A PERMISSION STATE IS NOT CONSENT VALIDITY IDENTITY AUTHORIZATION LAWFUL BASIS OR COMPLETE RIGHTS DETERMINATION',
      'REGISTERED IMPACT IS NOT CAUSATION MATERIALITY DUTY NOTICE OR COMPLETENESS',
      'STRUCTURAL REPLAY IS NOT SEMANTIC EQUIVALENCE INTEROPERABILITY LEGAL PORTABILITY OR SUCCESSFUL MIGRATION',
      'MODELED RESILIENCE IS NOT PROOF OF OFFLINE EXECUTION RELIABILITY RECOVERY RECONCILIATION OR NO DATA LOSS'
    ];
  };
};

export type CareContinuityResult = {
  status:
    | 'CONTINUITY CURRENT'
    | 'HANDOFF REVIEW'
    | 'PERMISSION HOLD'
    | 'FOLLOWUP ESCALATION'
    | 'EMERGENCY ROUTE REQUIRED'
    | 'INVALID';
  episode: readonly string[];
  boundaries: readonly string[];
  handoffs: readonly string[];
  permissions: readonly string[];
  followups: readonly string[];
  accountability: readonly string[];
  safety: readonly string[];
  changes: readonly string[];
  portability: readonly string[];
  resilience: readonly string[];
  provenance: readonly string[];
  unknowns: readonly string[];
  nonClaims: readonly string[];
  engineVersion: string;
};

export const CARE_CONTINUITY_ENGINE_VERSION = '065.1.0';

const inherited = {
  handoffContract: 'cap:017' as const,
  consentRightsContract: 'cap:023' as const,
  changeEngine: '029.2.0' as const,
  portabilityEngine: '035.2.0' as const,
  resilienceEngine: '036.2.0' as const,
  limits: [
    'A MAPPED HANDOFF IS NOT LEGAL COMPLIANCE PROFESSIONAL APPROVAL AUTHORIZATION OR COMPLETE RESPONSIBILITY',
    'A PERMISSION STATE IS NOT CONSENT VALIDITY IDENTITY AUTHORIZATION LAWFUL BASIS OR COMPLETE RIGHTS DETERMINATION',
    'REGISTERED IMPACT IS NOT CAUSATION MATERIALITY DUTY NOTICE OR COMPLETENESS',
    'STRUCTURAL REPLAY IS NOT SEMANTIC EQUIVALENCE INTEROPERABILITY LEGAL PORTABILITY OR SUCCESSFUL MIGRATION',
    'MODELED RESILIENCE IS NOT PROOF OF OFFLINE EXECUTION RELIABILITY RECOVERY RECONCILIATION OR NO DATA LOSS',
  ] as const,
};

const base: CareRecord = {
  episodeId: 'SYNTHETIC-EPISODE-065',
  participantId: 'SYNTHETIC-PARTICIPANT-065',
  stage: 'POST-SESSION',
  sessionOccurredAt: '2026-08-18',
  continuityCheckedAt: '2026-08-21',
  careBoundary: {
    handoffId: 'HANDOFF-065-01',
    subject: 'POST-SESSION CONTINUITY SUMMARY',
    sendingRole: 'SYNTHETIC-SESSION-TEAM',
    receivingRole: 'SYNTHETIC-FOLLOWUP-TEAM',
    retainedResponsibility: 'SENDER RETAINS RESPONSIBILITY UNTIL ACCEPTANCE',
    evidencePackage: ['SUMMARY-065-01', 'PERMISSION-065-01', 'FOLLOWUP-065-01'],
    permissionBasis: 'PERMISSION-065-01',
    acceptanceTest: 'RECEIVER ACKNOWLEDGES SUBJECT OWNER DUE DATE AND EXCEPTION ROUTE',
    deadline: '2026-08-20',
    incidentDuty: 'USE DECLARED EMERGENCY ROUTE; THIS FIXTURE DOES NOT MONITOR OR RESPOND',
    recordLocator: 'synthetic://065/handoff-01',
    recoursePath: 'SYNTHETIC-CONTINUITY-SUPERVISOR',
    state: 'ACCEPTED',
    acceptedAt: '2026-08-19',
  },
  permission: {
    permissionId: 'PERMISSION-065-01',
    purpose: 'SHARE SYNTHETIC CONTINUITY SUMMARY FOR DECLARED FOLLOWUP',
    dataClasses: ['SYNTHETIC SESSION SUMMARY', 'SYNTHETIC FOLLOWUP PLAN'],
    recipient: 'SYNTHETIC-FOLLOWUP-TEAM',
    grantedAt: '2026-08-18',
    state: 'CURRENT',
    withdrawnAt: null,
    downstreamReview: 'NONE',
    retention: 'FIXTURE SESSION ONLY; NO PERSISTENCE',
    validity: 'NOT ASSESSED',
  },
  followup: {
    followupId: 'FOLLOWUP-065-01',
    kind: 'SYNTHETIC CHECK-IN',
    owner: 'SYNTHETIC-FOLLOWUP-ROLE',
    dueAt: '2026-08-20',
    state: 'COMPLETED',
    completedAt: '2026-08-20',
    completionEvidence: 'synthetic://065/followup-01',
    escalationOwner: 'SYNTHETIC-CONTINUITY-SUPERVISOR',
  },
  safetyBoundary: {
    signal: 'NONE',
    monitoring: 'NOT PROVIDED',
    emergencyResponse: 'NOT PROVIDED',
    route: 'CONTACT LOCAL EMERGENCY SERVICES OR AN APPROPRIATE CRISIS SERVICE NOW',
    platformInstruction: 'DO NOT RELY ON THIS FIXTURE FOR URGENT OR EMERGENCY HELP',
  },
  change: { changeId: 'CHANGE-065-01', changedObject: 'NONE', state: 'NONE', affected: [] },
  portability: {
    packageId: 'PACKAGE-065-01', schemaVersion: 'care-continuity-065-v1', format: 'JSON',
    replay: 'FIXED SYNTHETIC FIXTURE ONLY', rightsState: 'DECLARED FIXTURE STATE ONLY',
  },
  resilience: {
    mode: 'CLIENT-LOCAL FIXTURE', persistentStore: false, networkRequiredAfterLoad: false,
    queue: 'NONE', realOfflineExecution: 'NOT PROVEN',
  },
};

const make = (scenarioId: ScenarioId, record: CareRecord): CareContinuityInput => ({
  fixtureId: 'SYNTHETIC-PSYCHEDELIC-CARE-065', scenarioId, assessedAt: '2026-08-21', record, inherited,
});

export const CARE_CONTINUITY_SCENARIOS: Readonly<Record<ScenarioId, CareContinuityInput>> = {
  'CONTINUITY-CURRENT': make('CONTINUITY-CURRENT', base),
  'HANDOFF-UNACCEPTED': make('HANDOFF-UNACCEPTED', {
    ...base,
    careBoundary: { ...base.careBoundary, state: 'UNACCEPTED', acceptedAt: null },
  }),
  'PERMISSION-WITHDRAWN': make('PERMISSION-WITHDRAWN', {
    ...base,
    permission: { ...base.permission, state: 'WITHDRAWN', withdrawnAt: '2026-08-21', downstreamReview: 'OPEN' },
    change: { ...base.change, changedObject: 'PERMISSION-065-01', state: 'OPEN', affected: ['HANDOFF-065-01', 'FOLLOWUP-065-01'] },
  }),
  'FOLLOWUP-OVERDUE': make('FOLLOWUP-OVERDUE', {
    ...base,
    followup: { ...base.followup, state: 'OVERDUE', completedAt: null, completionEvidence: null },
  }),
  'CRISIS-OUTSIDE-SCOPE': make('CRISIS-OUTSIDE-SCOPE', {
    ...base,
    safetyBoundary: { ...base.safetyBoundary, signal: 'SYNTHETIC-CRISIS-SIGNAL' },
  }),
};

const invalid = (): CareContinuityResult => ({
  status: 'INVALID', episode: [], boundaries: [], handoffs: [], permissions: [], followups: [],
  accountability: [], safety: ['INVALID SYNTHETIC INPUT'], changes: [], portability: [], resilience: [],
  provenance: [], unknowns: [], nonClaims: [], engineVersion: CARE_CONTINUITY_ENGINE_VERSION,
});

const exact = (actual: unknown, expected: unknown): boolean => {
  if (typeof expected === 'number') return typeof actual === 'number' && Number.isFinite(actual) && actual === expected;
  if (expected === null || typeof expected !== 'object') return actual === expected;
  if (!actual || typeof actual !== 'object') return false;
  if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length && expected.every((v, i) => exact(actual[i], v));
  if (Array.isArray(actual)) return false;
  const a = actual as Record<string, unknown>, e = expected as Record<string, unknown>, keys = Object.keys(e);
  return Object.keys(a).length === keys.length && keys.every(k => Object.prototype.hasOwnProperty.call(a, k) && exact(a[k], e[k]));
};

function evaluate(candidate: unknown): CareContinuityResult {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return invalid();
  const object = candidate as Record<string, unknown>;
  if (typeof object.scenarioId !== 'string' || !Object.prototype.hasOwnProperty.call(CARE_CONTINUITY_SCENARIOS, object.scenarioId)) return invalid();
  const input = CARE_CONTINUITY_SCENARIOS[object.scenarioId as ScenarioId];
  if (!exact(object, input)) return invalid();
  const r = input.record;
  const status: CareContinuityResult['status'] =
    r.safetyBoundary.signal === 'SYNTHETIC-CRISIS-SIGNAL' ? 'EMERGENCY ROUTE REQUIRED' :
    r.permission.state === 'WITHDRAWN' ? 'PERMISSION HOLD' :
    r.careBoundary.state === 'UNACCEPTED' ? 'HANDOFF REVIEW' :
    r.followup.state === 'OVERDUE' ? 'FOLLOWUP ESCALATION' : 'CONTINUITY CURRENT';
  return {
    status,
    episode: [r.episodeId + ' · ' + r.stage + ' · SESSION ' + r.sessionOccurredAt],
    boundaries: ['SESSION ENDS · CONTINUITY CONTINUES', r.careBoundary.retainedResponsibility],
    handoffs: [r.careBoundary.handoffId + ' · ' + r.careBoundary.state + ' · ' + r.careBoundary.sendingRole + ' → ' + r.careBoundary.receivingRole],
    permissions: [r.permission.permissionId + ' · ' + r.permission.state + ' · VALIDITY ' + r.permission.validity, 'PURPOSE · ' + r.permission.purpose],
    followups: [r.followup.followupId + ' · ' + r.followup.state + ' · DUE ' + r.followup.dueAt],
    accountability: ['FOLLOWUP OWNER · ' + r.followup.owner, 'ESCALATION OWNER · ' + r.followup.escalationOwner, 'RECOURSE · ' + r.careBoundary.recoursePath],
    safety: [r.safetyBoundary.signal, r.safetyBoundary.monitoring, r.safetyBoundary.emergencyResponse, r.safetyBoundary.route, r.safetyBoundary.platformInstruction],
    changes: [r.change.changeId + ' · ' + r.change.state + ' · ' + r.change.changedObject, ...r.change.affected.map(x => 'REGISTERED POTENTIALLY AFFECTED · ' + x)],
    portability: [r.portability.packageId + ' · ' + r.portability.schemaVersion + ' · ' + r.portability.replay],
    resilience: [r.resilience.mode + ' · PERSISTENT STORE ' + r.resilience.persistentStore, 'REAL OFFLINE EXECUTION · ' + r.resilience.realOfflineExecution],
    provenance: [r.careBoundary.recordLocator, r.followup.completionEvidence ?? 'NO COMPLETION EVIDENCE'],
    unknowns: [
      'WHETHER ANY REAL PERSON CARE EPISODE SESSION HANDOFF PERMISSION FOLLOWUP SAFETY SIGNAL PROVIDER OR OUTCOME EXISTS OR IS ACCURATELY REPRESENTED',
      'IDENTITY CAPACITY CONSENT VALIDITY AUTHORIZATION LAWFUL BASIS CLINICAL APPROPRIATENESS PROFESSIONAL DUTY AND LEGAL REQUIREMENTS',
      'UNRECORDED NEEDS RISKS CONTACTS CHANGES INCIDENTS CRISIS CONDITIONS DEPENDENCIES AND ACCOUNTABILITY GAPS',
    ],
    nonClaims: [
      'CONTINUITY CURRENT MEANS INTERNALLY CURRENT FOR THIS FIXED SYNTHETIC FIXTURE ONLY',
      'THIS FIXTURE DOES NOT MONITOR A PERSON PROVIDE CARE OR RESPOND TO URGENT OR EMERGENCY CONDITIONS',
      'FOR URGENT OR EMERGENCY HELP CONTACT LOCAL EMERGENCY SERVICES OR AN APPROPRIATE CRISIS SERVICE NOW',
      'A RECORDED SAFETY SIGNAL IS NOT A DIAGNOSIS RISK ASSESSMENT TRIAGE DECISION OR PROOF OF AN EMERGENCY',
      'A PERMISSION STATE IS NOT PROOF OF INFORMED CONSENT CAPACITY IDENTITY AUTHORIZATION OR LEGAL VALIDITY',
      'WITHDRAWAL DOES NOT ERASE HISTORICAL FACTS OR DETERMINE RETENTION DUTIES EXCEPTIONS OR ANOTHER LAWFUL BASIS',
      'A COMPLETED FOLLOWUP IS NOT PROOF OF CLINICAL ADEQUACY SAFETY EFFECTIVENESS OR OUTCOME',
      'NO DIAGNOSIS TREATMENT ADVICE DOSAGE SAFETY EFFECTIVENESS OR CLINICAL CLAIM IS MADE',
      'NO REAL PERSON PATIENT PROVIDER ORGANIZATION SESSION SUBSTANCE OR HEALTH DATA IS REPRESENTED',
    ],
    engineVersion: CARE_CONTINUITY_ENGINE_VERSION,
  };
}

export function buildPsychedelicCareContinuityRecord(candidate: unknown): CareContinuityResult {
  try { return evaluate(candidate); } catch { return invalid(); }
}
