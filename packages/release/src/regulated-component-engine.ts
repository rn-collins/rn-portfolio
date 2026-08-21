export type ComponentKind='approval'|'consent'|'evidence'|'disclosure'|'record';
export type RegulatedContext={jurisdiction:string;useCase:string;consequence:'low'|'medium'|'high';dataClass:string;asOf:string};
export type RegulatedComponent={id:string;kind:ComponentKind;version:string;contextKey:string;evidenceId:string;reviewedAt:string;expiresAt:string;dependencies:string[]};
export type AssemblyResult={status:'ASSEMBLY VALID'|'INVALIDATED';invalid:string[];coverage:number;engineVersion:string};
export const REGULATED_COMPONENT_ENGINE_VERSION='044.2.0';
export const COMPONENT_CONTRACT={
 'APPROVAL-1':{kind:'approval',version:'1.0',evidenceId:'E-APPROVAL',dependencies:['EVIDENCE-1']},
 'CONSENT-1':{kind:'consent',version:'1.0',evidenceId:'E-CONSENT',dependencies:[]},
 'EVIDENCE-1':{kind:'evidence',version:'1.0',evidenceId:'E-EVIDENCE',dependencies:[]},
 'DISCLOSURE-1':{kind:'disclosure',version:'1.0',evidenceId:'E-DISCLOSURE',dependencies:['CONSENT-1']},
 'RECORD-1':{kind:'record',version:'1.0',evidenceId:'E-RECORD',dependencies:['APPROVAL-1','DISCLOSURE-1']}
}as const;
const IDS=Object.keys(COMPONENT_CONTRACT)as Array<keyof typeof COMPONENT_CONTRACT>;
function validDate(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const[y,m,d]=value.split('-').map(Number);const date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d}
function normalized(value:string){return value.trim().normalize('NFKC').toLocaleLowerCase('en-US')}
export function contextKey(c:RegulatedContext){return JSON.stringify([normalized(c.jurisdiction),normalized(c.useCase),c.consequence,normalized(c.dataClass)])}
export function inspectAssembly(context:RegulatedContext,components:RegulatedComponent[]):AssemblyResult{
 const invalid:string[]=[];const contextValid=!!context.jurisdiction.trim()&&!!context.useCase.trim()&&!!context.dataClass.trim()&&['low','medium','high'].includes(context.consequence)&&validDate(context.asOf);if(!contextValid)invalid.push('CONTEXT');const key=contextKey(context);const counts=new Map<string,number>();for(const x of components)counts.set(x.id,(counts.get(x.id)||0)+1);if(components.length!==IDS.length)invalid.push('COMPONENT-COUNT');
 for(const id of IDS)if((counts.get(id)||0)!==1)invalid.push(id);
 for(const x of components){const expected=COMPONENT_CONTRACT[x.id as keyof typeof COMPONENT_CONTRACT];const depsMatch=!!expected&&x.dependencies.length===expected.dependencies.length&&x.dependencies.every((d,i)=>d===expected.dependencies[i]);if(!expected||x.kind!==expected.kind||x.version!==expected.version||x.evidenceId!==expected.evidenceId||!depsMatch||x.contextKey!==key||!validDate(x.reviewedAt)||!validDate(x.expiresAt)||x.reviewedAt>context.asOf||context.asOf>x.expiresAt)invalid.push(x.id||'UNNAMED')}
 const ids=new Set(components.map(x=>x.id));if(components.some(x=>new Set(x.dependencies).size!==x.dependencies.length||x.dependencies.some(d=>!ids.has(d)||d===x.id)))invalid.push('DEPENDENCY');
 const graph=new Map(components.map(x=>[x.id,x.dependencies]));const state=new Map<string,0|1|2>();function visit(id:string):boolean{const s=state.get(id)||0;if(s===1)return true;if(s===2)return false;state.set(id,1);for(const dep of graph.get(id)||[])if(visit(dep))return true;state.set(id,2);return false}if([...ids].some(visit))invalid.push('DEPENDENCY-CYCLE');
 const unique=[...new Set(invalid)];const validIds=IDS.filter(id=>!unique.includes(id)&&counts.get(id)===1&&contextValid);return{status:unique.length?'INVALIDATED':'ASSEMBLY VALID',invalid:unique,coverage:Math.round(validIds.length/IDS.length*100),engineVersion:REGULATED_COMPONENT_ENGINE_VERSION}
}
