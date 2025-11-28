import { test, expect } from "@playwright/test";
import { BasePage } from "../src/core/BasePage";
import "../src/pages/HomePage";
import "../src/pages/AboutPage";
import "../src/pages/AccountPage";
import "../src/pages/ClothingPage";
import "../src/pages/ShoppingBagPage";

interface ConsoleError {
    pageName: string;
    message: string;
    type: string;
}

test("Test Case 1: No console errors across main navigation flow", async ({ page }) => {
    const consoleErrors: ConsoleError[] = [];
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
