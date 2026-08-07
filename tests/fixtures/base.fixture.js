import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.page.js';
import { DeductionLoanTypesPage } from '../pages/deductionLoanTypes.page.js';

export const test = base.extend({

    users: async ({ }, use) => {
        await use({
            admin: {
                username: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD,
            },
            hr: {
                username: process.env.HR_USERNAME,
                password: process.env.HR_PASSWORD,
            },
            payroll_officer: {
                username: process.env.PAYROLL_OFFICER_USERNAME,
                password: process.env.PAYROLL_OFFICER_PASSWORD,
            },
            employee: {
                username: process.env.EMPLOYEE_USERNAME,
                password: process.env.EMPLOYEE_PASSWORD,
            },
        });
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    deductionLoanTypesPage: async ({ page }, use) => {
        await use(new DeductionLoanTypesPage(page));
    }

});

export { expect };