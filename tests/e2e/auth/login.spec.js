import { test, expect } from '../../fixtures/base.fixture';

test.describe('HRMS Login', () => {

    test('visiting root redirects to login page', async({ page, loginPage }) => {

        await loginPage.goto();

        await expect(page).toHaveURL(/login/i);
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.rememberMeCheckbox).toBeVisible();
        await expect(loginPage.forgotPasswordLink).toBeVisible();

        await expect(page.getByRole('link', { name: /register/i }));
    });

    test('admin can login', async ({ page, users, loginPage }) => {
        
        await loginPage.goto();

        await loginPage.loginAs(users.admin);

        await expect(page).toHaveTitle(/Dashboard/);
    });

    test('hr can login', async ({ page, users, loginPage }) => {
        
        await loginPage.goto();

        await loginPage.loginAs(users.hr);

        await expect(page).toHaveTitle(/Dashboard/);
    });

    test('payroll officer can login', async ({ page, users, loginPage }) => {
        
        await loginPage.goto();

        await loginPage.loginAs(users.payroll_officer);

        await expect(page).toHaveTitle(/Dashboard/);
    });

    test('employee can login', async ({ page, users, loginPage }) => {
        
        await loginPage.goto();

        await loginPage.loginAs(users.employee);

        await expect(page).toHaveTitle(/Dashboard/);
    });

});
