const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('Valid login with test_user', async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/Claude_VsCode/index.html');

    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');

    await expect(page.locator('#products-section')).toBeVisible();
  });

  test('Invalid login shows error', async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/Claude_VsCode/index.html');

    await page.fill('#username', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-btn');

    await expect(page.locator('#login-error')).toBeVisible();
  });

  test('Admin login bypasses password', async ({ page }) => {
    await page.goto('file:///c:/Users/user/Desktop/Claude_VsCode/index.html');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'any_password');
    await page.click('#login-btn');

    await expect(page.locator('#products-section')).toBeVisible();
  });
});