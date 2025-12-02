import { test, expect } from "../src/fixtures/fixtures";

test("Test 2: All links should return valid status codes", async ({ homePage, request }) => {
    await homePage.open();

    const links = await homePage.getAllLinks();
    console.log(`Found ${links.length} links`);

    const brokenLinks: { url: string; status: number }[] = [];

    for (const url of links) {
        const res = await request.get(url);
        const status = res.status();
        console.log(`${url} -> ${status}`);

        if (status >= 400) {
            brokenLinks.push({ url, status });
        }
    }
    expect(brokenLinks, `Broken links found:\n${brokenLinks.map(l => `${l.url} (${l.status})`).join("\n")}`)
        .toEqual([]);
});
