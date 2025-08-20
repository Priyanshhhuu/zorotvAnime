export const revalidate = 60; // Revalidate every 60 seconds

import {
  getAnimeReview,
  getAnimeTopCharacter,
  getSeasonAnime,
  getTopAnime,
  getUpcomingAnime,
} from "@/lib/jikan";
import HomeClient from "./HomeClient";

function getCurrentSeason() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let season = "winter";
  if (month >= 3 && month <= 5) season = "spring";
  else if (month >= 6 && month <= 8) season = "summer";
  else if (month >= 9 && month <= 11) season = "fall";

  return { year, season };
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default async function HomePage() {
  const { data: topAnime } = await getTopAnime();
  let upcomganAnime = [];
  let reviews = [];
  let topCharacter = [];
  let seasonAnime = [];
  const { year, season } = getCurrentSeason();

  // Fetch upcoming anime with a delay
  try {
    await delay(400);
    const res = await getUpcomingAnime();
    upcomganAnime = res.data;
  } catch (err) {
    console.error("Error fetching characters", err);
  }

  // Fetch reviews with a delay
  try {
    await delay(400);
    const { data } = await getAnimeReview();
    reviews = data;
  } catch (err) {
    console.error("Error fetching reviews", err);
  }

  try {
    await delay(500);
    const { data } = await getAnimeTopCharacter();
    topCharacter = data;
  } catch (err) {
    console.error("Error fetching top characters", err);
  }

  try {
    delay(1000);

    const { data: seasonanime } = await getSeasonAnime({
      year,
      season,
      page: 1,
    });
    seasonAnime = seasonanime;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <main>
      <HomeClient
        top={topAnime}
        upcoming={upcomganAnime}
        reviews={reviews}
        topCharacter={topCharacter}
        seasonAnime={seasonAnime}
        season={season}
        year={year}
      />
    </main>
  );
}
