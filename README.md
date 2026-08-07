![Playwright Tests](https://github.com/KngCd/QA-Testing---Kaneko_HRMS/actions/workflows/playwright.yml/badge.svg)
# Kaneko HRMS - Playwright Automation

Automated End-to-End (E2E) testing framework for the **Kaneko HRMS** web application using **Playwright** and **JavaScript**.

This project follows a fixture-based Page Object Model (POM) architecture to provide a scalable and maintainable foundation for automating HRMS workflows and regression testing.

---

# Tech Stack

- Playwright
- JavaScript (ES Modules)
- Node.js

---

# Project Structure

```
tests/
│
├── data/
│   ├── hrms-users.json
│   ├── interests-data.json
│   └── loan-types.json
│
├── e2e/
│   ├── auth/
│   ├── loans/
│   └── ...
│
├── fixtures/
│   └── base.fixture.js
│
├── pages/
│   ├── dashboard.page.js
│   ├── deductionLoanTypes.page.js
│   ├── login.page.js
│   └── ...
│
└── utils/
```

---

# Features

- Fixture-based Page Object Model (POM)
- JSON-driven test data
- Reusable page objects
- Cross-browser testing
- Multi-user authentication fixtures
- Environment-based configuration
- Playwright HTML reports

---

# Installation

Clone the repository.

```bash
git clone [<repository-url>](https://github.com/KngCd/QA-Testing---Kaneko_HRMS.git)
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
# Application URL
BASE_URL=https://kuboware.com/HumanResourceManagementSystem/public/login

# Admin Account
ADMIN_USERNAME=
ADMIN_PASSWORD=

# HR Account
HR_USERNAME=
HR_PASSWORD=

# Payroll Officer
PAYROLL_OFFICER_USERNAME=
PAYROLL_OFFICER_PASSWORD=

# Employee
EMPLOYEE_USERNAME=
EMPLOYEE_PASSWORD=
```

Replace `BASE_URL` with the appropriate Kaneko HRMS environment.

---

# Running Tests

Run all tests

```bash
npm test
```

Run in headed mode

```bash
npm run test:headed
```

Run using the Playwright UI

```bash
npm run test:ui
```

Run in debug mode

```bash
npm run test:debug
```

---

# Browser-Specific Execution

### Google Chrome

```bash
npm run test:chrome
```

```bash
npm run test:chrome:headed
```

### Firefox

```bash
npm run test:firefox
```

```bash
npm run test:firefox:headed
```

### WebKit

```bash
npm run test:webkit
```

```bash
npm run test:webkit:headed
```

### Microsoft Edge

```bash
npm run test:msedge
```

```bash
npm run test:msedge:headed
```

---

# Test Reports

Open the latest Playwright HTML report.

```bash
npm run report
```

---

# Framework Design

This project follows a **Fixture-Based Page Object Model (POM)** architecture.

- **Fixtures** provide reusable setup and inject page objects into tests.
- **Page Objects** encapsulate page locators and user interactions.
- **Test Files** define business scenarios and assertions.
- **JSON Files** store reusable test data and test inputs.
- **Environment Variables** manage application URLs and user credentials.

This separation improves code readability, maintainability, and scalability as the test suite grows.

---

# Notes

- Test data is stored under `tests/data/`.
- User credentials are loaded securely from the `.env` file.
- The project is under active development, and additional test scenarios and modules will be added over time.

---

# Author

Developed for **Kaneko HRMS** QA Automation.
