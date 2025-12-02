import { test, expect } from "@playwright/test";
import { BasePage } from "../src/core/BasePage";
import { HomePage } from "../src/pages/HomePage";
import { AboutPage } from "../src/pages/AboutPage";
import { AccountPage } from "../src/pages/AccountPage";
import { ClothingPage } from "../src/pages/ClothingPage";
import { ShoppingCartPage } from "../src/pages/ShoppingBagPage";

interface ConsoleError {
    pageName: string;
    message: string;
    type: string;
}


test("Test Case 1: No console errors across main navigation flow", async ({ page }) => {
    const consoleErrors: ConsoleError[] = [];
    let currentPageName = "Unknown";

    // Open the console error listener 
    page.on("console", (msg) => {
        if (msg.type() === "error") {
            const text = msg.text();
            consoleErrors.push({
                pageName: currentPageName,
                message: text,
                type: msg.type(),
            });
        }
    });

    const pages: BasePage[] = [
        new HomePage(page),
        new AboutPage(page),
        new AccountPage(page),
        new ClothingPage(page),
        new ShoppingCartPage(page)
    ];

    // Initial load
    await test.step("Start Navigation Session", async () => {
        await pages[0].open();
    });

    for (const instance of pages) {
        currentPageName = instance.constructor.name;

        await test.step(`Navigate to ${currentPageName}`, async () => {
            await instance.clickHeaderItem();
            await page.waitForLoadState("load");
        });
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
