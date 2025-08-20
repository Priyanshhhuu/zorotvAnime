"use client";
import AnimeCard from "@/components/AnimeCard";
import AnimeReviews from "@/components/AnimeReviews";
import GenreCarousel from "@/components/Genre";
import NewsSection from "@/components/NewsSection";
import SpotLight from "@/components/SpotLight";
import TopAnime from "@/components/TopAnime";
import TopCharacters from "@/components/TopCharacters";
import UpcomingAnime from "@/components/UpcomingAnime";
import Link from "next/link";
import { useEffect, useState } from "react";

function HomeClient({
  top,
  upcoming,
  reviews,
  topCharacter,
  seasonAnime,
  season,
  year,
}) {
  const [randomAnime, setRandomAnime] = useState(null);
  useEffect(() => {
    if (!top?.length) return;

    const randomIndex = Math.floor(Math.random() * top.length);
    const randomanime = top[randomIndex];
    setRandomAnime(randomanime);
  }, [top]);

  return (
    <div>
      {randomAnime && <SpotLight data={randomAnime} />}
      <NewsSection />
      <TopAnime data={top} />
      <UpcomingAnime data={upcoming} />
      <GenreCarousel />
      <section className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white capitalize">
            {season} Anime
          </h2>
          <Link
            href={`/season/${year}/${season}`}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            View All →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {seasonAnime.slice(0, 10).map((anime) => (
            <div key={anime.mal_id} className="flex-shrink-0 w-40">
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      </section>
      <AnimeReviews data={reviews} />
      <TopCharacters data={topCharacter} />
    </div>
  );
}

export default HomeClient;
