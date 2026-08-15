import {test,expect} from '@playwright/test';

test.describe('Build 001 adversarial human-review fixtures',()=>{
 test('human present after outcome with no authority cannot look strong',async({page})=>{
  await page.goto('/100-builds/001/a');
  await page.getByLabel(/Does the reviewer know enough/).selectOption({label:/Yes\./});
  await page.getByLabel(/enough time and support/).selectOption({label:/Yes\./});
  await page.getByLabel(/When does human review happen/).selectOption({label:/After the action/});
  await page.getByLabel(/How much information/).selectOption({label:/important inputs/});
  await page.getByLabel(/What can the reviewer actually do/).selectOption({label:/cannot meaningfully change/});
  await page.getByLabel(/What happens if the reviewer/).selectOption({label:/no clear backup/i});
  await page.getByLabel(/What gets recorded/).selectOption({label:/No durable record/});
  await page.getByLabel(/Does anyone check/).selectOption({label:/No\. The review/});
  await page.getByRole('button',{name:/Check my human review/}).click();
  await expect(page.getByText('Weak')).toBeVisible();
  await expect(page.getByText(/Move review before/)).toBeVisible();
  await expect(page.getByText(/actual power/)).toBeVisible();
 });
});

test.describe('Build 002 drift fixtures',()=>{
 test('changed number is surfaced by preservation audit',async({page})=>{
  await page.goto('/100-builds/002/a');
  const source=page.locator('textarea').first();
  await source.fill('The study found 42% may improve, not 84%.');
  await expect(page.getByText(/Numbers preserved/)).toBeVisible();
  await expect(page.getByText(/Uncertainty preserved/)).toBeVisible();
  await expect(page.getByText(/Negation preserved/)).toBeVisible();
 });
});

test.describe('Build 003 heuristic boundaries',()=>{
 test('UI states discovery is not validation',async({page})=>{
  await page.goto('/100-builds/003/a');
  await expect(page.getByText(/discovery, not validation/i)).toBeVisible();
  await expect(page.getByText(/does not prove people want a product/i)).toBeVisible();
 });
});
