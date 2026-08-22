import{test,expect}from'@playwright/test';
import{buildImplementationAwareLegalTracker,IMPLEMENTATION_TRACKER_SCENARIOS}from'../packages/release/src/implementation-aware-legal-tracker-engine';
const future=IMPLEMENTATION_TRACKER_SCENARIOS['ENACTED-EFFECTIVE-DATE-FUTURE'];
test('069 keeps five implementation outcomes deterministic and distinct',()=>{
 expect(buildImplementationAwareLegalTracker(future).status).toBe('EFFECTIVE DATE PENDING');
 expect(buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['EFFECTIVE-RULEMAKING-EVIDENCE-ABSENT']).status).toBe('RULEMAKING HOLD');
 expect(buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['FUNDED-SYSTEM-READINESS-BLOCKED']).status).toBe('SYSTEM READINESS BLOCKED');
 expect(buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['CONTRACT-WORKFORCE-READINESS-BLOCKED']).status).toBe('DELIVERY READINESS BLOCKED');
 expect(buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['READINESS-EVIDENCE-PACKAGE-COMPLETE']).status).toBe('READINESS EVIDENCED');
});
test('069 keeps implementation dimensions and audit stages separate',()=>{
 const result=buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['READINESS-EVIDENCE-PACKAGE-COMPLETE']);
 expect(result.audit.map(x=>x.stage)).toEqual(['ENACTMENT','EFFECTIVE-DATE','RULEMAKING','FUNDING','SYSTEMS','CONTRACTS','WORKFORCE','RESPONSIBILITY','EVIDENCE','BLOCKERS','READINESS','ALERTS']);
 expect(result.readiness).toContain('READINESS EVIDENCED · FIXTURE EVIDENCE AS OF 2026-08-21');
 expect(result.nonClaims).toContain('READINESS EVIDENCED IS NOT IMPLEMENTATION OR COMPLIANCE');
 const funded=buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['FUNDED-SYSTEM-READINESS-BLOCKED']);expect(funded.funding[0]).toContain('EVIDENCED');expect(funded.systems[0]).toContain('BLOCKED');
});
test('069 fails closed on hostile and drifted input',()=>{
 const hostile={...future};Object.defineProperty(hostile,'evidence',{get(){throw new Error('hostile')}});
 const values=[null,undefined,[],{},'law',{...future,fixtureId:'REAL'},{...future,scenarioId:'OTHER'},{...future,extra:true},{...future,jurisdiction:{...future.jurisdiction,realAuthority:true}},{...future,law:{...future.law,legalAuthority:'REAL'}},{...future,systems:{...future.systems,state:'READY'}},{...future,inherited:{...future.inherited,budgetModel:'cap:021'}},hostile,new Proxy(future,{get(){throw new Error('proxy')}})];
 for(const value of values){expect(()=>buildImplementationAwareLegalTracker(value)).not.toThrow();expect(buildImplementationAwareLegalTracker(value).status).toBe('INVALID')}
});
test('069-A exports exact admission and lineage',async({page})=>{
 await page.goto('/100-builds/069/a');await page.getByLabel('IMPLEMENTATION STATE').selectOption('FUNDED-SYSTEM-READINESS-BLOCKED');await expect(page.getByRole('heading',{name:'SYSTEM READINESS BLOCKED'})).toBeVisible();
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'EXPORT READINESS RECORD'}).click();const download=await event;expect(download.suggestedFilename()).toBe('synthetic-implementation-readiness-record.json');
 const parsed=JSON.parse(await(await import('node:fs/promises')).readFile(await download.path() as string,'utf8'));expect(parsed.version).toBe('069.1.0');expect(parsed.canonical).toEqual({uses:['016','017','019','020','028','029','058','059'],creates:'cap:069'});expect(parsed.artifacts).toEqual(['Implementation Status Model','Readiness Evidence Schema']);expect(parsed.admission).toMatchObject({fictionalJurisdiction:true,fictionalLaw:true,containsRealLaw:false,currentLawClaim:false,legalAuthorityClaim:false,legalEffectDetermined:false,complianceDetermined:false,implementationDetermined:false,predictsImplementation:false,legalAdvice:'NONE',failClosed:true});
});
test('069 exposes legal boundaries and B separates date from operations',async({page})=>{
 await page.goto('/100-builds/069/a');await expect(page.getByText('fictional',{exact:false})).toBeVisible();await expect(page.getByText('not legal advice',{exact:false})).toBeVisible();await page.setViewportSize({width:320,height:760});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 await page.goto('/100-builds/069/b');await page.getByRole('button',{name:'ADVANCE ONE STAGE'}).click();await expect(page.getByRole('status')).toContainText(/ENACTED|EFFECTIVE/);
});
