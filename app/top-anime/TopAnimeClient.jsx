"use client";

import { useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import { getTopAnime } from "@/lib/jikan";

export default function TopAnimeClient({ initialAnime, initialPagination }) {
  const [animeList, setAnimeList] = useState(initialAnime);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const { data, pagination } = await getTopAnime({
        page: newPage,
        limit: 12,
      });
      setAnimeList(data);
      setPagination(pagination);
    } catch (err) {
      console.error("Failed to fetch top anime:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          onClick={() => handlePageChange(pagination.current_page - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white">
          Page {pagination.current_page} / {pagination.last_visible_page}
        </span>
        <button
          disabled={!pagination.has_next_page}
          onClick={() => handlePageChange(pagination.current_page + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
