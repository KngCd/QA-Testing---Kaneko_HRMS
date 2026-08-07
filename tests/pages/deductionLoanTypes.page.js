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
        await expect(this.page.getByText('Loan interest policy Rate')).toBeVisible();

        await this.loanInterestMethod.selectOption(loan.interestMethod);

        await this.loanDefaultTerm.fill(loan.defaultTerm);

        await this.loanMaxTerm.fill(loan.maxTerm);

        await this.createLoanButton.click();
    }

    // Adding interest bracket to a loan type
    async editLoan(name) {
        const row = this.page.getByRole('row').filter({
            has: this.page.getByRole('cell', { name }),
        });

        await expect(row).toBeVisible();

        await row.getByRole('link', { name: /edit/i }).click();

        // Should show the interest bracket section
        await expect(this.page.getByText('Interest Brackets Rate (')).toBeVisible();
    }

    async addInterestBracket(bracket) {
        await this.loanMinAmount.fill(bracket.min);

        if (bracket.max) {
            await this.loanMaxAmount.fill(bracket.max);
        }

        await this.loanMonthlyRate.fill(bracket.rate);

        await this.addBracketButton.click();
    }

    async expectFirstBracket(min, max, rate) {

        const row = this.page.locator('tbody tr').first();

        await expect(row).toBeVisible();

        await expect(row.getByRole('cell').nth(0)).toHaveText(min);
        await expect(row.getByRole('cell').nth(1)).toHaveText(max);
        await expect(row.getByRole('cell').nth(2)).toHaveText(rate);
        await expect(row.getByRole('button', { name: 'Remove' })).toBeVisible();
    }

    async removeFirstBracket() {

        const row = this.page.locator('tbody tr').first();

        await row.getByRole('button', { name: 'Remove' }).click();
    }

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