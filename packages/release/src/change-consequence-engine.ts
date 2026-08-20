export type FieldValue=string|number|boolean|null;export type FieldType='string'|'number'|'boolean'|'date';export type Materiality='routine'|'review'|'critical';
export type FieldDefinition={id:string;label:string;type:FieldType;materiality:Materiality};
export type RecordSchema={id:string;entityType:string;fields:FieldDefinition[]};
export type VersionedRecord={entityId:string;schemaVersion:string;version:string;effectiveAt:string;fields:Record<string,FieldValue>};
export type EventEvidence={id:string;locator:string;observedAt:string;reviewer:string;supports:'change-reason'|'change-authority'|'field-value'};
export type VersionEvent={id:string;actor:string;occurredAt:string;reason:string;authority:string;evidence:EventEvidence[]};
export type DownstreamNode={id:string;label:string;kind:'record'|'decision'|'workflow'|'export';fieldsUsed:string[];dependsOn:string[];owner:string;registryRef:string};
export type ChangeInput={schema:RecordSchema;before:VersionedRecord;after:VersionedRecord;event:VersionEvent;downstream:DownstreamNode[];assessedAt:string};
export type FieldChange={fieldId:string;fieldLabel:string;kind:'added'|'removed'|'changed';before:FieldValue|undefined;after:FieldValue|undefined;materiality:Materiality;comparison:'exact-value';semanticInterpretation:'not-assessed'};
export type ImpactedNode={id:string;label:string;relation:'registered-direct-use'|'registered-transitive-dependency';paths:string[][];basis:string[];owner:string};
export type ChangeReplay={fieldOrder:string[];nodeOrder:string[];impactOrder:string;traversalRule:string;schemaFingerprint:string;graphFingerprint:string};
export type ChangeAssessment={status:'TRACE GAPS'|'NO CHANGE'|'IMPACT REVIEW'|'PROPAGATION MAPPED';changes:FieldChange[];impacted:ImpactedNode[];blocking:string[];warnings:string[];cycles:string[][];replay:ChangeReplay;engineVersion:string};
export const CHANGE_CONSEQUENCE_ENGINE_VERSION='029.2.0';const written=(v:string,min=4)=>v.trim().length>=min;const iso=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v);
const days=(a:string,b:string)=>Math.floor((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);
const hash=(v:string)=>{let h=2166136261;for(let i=0;i<v.length;i++){h^=v.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(16).padStart(8,'0')};
const valueMatches=(v:FieldValue|undefined,t:FieldType)=>v===undefined||v===null||(t==='string'&&typeof v==='string')||(t==='number'&&typeof v==='number'&&Number.isFinite(v))||(t==='boolean'&&typeof v==='boolean')||(t==='date'&&typeof v==='string'&&iso(v));
const cycleKey=(p:string[])=>{const core=p.slice(0,-1),min=[...core].sort()[0],i=core.indexOf(min),rot=[...core.slice(i),...core.slice(0,i),min];return rot.join('>')};
export function exploreChangeConsequences(input:ChangeInput):ChangeAssessment{
 const blocking:string[]=[],warnings:string[]=[];const fieldIds=input.schema.fields.map(x=>x.id),nodeIds=input.downstream.map(x=>x.id);
 if(!written(input.schema.id)||!written(input.schema.entityType))blocking.push('Register a stable schema ID and entity type.');
 if(!input.schema.fields.length)blocking.push('Register at least one field definition.');
 if(fieldIds.some(x=>!written(x))||new Set(fieldIds).size!==fieldIds.length)blocking.push('Schema field identities must be present and unique.');
 for(const f of input.schema.fields)if(!written(f.label))blocking.push(`${f.id||'Field'}: field label is required.`);
 if(!written(input.before.entityId)||input.before.entityId!==input.after.entityId)blocking.push('Before and after versions must preserve one stable entity identity.');
 if(input.before.schemaVersion!==input.schema.id||input.after.schemaVersion!==input.schema.id)blocking.push('Both versions must identify the registered schema version.');
 if(!written(input.before.version)||!written(input.after.version)||input.before.version===input.after.version)blocking.push('Record two distinct version identities.');
 if(!iso(input.before.effectiveAt)||!iso(input.after.effectiveAt)||days(input.after.effectiveAt,input.before.effectiveAt)<=0)blocking.push('Both versions need ordered ISO effective dates.');
 if(!iso(input.assessedAt)||days(input.assessedAt,input.after.effectiveAt)<0)blocking.push('Assessment date must be valid and not precede the after version.');
 for(const record of [input.before,input.after])for(const [key,value] of Object.entries(record.fields)){const def=input.schema.fields.find(x=>x.id===key);if(!def)blocking.push(`${record.version}: field ${key} is not registered in schema ${input.schema.id}.`);else if(!valueMatches(value,def.type))blocking.push(`${record.version}: field ${key} does not match registered type ${def.type}.`)}
 if(!written(input.event.id)||!written(input.event.actor)||!written(input.event.reason,12)||!written(input.event.authority,8))blocking.push('Version event requires ID, actor, reason, and bounded authority.');
 if(!iso(input.event.occurredAt)||days(input.assessedAt,input.event.occurredAt)<0||days(input.event.occurredAt,input.before.effectiveAt)<0)blocking.push('Version-event date must be valid, after the prior version, and not in the future.');
 const evidenceValid=(e:EventEvidence)=>written(e.id)&&written(e.locator,8)&&written(e.reviewer)&&iso(e.observedAt)&&days(input.event.occurredAt,e.observedAt)>=0&&days(input.event.occurredAt,e.observedAt)<=365;
 if(!input.event.evidence.some(x=>x.supports==='change-reason'&&evidenceValid(x)))blocking.push('Version event requires current evidence supporting the change reason.');
 if(!input.event.evidence.some(x=>x.supports==='change-authority'&&evidenceValid(x)))blocking.push('Version event requires current evidence supporting the actor authority.');
 if(nodeIds.some(x=>!written(x))||new Set(nodeIds).size!==nodeIds.length)blocking.push('Downstream node identities must be present and unique.');
 const sortedNodes=[...input.downstream].sort((a,b)=>a.id.localeCompare(b.id));
 for(const n of sortedNodes){if(!written(n.label)||!written(n.owner)||!written(n.registryRef,8))blocking.push(`${n.id||'Node'}: label, accountable owner, and registry reference are required.`);for(const field of n.fieldsUsed)if(!fieldIds.includes(field))blocking.push(`${n.id}: field dependency ${field} is not registered in the schema.`);for(const dep of n.dependsOn)if(!nodeIds.includes(dep))blocking.push(`${n.id}: dependency ${dep} is not registered.`);if(n.dependsOn.includes(n.id))blocking.push(`${n.id}: self-dependency is not allowed.`)}
 const cycles:string[][]=[],seenCycles=new Set<string>();const byId=new Map(sortedNodes.map(x=>[x.id,x]));
 function walk(id:string,path:string[]){const node=byId.get(id);if(!node)return;for(const dep of [...node.dependsOn].sort()){const at=path.indexOf(dep);if(at>=0){const cycle=[...path.slice(at),dep],key=cycleKey(cycle);if(!seenCycles.has(key)){seenCycles.add(key);cycles.push(cycle)}continue}walk(dep,[...path,dep])}}
 for(const n of sortedNodes)walk(n.id,[n.id]);if(cycles.length)blocking.push('Dependency graph contains a cycle; repair it before interpreting recursive impact paths.');
 const keys=[...new Set([...Object.keys(input.before.fields),...Object.keys(input.after.fields)])].sort();const changes:FieldChange[]=keys.flatMap(fieldId=>{const a=input.before.fields[fieldId],b=input.after.fields[fieldId];if(Object.is(a,b))return[];const def=input.schema.fields.find(x=>x.id===fieldId);return[{fieldId,fieldLabel:def?.label??fieldId,kind:a===undefined?'added':b===undefined?'removed':'changed',before:a,after:b,materiality:def?.materiality??'review',comparison:'exact-value',semanticInterpretation:'not-assessed'} as FieldChange]});
 if(changes.some(x=>x.kind==='added')&&changes.some(x=>x.kind==='removed'))warnings.push('Added and removed fields are reported separately; this engine does not infer a semantic rename.');
 if(!changes.length)warnings.push('The version event contains no registered exact-value field change.');
 const pathMap=new Map<string,string[][]>(),basisMap=new Map<string,Set<string>>(),direct=new Set<string>();
 if(!blocking.length){for(const n of sortedNodes){const basis=changes.filter(c=>n.fieldsUsed.includes(c.fieldId)).map(c=>c.fieldId).sort();if(basis.length){direct.add(n.id);pathMap.set(n.id,[[n.id]]);basisMap.set(n.id,new Set(basis))}}
  const children=new Map<string,string[]>();for(const n of sortedNodes)for(const dep of n.dependsOn)(children.get(dep)??children.set(dep,[]).get(dep)!).push(n.id);for(const list of children.values())list.sort();
  const queue=[...direct].sort().flatMap(id=>(pathMap.get(id)||[]).map(path=>({id,path,root:id})));
  while(queue.length){const cur=queue.shift()!;for(const child of children.get(cur.id)||[]){if(cur.path.includes(child))continue;const next=[...cur.path,child],existing=pathMap.get(child)||[];if(!existing.some(p=>p.join('>')===next.join('>'))){existing.push(next);pathMap.set(child,existing);const rootBasis=basisMap.get(cur.root)||new Set<string>();const set=basisMap.get(child)||new Set<string>();for(const b of rootBasis)set.add(b);basisMap.set(child,set);queue.push({id:child,path:next,root:cur.root})}}}
 }
 const impacted:ImpactedNode[]=[...pathMap.entries()].map(([id,paths])=>{const n=byId.get(id)!;return{id,label:n.label,relation:direct.has(id)?'registered-direct-use':'registered-transitive-dependency',paths:paths.sort((a,b)=>a.length-b.length||a.join('>').localeCompare(b.join('>'))),basis:[...(basisMap.get(id)||[])].sort(),owner:n.owner}}).sort((a,b)=>Math.min(...a.paths.map(p=>p.length))-Math.min(...b.paths.map(p=>p.length))||a.id.localeCompare(b.id));
 const replay:ChangeReplay={fieldOrder:keys,nodeOrder:sortedNodes.map(x=>x.id),impactOrder:'minimum registered path length, then node ID ascending',traversalRule:'all simple registered downstream paths; cycles are blocking',schemaFingerprint:hash(JSON.stringify(input.schema)),graphFingerprint:hash(JSON.stringify(sortedNodes))};
 const status:ChangeAssessment['status']=blocking.length?'TRACE GAPS':!changes.length?'NO CHANGE':changes.some(x=>x.materiality!=='routine')||impacted.length?'IMPACT REVIEW':'PROPAGATION MAPPED';
 return{status,changes,impacted,blocking:[...new Set(blocking)],warnings:[...new Set(warnings)],cycles:cycles.sort((a,b)=>a.join('>').localeCompare(b.join('>'))),replay,engineVersion:CHANGE_CONSEQUENCE_ENGINE_VERSION};
}
