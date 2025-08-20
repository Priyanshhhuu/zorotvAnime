"use client";

import Link from "next/link";

export default function SearchBox({ results, onClose }) {
  if (!results?.length) return null;
  console.log(results);
  return (
    <div className="absolute left-0 top-full w-full z-40 max-h-96 overflow-y-auto bg-black/80 backdrop-blur-sm mt-2 rounded-md shadow-lg scrollbar-hide">
      <ul className="flex flex-col divide-y divide-white/10">
        {results.map((anime) => (
          <li key={anime.mal_id}>
            <Link
              href={`/anime/${anime.title}/${anime.mal_id}`}
              onClick={onClose}
              className="flex items-center gap-3 p-2 hover:bg-white/10 transition rounded-md"
            >
              <img
                src={anime?.images?.jpg?.image_url}
                alt={anime.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium line-clamp-1">
                  {anime.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {anime.type} ・ {anime.duration || "N/A"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
