import { test, expect } from '@playwright/test';

const boundaryBuilds=['001','003','049','100'] as const;

for(const id of boundaryBuilds){
 for(const variant of ['a','b'] as const){
  test(`Build ${id}-${variant.toUpperCase()} exposes variant metadata`,async({page})=>{
   await page.goto(`/100-builds/${id}/${variant}`);
   await expect(page).toHaveTitle(new RegExp(`Build ${id}-${variant.toUpperCase()}:`));
   const canonical=page.locator('link[rel="canonical"]');
   await expect(canonical).toHaveCount(1);
   await expect(canonical).toHaveAttribute('href',new RegExp(`/100-builds/${id}/${variant}/?$`));
   await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content',new RegExp(`Build ${id}-${variant.toUpperCase()}:`));
   await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content','summary_large_image');
  });
 }
}
