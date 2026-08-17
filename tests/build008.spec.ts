import {test,expect} from '@playwright/test';

test.describe('Build 008 decision-ready dashboard standard',()=>{
 test('default dashboard is decision ready through Build 001 control inheritance',async({page})=>{
  await page.goto('/100-builds/008/a');
  await expect(page.getByRole('heading',{name:'DECISION READY'})).toBeVisible();
  await expect(page.getByText(/Metric readiness:/)).toContainText('100%');
  await expect(page.getByText(/Build 001 human-control inheritance:/)).toContainText('16/16 · Strong');
  await expect(page.getByText(/completeness is not correctness/i)).toBeVisible();
 });
 test('an incomplete metric remains information only with an explicit gap',async({page})=>{
  await page.goto('/100-builds/008/a');
  await page.getByRole('button',{name:'ADD METRIC'}).click();
  await expect(page.getByRole('heading',{name:'INFORMATION ONLY'})).toBeVisible();
  await expect(page.getByText(/Give every retained metric a source/)).toBeVisible();
 });
 test('reset reaches a truthful blocked state',async({page})=>{
  await page.goto('/100-builds/008/a');
  await page.getByRole('button',{name:'RESET / START EMPTY'}).click();
  await expect(page.getByRole('heading',{name:'DECISION BLOCKED'})).toBeVisible();
  await expect(page.getByText(/No dashboard data was stored/)).toBeVisible();
 });
 test('metrics can be added, edited, and removed',async({page})=>{
  await page.goto('/100-builds/008/a');
  await page.getByRole('button',{name:'ADD METRIC'}).click();
  const metric=page.getByRole('group',{name:'Metric 3'});
  await expect(metric).toBeVisible();
  await metric.getByLabel('Metric').fill('New decision signal');
  await expect(metric.getByLabel('Metric')).toHaveValue('New decision signal');
  await metric.getByRole('button',{name:'REMOVE METRIC'}).click();
  await expect(page.getByRole('group',{name:'Metric 3'})).toHaveCount(0);
 });
 test('export is explicit and local',async({page})=>{
  await page.goto('/100-builds/008/a');
  const dl=page.waitForEvent('download');
  await page.getByRole('button',{name:'EXPORT RECORD'}).click();
  expect((await dl).suggestedFilename()).toBe('decision-ready-dashboard.json');
 });
 test('canonical room is in the lab and the next build remains planned',async({page})=>{
  await page.goto('/100-builds/008');
  await expect(page.getByText('BUILD 008 / 100 · IN THE LAB')).toBeVisible();
  await expect(page.getByRole('link',{name:/OPEN THE TOOL/})).toHaveAttribute('href',/\/100-builds\/008\/a\/?$/);
  await expect(page.getByRole('link',{name:/ENTER THE VISUAL BUILD/})).toHaveAttribute('href',/\/100-builds\/008\/b\/?$/);
  await page.goto('/100-builds/009');
  await expect(page.getByText('BUILD 009 / 100 · COMING NEXT')).toBeVisible();
 });
 test('functional room stays usable at 320 CSS pixels',async({page})=>{
  await page.setViewportSize({width:320,height:800});
  await page.goto('/100-builds/008/a');
  await expect(page.getByRole('button',{name:'EXPORT RECORD'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false);
 });
});

test.describe('Build 008 decision path field',()=>{
 test('scenario controls change the actual state and expose human control',async({page})=>{
  await page.goto('/100-builds/008/b');
  await expect(page.getByRole('button',{name:'CHART WALL'})).toHaveAttribute('aria-pressed','true');
  await expect(page.getByRole('heading',{name:'INFORMATION ONLY'})).toBeVisible();
  await page.getByRole('button',{name:'DECISION READY'}).click();
  await expect(page.getByRole('heading',{name:'DECISION READY'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'A PERSON HOLDS THE DECISION.'})).toBeVisible();
  await expect(page.getByText(/named owner reviews caveats/i)).toBeVisible();
 });
 test('conflict scenario requires accountable escalation',async({page})=>{
  await page.goto('/100-builds/008/b');
  await page.getByRole('button',{name:'CONFLICT'}).click();
  await expect(page.getByRole('heading',{name:'ESCALATION REQUIRED'})).toBeVisible();
  await expect(page.getByText(/accountable director—not the dashboard/i)).toBeVisible();
  await expect(page.getByText(/composite score/i)).toBeVisible();
 });
});
