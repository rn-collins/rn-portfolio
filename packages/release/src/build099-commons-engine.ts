export const BUILD099_CLOCK='2026-08-22T12:00:00.000Z' as const;
export type Access='PUBLIC'|'PARTNERS'|'STEWARDS';
export type Dataset={id:string;name:string;island:string;steward:string;access:Access;updated:string;source:string;fields:readonly string[]};
export type CommonsInput={datasetId:string;requester:Access;purpose:'PLANNING'|'RESEARCH'|'COMMERCIAL';acceptTerms:boolean};
export const DATASETS:readonly Dataset[]=Object.freeze([
{id:'water-01',name:'Community water capacity',island:'North Fixture Island',steward:'Cedar Commons Steward Group',access:'PUBLIC',updated:'2049-01-18',source:'Synthetic quarterly fixture',fields:Object.freeze(['district','capacity_band','freshness'])},
{id:'port-02',name:'Essential freight dependencies',island:'East Fixture Island',steward:'Harbor Commons Steward Group',access:'PARTNERS',updated:'2049-01-11',source:'Synthetic dependency fixture',fields:Object.freeze(['sector','dependency','fallback'])},
{id:'shelter-03',name:'Community shelter knowledge',island:'West Fixture Island',steward:'Lattice Commons Steward Group',access:'STEWARDS',updated:'2048-12-29',source:'Synthetic restricted fixture',fields:Object.freeze(['area','capacity_band','protocol'])}
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
