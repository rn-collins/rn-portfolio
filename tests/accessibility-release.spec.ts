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

test('001-B inactive aria-hidden scenes do not expose focusable controls',async({page})=>{
 await page.goto('/100-builds/001/b');
 await page.getByRole('button',{name:'Pause'}).click();
 const exposed=await page.locator('.motion-scene[aria-hidden="true"] button, .motion-scene[aria-hidden="true"] a, .motion-scene[aria-hidden="true"] input, .motion-scene[aria-hidden="true"] select, .motion-scene[aria-hidden="true"] textarea').evaluateAll((els)=>els.filter(el=>{const node=el as HTMLElement;const style=getComputedStyle(node);return style.visibility!=='hidden'&&style.display!=='none'&&node.tabIndex>=0}).length);
 expect(exposed).toBe(0);
});
