import { test, expect } from '../../fixtures/base.fixture';

test.describe('HRMS Logout', () => {

    test('user can logout', async ({ page, users, loginPage, dashboardPage }) => {
        await loginPage.goto();
        await loginPage.loginAs(users.admin);

        await dashboardPage.logout();

        await expect(page).toHaveURL(/login/i);
    });

    test('back button should not restore authenticated session', async ({ page, users, loginPage, dashboardPage }) => {

        await loginPage.goto();

        await loginPage.loginAs(users.admin);
        await dashboardPage.logout();

        await page.goBack();

        await expect(page).toHaveURL(/login/i);
    });

    test('cannot access dashboard after logout', async ({ page, users, loginPage, dashboardPage }) => {

        await loginPage.goto();

        await loginPage.loginAs(users.admin);
        await dashboardPage.logout();

        await page.goto(`${process.env.BASE_URL}/dashboard`);

        await expect(page).toHaveURL(/login/i);
    });

});