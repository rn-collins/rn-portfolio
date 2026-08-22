'use client';
import{useState}from'react';
import{buildTwinActionRuntime,TWIN_ACTION_SCENARIOS,TWIN_ACTION_RUNTIME_ENGINE_VERSION,type TwinActionScenarioId}from'../../../../../../packages/release/src/ai-digital-twin-action-runtime-engine';
import s from'../action-runtime.module.css';

const ids:TwinActionScenarioId[]=['PROPOSAL-AWAITS-APPROVAL','APPROVAL-DENIED','CONTEXT-UNAVAILABLE','TOOL-OUT-OF-SCOPE','APPROVED-SIMULATION-RECORDED'];
const label=(value:string)=>value.replaceAll('-',' ');
const groups=[['RETRIEVED CONTEXT','retrievedContext'],['DRAFT','draft'],['RECOMMENDATIONS','recommendations'],['PROPOSED ACTIONS','proposedActions'],['APPROVAL','approval'],['TOOL USE','toolUse'],['EXECUTION','execution'],['REFUSALS / EXCEPTIONS','refusalsAndExceptions']]as const;

export default function AIDigitalTwinRuntime(){
 const[id,setId]=useState<TwinActionScenarioId>('PROPOSAL-AWAITS-APPROVAL'),input=TWIN_ACTION_SCENARIOS[id],result=buildTwinActionRuntime(input);
 function download(){const snapshot={build:'068',version:TWIN_ACTION_RUNTIME_ENGINE_VERSION,fixture:'synthetic',exportedAt:input.assessedAt,canonical:{uses:['039','040','067'],creates:'cap:068'},artifacts:['Twin Action Planner','Approval Gates','Action Ledger'],admission:{containsRealPeople:false,containsPersonalData:false,usesRealAccounts:false,usesCredentials:false,usesExternalTools:false,takesExternalActions:false,actualSideEffects:false,authorityDetermined:false,persistence:'NONE',surveillance:'NONE',professionalAdvice:'NONE',failClosed:true},input:structuredClone(input),result:structuredClone(result),replay:{scenarioId:id,engineVersion:TWIN_ACTION_RUNTIME_ENGINE_VERSION}};const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'}));const anchor=document.createElement('a');anchor.href=url;anchor.download='synthetic-twin-action-ledger.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),0)}
 return <section className={s.lab} aria-labelledby="runtime-status" data-runtime-state={id}>
  <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>RUNTIME STATE · {label(id)}</small><h2 id="runtime-status">{result.status}</h2><p>{result.refusalsAndExceptions[0]??result.nonClaims[4]}</p></header>
  <div className={s.controls} aria-label="Synthetic action runtime controls"><label htmlFor="runtime-state">RUNTIME STATE<select id="runtime-state" value={id} onChange={event=>setId(event.target.value as TwinActionScenarioId)}>{ids.map(value=><option key={value} value={value}>{label(value)}</option>)}</select></label><button type="button" onClick={()=>setId('PROPOSAL-AWAITS-APPROVAL')}>RESTORE PROPOSAL</button><button type="button" onClick={download}>EXPORT ACTION LEDGER</button></div>
  <aside className={s.warning} aria-label="Runtime limitations"><h3>A proposal is not permission to act.</h3><p>Fixed synthetic fixtures only: no real people, personal data, identities, accounts, credentials, tools or external systems. Nothing persists, watches, impersonates, advises or causes side effects.</p></aside>
  <div className={s.workGrid}>{groups.map(([title,key])=><article key={key}><small>{title}</small><ul>{result[key].length?result[key].map(item=><li key={item}>{item}</li>):<li>None recorded.</li>}</ul></article>)}</div>
  <section className={s.audit} aria-label="Synthetic action ledger"><h3>Separate, accountable stages</h3><ol>{result.ledger.map(event=><li key={event.sequence}><span>{String(event.sequence).padStart(2,'0')}</span><b>{event.stage}</b><span>{event.event}</span><em>{event.outcome} · SIDE EFFECTS {event.sideEffects}</em></li>)}</ol></section>
  <aside className={s.warning}><h3>Unknown remains unknown</h3><ul>{result.unknowns.map(item=><li key={item}>{item}</li>)}</ul></aside>
  <p className={s.note}><b>Boundary:</b> Approval is synthetic and proposal-specific—not valid consent, capacity, identity, rights or general authority. “Execution” means a local deterministic simulation recorded with zero side effects. No medical, legal, financial or other professional advice.</p>
 </section>
}
