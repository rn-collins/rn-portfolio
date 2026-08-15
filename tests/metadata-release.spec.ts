import {test,expect} from '@playwright/test';
for(const [id,title] of [['001','Human Review Design Framework'],['002','Multi-Audience Meaning Architecture'],['003','Unserved Decision Discovery Framework']] as const){
 test(`Build ${id} exposes canonical discoverability metadata`,async({page})=>{await page.goto(`/100-builds/${id}`);await expect(page).toHaveTitle(new RegExp(`Build ${id}.*${title}`,'i'));const canonical=page.locator('link[rel="canonical"]');await expect(canonical).toHaveAttribute('href',new RegExp(`/100-builds/${id}$`));await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content',new RegExp(`Build ${id}`));await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content','summary_large_image')});
}
