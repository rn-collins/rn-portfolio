import {
  assessRegulatedHandoffs,
  scanAIWorkflow,
  type AIWorkflowInput,
  type RegulatedHandoffInput
} from './decision-engines';

export const HUMAN_CONSEQUENCE_ENGINE_VERSION='022.2.0';
export type ConsequenceProximity='DIRECT'|'HOUSEHOLD'|'WORKFORCE'|'COMMUNITY';
export type HumanImpactNode={
  id:string;
  label:string;
  proximity:ConsequenceProximity;
  consequence:string;
  consequenceBasis:string;
  severity:1|2|3|4|5;
  reversibility:1|2|3|4|5;
  notice:boolean;
  noticeEvidence:string;
  represented:boolean;
  representationEvidence:string;
  recourse:boolean;
  recourseEvidence:string;
};
export type HumanConsequenceInput={
  workflow:AIWorkflowInput;
  handoffs:RegulatedHandoffInput;
  people:HumanImpactNode[];
};
export type HumanConsequenceAssessment={
  status:'CONSEQUENCES MAPPED'|'REPRESENTATION GAPS'|'HUMAN CONSEQUENCE UNDEFINED';
  exposureScore:number;
  affectedNodeCount:number;
  gaps:string[];
  inheritedWorkflowStatus:string;
  inheritedHandoffStatus:string;
  engineVersion:string;
};
export function assessHumanConsequences(input:HumanConsequenceInput):HumanConsequenceAssessment{
  const workflow=scanAIWorkflow(input.workflow);
  const handoffs=assessRegulatedHandoffs(input.handoffs);
  const gaps:string[]=[];
  if(!input.people.length)gaps.push('Name at least one person or group affected by the workflow.');
  if(input.people.length&&!input.people.some(p=>p.proximity==='DIRECT'))gaps.push('Name the people directly subject to the workflow outcome.');
  const ids=new Set<string>(); const labels=new Set<string>();
  const supported=(enabled:boolean,evidence:string)=>enabled&&evidence.trim().length>=12;
  for(const person of input.people){
    if(ids.has(person.id))gaps.push(`${person.id}: use a unique affected-person record ID.`); ids.add(person.id);
    const normalized=person.label.trim().toLowerCase(); if(labels.has(normalized))gaps.push(`${person.label}: distinguish this group from the existing affected-person record.`); labels.add(normalized);
    if(person.label.trim().length<3||person.consequence.trim().length<8)gaps.push(`${person.id}: describe the affected people and consequence.`);
    if(person.consequenceBasis.trim().length<12)gaps.push(`${person.label}: record the source, observation, or uncertainty supporting the consequence path.`);
    if(!supported(person.notice,person.noticeEvidence))gaps.push(`${person.label}: define meaningful notice and its evidence.`);
    if(!supported(person.represented,person.representationEvidence))gaps.push(`${person.label}: include affected-person knowledge or representation and its evidence.`);
    if(!supported(person.recourse,person.recourseEvidence))gaps.push(`${person.label}: define a correction, appeal, or recourse path and its evidence.`);
  }
  if(workflow.status!=='RISK CONTAINED')gaps.push(`Inherited Build 013 workflow status is ${workflow.status}.`);
  if(handoffs.status!=='ACCOUNTABILITY INTACT')gaps.push(`Inherited Build 017 handoff status is ${handoffs.status}.`);
  const exposureScore=input.people.length?Math.round(input.people.reduce((n,p)=>{
    const protection=[supported(p.notice,p.noticeEvidence),supported(p.represented,p.representationEvidence),supported(p.recourse,p.recourseEvidence)].filter(Boolean).length;
    return n+(p.severity*12+p.reversibility*8)*(1-protection*.16);
  },0)/input.people.length):0;
  const status:HumanConsequenceAssessment['status']=!input.people.length?'HUMAN CONSEQUENCE UNDEFINED':gaps.length?'REPRESENTATION GAPS':'CONSEQUENCES MAPPED';
  return {status,exposureScore:Math.min(100,exposureScore),affectedNodeCount:input.people.length,gaps,inheritedWorkflowStatus:workflow.status,inheritedHandoffStatus:handoffs.status,engineVersion:HUMAN_CONSEQUENCE_ENGINE_VERSION};
}
