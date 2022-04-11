const { test, expect } = require('@playwright/test');

test('test if users can make orders', async ({ page }) => {
  // Go to https://martys.quanglam2807.com/
  await page.goto('https://martys.quanglam2807.com/');

  // Click text=Sign in with Luther account
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://accounts.google.com/o/oauth2/auth/identifier?response_type=code&client_id=816295740024-0ds2k9vmhsbcl25ka49u16nhh956h9tc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fsenior-project-62fa0.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDlTweGQM0a4VPgt8KfIVeDBgkkgSb2A_Lo-oBzNhcBgntU6NOqkZNxO-hjwzoXmDtbUjswk23XZjuWCDI8pNAtJfHDbT-5cwEqRRlbFuTYEhdYL1-RdV0z5FM4iGwv37wY7kzo9SL3aTcJQ4ZUxmnB8Ru-0A_UinBco8gegF4OyNsNFmYkvU-P3XKuf0l7gRwsL30Ky83YGgSRxGTcGSVMSxt23yAt5OPYj6A58__1iYkuWUmmQvkL6ROnNMo7lnwQID-jhjzDwPsXGJPhGMduw26my_Kce5kVvzGRZsZG8k5VknKgQ7ZZZOh1rJjaRmudfBVq6VAGAPKVX&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=https%3A%2F%2Fmartys.quanglam2807.com&flowName=GeneralOAuthFlow' }*/),
    page.locator('text=Sign in with Luther account').click()
  ]);

  // Fill [aria-label="Email or phone"]
  await page.locator('[aria-label="Email or phone"]').fill('test.martys.senior.project@gmail.com');

  // Click button:has-text("Next")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://accounts.google.com/signin/v2/challenge/pwd?response_type=code&client_id=816295740024-0ds2k9vmhsbcl25ka49u16nhh956h9tc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fsenior-project-62fa0.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDlTweGQM0a4VPgt8KfIVeDBgkkgSb2A_Lo-oBzNhcBgntU6NOqkZNxO-hjwzoXmDtbUjswk23XZjuWCDI8pNAtJfHDbT-5cwEqRRlbFuTYEhdYL1-RdV0z5FM4iGwv37wY7kzo9SL3aTcJQ4ZUxmnB8Ru-0A_UinBco8gegF4OyNsNFmYkvU-P3XKuf0l7gRwsL30Ky83YGgSRxGTcGSVMSxt23yAt5OPYj6A58__1iYkuWUmmQvkL6ROnNMo7lnwQID-jhjzDwPsXGJPhGMduw26my_Kce5kVvzGRZsZG8k5VknKgQ7ZZZOh1rJjaRmudfBVq6VAGAPKVX&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=https%3A%2F%2Fmartys.quanglam2807.com&flowName=GeneralOAuthFlow&cid=1&navigationDirection=forward&TL=AM3QAYb1xMzvJaAQZ3Ixgw4x7P1w3H7n0NwyKPu72P-gUtTpjgR93Xf1wWi3Gyfd' }*/),
    page.locator('button:has-text("Next")').click()
  ]);

  // Click [aria-label="Enter your password"]
  await page.locator('[aria-label="Enter your password"]').click();

  // Fill [aria-label="Enter your password"]
  await page.locator('[aria-label="Enter your password"]').fill('16PurpleGeese');

  // Click button:has-text("Next")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://martys.quanglam2807.com/user' }*/),
    page.locator('button:has-text("Next")').click(),
  ]);

  // Click text=Burgers
  await page.locator('text=Burgers').click();

  // Click text=Bacon Cheeseburger$5.4 | 613 caloriesAdd to Cart >> button
  await page.locator('text=Bacon Cheeseburger$5.4 | 613 caloriesAdd to Cart >> button').click();

  // Click text=Drinks
  await page.locator('text=Drinks').click();

  // Click text=Fountain Soda 16oz.$1.55 | 220 caloriesAdd to Cart >> button
  await page.locator('text=Fountain Soda 16oz.$1.55 | 220 caloriesAdd to Cart >> button').click();

  // Click [aria-label="check out"]
  await page.locator('[aria-label="check out"]').click();
  await expect(page).toHaveURL('https://martys.quanglam2807.com/user/checkout');

  // Click text=Make Order
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://martys.quanglam2807.com/user/orders' }*/),
    page.locator('text=Make Order').click()
  ]);
});
