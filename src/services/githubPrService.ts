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
   * Fetches open pull requests from GitHub API
   */
  async getOpenPullRequests(): Promise<PullRequestInfo[]> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/pulls?state=open`;

    const response = await this.request.get(url, {
      headers: {
        "User-Agent": "playwright-mytheresa-challenge", // GitHub API requires a UA header
        Accept: "application/vnd.github+json"
      }
    });

    if (response.status() !== 200) {
      throw new Error(
        `GitHub API error: ${response.status()} - ${await response.text()}`
      );
    }

    const data = await response.json();

    // Map to clean PR structure
    return (data as any[]).map((pr) => ({
      title: pr.title,
      createdAt: pr.created_at,
      author: pr.user?.login ?? "unknown" // fallback safety
    }));
  }
}