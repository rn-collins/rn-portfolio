import{test,expect}from'@playwright/test';
import{buildTwinActionRuntime,TWIN_ACTION_SCENARIOS}from'../packages/release/src/ai-digital-twin-action-runtime-engine';
const pending=TWIN_ACTION_SCENARIOS['PROPOSAL-AWAITS-APPROVAL'];
test('068 keeps the five runtime outcomes deterministic and distinct',()=>{
 expect(buildTwinActionRuntime(pending).status).toBe('AWAITING APPROVAL');
 expect(buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['APPROVAL-DENIED']).status).toBe('APPROVAL DENIED');
 expect(buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['CONTEXT-UNAVAILABLE']).status).toBe('CONTEXT HOLD');
 expect(buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['TOOL-OUT-OF-SCOPE']).status).toBe('TOOL REFUSED');
 expect(buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['APPROVED-SIMULATION-RECORDED']).status).toBe('SIMULATION RECORDED');
});
test('068 preserves stage separation and zero-side-effect execution',()=>{
 const result=buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['APPROVED-SIMULATION-RECORDED']);
 expect(result.ledger.map(x=>x.stage)).toEqual(['CONTEXT-RETRIEVAL','DRAFT','RECOMMENDATION','PROPOSED-ACTION','APPROVAL','TOOL-USE','EXECUTION']);
 expect(result.ledger.every(x=>x.sideEffects==='NONE')).toBeTruthy();expect(result.execution).toEqual(['EXEC-068-01 · LOCAL DETERMINISTIC SIMULATION RECORDED · SIDE EFFECTS NONE']);
 const hold=buildTwinActionRuntime(TWIN_ACTION_SCENARIOS['CONTEXT-UNAVAILABLE']);expect(hold.draft).toEqual([]);expect(hold.recommendations).toEqual([]);expect(hold.execution).toEqual([]);
});
test('068 fails closed on hostile and drifted input',()=>{
 const hostile={...pending};Object.defineProperty(hostile,'context',{get(){throw new Error('hostile')}});
 const values=[null,undefined,[],{},'act',{...pending,fixtureId:'REAL'},{...pending,scenarioId:'OTHER'},{...pending,extra:true},{...pending,runtime:{...pending.runtime,authority:'GENERAL'}},{...pending,runtime:{...pending.runtime,externalAccess:'ENABLED'}},{...pending,proposedAction:{...pending.proposedAction,sideEffects:'NETWORK'}},{...pending,approvalGate:{...pending.approvalGate,required:false}},{...pending,inherited:{...pending.inherited,workflowEngine:'cap:038'}},hostile,new Proxy(pending,{get(){throw new Error('proxy')}})];
 for(const value of values){expect(()=>buildTwinActionRuntime(value)).not.toThrow();expect(buildTwinActionRuntime(value).status).toBe('INVALID')}
});
test('068-A exports exact admission and lineage',async({page})=>{
 await page.goto('/100-builds/068/a');await page.getByLabel('RUNTIME STATE').selectOption('TOOL-OUT-OF-SCOPE');await expect(page.getByRole('heading',{name:'TOOL REFUSED'})).toBeVisible();
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'EXPORT ACTION LEDGER'}).click();const download=await event;expect(download.suggestedFilename()).toBe('synthetic-twin-action-ledger.json');
 const parsed=JSON.parse(await(await import('node:fs/promises')).readFile(await download.path() as string,'utf8'));expect(parsed.version).toBe('068.1.0');expect(parsed.canonical).toEqual({uses:['039','040','067'],creates:'cap:068'});expect(parsed.artifacts).toEqual(['Twin Action Planner','Approval Gates','Action Ledger']);expect(parsed.admission).toMatchObject({containsRealPeople:false,containsPersonalData:false,usesRealAccounts:false,usesCredentials:false,usesExternalTools:false,takesExternalActions:false,actualSideEffects:false,authorityDetermined:false,persistence:'NONE',surveillance:'NONE',professionalAdvice:'NONE',failClosed:true});
});
test('068 exposes boundaries and B advances only through accountable stages',async({page})=>{
 await page.goto('/100-builds/068/a');await expect(page.getByText('no real people',{exact:false})).toBeVisible();await expect(page.getByText('side effects',{exact:false})).toBeVisible();await page.setViewportSize({width:320,height:760});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 await page.goto('/100-builds/068/b');await page.getByRole('button',{name:'ADVANCE ONE STAGE'}).click();await expect(page.getByRole('status')).toContainText(/CONTEXT|DRAFT/);
});
