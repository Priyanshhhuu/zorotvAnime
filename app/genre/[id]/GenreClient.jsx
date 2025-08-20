"use client";

import { useEffect, useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import { getAnimeSearch } from "@/lib/jikan";
import { useRouter } from "next/navigation";

export default function GenreClient({ genres, initialId }) {
  const [selectedGenre, setSelectedGenre] = useState(
    genres.find((g) => g.mal_id === initialId) || genres[0]
  );
  const [animeList, setAnimeList] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_visible_page: 1,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Fetch anime whenever genre changes
  useEffect(() => {
    if (!selectedGenre) return;

    const fetchAnime = async (page = 1) => {
      setLoading(true);
      try {
        const res = await getAnimeSearch({
          page,
          limit: 12,
          genres: selectedGenre.mal_id,
          order_by: "popularity",
          sort: "desc",
          sfw: true,
        });
        setAnimeList(res?.data || []);
        setPagination(
          res?.pagination || { current_page: 1, last_visible_page: 1 }
        );
      } catch (err) {
        console.error("Failed to fetch anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime(1);
  }, [selectedGenre]);

  const handlePageChange = async (newPage) => {
    if (!selectedGenre) return;
    setLoading(true);
    try {
      const res = await getAnimeSearch({
        page: newPage,
        limit: 12,
        genres: selectedGenre.mal_id,
        order_by: "popularity",
        sort: "desc",
        sfw: true,
      });
      setAnimeList(res?.data || []);
      setPagination(res?.pagination || pagination);
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (id) => {
    const genre = genres.find((g) => g.mal_id === Number(id));
    setSelectedGenre(genre);
    router.push(`/genre/${id}`); // ✅ update URL
  };

  return (
    <section className="p-6">
      {/* Genre Dropdown */}
      <div className="mb-6 flex items-center gap-3">
        <label className="text-white font-semibold text-lg">Genre:</label>
        <select
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md 
                     border border-white/20 text-white shadow-lg 
                     focus:ring-2 
                     hover:bg-white/20 transition-all duration-300 scrollbar-hide"
          value={selectedGenre?.mal_id || ""}
          onChange={(e) => handleGenreChange(e.target.value)}
        >
          {genres.map((genre) => (
            <option
              key={genre.mal_id}
              value={genre.mal_id}
              className="text-white bg-black"
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Anime List */}
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
      {pagination?.last_visible_page > 1 && (
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
      )}
    </section>
  );
}
