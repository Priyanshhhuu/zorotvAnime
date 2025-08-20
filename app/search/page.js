// /app/search/page.js
import SearchClient from "./SearchClient";
import { getAnimeByLetter } from "@/lib/jikan";

export const revalidate = 0; // ❌ no cache, always fresh search

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  let data = [];
  let pagination = {};

  if (query.trim()) {
    try {
      const res = await getAnimeByLetter({
        q: query,
        page: 1,
        limit: 12,
      });
      data = res?.data || [];
      pagination = res?.pagination || {};
    } catch (err) {
      console.error("Search failed:", err);
    }
  }

  return (
    <SearchClient
      query={query}
      initialResults={data}
      initialPagination={pagination}
    />
  );
}
