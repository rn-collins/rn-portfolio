import {expect,test} from '@playwright/test';
const ids=Array.from({length:34},(_,index)=>String(index+1).padStart(3,'0'));

for(const id of ids){
 test(`Build ${id} B transcript and motion use the published media text`,async({page,request})=>{
  const response=await request.get(`/media/builds/${id}/build-${id}-linkedin-transcript.txt`);
  expect(response.ok()).toBeTruthy();
  const downloadable=(await response.text()).replaceAll('\r\n','\n');
  await page.goto(`/100-builds/${id}/b/`);
  const visible=await page.locator('details pre').textContent();
  expect(visible?.replaceAll('\r\n','\n')).toBe(downloadable);
  const captions=await (await request.get(`/media/builds/${id}/build-${id}-linkedin-captions.vtt`)).text();
  const cues=captions.trim().split(/\n\s*\n/).filter(block=>block&&!block.startsWith('WEBVTT')).map(block=>block.split('\n').filter(line=>line&&!/^\d+$/.test(line)&&!line.includes('-->')).join(' ').trim());
  expect(cues).toHaveLength(6);
  for(let index=0;index<cues.length;index++){
   if(index)await page.getByRole('button',{name:'Next scene'}).click();
   await expect(page.locator('[aria-label*="interactive motion story"] h3')).toHaveText(cues[index]);
  }
 });
}
