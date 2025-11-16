# MyTheresa Assessment – Playwright Automation Framework

This repository contains a modular, scalable automation framework built with **Playwright**, **TypeScript**, and a **Page Object Model**.  
It is designed for professional E2E test development, CI/CD execution, and multi-environment support.

---

## Key Features

### Playwright Test Framework
- Cross‑browser execution (Chromium, Firefox, WebKit).
- Page Object Model structure.

### Multi‑Environment Support (`.env`)
- Dedicated `.env` files for:
  - **production**
  - **staging**
  - **development**
- The framework loads the correct environment based on `TEST_ENV`.
- Default environment: **production**

### CI/CD Integration
- Fully compatible with Jenkins pipelines.
- Includes example Jenkinsfile with:
  - Source checkout
  - Demo app container startup (Docker)
  - Dependency installation
  - Test execution
  - Report archiving

---

## Project Structure

```
/src
  /core
    BasePage.ts
    RegisterSubclass.ts
  /pages
    HomePage.ts
    AboutPage.ts
    ...
/tests
  mytheresa.spec.js
/playwright-report
/​environment files (.env.production, .env.development, .env.staging)
```

---

## Setup Instructions

### 1. Install Dependencies
Node.js v16 or newer is required.

```
npm install
```

### 2. Install Playwright Browsers
```
npx playwright install --with-deps
```

---

## Environment Configuration

Create or edit your environment files:

### `.env.production`
```
USERNAME=demouser
PASSWORD=fashion123
BASE_URL=https://pocketaces2.github.io/fashionhub/
```

### `.env.staging`
```
USERNAME=demouser
PASSWORD=fashion123
BASE_URL=https://staging.example.com
```

### `.env.development`
```
USERNAME=demouser
PASSWORD=fashion123
BASE_URL=http://localhost:4000/fashionhub/
```

### Select environment before running tests:
```
ENV=PROD npx playwright test
ENV=DEV npx playwright test
ENV=STAGING npx playwright test
```

Default environment is **prodcution**.

---

### Select a Browser
Playwright allows running tests on specific browsers.

```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

To run in headed mode:

```
npx playwright test --project=chromium --headed
```

## Running Tests

### Run all tests
```
npx playwright test
```

### Run in headed mode
```
npx playwright test --headed
```

### Show last HTML report
```
npx playwright show-report
```

---

## Test Scenarios Included

### **Test Case 1 — Console Error Scan**
- Navigates each registered page (auto‑discovered).
- Captures console errors with page context.
- Provides detailed failure logs including:
  - page name
  - error type
  - error message

### **Test Case 2 — Homepage Link Status Validation**
- Scans all anchor tags.
- Ensures no broken or redirect loops.

### **Test Case 3 — Login Redirection**
- Valid login attempt.
- Confirms correct redirect behavior.

### **Test Case 4 — Export Open PRs**
- Request Github API 
- Export the open PRs to the open_prs.csv file at root.

---


