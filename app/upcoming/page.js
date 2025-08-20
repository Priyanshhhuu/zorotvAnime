// /app/upcoming/page.js
export const revalidate = 60; // ✅ Revalidate every 60s (ISR)

import { getUpcomingAnime } from "@/lib/jikan";
import UpcomingClient from "./UpcomingClient";

export default async function UpcomingPage() {
  // Fetch first page server-side
  const { data, pagination } = await getUpcomingAnime({ page: 1, limit: 12 });

  return <UpcomingClient initialAnime={data} initialPagination={pagination} />;
}
