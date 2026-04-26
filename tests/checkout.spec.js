const { test, expect } = require('@playwright/test');
const path = require('path');

// Resolve the path to index.html relative to this test file
const indexUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe('Checkout Tests', () => {
  test('Add items to cart and checkout', async ({ page }) => {
    await page.goto(indexUrl);

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
    await page.goto(indexUrl);

    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');

    await page.click('#view-cart-btn');
    const dialogPromise = page.waitForEvent('dialog');
    await page.click('#checkout-btn');
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Your cart is empty!');
    await dialog.dismiss();
  });
});