import fs from "fs";

export interface PullRequest {
    title: string;
    createdAt: string;
    author: string;
}

/**
 * Writes a list of pull requests to a CSV file.
 * @param prs List of pull requests
 * @param filePath Path to the output CSV file
 */
export function writePrsToCsv(prs: PullRequest[], filePath: string): void {
    const header = "title,created_at,author\n";

    const rows = prs
        .map((pr) => {
            const safeTitle = pr.title.replace(/"/g, '""');
            return `"${safeTitle}",${pr.createdAt},${pr.author}`;
        })
        .join("\n");

    fs.writeFileSync(filePath, header + rows, "utf-8");
}

