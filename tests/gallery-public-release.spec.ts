import {test,expect} from '@playwright/test';

test.describe('Public gallery lifecycle',()=>{
 test('gallery explains the public program and lifecycle without internal release jargon',async({page})=>{
  await page.goto('/100-builds');
  await expect(page.getByRole('heading',{name:'THE 100 main gallery.'})).toBeVisible();
  await expect(page.getByText('3',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('ON VIEW',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('IN THE LAB',{exact:true}).first()).toBeVisible();
  await expect(page.getByText('COMING NEXT',{exact:true}).first()).toBeVisible();
  await expect(page.getByText(/No technical training required/i)).toBeVisible();
  const body=(await page.locator('body').innerText()).toUpperCase();
  for(const forbidden of ['BLOCKING','DEVICE_MANUAL','CERTIFICATION PREVIEW','ACCESSION'])expect(body).not.toContain(forbidden);
 });
 test('released, current, and future builds have distinct truthful states',async({page})=>{
  await page.goto('/100-builds');
  await expect(page.getByRole('link',{name:/Build 001: Human Review Design Framework\. ON VIEW\./})).toBeVisible();
  await expect(page.getByRole('link',{name:/Build 003: Unserved Decision Discovery Framework\. ON VIEW\./})).toBeVisible();
  await expect(page.getByRole('link',{name:/Build 004: Manual Intelligence Engine Method\. IN THE LAB\./})).toBeVisible();
  await expect(page.getByRole('link',{name:/Build 005:.*COMING NEXT\./})).toBeVisible();
 });
 test('004 room is publicly framed as lab work rather than released or planned',async({page})=>{
  await page.goto('/100-builds/004');
  await expect(page.getByText('BUILD 004 / 100 · IN THE LAB')).toBeVisible();
  await expect(page.getByText(/YOU ARE LOOKING INSIDE THE LAB/)).toBeVisible();
  await expect(page.getByRole('link',{name:/OPEN THE TOOL/})).toBeVisible();
  await expect(page.getByRole('link',{name:/ENTER THE VISUAL BUILD/})).toBeVisible();
  await expect(page.getByText(/CERTIFICATION PREVIEW/)).toHaveCount(0);
 });
 test('future room is useful without pretending artifacts exist',async({page})=>{
  await page.goto('/100-builds/005');
  await expect(page.getByText('BUILD 005 / 100 · COMING NEXT')).toBeVisible();
  await expect(page.getByText(/FROZEN CANON \/ FUTURE CYCLE/)).toBeVisible();
  await expect(page.getByText(/without pretending the artifact already exists/i)).toBeVisible();
  await expect(page.getByRole('link',{name:/OPEN THE TOOL/})).toHaveCount(0);
 });
});

test.describe('Public gallery presentation baseline',()=>{
 for(const width of [320,390,768,1280])test(`gallery has no horizontal overflow at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/100-builds');
  const geometry=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
  expect(geometry.scroll-geometry.client).toBeLessThanOrEqual(1);
 });
 test('gallery has canonical and social metadata',async({page})=>{
  await page.goto('/100-builds');
  await expect(page).toHaveTitle(/The 100 — RN Collins Public Build Exhibition/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/\/100-builds$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content','The 100 — RN Collins Public Build Exhibition');
 });
 test('primary gallery navigation is keyboard-focusable and meaningful',async({page})=>{
  await page.goto('/100-builds');
  const work=page.getByRole('link',{name:/Build 001:/});
  await work.focus();
  await expect(work).toBeFocused();
  await expect(page.getByRole('link',{name:'WORK WITH RN →'}).first()).toHaveAttribute('href','/practice');
 });
});
