import { test, expect } from "@playwright/test";
import { BasePage } from "../src/core/BasePage";
import "../src/pages/AccountPage";

test("Test 3: Successful login should redirect to home or account page", async ({ page }) => {
    const account = BasePage.create("AccountPage", page);
    // Open login page
    await account.open();

    // Fill credentials (load from .env later)
    await account.fillCredentials(process.env.USERNAME!, process.env.PASSWORD!);

    // Click login button
    await account.clickLogin();

    // Verify login success (redirect or visible element)
    await page.waitForLoadState("load");

    // Welcome message expectation to check login
    expect(await account.isWelcomeMessageVisible()).toBe(true);
});
