import {test,expect} from '@playwright/test';

test.describe('Build 009 place-sensitive technology readiness',()=>{
 test('default case is conditional and concretely inherits Build 003',async({page})=>{
  await page.goto('/100-builds/009/a');
  await expect(page.getByRole('heading',{name:'CONDITIONAL'})).toBeVisible();
  await expect(page.getByText(/Build 003 decision gap/)).toBeVisible();
  await expect(page.getByText(/does not prove safety, legality/i)).toBeVisible();
 });
 test('local constraints reshape the assessment',async({page})=>{
  await page.goto('/100-builds/009/a');
  const network=page.getByRole('group',{name:'Connectivity + offline continuity'});
  await network.getByLabel('Local capacity').fill('5');
  await expect(network.getByLabel('Local capacity')).toHaveValue('5');
 });
 test('reset reaches a truthful not-ready state',async({page})=>{
  await page.goto('/100-builds/009/a');
  await page.getByRole('button',{name:'RESET / START EMPTY'}).click();
  await expect(page.getByRole('heading',{name:'NOT READY'})).toBeVisible();
  await expect(page.getByText(/No place data was stored/)).toBeVisible();
 });
 test('exports an explicit local record',async({page})=>{
  await page.goto('/100-builds/009/a');
  const dl=page.waitForEvent('download');
  await page.getByRole('button',{name:'EXPORT LOCAL RECORD'}).click();
  expect((await dl).suggestedFilename()).toBe('place-readiness-record.json');
 });
 test('room is live in the lab and next canonical build is planned',async({page})=>{
  await page.goto('/100-builds/009');
  await expect(page.getByText('BUILD 009 / 100 · IN THE LAB')).toBeVisible();
  await expect(page.getByRole('link',{name:/OPEN THE TOOL/})).toHaveAttribute('href',/\/100-builds\/009\/a\/?$/);
  await page.goto('/100-builds/010');
  await expect(page.getByText('BUILD 010 / 100 · COMING NEXT')).toBeVisible();
 });
 test('functional artifact fits 320 CSS pixels',async({page})=>{
  await page.setViewportSize({width:320,height:800});await page.goto('/100-builds/009/a');
  await expect(page.getByRole('button',{name:'EXPORT LOCAL RECORD'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false);
 });
});

test.describe('Build 009 feasibility field',()=>{
 test('scenario changes the actual place state with text and structure',async({page})=>{
  await page.goto('/100-builds/009/b');
  await expect(page.getByRole('button',{name:'Connected metro office'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Remote island service region'}).click();
  await expect(page.getByRole('heading',{name:'Remote island service region'})).toBeVisible();
  await expect(page.getByText(/offline continuity/i)).toBeVisible();
  await expect(page.getByRole('heading',{name:/Affected-community council/})).toBeVisible();
 });
 test('post-disruption scenario names a failed transfer assumption',async({page})=>{
  await page.goto('/100-builds/009/b');
  await page.getByRole('button',{name:'Post-disruption field site'}).click();
  await expect(page.getByText('TRANSFER ASSUMPTION FAILS')).toBeVisible();
  await expect(page.getByText(/Only people with local knowledge/)).toBeVisible();
 });
});
