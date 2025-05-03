import { writeFileSync } from "fs";

const pages = [
  "/",
  "/about",
  "/contact",
  "/gallery",
  "/quote",
  "/blog",
  "/blog/moving-tips-2025",
  "/blog/packing-advice",
  "/blog/office-move-checklist",
];

const hostname = "https://ambremovals.com";

const urls = pages
  .map(
    (page) => `
  <url>
    <loc>${hostname}${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

writeFileSync("public/sitemap.xml", sitemap);

console.log("✅ sitemap.xml updated!");
