import {test,expect} from '@playwright/test';

test('002 remains usable when browser local AI APIs are absent',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(globalThis,'LanguageModel',{value:undefined,configurable:true});Object.defineProperty(globalThis,'Translator',{value:undefined,configurable:true})});
 await page.goto('/100-builds/002/a');
 await page.getByRole('button',{name:/TRY BROWSER-LOCAL AI ADAPTATION/}).click();
 await expect(page.getByText(/not available here/i)).toBeVisible();
 await expect(page.getByText(/Different door\. Same factual core/i)).toBeVisible();
 await page.getByRole('button',{name:/TRANSLATE LOCALLY/}).click();
 await expect(page.getByText(/Translator API is not available/i)).toBeVisible();
});

test('003 remains usable when browser local AI is absent',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(globalThis,'LanguageModel',{value:undefined,configurable:true})});
 await page.goto('/100-builds/003/a');
 await page.getByRole('button',{name:/CHALLENGE WITH BROWSER-LOCAL AI/}).click();
 await expect(page.getByText(/unavailable; deterministic hypotheses remain active/i)).toBeVisible();
 await expect(page.getByText(/DECISION GAP/).first()).toBeVisible();
 await expect(page.getByRole('button',{name:/EXPORT JSON RECORD/})).toBeVisible();
});
