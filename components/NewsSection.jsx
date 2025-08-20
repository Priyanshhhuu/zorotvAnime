"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white/10 h-32 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  // Limit to 4 on mobile
  const visibleNews = isMobile ? news.slice(0, 4) : news;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-gray-300">📰</span> Latest Anime News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleNews.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            target="_blank"
            className="group 
              bg-white/5 
              hover:bg-white/10 
              backdrop-blur-md 
              p-5 
              rounded-2xl 
              transition 
              shadow-lg 
              border border-white/10
              hover:border-white/20
            "
          >
            {/* Title */}
            <h3 className="font-semibold text-lg text-white group-hover:text-gray-200 transition">
              {item.title}
            </h3>

            {/* Content */}
            <p className="text-gray-300 text-sm mt-2 line-clamp-3">
              {item.content}
            </p>

            {/* Date */}
            <p className="text-gray-400 text-xs mt-3">
              {new Date(item.pubDate).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
