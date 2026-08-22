import {test,expect} from '@playwright/test';

test('Builds 001-003 core routes render current active artifacts',async({page})=>{
  for(const id of ['001','002','003']){
    await page.goto(`/100-builds/${id}`);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.getByRole('link',{name:/OPEN THE TOOL/i})).toBeVisible();
    await expect(page.getByRole('link',{name:/ENTER THE VISUAL BUILD/i})).toBeVisible();
    await expect(page.getByRole('link',{name:/Open the public build record/i})).toBeVisible();
    await page.goto(`/100-builds/${id}/a`);
    await expect(page.locator('h1').first()).toBeVisible();
    await page.goto(`/100-builds/${id}/b`);
    await expect(page.locator('h1').first()).toBeVisible();
    await page.goto(`/100-builds/${id}/record`);
    await expect(page.locator('h1').first()).toBeVisible();
  }
});
