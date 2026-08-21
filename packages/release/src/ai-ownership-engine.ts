export type WorkKind='tool'|'decision'|'vendor'|'workflow';
export type OwnershipNode={id:string;name:string;kind:WorkKind;accountableOwner:string;operationalOwner:string;decisionAuthority:string;evidenceId:string;reviewedAt:string;expiresAt:string};
export type OwnershipResult={status:'OWNED'|'ORPHANED';orphaned:string[];conflicts:string[];coverage:number;engineVersion:string};
export const AI_OWNERSHIP_ENGINE_VERSION='041.2.0';
export const OWNERSHIP_FIXTURE_CONTRACT={
 'TOOL-1':{kind:'tool',evidenceId:'LEDGER-020-1'},
 'VENDOR-1':{kind:'vendor',evidenceId:'LEDGER-020-2'},
 'DECISION-1':{kind:'decision',evidenceId:'LEDGER-020-3'},
 'FLOW-1':{kind:'workflow',evidenceId:'LEDGER-020-4'}
} as const;
const KINDS=new Set<WorkKind>(['tool','decision','vendor','workflow']);
function validDate(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const[y,m,d]=value.split('-').map(Number);const date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d}
export function inspectOwnership(nodes:OwnershipNode[],asOf:string):OwnershipResult{
 const orphaned:string[]=[];const conflicts:string[]=[];
 if(!validDate(asOf))return{status:'ORPHANED',orphaned:['A valid evaluation date is required.'],conflicts:[],coverage:0,engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
 if(!nodes.length)return{status:'ORPHANED',orphaned:['No AI work records declared.'],conflicts:[],coverage:0,engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
 const ids=new Map<string,number>();const evidenceIds=new Map<string,number>();const valid=new Array(nodes.length).fill(true);
 nodes.forEach((n,index)=>{const label=n.id.trim()||n.name.trim()||`record ${index+1}`;const contract=OWNERSHIP_FIXTURE_CONTRACT[n.id as keyof typeof OWNERSHIP_FIXTURE_CONTRACT];const roles=[n.accountableOwner.trim(),n.operationalOwner.trim(),n.decisionAuthority.trim()];const missing=!n.id.trim()||!n.name.trim()||!KINDS.has(n.kind)||roles.some(x=>!x)||!n.evidenceId.trim()||!validDate(n.reviewedAt)||!validDate(n.expiresAt)||n.reviewedAt>asOf||asOf>n.expiresAt;const mismatch=!contract||contract.kind!==n.kind||contract.evidenceId!==n.evidenceId;const collapsed=roles.filter(Boolean).length!==new Set(roles.filter(Boolean).map(x=>x.toLocaleLowerCase('en-US'))).size;if(missing||mismatch||collapsed){valid[index]=false;orphaned.push(label)}if(collapsed)conflicts.push(`Ownership roles collapse for: ${label}`);ids.set(n.id,(ids.get(n.id)||0)+1);evidenceIds.set(n.evidenceId,(evidenceIds.get(n.evidenceId)||0)+1)});
 nodes.forEach((n,index)=>{if((ids.get(n.id)||0)>1){valid[index]=false;conflicts.push(`Duplicate ownership record: ${n.id}`)}if((evidenceIds.get(n.evidenceId)||0)>1){valid[index]=false;conflicts.push(`Duplicate evidence identity: ${n.evidenceId}`)}});
 const cleanOrphans=[...new Set(orphaned)];const cleanConflicts=[...new Set(conflicts)];const covered=valid.filter(Boolean).length;return{status:cleanOrphans.length||cleanConflicts.length?'ORPHANED':'OWNED',orphaned:cleanOrphans,conflicts:cleanConflicts,coverage:Math.round(covered/nodes.length*100),engineVersion:AI_OWNERSHIP_ENGINE_VERSION};
}
