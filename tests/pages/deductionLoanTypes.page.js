import { expect } from "@playwright/test";

export class DeductionLoanTypesPage {
    constructor(page) {
        this.page = page;

        // Creating Loan
        this.addLoanButton = page.getByRole('link', { name: /add/i });
        this.createLoanButton = page.getByRole('button', { name: 'Create' });
        this.loanName = page.locator('[name="name"]');
        this.loanCode = page.locator('[name="code"]');
        this.loanCategory = page.locator('[name="category"]');
        this.loanNature = page.locator('[name="nature"]');

        // Editing Loan
        this.saveLoanButton = page.getByRole('button', { name: 'Save' });

        // Loan interest policy
        this.rateBasis = page.locator('[name="interest_basis"]');
        this.loanInterestMethod = page.locator('[name="interest_method"]');
        this.loanDefaultTerm = page.locator('[name="default_term_months"]');
        this.loanMaxTerm = page.locator('[name="max_term_months"]');

        // Adding interest bracket
        // this.editLink = page.getByRole('link', { name: /edit/i });
        this.loanMinAmount = page.locator('[name="min_amount"]');
        this.loanMaxAmount = page.locator('[name="max_amount"]');
        this.loanMonthlyRate = page.locator('[name="monthly_rate"]');
        this.addBracketButton = page.getByRole('button', { name: 'Add bracket' });
    }

    async goto() {
        await this.page.getByRole('link', { name: 'Deduction & Loan Types' }).click();

        // Should navigate to the designated page
        await expect(this.page).toHaveTitle(/deduction & loan types/i);
    }

    // Creating a new loan type
    async clickAddButton() {
        await this.addLoanButton.click();
    }

    async createLoan(loan) {
        await this.loanName.fill(loan.name);

        await this.loanCode.fill(loan.code);

        await this.loanCategory.selectOption(loan.category);

        await this.loanNature.selectOption(loan.nature);

        // Should show new form fields
        // Only Loan nature has Loan Interest Policy
        if (loan.nature === 'Loan') {
            await expect(this.page.getByText('Loan interest policy Rate')).toBeVisible();

            await this.loanInterestMethod.selectOption(loan.interestMethod);
            await this.loanDefaultTerm.fill(loan.defaultTerm);
            await this.loanMaxTerm.fill(loan.maxTerm);
        }
        await this.createLoanButton.click();
    }

    // Editing an existing loan type
    async editLoan(name, updates = {}) {
        const row = this.page.getByRole('row').filter({
            has: this.page.getByRole('cell', { name }),
        });

        await expect(row).toBeVisible();

        await row.getByRole('link', { name: /edit/i }).click();

        // Only update fields that were provided
        // Basic fields
        if (updates.name !== undefined) {
            await this.loanName.fill(updates.name);
        }

        if (updates.code !== undefined) {
            await this.loanCode.fill(updates.code);
        }

        if (updates.category !== undefined) {
            await this.loanCategory.selectOption(updates.category);
        }

        // Change nature first if requested
        if (updates.nature !== undefined) {
            await this.loanNature.selectOption(updates.nature);
        }

        // Read the CURRENT nature after any requested change
        const currentNature = await this.loanNature.inputValue();

        // Only Loan nature should have the Loan Interest Policy
        if (currentNature === 'loan') {
            await expect(this.page.getByText('Loan interest policy Rate')).toBeVisible();
        }

        // Loan-specific fields
        const hasLoanUpdates =
            updates.rateBasis !== undefined ||
            updates.interestMethod !== undefined ||
            updates.defaultTerm !== undefined ||
            updates.maxTerm !== undefined;

        if (hasLoanUpdates) {
            // This handles both:
            // 1. Existing Loan where nature wasn't supplied
            // 2. Fixed -> Loan where nature was just changed
            if (currentNature !== 'Loan') {
                throw new Error(
                    `Cannot update Loan interest policy fields because loan nature is "${currentNature}".`
                );
            }

            await expect(this.rateBasis).toBeVisible();
            await expect(this.loanInterestMethod).toBeVisible();
            await expect(this.loanDefaultTerm).toBeVisible();
            await expect(this.loanMaxTerm).toBeVisible();
        }

        if (updates.rateBasis !== undefined) {
            await this.rateBasis.selectOption(updates.rateBasis);
        }

        if (updates.interestMethod !== undefined) {
            await this.loanInterestMethod.selectOption(
                updates.interestMethod
            );
        }

        if (updates.defaultTerm !== undefined) {
            await this.loanDefaultTerm.fill(
                updates.defaultTerm
            );
        }

        if (updates.maxTerm !== undefined) {
            await this.loanMaxTerm.fill(
                updates.maxTerm
            );
        }
    }

    // Save loan
    async saveLoan() {
        await this.saveLoanButton.click();
    }

    // Expect a loan row to be visible with the expected values
    async expectLoanRow(name, expectedValues = {}) {
        const row = this.page.getByRole('row').filter({
            has: this.page.getByRole('cell', { name }),
        });

        await expect(row).toBeVisible();

        if (expectedValues.name !== undefined) {
            await expect(row.getByRole('cell', { name: new RegExp(`^${expectedValues.name}$`, 'i'),})).toBeVisible();
        }

        if (expectedValues.code !== undefined) {
            await expect(row.getByRole('cell', { name: new RegExp(`^${expectedValues.code}$`, 'i'),})).toBeVisible();
        }

        if (expectedValues.category !== undefined) {
            await expect(row.getByRole('cell', { name: new RegExp(`^${expectedValues.category}$`, 'i'),})).toBeVisible();
        }

        if (expectedValues.nature !== undefined) {
            await expect(row.getByRole('cell', { name: new RegExp(`^${expectedValues.nature}$`, 'i'),})).toBeVisible();
        }
    }

    // Expect the interest brackets section to be visible
    async expectInterestBracketsSection() {
        await expect(this.page.getByText('Interest Brackets Rate (')).toBeVisible();
    }

    // Adding interest bracket to a loan type
    async addInterestBracket(bracket) {
        await this.loanMinAmount.fill(bracket.min);

        if (bracket.max) {
            await this.loanMaxAmount.fill(bracket.max);
        }

        await this.loanMonthlyRate.fill(bracket.rate);

        await this.addBracketButton.click();
    }

    // Expect the first interest bracket in the table
    async expectFirstBracket(min, max, rate) {

        const row = this.page.locator('tbody tr').first();

        await expect(row).toBeVisible();

        await expect(row.getByRole('cell').nth(0)).toHaveText(min);
        await expect(row.getByRole('cell').nth(1)).toHaveText(max);
        await expect(row.getByRole('cell').nth(2)).toHaveText(rate);
        await expect(row.getByRole('button', { name: 'Remove' })).toBeVisible();
    }

    // Remove the first interest bracket in the table
    async removeFirstBracket() {

        const row = this.page.locator('tbody tr').first();

        await row.getByRole('button', { name: 'Remove' }).click();
    }

    // Confirm the removal of an interest bracket
    async confirmRemoveBracket() {
        await expect(
            this.page
                .locator('div')
                .filter({ hasText: 'Remove Interest Bracket' })
                .nth(1)
        ).toBeVisible();

        await this.page.locator('#confirmDeleteConfirm').click();
    }

}