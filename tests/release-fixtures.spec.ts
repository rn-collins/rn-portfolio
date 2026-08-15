import {test,expect} from '@playwright/test';

test.describe('Build 001 adversarial human-review fixtures',()=>{
 test('human present after outcome with no authority cannot look strong',async({page})=>{
  await page.goto('/100-builds/001/a');
  await page.getByLabel(/Does the reviewer know enough/).selectOption('qualified — Yes. They know the subject and the important limits of the AI.');
  await page.getByLabel(/enough time and support/).selectOption('yes — Yes. They have time, information, manageable workload, and freedom to disagree.');
  await page.getByLabel(/When does human review happen/).selectOption('after — After the action, or nobody has clearly decided when review happens.');
  await page.getByLabel(/How much information/).selectOption('full — The important inputs, sources, context, uncertainty, and conflicting information are available.');
  await page.getByLabel(/What can the reviewer actually do/).selectOption('observe — Comment or approve, but cannot meaningfully change the outcome.');
  await page.getByLabel(/What happens if the reviewer/).selectOption('none — There is no clear backup plan.');
  await page.getByLabel(/What gets recorded/).selectOption('none — No durable record of the review.');
  await page.getByLabel(/Does anyone check/).selectOption('never — No. The review process itself is not evaluated.');
  await page.getByRole('button',{name:/Check my human review/}).click();
  await expect(page.getByText('Weak',{exact:true})).toBeVisible();
  await expect(page.getByText(/Move review before the important action/)).toBeVisible();
  await expect(page.getByText(/actual power to reject/)).toBeVisible();
 });
});

test.describe('Build 002 drift fixtures',()=>{
 test('source numeric uncertainty and negation anchors are surfaced',async({page})=>{
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
