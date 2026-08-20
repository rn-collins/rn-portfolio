export type EvidenceLevel='primary'|'secondary'|'context';
export type EvidenceBasis={id:string;locator:string;reviewedAt:string;reviewer:string};
export type NormalizationProvenance={traceId:string;engineVersion:string;sourceRecordId:string;normalizedAt:string};
export type SearchDocument={id:string;title:string;body:string;topic:string;evidenceLevel:EvidenceLevel;evidenceBasis:EvidenceBasis;sourceLabel:string;sourceUrl:string;publishedAt:string;concepts:string[];normalization:NormalizationProvenance};
export type SearchInput={query:string;documents:SearchDocument[];topicFacet:string;evidenceFacet:'all'|EvidenceLevel;searchMode:'keyword'|'meaning'|'combined';schemaVersion:string;assessedAt:string};
export type ScorePart={label:string;points:number;detail:string};
export type RankedDocument={document:SearchDocument;score:number;breakdown:ScorePart[];matchedTerms:string[];tieBreakKey:string};
export type SearchReplay={normalizedQuery:string[];conceptExpansions:Record<string,string[]>;weights:typeof RANKING_WEIGHTS;tieBreak:string;corpusFingerprint:string};
export type SearchAssessment={status:'QUERY NEEDED'|'QUERY INVALID'|'CORPUS GAPS'|'NO MATCH'|'RESULTS';results:RankedDocument[];blocking:string[];queryWarnings:string[];facetTrace:{eligibleDocumentIds:string[];excludedDocumentIds:string[]};replay:SearchReplay;engineVersion:string;rankingRuleVersion:string};
export const EVIDENCE_SEARCH_ENGINE_VERSION='028.2.0',RANKING_RULE_VERSION='transparent-ranking-v2',CONCEPT_MAP_VERSION='derived-concept-map-v2';
export const RANKING_WEIGHTS={exactKeyword:4,titleKeyword:2,declaredConcept:3,mappedConcept:2,primaryClassification:2,secondaryClassification:1} as const;
export const CONCEPT_MAP:Record<string,string[]>={access:['availability','barrier','cost','geography'],evidence:['source','study','record','claim'],implementation:['operational','workforce','budget','system'],privacy:['data','consent','retention','deletion']};
const STOP=new Set(['a','an','and','are','for','how','in','is','of','or','the','to','what','why','with']);
const tokens=(v:string):string[]=>v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z0-9]+/g)??[];
const normalizedTokens=(v:string)=>[...new Set(tokens(v).filter(x=>!STOP.has(x)))];
const iso=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v);const written=(v:string,min=4)=>v.trim().length>=min;
const days=(a:string,b:string)=>Math.floor((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);
const evidenceReady=(x:EvidenceBasis,assessedAt:string)=>written(x.id)&&written(x.locator,8)&&written(x.reviewer)&&iso(x.reviewedAt)&&days(assessedAt,x.reviewedAt)>=0&&days(assessedAt,x.reviewedAt)<=365;
const hash=(v:string)=>{let h=2166136261;for(let i=0;i<v.length;i++){h^=v.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16).padStart(8,'0')};
const fingerprint=(docs:SearchDocument[])=>hash(JSON.stringify([...docs].sort((a,b)=>a.id.localeCompare(b.id)).map(d=>[d.id,d.title,d.body,d.topic,d.evidenceLevel,d.evidenceBasis,d.sourceUrl,d.publishedAt,[...d.concepts].sort(),d.normalization])));
export function searchEvidence(input:SearchInput):SearchAssessment{
 const blocking:string[]=[],queryWarnings:string[]=[];const emptyReplay:SearchReplay={normalizedQuery:[],conceptExpansions:{},weights:RANKING_WEIGHTS,tieBreak:'score descending, then stable document ID ascending',corpusFingerprint:fingerprint(input.documents)};
 if(input.schemaVersion!=='evidence-corpus-v2')blocking.push('Use evidence-corpus-v2 for this engine.');
 if(!iso(input.assessedAt))blocking.push('Record an ISO assessment date.');
 if(!input.documents.length)blocking.push('Add at least one corpus document.');
 const ids=input.documents.map(x=>x.id.trim());if(ids.some(x=>!x))blocking.push('Every document needs a stable identity.');if(new Set(ids).size!==ids.length)blocking.push('Document identities must be unique after trimming.');
 const allowedTopics=new Set(input.documents.map(x=>x.topic));
 if(input.topicFacet!=='all'&&!allowedTopics.has(input.topicFacet))blocking.push('Selected topic facet does not exist in this corpus.');
 for(const d of input.documents){
  if(!written(d.title)||!written(d.body,12))blocking.push(`${d.id||'Document'}: title and substantive body are required.`);
  if(!written(d.topic))blocking.push(`${d.id||'Document'}: topic is required.`);
  if(!written(d.sourceLabel)||!/^https:\/\//.test(d.sourceUrl))blocking.push(`${d.id||'Document'}: inspectable source metadata is required.`);
  if(!iso(d.publishedAt)||days(input.assessedAt,d.publishedAt)<0)blocking.push(`${d.id||'Document'}: source date must be valid and must not postdate assessment.`);
  if(!evidenceReady(d.evidenceBasis,input.assessedAt))blocking.push(`${d.id||'Document'}: evidence-level weighting requires a current classification record.`);
  if(!d.normalization||!/^NORM-026-/.test(d.normalization.traceId)||d.normalization.engineVersion!=='026.2.0'||!written(d.normalization.sourceRecordId)||!iso(d.normalization.normalizedAt)||days(input.assessedAt,d.normalization.normalizedAt)<0)blocking.push(`${d.id||'Document'}: normalized provenance must identify a valid Build 026.2.0 trace, source record, and date.`);
  if(new Set(d.concepts).size!==d.concepts.length||d.concepts.some(x=>tokens(x).length!==1))blocking.push(`${d.id||'Document'}: concepts must be unique single normalized tokens.`);
 }
 const raw=input.query.trim();const qTerms=normalizedTokens(raw);const expansions=Object.fromEntries(qTerms.filter(t=>CONCEPT_MAP[t]).map(t=>[t,CONCEPT_MAP[t]]));const replay:SearchReplay={...emptyReplay,normalizedQuery:qTerms,conceptExpansions:expansions};
 if(!raw||!qTerms.length){if(raw)queryWarnings.push('The query contains only ignored connective words or punctuation.');return{status:blocking.length?'CORPUS GAPS':'QUERY NEEDED',results:[],blocking:[...new Set(blocking)],queryWarnings,facetTrace:{eligibleDocumentIds:[],excludedDocumentIds:input.documents.map(x=>x.id)},replay,engineVersion:EVIDENCE_SEARCH_ENGINE_VERSION,rankingRuleVersion:RANKING_RULE_VERSION}}
 if(raw.length>200||qTerms.length>20){queryWarnings.push('Query exceeds the disclosed 200-character or 20-token limit.');return{status:'QUERY INVALID',results:[],blocking:[...new Set(blocking)],queryWarnings,facetTrace:{eligibleDocumentIds:[],excludedDocumentIds:input.documents.map(x=>x.id)},replay,engineVersion:EVIDENCE_SEARCH_ENGINE_VERSION,rankingRuleVersion:RANKING_RULE_VERSION}}
 const eligible=input.documents.filter(d=>(input.topicFacet==='all'||d.topic===input.topicFacet)&&(input.evidenceFacet==='all'||d.evidenceLevel===input.evidenceFacet));const eligibleIds=eligible.map(x=>x.id),excludedIds=input.documents.filter(x=>!eligibleIds.includes(x.id)).map(x=>x.id);
 if(blocking.length)return{status:'CORPUS GAPS',results:[],blocking:[...new Set(blocking)],queryWarnings,facetTrace:{eligibleDocumentIds:eligibleIds,excludedDocumentIds:excludedIds},replay,engineVersion:EVIDENCE_SEARCH_ENGINE_VERSION,rankingRuleVersion:RANKING_RULE_VERSION};
 const results=eligible.map(document=>{
  const hay=tokens(`${document.title} ${document.body}`),title=tokens(document.title),breakdown:ScorePart[]=[];const matched:string[]=[];
  if(input.searchMode!=='meaning'){
   const exact=qTerms.filter(t=>hay.includes(t));if(exact.length){breakdown.push({label:'exact keyword',points:exact.length*RANKING_WEIGHTS.exactKeyword,detail:`Normalized exact terms: ${exact.join(', ')}`});matched.push(...exact)}
   const inTitle=qTerms.filter(t=>title.includes(t));if(inTitle.length)breakdown.push({label:'title keyword',points:inTitle.length*RANKING_WEIGHTS.titleKeyword,detail:`Exact query terms in title: ${inTitle.join(', ')}`});
  }
  if(input.searchMode!=='keyword'){
   const declared=qTerms.filter(t=>document.concepts.includes(t));if(declared.length){breakdown.push({label:'declared concept',points:declared.length*RANKING_WEIGHTS.declaredConcept,detail:`Corpus-declared concepts matching query: ${declared.join(', ')}`});matched.push(...declared)}
   const mapped=[...new Set(Object.values(expansions).flat().filter(t=>hay.includes(t)||document.concepts.includes(t)))];if(mapped.length){breakdown.push({label:'concept-map expansion',points:mapped.length*RANKING_WEIGHTS.mappedConcept,detail:`Deterministic map terms: ${mapped.join(', ')}; this is not semantic understanding.`});matched.push(...mapped)}
  }
  const relevance=breakdown.reduce((n,x)=>n+x.points,0);
  if(relevance&&document.evidenceLevel==='primary')breakdown.push({label:'corpus evidence classification',points:RANKING_WEIGHTS.primaryClassification,detail:`Primary label supported by ${document.evidenceBasis.id}; label is not proof of quality or sufficiency.`});
  if(relevance&&document.evidenceLevel==='secondary')breakdown.push({label:'corpus evidence classification',points:RANKING_WEIGHTS.secondaryClassification,detail:`Secondary label supported by ${document.evidenceBasis.id}; label is not proof of quality or sufficiency.`});
  if(relevance)breakdown.push({label:'freshness',points:0,detail:`Published ${document.publishedAt}; freshness is displayed but intentionally has zero ranking weight.`});
  return{document,score:breakdown.reduce((n,x)=>n+x.points,0),breakdown,matchedTerms:[...new Set(matched)],tieBreakKey:document.id};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.tieBreakKey.localeCompare(b.tieBreakKey));
 return{status:results.length?'RESULTS':'NO MATCH',results,blocking:[],queryWarnings,facetTrace:{eligibleDocumentIds:eligibleIds,excludedDocumentIds:excludedIds},replay,engineVersion:EVIDENCE_SEARCH_ENGINE_VERSION,rankingRuleVersion:RANKING_RULE_VERSION};
}
