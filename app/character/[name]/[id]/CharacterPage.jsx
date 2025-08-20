"use client";

import Image from "next/image";
import Link from "next/link";

export default function CharacterPage({ character }) {
  if (!character) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-pink-600/30 via-purple-700/20 to-transparent rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row gap-6 items-center">
        {/* Character Image */}
        <div className="relative w-[240px] h-[340px] shrink-0 rounded-2xl overflow-hidden shadow-xl ring-2 ring-pink-500/40">
          <Image
            src={
              character.images?.webp?.image_url ||
              character.images?.jpg?.image_url
            }
            alt={character.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Character Info */}
        <div className="flex flex-col flex-1">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {character.name}
          </h1>
          <p className="text-gray-400 text-lg">{character.name_kanji}</p>

          {/* Nicknames */}
          {character.nicknames?.length > 0 && (
            <p className="mt-3 text-sm text-gray-300 italic">
              <span className="font-semibold">Also known as:</span>{" "}
              {character.nicknames.join(", ")}
            </p>
          )}

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="bg-pink-600/20 text-pink-400 px-4 py-1 rounded-full font-medium">
              ❤️ {character.favorites.toLocaleString()} Favorites
            </span>
            <Link
              href={character.url}
              target="_blank"
              className="bg-white/10 hover:bg-white/20 transition px-4 py-1 rounded-full text-blue-400 font-medium"
            >
              View on MAL →
            </Link>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      {character.about && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold border-l-4 border-pink-500 pl-3 mb-3">
            About
          </h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed bg-white/5 rounded-xl p-5 backdrop-blur-sm">
            {character.about}
          </p>
        </div>
      )}

      {/* ANIME ROLES (limit 10, scrollable row) */}
      {character.anime?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-5">
            Animeography
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide">
            {character.anime.slice(0, 10).map((item) => (
              <Link
                key={item.anime.mal_id}
                href={`/anime/${item.anime.title}/${item.anime.mal_id}`}
                className="group min-w-[160px] max-w-[180px] bg-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.anime.images.webp.image_url}
                    alt={item.anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <div className="p-2">
                  <p className="font-semibold line-clamp-1">
                    {item.anime.title}
                  </p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MANGA ROLES (no link) */}
      {character.manga?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold border-l-4 border-pink-400 pl-3 mb-5">
            Mangaography
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide">
            {character.manga.slice(0, 10).map((item) => (
              <div
                key={item.manga.mal_id}
                className="min-w-[160px] max-w-[180px] bg-white/10 rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.manga.images.webp.image_url}
                    alt={item.manga.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-2">
                  <p className="font-semibold line-clamp-1">
                    {item.manga.title}
                  </p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VOICE ACTORS */}
      {character.voices?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold border-l-4 border-pink-400 pl-3 mb-5">
            Voice Actors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {character.voices.map((va, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-500/40">
                  <Image
                    src={va.person.images.jpg.image_url}
                    alt={va.person.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-semibold">{va.person.name}</p>
                  <p className="text-sm text-gray-400">{va.language}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
