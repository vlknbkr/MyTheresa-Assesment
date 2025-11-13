import fs from "fs";

/**
 * @param {Array<{ title: string, createdAt: string, author: string }>} prs
 * @param {string} filePath
 */
export function writePrsToCsv(prs, filePath) {
  const header = "title,created_at,author\n";

  const rows = prs
    .map((pr) => {
      const safeTitle = pr.title.replace(/"/g, '""'); 
      return `"${safeTitle}",${pr.createdAt},${pr.author}`;
    })
    .join("\n");

  fs.writeFileSync(filePath, header + rows, "utf-8");
}