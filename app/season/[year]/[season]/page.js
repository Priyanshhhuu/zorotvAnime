export const revalidate = 3600; // Revalidate every 1 hour

import { getSeasonAnime, getSeasonsList } from "@/lib/jikan";
import SeasonClient from "./SeasonClient";

export default async function SeasonPage({ params }) {
  const { year, season } = params;

  // ✅ Fetch anime for that season
  const res = await getSeasonAnime({ year, season });
  const anime = res?.data || [];

  // ✅ Fetch list of all available seasons (for dropdown navigation)
  const seasonsList = await getSeasonsList();

  return (
    <SeasonClient
      anime={anime}
      year={year}
      season={season}
      seasonsList={seasonsList?.data || []}
      pagination={res?.pagination || {}}
    />
  );
}
