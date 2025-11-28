import { test, expect } from "@playwright/test";
import { BasePage } from "../src/core/BasePage";
import "../src/pages/HomePage";

test("Test 2: All links should return valid status codes", async ({ page, request }) => {
    const home = BasePage.create("HomePage", page);
    await home.open();

    const links = await home.getAllLinks();
    links.forEach((link: string, index: number) => {
        console.log(`${index + 1}. ${link}`);
    });
    console.log(`Found ${links.length} links`);

    const brokenLinks: { url: string; status: number }[] = [];

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
