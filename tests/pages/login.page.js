export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel(/username|email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.rememberMeCheckbox = page.getByLabel(/remember/i);
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot your password/i});
    this.loginButton = page.getByRole('button', { name: /log in|sign in/i });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL || '/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async loginAs(user, password = user.password) {
    await this.login(user.username, password);
  }
}
