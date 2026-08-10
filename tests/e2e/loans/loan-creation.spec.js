import { test, expect } from '../../fixtures/base.fixture';
import loanTypes from '../../data/loan-types.json' with { type: 'json' };

const loan = loanTypes.deductionLoanType;
const editLoan = loanTypes.editDeductionLoanType;
const brackets = loanTypes.interestBrackets;

test.describe('Loan Creation Tests', () => {

    test.beforeEach(async ({ page, users, loginPage }) => {
        await loginPage.goto();
        await loginPage.loginAs(users.admin);

        await expect(page).toHaveTitle(/dashboard/i);
    });

    test('should create new deduction/loan types', async ({ deductionLoanTypesPage, page }) => {

        await deductionLoanTypesPage.goto();

        await deductionLoanTypesPage.clickAddButton();

        // Fill the form fields
        await deductionLoanTypesPage.createLoan(loan);

        // Should add the new deduction / loan type in the table
        const row = page.getByRole('row').filter({
            has: page.getByRole('cell', { name: loan.name })
        });

        await expect(row).toBeVisible();
        await expect(row).toContainText(loan.code);
    })

    // Pre-requisite: Test 1 should be successful
    test('should add interest brackets to a loan type', async ({ deductionLoanTypesPage, page }) => {

        await deductionLoanTypesPage.goto();
        await deductionLoanTypesPage.editLoan('ECU LOAN IV');
        await deductionLoanTypesPage.expectInterestBracketsSection();

        await deductionLoanTypesPage.addInterestBracket(brackets.valid);

        await expect(page.getByRole('main').getByText(brackets.valid.successMessage)).toBeVisible();

        await deductionLoanTypesPage.expectFirstBracket('0.00', 'and above', '1%');
    });

    /*
        NEGATIVE TEST CASE
    */

    // Pre-requisite: Test 2 should be successful
    test('should reject invalid brackets', async ({ deductionLoanTypesPage, page }) => {

        await deductionLoanTypesPage.goto();

        await deductionLoanTypesPage.editLoan('ECU LOAN IV');
        await deductionLoanTypesPage.expectInterestBracketsSection();

        // Overlapping range
        await deductionLoanTypesPage.addInterestBracket(brackets.overlappingRange)
        await expect(page.getByRole('listitem').getByText(brackets.overlappingRange.expectedError)).toBeVisible();
        
        // Invalid range
        await deductionLoanTypesPage.addInterestBracket(brackets.invalidRange)
        await expect(page.getByRole('listitem').getByText(brackets.invalidRange.expectedError)).toBeVisible();
        
        // Invalid rate
        await deductionLoanTypesPage.addInterestBracket(brackets.invalidRate)
        await expect(page.getByRole('listitem').getByText(brackets.invalidRate.expectedError)).toBeVisible();
    });

    /*
        END NEGATIVE TEST CASE
    */

    // Pre-requisite: Test 2 should be successful
    test('should remove an interest bracket', async ({ deductionLoanTypesPage, page }) => {
        await deductionLoanTypesPage.goto();

        await deductionLoanTypesPage.editLoan('ECU LOAN IV');
        await deductionLoanTypesPage.expectInterestBracketsSection();
        
        // Remove the first interest bracket
        await deductionLoanTypesPage.expectFirstBracket('0.00', 'and above', '1%');
        await deductionLoanTypesPage.removeFirstBracket();

        // Verify the confirmation message
        await deductionLoanTypesPage.confirmRemoveBracket();

        await expect(page.getByRole('main').getByText(brackets.remove.successMessage)).toBeVisible();
    });

    test('should change the loan nature when updated', async({ deductionLoanTypesPage, page }) => {
        
        await deductionLoanTypesPage.goto();
        await page.pause();
        await deductionLoanTypesPage.editLoan('Coop Dues', { nature: editLoan.nature });

        // Save the updated loan
        await deductionLoanTypesPage.saveLoan();

        await expect(page.getByRole('main').getByText(editLoan.successMessage)).toBeVisible();

        await deductionLoanTypesPage.expectLoanRow(editLoan.name, { nature: editLoan.nature });
    });

});