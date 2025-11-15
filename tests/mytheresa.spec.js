import { test, expect } from "@playwright/test";
import { GithubPrService } from "../src/services/githubPrService.js";
import { writePrsToCsv } from "../src/utils/csvWriter.js";
import { BasePage } from "../src/core/BasePage.ts";
import "../src/pages/HomePage.ts";
import "../src/pages/AboutPage.ts";
import "../src/pages/AccountPage.ts";
import "../src/pages/ClothingPage.ts";
import "../src/pages/ShoppingBagPage.ts";

test("Test Case 1: No console errors across main navigation flow", async ({ page }) => {
  const consoleErrors = [];
  let currentPageName = "Unknown";

  // console error listener 
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push({
        pageName: currentPageName,
        message: msg.text(),
        type: msg.type(),
      });
    }
  });

  let index = 0;

  for (const PageClass of BasePage.subclasses) {
    const instance = new PageClass(page);
    currentPageName = PageClass.name; //to get page name for logging

    index === 0 && await instance.open(); //to control the open() for each page instance
    await instance.clickHeaderItem(); //clicking corresponding header item
    await page.waitForLoadState("load");
    index++;
  }
  const pagesWithErrors = Array.from(
    new Set(consoleErrors.map((e) => e.pageName))
  );

  // error details for troubleshooting
  const errorDetails = consoleErrors
    .map((e, idx) =>
      `${idx + 1}) [${e.pageName}] ${e.type.toUpperCase()} → ${e.message}`
    ).join("\n");

  // Final assertion
  expect(
    consoleErrors.length,
    [
      "Console errors detected during navigation.",
      "",
      `Failing pages: ${pagesWithErrors.length > 0 ? pagesWithErrors.join(", ") : "N/A"
      }`,
      "",
      "Error details:",
      errorDetails || "None",
      ""
    ].join("\n")
  ).toBe(0);
});

test("Test 2: All links should return valid status codes", async ({ page, request }) => {
  const home = BasePage.create("HomePage", page);
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
  const account = BasePage.create("AccountPage", page);
  // Open login page
  await account.open();

  // Fill credentials (load from .env later)
  await account.fillCredentials(process.env.USERNAME, process.env.PASSWORD);

  // Click login button
  await account.clickLogin();

  // Verify login success (redirect or visible element)
  await page.waitForLoadState("load");

  // Welcome message expectation to check login
  expect(await account.isWelcomeMessageVisible());
});

test("Test 4:Export open PRs to CSV", async ({ request }) => {
  const service = new GithubPrService(request);
  const prs = await service.getAllOpenPullRequests();

  writePrsToCsv(prs, "open_prs.csv");

  console.log(`Generated CSV with ${prs.length} PRs`);
});
