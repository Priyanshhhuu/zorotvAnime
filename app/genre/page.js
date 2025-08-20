// /app/genre/page.js
import { redirect } from "next/navigation";
import { fetchGenres } from "@/lib/jikan";

export default async function GenreIndex() {
  const res = await fetchGenres();
  const genres = res?.data || [];

  if (!genres.length) {
    return <p>No genres available</p>;
  }

  // ✅ redirect to first genre
  redirect(`/genre/${genres[0].mal_id}`);
}
