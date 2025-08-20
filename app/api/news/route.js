import { NextResponse } from "next/server";
import { getANNNews } from "@/lib/news";

export async function GET() {
  const news = await getANNNews();
  return NextResponse.json(news);
}
