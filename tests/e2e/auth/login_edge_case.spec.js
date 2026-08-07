import { log } from 'node:console';
import { test, expect } from '../../fixtures/base.fixture';

test.describe('Login Edge Cases', () => {

    test('should show error for invalid credentials', async ({ page, users, loginPage }) => {

        await loginPage.goto();
        await loginPage.loginAs(users.admin, 'Wrong Password');

        await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
    });

    test('locks account after five failed login attempts', async ({ page, users, loginPage }) => {

        await loginPage.goto();

        for(let i = 0; i < 5; i++) {
            await loginPage.loginAs(users.admin, 'Wrong Password');
        }

        await expect(page.getByText(/Too many login attempts/i)).toBeVisible;

    });

});