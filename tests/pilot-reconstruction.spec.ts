import {test,expect} from '@playwright/test';

for(const id of ['001','030'] as const){
 test(`${id} reconstruction exposes capability, evidence, and open gates`,async({page})=>{
  await page.setViewportSize({width:320,height:900});
  await page.goto(`/100-builds/${id}/reconstruction`);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.getByText('NO INVENTED RESEARCH')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Rebuild the capability step by step.'})).toBeVisible();
  await expect(page.getByText('NOT CONDUCTED').first()).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBeTruthy();
 });
}

test('001 dossier links its reconstruction',async({page})=>{
 await page.goto('/100-builds/001/record');
 await expect(page.getByRole('link',{name:'Complete reconstruction'})).toHaveAttribute('href','/100-builds/001/reconstruction');
});

test('030 working tool retires simulation as the lead promise',async({page})=>{
 await page.goto('/100-builds/030/a');
 await expect(page.getByRole('heading',{name:'Inclusive Experience Repair Lab'})).toBeVisible();
 await expect(page.getByText(/does not simulate a person/)).toBeVisible();
 await expect(page.getByRole('link',{name:'Complete reconstruction'})).toHaveAttribute('href','/100-builds/030/reconstruction');
});
