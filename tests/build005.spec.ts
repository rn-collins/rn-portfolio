import {test,expect} from '@playwright/test';

test.describe('Build 005 service-to-software discovery',()=>{
 test('seed workflow separates automate, human, and remove',async({page})=>{
  await page.goto('/100-builds/005/a');
  await expect(page.getByText('AUTOMATE',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('KEEP HUMAN',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('REMOVE',{exact:true}).first()).toBeVisible();
  await expect(page.getByText(/product-discovery instrument/i)).toBeVisible();
 });
 test('low-value repeated work remains removal candidate',async({page})=>{
  await page.goto('/100-builds/005/a');
  const stepSelector=page.getByRole('complementary',{name:'Service steps'});
  await stepSelector.getByRole('button',{name:/Copy status into a second tracker/}).click();
  const disposition=page.locator('section').filter({hasText:'CANDIDATE DISPOSITION'}).getByRole('heading',{name:'REMOVE',exact:true});
  await expect(disposition).toBeVisible();
  await expect(page.getByText(/automate waste rather than remove it/i)).toBeVisible();
 });
 test('high judgment work stays human',async({page})=>{
  await page.goto('/100-builds/005/a');
  const stepSelector=page.getByRole('complementary',{name:'Service steps'});
  await stepSelector.getByRole('button',{name:/Interpret unusual facts/}).click();
  const disposition=page.locator('section').filter({hasText:'CANDIDATE DISPOSITION'}).getByRole('heading',{name:'KEEP HUMAN',exact:true});
  await expect(disposition).toBeVisible();
  await expect(page.getByText(/Expert judgment is central/i)).toBeVisible();
 });
 test('new steps start as inspectable candidates and export is local',async({page})=>{
  await page.goto('/100-builds/005/a');
  await page.getByPlaceholder('Example: Prepare the weekly status email').fill('Prepare weekly status email');
  await page.getByPlaceholder('Describe the work in ordinary language.').fill('Compile stable fields and send the same structured update each week.');
  await page.getByRole('button',{name:'ADD STEP'}).click();
  await expect(page.getByText(/Step 4 added and ready to classify/)).toBeVisible();
  const dl=page.waitForEvent('download');
  await page.getByRole('button',{name:'EXPORT MAP'}).click();
  await dl;
 });
});

test.describe('Build 005 interactive story',()=>{
 test('scenario controls change the service path without hiding the argument',async({page})=>{
  await page.goto('/100-builds/005/b');
  await expect(page.getByRole('button',{name:'BASELINE'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'MORE JUDGMENT'}).click();
  await expect(page.getByRole('button',{name:'MORE JUDGMENT'})).toHaveAttribute('aria-pressed','true');
  await expect(page.getByText(/Do not turn the whole service into software/i)).toBeVisible();
 });
});
