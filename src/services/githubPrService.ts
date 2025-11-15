import { APIRequestContext } from "@playwright/test";

export interface PullRequestInfo {
  title: string;
  createdAt: string;
  author: string;
}

export class GithubPrService {
  private readonly owner: string;
  private readonly repo: string;

  constructor(
    private readonly request: APIRequestContext,
    owner = "appwrite",
    repo = "appwrite"
  ) {
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * Fetches all open pull requests from GitHub API with pagination
   */
  async getAllOpenPullRequests(): Promise<PullRequestInfo[]> {
    const allPullRequests: PullRequestInfo[] = [];
    let page = 1;

    while (true) {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/pulls?state=open&per_page=100&page=${page}`;

      const response = await this.request.get(url, {
        headers: {
          "User-Agent": "playwright-mytheresa-challenge", 
          Accept: "application/vnd.github+json"
        }
      });

      if (response.status() !== 200) {
        throw new Error(
          `GitHub API error: ${response.status()} - ${await response.text()}`
        );
      }

      const data = await response.json();

      if (data.length === 0) {
        break; // Exit loop if no more data return empty
      }

      // Add PRs to the result array
      allPullRequests.push(
        ...(data as any[]).map((pr) => ({
          title: pr.title,
          createdAt: pr.created_at,
          author: pr.user?.login ?? "unknown" 
        }))
      );

      page++; 
    }

    return allPullRequests;
  }
}