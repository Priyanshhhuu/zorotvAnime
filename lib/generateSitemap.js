const fs = require("fs");
const fetch = require("node-fetch");

const BASE_URL = "https://zorotv.run/anime";
const API_URL = "https://api.jikan.moe/v4/top/anime";
const URLS_PER_SITEMAP = 5000;

// API rate limit handling
const REQUEST_DELAY_MS = 1200; // ~1 request per 1.2s to stay under 60/min
const RETRY_DELAY_MS = 5000; // Wait 5s before retrying a failed request
const MAX_RETRIES = 5;

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPage(page, retries = 0) {
  try {
    const res = await fetch(`${API_URL}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch page ${page}: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`⚠️  Error fetching page ${page}: ${err.message}`);
    if (retries < MAX_RETRIES) {
      console.log(`⏳ Retrying page ${page} in ${RETRY_DELAY_MS / 1000}s...`);
      await wait(RETRY_DELAY_MS);
      return fetchPage(page, retries + 1);
    } else {
      console.error(
        `❌ Failed to fetch page ${page} after ${MAX_RETRIES} retries. Skipping.`
      );
      return null; // skip this page
    }
  }
}

async function generateSitemaps() {
  let sitemapIndex = 0;
  let urlCount = 0;
  let urls = [];
  let sitemapFiles = [];

  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Fetching page ${page}...`);
    const data = await fetchPage(page);

    if (data && data.data) {
      data.data.forEach((anime) => {
        const titleSlug = slugify(anime.title);
        urls.push({
          loc: `${BASE_URL}/${titleSlug}/${anime.mal_id}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.9,
        });
        urlCount++;
      });

      hasNextPage = data.pagination.has_next_page;
    } else {
      // Skip page if fetch failed
      hasNextPage = true; // Continue to next page anyway
    }

    page++;

    // Wait to respect rate limit
    await wait(REQUEST_DELAY_MS);

    // Write sub-sitemap if limit reached or last page
    if (urlCount >= URLS_PER_SITEMAP || (!hasNextPage && urls.length > 0)) {
      const subSitemapFile = `sitemap-anime-${sitemapIndex}.xml`;
      const subSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map(
          (u) =>
            `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
        )
        .join("\n")}\n</urlset>`;

      fs.writeFileSync(subSitemapFile, subSitemapContent, "utf8");
      console.log(`✅ Generated ${subSitemapFile} with ${urls.length} URLs`);

      sitemapFiles.push(subSitemapFile);
      sitemapIndex++;
      urls = [];
      urlCount = 0;
    }
  }

  // Generate master sitemap.xml
  const masterSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles
    .map(
      (file) =>
        `  <sitemap>\n    <loc>https://zorotv.run/${file}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`
    )
    .join("\n")}\n</sitemapindex>`;

  fs.writeFileSync("sitemap.xml", masterSitemapContent, "utf8");
  console.log("✅ Generated master sitemap.xml referencing all sub-sitemaps");
}

generateSitemaps().catch((err) => console.error(err));
