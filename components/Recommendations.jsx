"use client";

import Image from "next/image";
import Link from "next/link";

export default function Recommendations({ data }) {
  if (!data?.length) return null;

  return (
    <div className="mt-10 mx-5">
      <h2 className="text-xl font-bold text-white mb-4">Recommendations</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-hide">
        {data.slice(0, 10).map((rec) => (
          <Link
            key={rec.entry.mal_id}
            href={`/anime/${rec.entry.mal_id}`}
            className="flex-shrink-0 w-40 group"
          >
            <div className="relative w-40 h-56 rounded-lg overflow-hidden">
              <Image
                src={rec.entry.images.jpg.image_url}
                alt={rec.entry.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-sm text-gray-300 font-medium line-clamp-2 group-hover:text-pink-400 transition">
              {rec.entry.title}
            </p>
            <p className="text-xs text-gray-500">{rec.votes} votes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
