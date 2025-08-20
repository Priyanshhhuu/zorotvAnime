import Parser from "rss-parser";

export async function getANNNews() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(
      "https://www.animenewsnetwork.com/news/rss.xml"
    );

    return feed.items.slice(0, 10).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.contentSnippet,
    }));
  } catch (err) {
    console.error("❌ Error fetching ANN news:", err);
    return [];
  }
}
