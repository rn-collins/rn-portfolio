import { test, expect } from '@playwright/test';
import { compareJurisdictionLaw, REGULATORY_INTELLIGENCE_JURISDICTIONS, REGULATORY_INTELLIGENCE_PRESETS, REGULATORY_INTELLIGENCE_QUERIES } from '../packages/release/src/cross-jurisdiction-regulatory-intelligence-engine';

test('076 preserves exactly five fictional jurisdictions, three concrete questions, and source records', () => {
 expect(REGULATORY_INTELLIGENCE_JURISDICTIONS.map(item=>item.id)).toEqual(['JURISDICTION-EMBER','JURISDICTION-HARBOR','JURISDICTION-LATTICE','JURISDICTION-MESA','JURISDICTION-ORBIT']);
 expect(REGULATORY_INTELLIGENCE_QUERIES.map(item=>item.id)).toEqual(['Q-WHO-MAY-ACT','Q-WHAT-AUTHORITY','Q-WHEN-EFFECTIVE']);
 expect(REGULATORY_INTELLIGENCE_JURISDICTIONS.every(item=>item.sources.length===2)).toBeTruthy();
 const result=compareJurisdictionLaw(REGULATORY_INTELLIGENCE_PRESETS['Q-WHO-MAY-ACT']);
 expect(result.rows).toHaveLength(5); expect(result.diffFields).toEqual(['ANSWER','SOURCE LOCATOR','ISSUED ON','EFFECTIVE ON','AS OF','CONFLICT','UNKNOWN']);
 expect(result.rows.flatMap(row=>row.sourceRecords)).toHaveLength(10);
 expect(result.nonClaims).toContain('NO COMPLETE, AUTHORITATIVE, OR GLOBAL COVERAGE CLAIM');
});

test('076 preserves effective dates, source conflict, and unknown without imputation', () => {
 const result=compareJurisdictionLaw(REGULATORY_INTELLIGENCE_PRESETS['Q-WHEN-EFFECTIVE']);
 expect(result.rows.map(row=>row.status)).toEqual(['SUPPORTED-BY-SYNTHETIC-SOURCES','SUPPORTED-BY-SYNTHETIC-SOURCES','SUPPORTED-BY-SYNTHETIC-SOURCES','CONFLICT-IN-SYNTHETIC-SOURCES','UNKNOWN-IN-SYNTHETIC-FIXTURE']);
 const mesa=result.rows[3]; expect(mesa.answer).toBeNull(); expect(mesa.effectiveOn).toBeNull(); expect(mesa.conflict).toBe('SYNTHETIC SOURCES DISAGREE: 2042-05-01 / 2042-06-01'); expect(mesa.sourceRecords.map(s=>s.effectiveOn)).toEqual(['2042-05-01','2042-06-01']);
 const orbit=result.rows[4]; expect(orbit.answer).toBeNull(); expect(orbit.unknown).toBe('FIXED SYNTHETIC FIXTURE DOES NOT SUPPLY THIS ANSWER');
 expect(result.audit).toContain('NO IMPUTATION OR REAL-LAW LOOKUP');
});

test('076 fails closed on malformed, drifted, real, authority-bearing, and hostile inputs', () => {
 const fixture=REGULATORY_INTELLIGENCE_PRESETS['Q-WHO-MAY-ACT']; const hostile={...fixture}; Object.defineProperty(hostile,'jurisdictions',{get(){throw new Error('hostile')}});
 const values=[null,undefined,[],{},'law',{...fixture,fixtureId:'REAL'},{...fixture,queryId:'OTHER'},{...fixture,extra:true},{...fixture,admission:{...fixture.admission,realLawClaim:true}},{...fixture,admission:{...fixture.admission,completenessClaim:true}},{...fixture,inherited:{...fixture.inherited,sourceRegistry:'cap:999'}},{...fixture,jurisdictions:[...fixture.jurisdictions,fixture.jurisdictions[0]]},hostile,new Proxy(fixture,{get(){throw new Error('proxy')}})];
 for(const value of values){expect(()=>compareJurisdictionLaw(value)).not.toThrow(); expect(compareJurisdictionLaw(value).status).toBe('INVALID'); expect(compareJurisdictionLaw(value).rows).toEqual([])}
});

test('076-A exports exact admission, artifacts, lineage, and replay', async ({page}) => {
 await page.goto('/100-builds/076/a'); await page.getByLabel('COMPARATIVE QUESTION').selectOption('Q-WHEN-EFFECTIVE'); await expect(page.getByRole('heading',{name:'Q-WHEN-EFFECTIVE COMPARISON'})).toBeVisible();
 const event=page.waitForEvent('download'); await page.getByRole('button',{name:'EXPORT COMPARATIVE QUERY'}).click(); const download=await event; expect(download.suggestedFilename()).toBe('synthetic-cross-jurisdiction-query.json');
 const parsed=JSON.parse(await (await import('node:fs/promises')).readFile(await download.path() as string,'utf8'));
 expect(parsed.version).toBe('076.1.0'); expect(parsed.canonical).toEqual({uses:['028','029','058','059','069','075'],creates:'cap:076'}); expect(parsed.artifacts).toEqual(['Jurisdiction Registry','Comparative Query Layer']);
 expect(parsed.admission).toEqual({syntheticJurisdictionsOnly:true,exactJurisdictionCount:5,fixedSourcesOnly:true,sourceLevelDifferencesPreserved:true,effectiveAndAsOfDatesPreserved:true,unknownsPreserved:true,conflictsPreserved:true,containsRealLaw:false,currentLawClaim:false,legalAdvice:'NONE',complianceDetermined:false,globalCoverageClaim:false,completenessClaim:false,authoritativeCoverageClaim:false,failClosed:true});
 expect(parsed.replay).toEqual({queryId:'Q-WHEN-EFFECTIVE',engineVersion:'076.1.0'});
});

test('076 exposes legal and coverage boundaries, contains at 320px, and B opens semantic diffs', async ({page}) => {
 await page.goto('/100-builds/076/a'); await expect(page.getByText('not current law',{exact:false}).first()).toBeVisible(); await expect(page.getByText('global coverage',{exact:false}).first()).toBeVisible();
 await page.setViewportSize({width:320,height:760}); expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 await page.goto('/100-builds/076/b'); await page.getByRole('button',{name:'OPEN SEMANTIC DIFF'}).click(); await expect(page.getByRole('status')).toContainText('Similar labels separate into source-level differences');
});
