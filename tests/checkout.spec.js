const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {
  test('Add items to cart and checkout', async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/Claude_VsCode/index.html');

    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');

    await page.click('.add-to-cart'); // Add Laptop
    await page.click('.add-to-cart-typo'); // Add Smartphone

    await page.click('#view-cart-btn');
    await page.click('#checkout-btn');

    await expect(page.locator('#success-section')).toBeVisible();
  });

  test('Attempt checkout with empty cart', async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/Claude_VsCode/index.html');

    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');

    await page.click('#view-cart-btn');
    await page.click('#checkout-btn');

    const dialog = await page.waitForEvent('dialog');
    expect(dialog.message()).toBe('Your cart is empty!');
    await dialog.dismiss();
  });
});