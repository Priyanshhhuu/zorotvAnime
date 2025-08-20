import { NextResponse } from "next/server";

const BASE_URL = "https://api.jikan.moe/v4";
const cache = {}; // simple in-memory cache

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");
    if (!endpoint)
      return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });

    // Check cache
    const now = Date.now();
    if (cache[endpoint] && now - cache[endpoint].timestamp < 86400 * 1000) {
      return NextResponse.json(cache[endpoint].data);
    }

    // Fetch from Jikan
    const res = await fetch(`${BASE_URL}${endpoint}`);
    const data = await res.json();

    // Save to cache
    cache[endpoint] = { data, timestamp: now };

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
