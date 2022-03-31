const { test, expect } = require('@playwright/test');

test('test if website is live', async ({ page }) => {
  await page.goto('https://martys.quanglam2807.com/');
  await expect(page.locator('text=Sign in with Luther account')).toHaveCount(1);
});
