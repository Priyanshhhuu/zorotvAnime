"use client";

import Image from "next/image";
import Link from "next/link";

const makeSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

export default function AnimeReviews({ data }) {
  if (!data?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-pink-400 text-3xl">★</span>
        Latest Reviews
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.slice(0, 2).map((review) => (
          <div
            key={review.mal_id}
            className="relative flex flex-col md:flex-row bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.01] transition"
          >
            {/* Anime Side Banner */}
            <Link
              href={`/anime/${makeSlug(review.entry.title)}/${
                review.entry.mal_id
              }`}
              className="relative w-full md:w-48 h-48 md:h-auto shrink-0"
            >
              <Image
                src={
                  review.entry.images?.webp?.large_image_url ||
                  review.entry.images?.jpg?.large_image_url
                }
                alt={review.entry.title}
                fill
                className="object-cover"
                unoptimized
              />
            </Link>

            {/* Review Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              {/* User */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={
                    review.user.images?.webp?.image_url ||
                    review.user.images?.jpg?.image_url
                  }
                  alt={review.user.username}
                  width={40}
                  height={40}
                  className="rounded-full border border-white/20"
                  unoptimized
                />
                <div>
                  <Link
                    href={review.user.url}
                    target="_blank"
                    className="text-sm font-semibold text-white hover:text-pink-400"
                  >
                    {review.user.username}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-200 text-sm mb-3 line-clamp-4">
                {review.review}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-xs">
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md">
                    ⭐ {review.score}
                  </span>
                  {review.tags?.length > 0 && (
                    <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded-md">
                      {review.tags[0]}
                    </span>
                  )}
                </div>
                <Link
                  href={review.url}
                  target="_blank"
                  className="text-pink-400 text-xs hover:underline"
                >
                  Read Full →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
