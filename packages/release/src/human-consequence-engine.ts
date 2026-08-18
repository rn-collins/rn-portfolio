import {
  assessRegulatedHandoffs,
  scanAIWorkflow,
  type AIWorkflowInput,
  type RegulatedHandoffInput
} from './decision-engines';

export const HUMAN_CONSEQUENCE_ENGINE_VERSION='022.1.0';
export type ConsequenceProximity='DIRECT'|'HOUSEHOLD'|'WORKFORCE'|'COMMUNITY';
export type HumanImpactNode={
  id:string;
  label:string;
  proximity:ConsequenceProximity;
  consequence:string;
  severity:1|2|3|4|5;
  reversibility:1|2|3|4|5;
  notice:boolean;
  represented:boolean;
  recourse:boolean;
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
  for(const person of input.people){
    if(person.label.trim().length<3||person.consequence.trim().length<8)gaps.push(`${person.id}: describe the affected people and consequence.`);
    if(!person.notice)gaps.push(`${person.label}: define meaningful notice.`);
    if(!person.represented)gaps.push(`${person.label}: include affected-person knowledge or representation.`);
    if(!person.recourse)gaps.push(`${person.label}: define a correction, appeal, or recourse path.`);
  }
  if(workflow.status!=='RISK CONTAINED')gaps.push(`Inherited Build 013 workflow status is ${workflow.status}.`);
  if(handoffs.status!=='ACCOUNTABILITY INTACT')gaps.push(`Inherited Build 017 handoff status is ${handoffs.status}.`);
  const exposureScore=input.people.length?Math.round(input.people.reduce((n,p)=>{
    const protection=[p.notice,p.represented,p.recourse].filter(Boolean).length;
    return n+(p.severity*12+p.reversibility*8)*(1-protection*.16);
  },0)/input.people.length):0;
  const status:HumanConsequenceAssessment['status']=!input.people.length?'HUMAN CONSEQUENCE UNDEFINED':gaps.length?'REPRESENTATION GAPS':'CONSEQUENCES MAPPED';
  return {status,exposureScore:Math.min(100,exposureScore),affectedNodeCount:input.people.length,gaps,inheritedWorkflowStatus:workflow.status,inheritedHandoffStatus:handoffs.status,engineVersion:HUMAN_CONSEQUENCE_ENGINE_VERSION};
}
