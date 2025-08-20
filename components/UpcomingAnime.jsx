"use client";

import Link from "next/link";
import UpcomingCard from "./UpcomingCard";

export default function UpcomingAnime({ data }) {
  if (!data?.length) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="upcoming-Anime"
          className="text-white text-xl font-semibold flex items-center gap-2 mb-1"
        >
          <span className="text-gray-200 text-2xl">|</span>
          Upcoming Anime
        </h2>
        <Link
          href="/upcoming"
          className="px-4 py-2 rounded-lg  text-white font-medium hover:text-gray-700 transition"
        >
          View More →
        </Link>
      </div>

      {/* Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide">
        {data.slice(0, 10).map((anime) => (
          <UpcomingCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
}
