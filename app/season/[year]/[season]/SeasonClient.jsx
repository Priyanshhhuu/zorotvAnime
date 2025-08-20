"use client";

import { useState } from "react";
import { getSeasonAnime } from "@/lib/jikan";
import AnimeCard from "@/components/AnimeCard";

export default function SeasonClient({
  anime,
  year,
  season,
  seasonsList,
  pagination: initialPagination,
}) {
  const [animeList, setAnimeList] = useState(anime);
  const [pagination, setPagination] = useState(initialPagination || {}); // ✅ use initial from server
  const [loading, setLoading] = useState(false);

  // ✅ Handle page change
  const fetchPage = async (page) => {
    setLoading(true);
    try {
      const res = await getSeasonAnime({ year, season, page });
      setAnimeList(res?.data || []);
      setPagination(res?.pagination || {});
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white capitalize">
          {season} {year} Anime
        </h1>

        {/* Dropdown Navigation */}
        <select
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300 scrollbar-hide"
          onChange={(e) => (window.location.href = e.target.value)}
          defaultValue={`/season/${year}/${season}`}
        >
          {seasonsList.map((s) =>
            s.seasons.map((sea) => (
              <option
                key={`${s.year}-${sea}`}
                value={`/season/${s.year}/${sea}`}
                className="bg-gray-900 text-white"
              >
                {sea} {s.year}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Anime List */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((item) => (
            <AnimeCard key={item.mal_id} anime={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination?.last_visible_page > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={pagination.current_page === 1}
            onClick={() => fetchPage(pagination.current_page - 1)}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
          >
            Prev
          </button>
          <span className="text-white">
            Page {pagination.current_page} / {pagination.last_visible_page}
          </span>
          <button
            disabled={!pagination.has_next_page}
            onClick={() => fetchPage(pagination.current_page + 1)}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
