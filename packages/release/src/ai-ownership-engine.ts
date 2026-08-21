export type WorkKind='tool'|'decision'|'vendor'|'workflow';
export type OwnershipNode={id:string;name:string;kind:WorkKind;accountableOwner:string;operationalOwner:string;decisionAuthority:string;evidenceId:string;reviewedAt:string;expiresAt:string};
export type OwnershipResult={status:'OWNED'|'ORPHANED';orphaned:string[];conflicts:string[];coverage:number;engineVersion:string};
export const AI_OWNERSHIP_ENGINE_VERSION='041.1.0';
const ISO=/^\d{4}-\d{2}-\d{2}$/;
function validDate(value:string){if(!ISO.test(value))return false;const date=new Date(`${value}T00:00:00Z`);return !Number.isNaN(date.valueOf())&&date.toISOString().slice(0,10)===value}
export function inspectOwnership(nodes:OwnershipNode[],asOf:string):OwnershipResult{
 const orphaned:string[]=[];const conflicts:string[]=[];
 if(!validDate(asOf))return{status:'ORPHANED',orphaned:['A valid evaluation date is required.'],conflicts:[],coverage:0,engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
 if(!nodes.length)return{status:'ORPHANED',orphaned:['No AI work records declared.'],conflicts:[],coverage:0,engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
 for(const n of nodes){const missing=!n.id.trim()||!n.name.trim()||!n.accountableOwner.trim()||!n.operationalOwner.trim()||!n.decisionAuthority.trim()||!n.evidenceId.trim()||!validDate(n.reviewedAt)||!validDate(n.expiresAt)||n.reviewedAt>n.expiresAt||n.expiresAt<asOf;if(missing)orphaned.push(n.id||n.name||'unnamed record');}
 const ids=new Set<string>();for(const n of nodes){if(ids.has(n.id))conflicts.push(`Duplicate ownership record: ${n.id}`);ids.add(n.id)}
 const covered=nodes.length-orphaned.length;return{status:orphaned.length||conflicts.length?'ORPHANED':'OWNED',orphaned,conflicts,coverage:Math.round(covered/nodes.length*100),engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
}
