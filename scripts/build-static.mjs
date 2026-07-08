import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const files = ["index.html", "_headers", "_redirects", "robots.txt", "sitemap.xml"];

for (const file of files) {
  await copyFile(join(root, file), join(dist, file));
}

console.log(`Built ${files.length} static files into dist/`);
