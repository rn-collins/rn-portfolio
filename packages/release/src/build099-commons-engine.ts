export const BUILD099_CLOCK='2026-08-22T12:00:00.000Z' as const;
export type Access='PUBLIC'|'PARTNERS'|'STEWARDS';
export type Dataset={id:string;name:string;island:string;steward:string;access:Access;updated:string;source:string;fields:readonly string[]};
export type CommonsInput={datasetId:string;requester:Access;purpose:'PLANNING'|'RESEARCH'|'COMMERCIAL';acceptTerms:boolean};
export const DATASETS:readonly Dataset[]=Object.freeze([
{id:'water-01',name:'Community water capacity',island:'Hawaiʻi',steward:'Hāmākua Water Hui',access:'PUBLIC',updated:'2026-08-18',source:'Quarterly steward survey',fields:Object.freeze(['district','capacity_band','freshness'])},
{id:'port-02',name:'Essential freight dependencies',island:'Maui',steward:'Maui Resilience Table',access:'PARTNERS',updated:'2026-08-11',source:'Partner-verified dependency register',fields:Object.freeze(['sector','dependency','fallback'])},
{id:'shelter-03',name:'Community shelter knowledge',island:'Molokaʻi',steward:'Molokaʻi Steward Council',access:'STEWARDS',updated:'2026-07-29',source:'Community-held knowledge record',fields:Object.freeze(['area','capacity_band','protocol'])}
]);
const rank:Record<Access,number>={PUBLIC:0,PARTNERS:1,STEWARDS:2};
export function rehearseCommons(input:CommonsInput){
 const dataset=DATASETS.find(d=>d.id===input.datasetId);
 const checks=[
  {id:'KNOWN_DATASET',pass:Boolean(dataset),detail:'Dataset is registered in the frozen commons.'},
  {id:'TERMS_ACCEPTED',pass:input.acceptTerms,detail:'Commons purpose and stewardship terms accepted.'},
  {id:'PURPOSE_ALLOWED',pass:input.purpose!=='COMMERCIAL',detail:'Synthetic rehearsal excludes commercial reuse.'},
  {id:'PERMISSION',pass:Boolean(dataset)&&rank[input.requester]>=rank[dataset!.access],detail:'Requester scope meets steward permission.'}
 ];
 let blocked=false;const trace=checks.map(c=>{const status=blocked?'NOT_RUN':c.pass?'PASS':'FAIL';if(status==='FAIL')blocked=true;return Object.freeze({...c,status});});
 const decision=blocked?'BLOCKED':'SHARE';
 return Object.freeze({build:'099',clock:BUILD099_CLOCK,decision,dataset:dataset?Object.freeze({id:dataset.id,name:dataset.name,island:dataset.island,steward:dataset.steward,access:dataset.access,updated:dataset.updated,source:dataset.source,fields:dataset.fields}):null,trace:Object.freeze(trace),externalEffect:false as const});
}
export function exportCommonsResult(input:CommonsInput){return JSON.stringify(rehearseCommons(input),null,2);}
