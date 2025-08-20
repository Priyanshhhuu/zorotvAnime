export const revalidate = 60; // Revalidate every 60s

import GenreClient from "./GenreClient";
import { fetchGenres } from "@/lib/jikan";

// /app/genre/[id]/page.js (or /app/genre/page.js if optional)
export function generateMetadata({ params }) {
  const { id } = params || {};

  let title = "Anime by Genre - Zoro Anime";
  let description = "Browse anime by genre on Zoro Anime.";

  if (id) {
    title = `Anime Genre ${id} - Zoro Anime`;
    description = `Explore anime in the ${id} genre on Zoro Anime.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://zorotv.run/genre/${id || ""}`,
      siteName: "Zoro Anime",
      images: [
        {
          url: "/zoro.png",
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/zoro.png"],
    },
  };
}

export default async function GenrePage({ params }) {
  const { id } = params; // may be undefined if user goes to /genre
  const res = await fetchGenres();
  const genres = res?.data || [];
  console.log(id);

  if (!genres.length) {
    return <p className="text-center text-gray-400">No genres found.</p>;
  }

  // ✅ pick initial genre (id or fallback to first)
  const selected =
    id && genres.find((g) => g.mal_id === Number(id))
      ? Number(id)
      : genres[0].mal_id;

  return <GenreClient genres={genres} initialId={selected} />;
}
