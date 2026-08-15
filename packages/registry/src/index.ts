export type ArtifactStatus='Planned'|'Building'|'Live'|'Held';
export type PublicBuildState='OnView'|'InLab'|'ComingNext';
export type BuildArtifact={status:ArtifactStatus;url:string|null;summary?:string|null;title?:string;concept?:string|null;mechanism?:string|null};
export type ComprehensionRangeTarget='early-secondary'|'high-school'|'general-adult'|'college-nonspecialist'|'domain-professional'|'technical-expert';
export type PublicAccessionMeta={
  publicQuestion?:string;
  plainPurpose?:string;
  firstValueMinutes?:number;
  comprehensionRange?:ComprehensionRangeTarget[];
  evidenceStatus?:'planned'|'researched'|'verified'|'requires-update';
  practiceRelevance?:string[];
  saveablePayload?:string;
  novicePath?:string;
  expertDepth?:string;
  technicalCeiling?:string;
  mustNotRequire?:string[];
  canonVerdict?:'KEEP'|'REFRAME'|'REPLACE'|'LAB-ONLY';
};
export type CanonicalBuild={id:string;sequence:number;title:string;slug:string;phase:number;phaseName:string;ecosystem:string;artifactType:string;complexity:number;status:ArtifactStatus;publicState:PublicBuildState;version:string;functional:BuildArtifact;visual:BuildArtifact;observation:string|null;missingSystem:string|null;description:string;usesInfrastructure:string[];createsInfrastructure:string[];relatedBuilds:string[];buildLog:Array<{version:string;label:string}>;limitations:string[];learnings:string[];public?:PublicAccessionMeta};
export type CanonicalPhase={id:number;name:string;range:[number,number]};

export { phases, builds } from './registry.canonical-v1';