import { test } from "@playwright/test";
import { GithubPrService } from "../src/services/githubPrService";
import { writePrsToCsv } from "../src/utils/csvWriter";

test("Test 4:Export open PRs to CSV", async ({ request }) => {
    const service = new GithubPrService(request);
    const prs = await service.getAllOpenPullRequests();
    writePrsToCsv(prs, "open_prs.csv");
    console.log(`Generated CSV with ${prs.length} PRs`);
});
