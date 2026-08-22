import{test,expect}from'@playwright/test';
import{buildPersonalKnowledgeModel,PERSONAL_KNOWLEDGE_SCENARIOS}from'../packages/release/src/personal-knowledge-model-engine';
const bounded=PERSONAL_KNOWLEDGE_SCENARIOS['MODEL-BOUNDARIES-CLEAR'];
test('067 keeps personal-model boundary states distinct',()=>{
 expect(buildPersonalKnowledgeModel(bounded)).toMatchObject({status:'MODEL BOUNDED',engineVersion:'067.1.0'});
 expect(buildPersonalKnowledgeModel(PERSONAL_KNOWLEDGE_SCENARIOS['CONSENT-WITHHELD']).status).toBe('CONSENT HOLD');
 expect(buildPersonalKnowledgeModel(PERSONAL_KNOWLEDGE_SCENARIOS['CONTEXT-EXPIRED']).status).toBe('CONTEXT REVIEW');
 expect(buildPersonalKnowledgeModel(PERSONAL_KNOWLEDGE_SCENARIOS['OWNERSHIP-UNDECLARED']).status).toBe('OWNERSHIP UNKNOWN');
 expect(buildPersonalKnowledgeModel(PERSONAL_KNOWLEDGE_SCENARIOS['INFERENCE-BLOCKED']).status).toBe('INFERENCE BLOCKED');
});
test('067 fails closed on hostile and drifted input',()=>{
 const throwing={...bounded,model:{...bounded.model}};Object.defineProperty(throwing.model,'declarations',{get(){throw new Error('hostile')}});
 const values=[null,undefined,[],{},'identity',{...bounded,fixtureId:'REAL'},{...bounded,scenarioId:'OTHER'},{...bounded,extra:true},{...bounded,assessedAt:NaN},{...bounded,subject:{...bounded.subject,persistence:'SAVED'}},{...bounded,subject:{...bounded.subject,surveillance:'ACTIVE'}},{...bounded,inherited:{...bounded.inherited,consentControls:'cap:022'}},{...bounded,inherited:{...bounded.inherited,rightsPermissions:'cap:023'}},{...bounded,inherited:{...bounded.inherited,changeEngine:'029.1.0'}},{...bounded,inherited:{...bounded.inherited,identityGuardrails:'cap:034'}},{...bounded,inherited:{...bounded.inherited,accountability:'cap:035'}},{...bounded,inherited:{...bounded.inherited,evidenceGraph:'cap:057'}},throwing,new Proxy(bounded,{get(){throw new Error('proxy')}})];
 for(const value of values){expect(()=>buildPersonalKnowledgeModel(value)).not.toThrow();expect(buildPersonalKnowledgeModel(value).status).toBe('INVALID')}
});
test('067-A exports exact synthetic admission and lineage',async({page})=>{
 await page.goto('/100-builds/067/a');await page.getByLabel('MODEL STATE').selectOption('OWNERSHIP-UNDECLARED');await expect(page.getByRole('heading',{name:'OWNERSHIP UNKNOWN'})).toBeVisible();
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'EXPORT PERSONAL MODEL'}).click();const download=await event;expect(download.suggestedFilename()).toBe('synthetic-personal-knowledge-model.json');
 const parsed=JSON.parse(await(await import('node:fs/promises')).readFile(await download.path() as string,'utf8'));expect(parsed.version).toBe('067.1.0');expect(parsed.canonical).toMatchObject({uses:['023','024','029','035','036','058'],creates:'cap:067'});expect(parsed.admission).toMatchObject({containsRealPeople:false,containsPersonalData:false,identityVerified:false,persistence:'NONE',surveillance:'NONE',ownershipDetermination:false,consentDetermination:false,psychologicalProfiling:false,undeclaredInference:false});
});
test('067 exposes limitations and B forms only bounded declarations',async({page})=>{
 await page.goto('/100-builds/067/a');await expect(page.getByText('does not verify identity',{exact:false})).toBeVisible();await expect(page.getByText('does not persist',{exact:false})).toBeVisible();
 await page.setViewportSize({width:320,height:760});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 await page.goto('/100-builds/067/b');await page.getByRole('button',{name:'FORM NEXT BOUNDARY'}).click();await expect(page.getByRole('status')).toContainText('CONSENT-WITHHELD');
});
