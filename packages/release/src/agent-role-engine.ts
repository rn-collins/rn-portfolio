export type ToolGrant={id:string;name:string;permission:'read'|'draft'|'write';approved:boolean;approvedBy:string;evidenceId:string};
export type ControlRecord={build:'012'|'039'|'040'|'041';id:string;version:string};
export type AgentRole={id:string;name:string;purpose:string;accountableOwner:string;allowedResponsibilities:string[];prohibitedActions:string[];tools:ToolGrant[];reviewPoints:string[];stopConditions:string[];evaluationCriteria:string[];controlRecords:ControlRecord[]};
export type RoleResult={status:'ROLE READY'|'ROLE GAPS';gaps:string[];risk:'bounded'|'elevated';engineVersion:string};
export const AGENT_ROLE_ENGINE_VERSION='042.2.0';
export const REQUIRED_ROLE_CONTROLS={
 '012':{id:'CONSEQUENCE-012-ROLE',version:'012.1.0'},
 '039':{id:'TRACE-039-ROLE',version:'039.2.0'},
 '040':{id:'STOP-040-ROLE',version:'040.3.0'},
 '041':{id:'OWNER-041-ROLE',version:'041.2.0'}
}as const;
export const ROLE_TOOL_CONTRACT={
 'SEARCH-1':{name:'Approved public search',permission:'read'},
 'DOC-1':{name:'Shared document',permission:'write'}
}as const;
const BUILDS=Object.keys(REQUIRED_ROLE_CONTROLS)as Array<keyof typeof REQUIRED_ROLE_CONTROLS>;
function cleanList(values:string[]){return values.length>0&&values.every(x=>x.trim())&&new Set(values.map(x=>x.trim().toLocaleLowerCase('en-US'))).size===values.length}
export function inspectAgentRole(role:AgentRole):RoleResult{
 const gaps:string[]=[];const responsibilitySet=new Set(role.allowedResponsibilities.map(x=>x.trim().toLocaleLowerCase('en-US')));const prohibitedSet=new Set(role.prohibitedActions.map(x=>x.trim().toLocaleLowerCase('en-US')));
 if(!role.id.trim()||!role.name.trim()||!role.purpose.trim()||!role.accountableOwner.trim())gaps.push('Role identity, purpose, and accountable owner are required.');
 if(!cleanList(role.allowedResponsibilities))gaps.push('Distinct nonempty allowed responsibilities are required.');
 if(!cleanList(role.prohibitedActions))gaps.push('Distinct nonempty prohibited actions are required.');
 if([...responsibilitySet].some(x=>prohibitedSet.has(x)))gaps.push('Allowed and prohibited actions cannot conflict.');
 if(!cleanList(role.reviewPoints))gaps.push('Distinct nonempty human review points are required.');
 if(!cleanList(role.stopConditions))gaps.push('Distinct nonempty stop conditions are required.');
 if(!cleanList(role.evaluationCriteria))gaps.push('Distinct nonempty evaluation criteria are required.');
 const toolIds=new Set<string>();for(const tool of role.tools){const expected=ROLE_TOOL_CONTRACT[tool.id as keyof typeof ROLE_TOOL_CONTRACT];if(toolIds.has(tool.id))gaps.push(`Duplicate tool grant: ${tool.id}`);toolIds.add(tool.id);if(!expected||tool.name!==expected.name||tool.permission!==expected.permission||!tool.approved||!tool.approvedBy.trim()||!tool.evidenceId.trim())gaps.push(`Tool grant does not match the approved synthetic contract: ${tool.id||'unnamed'}`)}
 const hasWriteTool=role.tools.some(t=>t.permission==='write');const hasWriteResponsibility=responsibilitySet.has('write approved working document');
 if(hasWriteTool!==hasWriteResponsibility)gaps.push('Write responsibility and the approved write-tool grant must be added or removed together.');
 if(hasWriteTool&&!role.reviewPoints.includes('Human approval before write'))gaps.push('Write permission requires the exact before-write human approval gate.');
 if(role.controlRecords.length!==BUILDS.length||new Set(role.controlRecords.map(r=>r.build)).size!==BUILDS.length)gaps.push('Exactly one inherited control record from Builds 012, 039, 040, and 041 is required.');else for(const build of BUILDS){const record=role.controlRecords.find(r=>r.build===build);const expected=REQUIRED_ROLE_CONTROLS[build];if(!record||record.id!==expected.id||record.version!==expected.version)gaps.push(`Build ${build} control identity or version does not match the role contract.`)}
 return{status:gaps.length?'ROLE GAPS':'ROLE READY',gaps:[...new Set(gaps)],risk:hasWriteTool||hasWriteResponsibility?'elevated':'bounded',engineVersion:AGENT_ROLE_ENGINE_VERSION}
}
