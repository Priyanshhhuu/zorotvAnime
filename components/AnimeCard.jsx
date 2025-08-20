"use client";

import { shimmer, toBase64 } from "@/lib/shimmer";
import Image from "next/image";
import Link from "next/link";

export default function AnimeCard({ anime }) {
  return (
    <Link
      href={`/anime/${anime.title}/${anime.mal_id}`}
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
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(180, 220)
          )}`}
        />

        {/* Type Badge (top-left) */}
        {anime.type && (
          <div className="absolute top-2 left-2 bg-gray-900/70 text-white text-xs font-medium px-2 py-1 rounded-md">
            {anime.type}
          </div>
        )}

        {/* Score Badge (top-right) */}
        {anime.score && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md">
            ⭐ {anime.score}
          </div>
        )}
      </div>

      {/* Title below image */}
      <div className="p-2 text-center">
        <p className="text-white text-sm font-semibold line-clamp-1">
          {anime.title}
        </p>
      </div>
    </Link>
  );
}
