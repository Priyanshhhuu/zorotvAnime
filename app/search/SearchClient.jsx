"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAnimeByLetter } from "@/lib/jikan";
import AnimeCard from "@/components/AnimeCard";

export default function SearchClient({
  query,
  initialResults,
  initialPagination,
}) {
  const [results, setResults] = useState(initialResults || []);
  const [pagination, setPagination] = useState(initialPagination || {});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPage = async (page) => {
    setLoading(true);
    try {
      const res = await getAnimeByLetter({
        q: query,
        page,
        limit: 12,
      });
      setResults(res?.data || []);
      setPagination(res?.pagination || {});
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <p className="text-gray-400 text-center mt-10">
        Type something in the search bar above 🔎
      </p>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search Results for: <span className="text-pink-400">{query}</span>
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No anime found for "{query}".</p>
      )}

      {/* Pagination */}
      {pagination?.last_visible_page > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={pagination.current_page === 1}
            onClick={() => fetchPage(pagination.current_page - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span className="text-white">
            Page {pagination.current_page} / {pagination.last_visible_page}
          </span>
          <button
            disabled={!pagination.has_next_page}
            onClick={() => fetchPage(pagination.current_page + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
