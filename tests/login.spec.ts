import { test, expect } from "../src/fixtures/fixtures";

[
    { testname: "Wrong Username", username: "test", password: "fashion123", isErrorMessageDisplayed: true },
    { testname: "Wrong Password", username: "demouser", password: "wrongPassword", isErrorMessageDisplayed: true },
    { testname: "Successful Login", username: "demouser", password: "fashion123", isErrorMessageDisplayed: false },
].forEach(({ testname, username, password, isErrorMessageDisplayed }) => {
    test(`Test 3: login test - ${testname}`, async ({ accountPage }) => {
        await accountPage.open();
        await accountPage.fillCredentials(username, password);
        await accountPage.clickLogin();
        if (isErrorMessageDisplayed) {
            expect(await accountPage.isErrorMessageVisible()).toBeTruthy();
        } else {
            expect(await accountPage.isWelcomeMessageVisible()).toBeTruthy();
        }
    });
})


