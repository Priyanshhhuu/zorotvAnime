import Image from "next/image";
import Link from "next/link";
import {
  getAnimeCharacter,
  getAnimeInfo,
  getAnimePictures,
  getAnimeRecommendation,
  getAnimeStatics,
  getAnimeStreamingLink,
} from "@/lib/jikan";
import AnimeClient from "./AnimeClient"; // client component

// small delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function AnimeDetail({ params }) {
  const { id } = params;
  const { data: anime } = await getAnimeInfo({ id });

  let characters = null;
  let stats = null;
  let pictures = null;
  let recommendations = null;
  let streamingLink = null;

  // fetch safely (to avoid 429)
  try {
    await delay(400);
    const res = await getAnimeCharacter({ id });
    characters = res.data;
  } catch (err) {
    console.error("Error fetching characters", err);
  }

  try {
    await delay(400);
    const res = await getAnimeStatics({ id });
    stats = res.data;
  } catch (err) {
    console.error("Error fetching stats", err);
  }

  try {
    await delay(400);
    const res = await getAnimePictures({ id });
    pictures = res.data;
  } catch (err) {
    console.error("Error fetching pictures", err);
  }
  try {
    await delay(600);
    const res = await getAnimeRecommendation({ id });
    recommendations = res.data;
  } catch (err) {
    console.error("Error fetching pictures", err);
  }
  try {
    await delay(2000);
    const res = await getAnimeStreamingLink({ id });
    streamingLink = res.data;
  } catch (err) {
    console.error("Error fetching pictures", err);
  }

  if (!anime) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Image
          unoptimized
          src="/zoro.png"
          alt="Zoro Anime Logo"
          width={180}
          height={180}
          className="mb-6"
        />
        <h1 className="text-3xl font-bold text-white mb-2">
          404 - Anime Not Found
        </h1>
        <p className="text-gray-400 mb-4">
          We couldn’t find the anime you’re looking for.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-pink-700 text-white rounded-full hover:bg-pink-600 transition"
        >
          ⬅ Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <AnimeClient
      anime={anime}
      characters={characters}
      stats={stats}
      pictures={pictures}
      recommendations={recommendations}
      streamingLink={streamingLink}
    />
  );
}
