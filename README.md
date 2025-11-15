# MyTheresa-Assesment
MyTheresa demo project repo

## Setup Instructions

### Prerequisites
- Ensure you have Node.js (v16 or higher) installed.
- Install dependencies by running:
  ```bash
  npm install
  ```

### Running Tests
This project uses Playwright for end-to-end testing. To execute the tests, run:
```bash
npx playwright test
```

### Environment Variables
- Create a `.env` file in the root directory to manage environment-specific variables.
- Refer to the `dotenv` package documentation for usage.

### Folder Structure
- `src/`: Contains core application logic, locators, and page objects.
- `tests/`: Contains Playwright test specifications.
- `playwright-report/`: Stores test execution reports.

### Additional Notes
- Update the `scripts` section in `package.json` to include custom commands for building or running the project.
