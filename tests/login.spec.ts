import { test, expect } from "../src/myFixtures/fixtures";

test("Test 3: Successful login should redirect to home or account page", async ({ accountPage, page }) => {
    // Open login page
    await accountPage.open();

    // Fill credentials (load from .env later)
    await accountPage.fillCredentials(process.env.USERNAME!, process.env.PASSWORD!);

    // Click login button
    await accountPage.clickLogin();

    // Verify login success (redirect or visible element)
    await page.waitForLoadState("load");

    // Welcome message expectation to check login
    expect(await accountPage.isWelcomeMessageVisible()).toBe(true);
});
