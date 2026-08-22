import {test,expect} from '@playwright/test';

test('001 provides manual reduced-motion exploration instead of autoplay',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/100-builds/001/b');await expect(page.getByText(/REDUCED MOTION \/ MANUAL EXPLORATION/)).toBeVisible();await expect(page.getByRole('tab',{name:'TIMING'})).toBeVisible()});

test('002 disables audience autoplay when reduced motion is requested',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/100-builds/002/b');await expect(page.getByRole('button',{name:'MOTION REDUCED'})).toBeDisabled();const selected=page.getByRole('button',{name:'TEENAGER'});await expect(selected).toHaveAttribute('aria-pressed','true');await page.waitForTimeout(4000);await expect(selected).toHaveAttribute('aria-pressed','true')});

test('003 disables decision reveal autoplay when reduced motion is requested',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/100-builds/003/b');await expect(page.getByRole('button',{name:'MOTION REDUCED'})).toBeDisabled();await expect(page.getByRole('button',{name:/TAP THE EMPTY SPACE/})).toHaveAttribute('aria-pressed','false');await page.waitForTimeout(3800);await expect(page.getByRole('button',{name:/TAP THE EMPTY SPACE/})).toHaveAttribute('aria-pressed','false')});
