import {test,expect} from '@playwright/test';

test.describe('Build 020 decision evidence ledger',()=>{
 test('requires every declared evidence link',async({page})=>{
  await page.goto('/100-builds/020/a');
  await expect(page.getByRole('heading',{name:'3 / 3 required evidence records linked'})).toBeVisible();
  await page.getByLabel(/Escalation acknowledgement/).uncheck();
  await expect(page.getByText('EVIDENCE GAP')).toBeVisible();
  await expect(page.getByText('Missing required record: Escalation acknowledgement.')).toBeVisible();
 });
 test('appends a linked correction without erasing the original',async({page})=>{
  await page.goto('/100-builds/020/a');
  await page.getByRole('button',{name:'APPEND CORRECTION'}).click();
  await expect(page.getByText(/Correction COR-020-001 appended/)).toBeVisible();
  await expect(page.getByText('Incident command delegation IC-4',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'APPEND CORRECTION'})).toBeDisabled();
 });
 test('exports a privacy-labelled synthetic ledger',async({page})=>{
  await page.goto('/100-builds/020/a');
  await page.getByRole('button',{name:'APPEND CORRECTION'}).click();
  const pending=page.waitForEvent('download');
  await page.getByRole('button',{name:'EXPORT SYNTHETIC LEDGER'}).click();
  const download=await pending;
  expect(download.suggestedFilename()).toBe('decision-evidence-ledger.json');
  const stream=await download.createReadStream();let body='';for await(const chunk of stream)body+=chunk;
  const record=JSON.parse(body);
  expect(record.syntheticData).toBe(true);
  expect(record.originalDecision.authority).toBe('Incident command delegation IC-4');
  expect(record.correctionHistory[0].corrects).toBe(record.originalDecision.id);
 });
 test('fits 320 CSS pixels',async({page})=>{await page.setViewportSize({width:320,height:800});await page.goto('/100-builds/020/a');expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false)});
 test('paired visual announces the selected stage only',async({page})=>{await page.goto('/100-builds/020/b');await page.getByRole('button',{name:'ADVANCE THE RECORD'}).click();await expect(page.getByRole('status')).toContainText('ACTOR + AUTHORITY')});
});
