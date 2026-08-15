import {test,expect} from '@playwright/test';

for(const id of ['001','002','003']){
 test.describe(`Build ${id} automated accessibility baseline`,()=>{
  for(const side of ['a','b']){
   test(`${side.toUpperCase()} has no horizontal overflow at narrow viewport and interactive elements are named`,async({page})=>{
    await page.setViewportSize({width:320,height:800});
    await page.goto(`/100-builds/${id}/${side}`);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const controls=page.locator('button, a, input, textarea, select');
    const count=await controls.count();
    for(let i=0;i<count;i++){
      const el=controls.nth(i); if(!(await el.isVisible()))continue;
      const name=(await el.getAttribute('aria-label'))||(await el.textContent())||(await el.getAttribute('name'))||(await el.getAttribute('id'))||'';
      expect(name.trim().length).toBeGreaterThan(0);
    }
   });
  }
 });
}
