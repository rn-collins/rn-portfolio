export type ArtifactStatus='Planned'|'Building'|'Live'|'Held';
export type BuildArtifact={status:ArtifactStatus;url:string|null;summary?:string|null;title?:string;concept?:string|null;mechanism?:string|null};
export type CanonicalBuild={id:string;sequence:number;title:string;slug:string;phase:number;phaseName:string;ecosystem:string;artifactType:string;complexity:number;status:ArtifactStatus;version:string;functional:BuildArtifact;visual:BuildArtifact;observation:string|null;missingSystem:string|null;description:string;usesInfrastructure:string[];createsInfrastructure:string[];relatedBuilds:string[];buildLog:Array<{version:string;label:string}>;limitations:string[];learnings:string[]};
export type CanonicalPhase={id:number;name:string;range:[number,number]};

export { phases, builds } from './registry.generated';
