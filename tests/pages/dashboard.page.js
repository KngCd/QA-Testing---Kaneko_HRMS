export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.profileMenu = page.getByRole('link', { name: 'Profile' });
        this.profileDropdown = page.getByRole('button', { name: /super admin/i });

        this.logoutButton = page.getByRole('link', { name: /log out/i });
    }

    async logout() {
        await this.profileMenu.click();
        await this.profileDropdown.click();
        await this.logoutButton.click();
    }
}