"use client";
import React, { useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import { getAnimeByAlphabet } from "@/lib/jikan";

export default function AnimeAlphabetClient({
  letter,
  initialResults,
  initialPagination,
}) {
  const [results, setResults] = useState(initialResults || []);
  const [pagination, setPagination] = useState(
    initialPagination || { current_page: 1, has_next_page: false }
  );
  const [loading, setLoading] = useState(false);

  const fetchPage = async (page) => {
    if (!letter) return;
    setLoading(true);
    try {
      const res = await getAnimeByAlphabet({
        letter: letter.toLowerCase(),
        page,
      });
      setResults(res.data || []);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(pagination);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Anime Starting with: {letter}
      </h1>
      {loading && <p className="text-gray-400">Loading...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {pagination.last_visible_page > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={pagination.current_page === 1}
            onClick={() => fetchPage(pagination.current_page - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white">
            Page {pagination.current_page} / {pagination.last_visible_page}
          </span>
          <button
            disabled={!pagination.has_next_page}
            onClick={() => fetchPage(pagination.current_page + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
