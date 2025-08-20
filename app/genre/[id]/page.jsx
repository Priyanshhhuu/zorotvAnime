export const revalidate = 60; // Revalidate every 60s

import GenreClient from "./GenreClient";
import { fetchGenres } from "@/lib/jikan";

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
