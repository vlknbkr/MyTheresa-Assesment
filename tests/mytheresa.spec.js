import { test, expect } from "@playwright/test";
import { GithubPrService } from "../src/services/githubPrService.js";
import { writePrsToCsv } from "../src/utils/csvWriter.js";
import { HomePage } from "../src/pages/HomePage.ts";
import { LoginPage } from "../src/pages/LoginPage.ts";

test("Test Case 1: No console errors across main navigation flow", async ({ page }) => {
  const consoleErrors = [];

  // Listen globally for console errors during the whole flow
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push({
        pageName: "unknown",
        message: msg.text(),
      });
    }
  });

  // tagError to get current page name
  const tagErrors = (pageName) => {
    for (const err of consoleErrors) {
      if (err.pageName === "unknown") {
        err.pageName = pageName;
      }
    }
  };

  const home = new HomePage(page)

  // Open Home page
  await home.open();
  await page.waitForLoadState("load");
  tagErrors("Home");

  // Navigate to About page
  await home.clickAboutButton();
  await page.waitForLoadState("load");
  tagErrors("About");

  // Navigate to Login page
  await home.clicAccountButton();
  await page.waitForLoadState("load");
  tagErrors("Account");

  // Navigate to Clothing page
  await home.clickClotingButton();
  await page.waitForLoadState("load");
  tagErrors("Clothing");



  // Navigate to Shopping Bag page
  await home.clickShoppingBagButton();
  await page.waitForLoadState("load");
  tagErrors("Clothing");


  // Console error assertion
  if (consoleErrors.length > 0) {
    const formatted = consoleErrors
      .map((e) => `[${e.pageName}] ${e.message}`)
      .join("\n");
    throw new Error(
      `Console errors detected during navigation:\n${formatted}`
    );
  }

  expect(
    consoleErrors.length,
    "No console errors should appear on any visited page"
  ).toBe(0);
});


test("Test 2: All homepage links should return valid status codes", async ({ page, request }) => {
  const home = new HomePage(page);
  await home.open();

  const links = await home.getAllLinks();
  links.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
  });
  console.log(`Found ${links.length} links`);

  const brokenLinks = [];

  for (const url of links) {
    const res = await request.get(url);
    const status = res.status();

    if (status >= 400) {
      brokenLinks.push({ url, status });
      console.warn(`${url} -> ${status}`);
    }
  }

  expect(brokenLinks, `Broken links found:\n${brokenLinks.map(l => `${l.url} (${l.status})`).join("\n")}`)
    .toEqual([]);
});


test("Test 3: Successful login should redirect to home or account page", async ({ page }) => {
  const login = new LoginPage(page);

  // Open login page
  await login.open();

  // Fill credentials (load from .env later)
  await login.fillCredentials(process.env.USERNAME, process.env.PASSWORD);

  // Click login button
  await login.clickLogin();

  // Verify login success (redirect or visible element)
  await page.waitForLoadState("load");

  // Welcome message expectation to check login
  expect(await login.isWelcomeMessageVisible());
});

test("Test 4:Export open PRs to CSV", async ({ request }) => {
  const service = new GithubPrService(request);
  const prs = await service.getOpenPullRequests();

  writePrsToCsv(prs, "open_prs.csv");

  console.log(`Generated CSV with ${prs.length} PRs`);
});