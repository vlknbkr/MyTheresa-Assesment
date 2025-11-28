import { test } from "../src/myFixtures/fixtures";
import { writePrsToCsv } from "../src/utils/csvWriter";

test("Test 4:Export open PRs to CSV", async ({ githubPrService }) => {
    const prs = await githubPrService.getAllOpenPullRequests();

    writePrsToCsv(prs, "open_prs.csv");

    console.log(`Generated CSV with ${prs.length} PRs`);
});
