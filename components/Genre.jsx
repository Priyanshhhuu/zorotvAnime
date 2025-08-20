"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenreCarousel() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/genres/anime");
        const data = await res.json();
        setGenres(data.data || []);
      } catch (err) {
        console.error("Error fetching genres", err);
      }
    }
    loadGenres();
  }, []);

  if (!genres.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-gray-200 text-2xl">|</span>
        Browse by Genre
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide pb-3">
        {genres.map((genre) => (
          <Link
            key={genre.mal_id}
            href={`/genre/${genre.mal_id}`}
            className="min-w-[140px] px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md 
                       text-center shadow-md hover:bg-white/20 transition 
                       text-white font-medium"
          >
            <p className="text-base">{genre.name}</p>
            <span className="text-xs text-gray-300">{genre.count} anime</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
