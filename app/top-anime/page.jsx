// app/top-anime/page.jsx
export const revalidate = 60; // Revalidate every 60 seconds

import { getTopAnime } from "@/lib/jikan";
import TopAnimeClient from "./TopAnimeClient"; // client component

export default async function TopAnimePage() {
  const { data: topAnime, pagination } = await getTopAnime({
    page: 1,
    limit: 12,
  });

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6"> Top Anime</h1>
      <TopAnimeClient initialAnime={topAnime} initialPagination={pagination} />
    </section>
  );
}
