import {test,expect} from '@playwright/test';

const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
const cues=(text:string)=>text.replace(/\r/g,'').trim().split(/\n\n+/).filter(b=>b&&!b.startsWith('WEBVTT')).map(b=>b.split('\n').slice(2).join('\n').trim()).filter(Boolean);

for(const id of ids)test(`Build ${id} transcript and motion derive from published media`,async({page,request})=>{
 const [tr,vtt,mp4,poster]=await Promise.all([
  request.get(`/media/build-${id}-linkedin-transcript.txt`),
  request.get(`/media/build-${id}-linkedin-captions.vtt`),
  request.get(`/media/build-${id}-linkedin.mp4`),
  request.get(`/media/build-${id}-linkedin-poster.png`)
 ]);
 for(const r of [tr,vtt,mp4,poster])expect(r.ok()).toBeTruthy();
 const transcript=(await tr.text()).replace(/\r\n/g,'\n').trim();
 const scenes=cues(await vtt.text());
 expect(scenes).toHaveLength(6);
 await page.goto(`/100-builds/${id}/b`);
 const details=page.locator('details').filter({hasText:'Read the film transcript'});
 await details.locator('summary').click();
 expect((await details.locator('pre').innerText()).replace(/\r\n/g,'\n').trim()).toBe(transcript);
 for(const scene of scenes)await expect(page.getByText(scene,{exact:true}).first()).toBeAttached();
});
