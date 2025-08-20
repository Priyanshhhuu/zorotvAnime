// /app/anime/alphabet/[letter]/page.js
import { getAnimeByAlphabet } from "@/lib/jikan";
import AnimeAlphabetClient from "./AnimeAlphabetClient"; // your client component

export const revalidate = 3600; // cache for 1 hour

// ✅ Metadata based on URL param
export function generateMetadata({ params }) {
  const { letter } = params;
  const formattedLetter = decodeURIComponent(letter).toUpperCase();

  return {
    title: `Anime Starting with "${formattedLetter}" - Zoro Anime`,
    description: `Browse anime that start with the letter "${formattedLetter}" on Zoro Anime. Find popular and trending anime easily.`,
    keywords: [
      `anime ${formattedLetter}`,
      `anime starting with ${formattedLetter}`,
      "anime list",
      "Zoro Anime",
    ],
    openGraph: {
      title: `Anime Starting with "${formattedLetter}" - Zoro Anime`,
      description: `Browse anime that start with the letter "${formattedLetter}" on Zoro Anime.`,
      url: `https://zorotv.run/anime/alphabet/${encodeURIComponent(letter)}`,
      siteName: "Zoro Anime",
      images: [
        {
          url: "/zoro.png", // fallback image
          width: 800,
          height: 600,
          alt: `Anime Starting with ${formattedLetter}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Anime Starting with "${formattedLetter}" - Zoro Anime`,
      description: `Browse anime that start with the letter "${formattedLetter}" on Zoro Anime.`,
      images: ["/zoro.png"],
    },
  };
}

// ✅ Server component fetching anime list
export default async function AnimeAlphabetPage({ params }) {
  const { letter } = params;
  let animeList = [];
  let pagination = {};

  try {
    const res = await getAnimeByAlphabet({ letter, page: 1 });
    animeList = res?.data || [];
    pagination = res?.pagination || {};
  } catch (err) {
    console.error("Failed to fetch anime by alphabet:", err);
  }

  return (
    <AnimeAlphabetClient
      letter={decodeURIComponent(letter).toUpperCase()}
      initialResults={animeList}
      initialPagination={pagination}
    />
  );
}
