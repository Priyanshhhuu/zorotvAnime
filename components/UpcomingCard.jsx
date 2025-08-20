"use client";

import Image from "next/image";
import Link from "next/link";

export default function UpcomingCard({ anime }) {
  const startDate =
    anime.aired?.prop?.from?.day &&
    anime.aired?.prop?.from?.month &&
    anime.aired?.prop?.from?.year
      ? `${anime.aired.prop.from.day}/${anime.aired.prop.from.month}/${anime.aired.prop.from.year}`
      : "TBA";

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="relative min-w-[180px] w-[180px] rounded-2xl overflow-hidden backdrop-blur-md shadow-md hover:scale-105 transition-transform"
    >
      {/* Image */}
      <div className="relative w-full h-[220px]">
        <Image
          src={anime.images?.webp?.image_url || anime.images?.jpg?.image_url}
          alt={anime.title}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Type Badge */}
        {anime.type && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {anime.type}
          </div>
        )}

        {/* Airing Start Date */}
        <div className="absolute bottom-2 left-2 bg-pink-600/80 text-white text-xs font-medium px-2 py-1 rounded-md">
          {startDate}
        </div>
      </div>

      {/* Title below image */}
      <div className="p-2 text-center bg-transparent">
        <p className="text-white text-sm font-semibold line-clamp-1">
          {anime.title}
        </p>
      </div>
    </Link>
  );
}
