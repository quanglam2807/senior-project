const { test, expect } = require('@playwright/test');

test('test if website is live', async ({ page }) => {
  await page.goto('https://martys.quanglam2807.com/user');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
