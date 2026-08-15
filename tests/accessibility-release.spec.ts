import {test,expect} from '@playwright/test';

for(const id of ['001','002','003','004']){
 test.describe(`Build ${id} automated accessibility baseline`,()=>{
  for(const side of ['a','b']){
   test(`${side.toUpperCase()} has no horizontal overflow at narrow viewport and interactive elements are named`,async({page})=>{
    await page.setViewportSize({width:320,height:800});
    await page.goto(`/100-builds/${id}/${side}`);
    const geometry=await page.evaluate(()=>{const vw=document.documentElement.clientWidth;const sw=document.documentElement.scrollWidth;const offenders=[...document.querySelectorAll('*')].map(el=>{const node=el as HTMLElement;const r=node.getBoundingClientRect();return {tag:node.tagName.toLowerCase(),id:node.id,cls:typeof node.className==='string'?node.className:'',left:Math.round(r.left*10)/10,right:Math.round(r.right*10)/10,width:Math.round(r.width*10)/10,scrollWidth:node.scrollWidth,clientWidth:node.clientWidth}}).filter(x=>x.right>vw+1||x.left<-1).sort((a,b)=>(b.right-vw)-(a.right-vw)).slice(0,12);return {vw,sw,overflow:sw-vw,offenders}});
    expect(geometry.overflow,JSON.stringify(geometry,null,2)).toBeLessThanOrEqual(1);
    const controls=page.locator('button, a, input, textarea, select');
    const count=await controls.count();
    for(let i=0;i<count;i++){
      const el=controls.nth(i); if(!(await el.isVisible()))continue;
      const name=await el.evaluate(node=>{
        const direct=node.getAttribute('aria-label')||node.getAttribute('title')||'';
        if(direct.trim())return direct;
        const labelledBy=node.getAttribute('aria-labelledby');
        if(labelledBy){const text=labelledBy.split(/\s+/).map(id=>document.getElementById(id)?.textContent||'').join(' ').trim();if(text)return text}
        if(node instanceof HTMLInputElement||node instanceof HTMLTextAreaElement||node instanceof HTMLSelectElement){const labels=[...(node.labels||[])].map(label=>label.textContent||'').join(' ').trim();if(labels)return labels}
        return (node.textContent||node.getAttribute('name')||node.id||'').trim();
      });
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
