// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
// Load .env variables

dotenv.config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// Environment → URL mapping
const ENV_URLS = {
  local: "http://localhost:4000/fashionhub/",
  staging: "https://staging-env/fashionhub/",
  prod: "https://pocketaces2.github.io/fashionhub/",
};

// 1) CLI arg: --env=staging
function getEnvFromCli() {
  const arg = process.argv.find((a) => a.startsWith("--env="));
  if (!arg) return undefined;
  return arg.split("=")[1];
}

// 2) .env → TEST_ENV
function getEnvFromDotenv() {
  return process.env.TEST_ENV;
}

// 3) Resolve final environment
function resolveEnvironment() {
  const cliEnv = getEnvFromCli();
  const envFileEnv = getEnvFromDotenv();

  const envName = (cliEnv || envFileEnv || "prod").toLowerCase();

  // BASE_URL override (optional)
  if (process.env.BASE_URL) {
    console.log(`Using BASE_URL from .env (env=${envName}) → ${process.env.BASE_URL}`);
    return { envName, baseURL: process.env.BASE_URL };
  }

  const baseURL = ENV_URLS[envName] || ENV_URLS["prod"];

  console.log(`Using environment: ${envName} → ${baseURL}`);
  return { envName, baseURL };
}

const { envName, baseURL } = resolveEnvironment();  

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

