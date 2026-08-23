import fs from 'node:fs';
import {expect,test} from '@playwright/test';
const overrides=JSON.parse(fs.readFileSync('data/linkedin-experience-overrides-068-100.json','utf8')).builds as Record<string,{transcript:string;scenes:{headline:string}[]}>;
const ids=Array.from({length:33},(_,i)=>String(i+68).padStart(3,'0'));
const late=new Set(['071','072','081','092','093','094','095','098','099']);
for(const id of ids)test(`Build ${id}-B transcript, film and motion share one source`,async({page,request})=>{
 await page.goto(`/100-builds/${id}/b/`);
 const details=page.getByText('Read the transcript').locator('..');
 await details.locator('summary').click();
 expect(await details.locator('pre').textContent()).toBe(overrides[id].transcript);
 for(let i=0;i<6;i++){
  await expect(page.locator('[aria-label*="interactive motion story"] h3')).toHaveText(overrides[id].scenes[i].headline);
  if(i<5)await page.getByRole('button',{name:'Next scene'}).click();
 }
 for(const suffix of ['.mp4','-poster.png','-captions.vtt','-transcript.txt'])expect((await request.get(`/media/builds/${id}/build-${id}-linkedin${suffix}`)).ok()).toBeTruthy();
 if(late.has(id)){
  await page.goto(`/100-builds/${id}/`);
  await expect(page.getByText('REMEDIATED PUBLIC CLAIMS · INDEPENDENT POST-FIX REVIEW PENDING',{exact:true})).toBeVisible();
  await expect(page.getByLabel('Claim review and source limits')).toContainText('does not validate real-world effectiveness');
 }
});
