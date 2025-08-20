const isServer = typeof window === "undefined";
const BASE_URL = isServer
  ? "https://api.jikan.moe/v4" // server fetch directly
  : "/api/proxy"; // client fetch via your proxy

async function cachedFetch(
  endpoint,
  revalidate = 86400,
  retries = 3,
  delay = 2000
) {
  const url = isServer
    ? `${BASE_URL}${endpoint}`
    : `${BASE_URL}?endpoint=${endpoint}`;

  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, {
      next: { revalidate },
      cache: "force-cache",
    });

    if (res.ok) return res.json();

    if (res.status === 429 && i < retries) {
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    throw new Error(`❌ Fetch failed: ${res.status}`);
  }
}

// Fetch anime by first letter or search query
export async function getAnimeByLetter({ q, page = 1, limit = 10 }) {
  const params = new URLSearchParams({
    q,
    page,
    limit,
    order_by: "popularity",
    sort: "asc",
  });
  return cachedFetch(`/anime?${params.toString()}`);
}

// Fetch detailed anime info
export async function getAnimeInfo({ id }) {
  return cachedFetch(`/anime/${id}`);
}

// Fetch anime characters
export async function getAnimeCharacter({ id }) {
  return cachedFetch(`/anime/${id}/characters`);
}

// Fetch anime statistics
export async function getAnimeStatistics({ id }) {
  return cachedFetch(`/anime/${id}/statistics`);
}

// Fetch anime pictures
export async function getAnimePictures({ id }) {
  return cachedFetch(`/anime/${id}/pictures`);
}

// Fetch anime recommendations
export async function getAnimeRecommendation({ id }) {
  return cachedFetch(`/anime/${id}/recommendations`);
}

// Fetch top anime
export async function getTopAnime({ page = 1, limit = 12 } = {}) {
  return cachedFetch(`/top/anime?page=${page}&limit=${limit}`);
}

// Fetch upcoming anime
export async function getUpcomingAnime({ page = 1, limit = 12 } = {}) {
  return cachedFetch(`/seasons/upcoming?page=${page}&limit=${limit}`);
}

// Fetch anime reviews
export async function getAnimeReview() {
  return cachedFetch(`/reviews/anime`);
}

// Fetch top anime characters
export async function getAnimeTopCharacter() {
  return cachedFetch(`/top/characters`);
}

// Fetch character by ID
export async function getAnimeCharacterById({ id }) {
  return cachedFetch(`/characters/${id}/full`);
}

// Fetch anime streaming links
export async function getAnimeStreamingLink({ id }) {
  return cachedFetch(`/anime/${id}/streaming`);
}

// Fetch anime trailer → cache 12h (43200 sec)
export const fetchAnimeTrailer = async ({ id }) => {
  return cachedFetch(`/anime/${id}/videos`, 43200);
};

// Fetch genres → cache 1 day
export async function fetchGenres() {
  return cachedFetch(`/genres/anime`, 86400);
}

// Search anime → cache 1h (3600 sec)
export async function getAnimeSearch(params = {}) {
  const query = new URLSearchParams(params).toString();
  return cachedFetch(`/anime?${query}`, 3600);
}

// Fetch anime by season
export async function getSeasonAnime({ year, season, page = 1 }) {
  return cachedFetch(`/seasons/${year}/${season}?page=${page}`, 3600);
}

// Fetch list of all seasons → cache 1 day
export async function getSeasonsList() {
  return cachedFetch(`/seasons`, 86400);
}
