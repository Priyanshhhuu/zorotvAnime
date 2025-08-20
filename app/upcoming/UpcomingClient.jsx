"use client";

import { useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import { getUpcomingAnime } from "@/lib/jikan";

export default function UpcomingClient({ initialAnime, initialPagination }) {
  const [animeList, setAnimeList] = useState(initialAnime || []);
  const [pagination, setPagination] = useState(initialPagination || {});
  const [loading, setLoading] = useState(false);

  const fetchPage = async (page) => {
    setLoading(true);
    try {
      const res = await getUpcomingAnime({ page, limit: 12 });
      setAnimeList(res?.data || []);
      setPagination(res?.pagination || {});
    } catch (err) {
      console.error("Failed to fetch upcoming anime:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6">
      <h2
        id="upcoming-Anime"
        className="text-white text-xl font-semibold flex items-center gap-2 mb-2"
      >
        <span className="text-gray-200 text-2xl">|</span>
        Upcoming Anime
      </h2>

      {/* Anime Grid */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}

      {/* Pagination */}
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
    </section>
  );
}
