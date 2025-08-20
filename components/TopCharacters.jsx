"use client";

import Image from "next/image";
import Link from "next/link";

export default function TopCharacters({ data }) {
  if (!data?.length) return null;

  return (
    <section className="mt-10">
      {/* Section Title */}
      <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-gray-200 text-2xl">|</span>
        Top Characters
      </h2>

      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide">
        {data.slice(0, 10).map((char) => (
          <Link
            key={char.mal_id}
            href={`/character/${char.mal_id}`}
            className="min-w-[180px] max-w-[200px]  backdrop-blur-md rounded-2xl shadow-md overflow-hidden hover:scale-[1.05] transition-transform"
          >
            {/* Character Image */}
            <div className="relative w-full h-[240px]">
              <Image
                src={
                  char.images?.webp?.image_url || char.images?.jpg?.image_url
                }
                alt={char.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2">
                <p className="text-white text-sm font-semibold line-clamp-1">
                  {char.name}
                </p>
                {char.name_kanji && (
                  <p className="text-xs text-gray-300 line-clamp-1">
                    {char.name_kanji}
                  </p>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="p-3">
              {/* Favorites */}
              <span className="text-yellow-400 text-xs font-medium block mb-2">
                ❤️ {char.favorites.toLocaleString()} Favorites
              </span>

              {/* Nicknames */}
              {char.nicknames?.length > 0 && (
                <p className="text-xs text-gray-300 line-clamp-2">
                  aka: {char.nicknames.slice(0, 2).join(", ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
