import{test,expect}from'@playwright/test';
import{buildLegalKnowledgeGraph,LEGAL_KNOWLEDGE_SCENARIOS}from'../packages/release/src/legal-knowledge-graph-engine';
const current=LEGAL_KNOWLEDGE_SCENARIOS['MEMORY-CONNECTED'];
test('066 keeps legal-memory review states distinct',()=>{
 expect(buildLegalKnowledgeGraph(current)).toMatchObject({status:'MEMORY CONNECTED',engineVersion:'066.1.0'});
 expect(buildLegalKnowledgeGraph(LEGAL_KNOWLEDGE_SCENARIOS['AUTHORITY-UNVERIFIED']).status).toBe('AUTHORITY REVIEW');
 expect(buildLegalKnowledgeGraph(LEGAL_KNOWLEDGE_SCENARIOS['ACCESS-RESTRICTED']).status).toBe('ACCESS HOLD');
 expect(buildLegalKnowledgeGraph(LEGAL_KNOWLEDGE_SCENARIOS['CONFLICTING-OUTCOME']).status).toBe('CONFLICT REVIEW');
 expect(buildLegalKnowledgeGraph(LEGAL_KNOWLEDGE_SCENARIOS['LESSON-UNREVIEWED']).status).toBe('LESSON REVIEW');
});
test('066 fails closed on hostile and drifted input',()=>{
 const throwing={...current,graph:{...current.graph}};Object.defineProperty(throwing.graph,'nodes',{get(){throw new Error('hostile')}});
 const values=[null,undefined,[],{},'law',{...current,fixtureId:'REAL'},{...current,scenarioId:'OTHER'},{...current,extra:true},{...current,assessedAt:NaN},{...current,inherited:{...current.inherited,provenance:'cap:027'}},{...current,inherited:{...current.inherited,changeEngine:'029.1.0'}},{...current,inherited:{...current.inherited,evidenceGraph:'cap:057'}},{...current,inherited:{...current.inherited,knowledgeGraph:'cap:058'}},{...current,inherited:{...current.inherited,researchRepository:'cap:062'}},throwing,new Proxy(current,{get(){throw new Error('proxy')}})];
 for(const value of values){expect(()=>buildLegalKnowledgeGraph(value)).not.toThrow();expect(buildLegalKnowledgeGraph(value).status).toBe('INVALID')}
});
test('066-A exports exact synthetic admission and lineage',async({page})=>{
 await page.goto('/100-builds/066/a');await page.getByLabel('KNOWLEDGE STATE').selectOption('ACCESS-RESTRICTED');await expect(page.getByRole('heading',{name:'ACCESS HOLD'})).toBeVisible();
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'EXPORT KNOWLEDGE GRAPH'}).click();const download=await event;expect(download.suggestedFilename()).toBe('synthetic-legal-knowledge-graph.json');
 const parsed=JSON.parse(await(await import('node:fs/promises')).readFile(await download.path() as string,'utf8'));expect(parsed.version).toBe('066.1.0');expect(parsed.canonical).toMatchObject({uses:['028','029','058','059','063'],creates:'cap:066'});expect(parsed.admission).toMatchObject({containsRealClients:false,containsRealMatters:false,containsRealPeople:false,currentLawClaim:false,citationValidityClaim:false,privilegeDetermination:false,legalAdvice:false});
});
test('066 exposes limitations and B assembles folders',async({page})=>{
 await page.goto('/100-builds/066/a');await expect(page.getByText('does not provide legal advice',{exact:false})).toBeVisible();await expect(page.getByText('does not determine privilege',{exact:false})).toBeVisible();
 await page.setViewportSize({width:320,height:760});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 await page.goto('/100-builds/066/b');await page.getByRole('button',{name:'ASSEMBLE NEXT CONNECTION'}).click();await expect(page.getByRole('status')).toContainText('AUTHORITY-UNVERIFIED');
});
