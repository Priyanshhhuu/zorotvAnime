"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Share2,
  ExternalLink,
  PlayCircle,
  ChevronDown,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Recommendations from "@/components/Recommendations";
import Link from "next/link";

export default function AnimeDetailClient({
  anime,
  characters = [],
  stats,
  pictures = [],
  recommendations = [],
  streamingLink,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTrailer, setShowTrailer] = useState(false);
  const [open, setOpen] = useState(false);

  if (!streamingLink?.length) return null;

  const COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

  const statusData = [
    { name: "Watching", value: stats?.watching || 0 },
    { name: "Completed", value: stats?.completed || 0 },
    { name: "On Hold", value: stats?.on_hold || 0 },
    { name: "Dropped", value: stats?.dropped || 0 },
    { name: "Plan to Watch", value: stats?.plan_to_watch || 0 },
  ];

  const scoreData = stats?.scores?.map((s) => ({
    score: s.score,
    votes: s.votes,
  }));

  return (
    <div className="relative text-white">
      {/* Top Background */}
      <div className="relative w-full h-[350px] md:h-[450px]">
        <Image
          src={anime?.images?.jpg?.large_image_url}
          alt={anime?.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-40">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="w-40 md:w-56 flex-shrink-0">
            <Image
              src={anime?.images?.jpg?.large_image_url}
              alt={anime?.title}
              width={224}
              height={320}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 mt-4 md:mt-12">
            <h1 className="text-3xl font-bold">{anime?.title}</h1>
            {anime?.title_english && (
              <h2 className="text-lg text-gray-300">{anime?.title_english}</h2>
            )}

            <div className="flex items-center gap-4 text-sm">
              <span className="text-yellow-400">⭐ {anime.score || "N/A"}</span>
              <span className="text-green-400">{anime.status}</span>
              <span>{anime.year ? `${anime.year}` : ""}</span>
            </div>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
          bg-pink-600 hover:bg-pink-700 active:scale-95 transition-transform duration-200 
          text-white font-semibold shadow-lg hover:shadow-pink-500/30"
              >
                <PlayCircle size={18} className="stroke-white" />
                Watch Now
                <ChevronDown
                  size={16}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {/* Dropdown Menu */}
              {open && (
                <div
                  className="absolute mt-2 w-56 bg-black/90 backdrop-blur-md border border-white/10 
          rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn"
                >
                  {streamingLink?.map((p, idx) => (
                    <Link
                      key={idx}
                      href={p.url}
                      target="_blank"
                      className="block px-4 py-3 text-sm text-gray-200 hover:bg-pink-600/30 transition"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              )}
              {anime.trailer?.embed_url && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
                >
                  Watch Trailer
                </button>
              )}
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                <Share2 size={18} />
              </button>
              <a
                href={anime.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-white/10 flex gap-6 text-sm">
          {["overview", "characters", "pictures", "statistics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg text-sm space-y-2">
                <p>
                  <b>Type:</b> {anime.type}
                </p>
                <p>
                  <b>Episodes:</b> {anime.episodes || "?"}
                </p>
                <p>
                  <b>Aired:</b> {anime.aired?.string || "N/A"}
                </p>
                <p>
                  <b>Broadcast:</b> {anime.broadcast?.string || "N/A"}
                </p>
                <p>
                  <b>Duration:</b> {anime.duration}
                </p>
                <p>
                  <b>Rating:</b> {anime.rating}
                </p>
                <p>
                  <b>Producers:</b>{" "}
                  {anime.producers?.map((p) => p.name).join(", ") || "N/A"}
                </p>
                <p>
                  <b>Studios:</b>{" "}
                  {anime.studios?.map((s) => s.name).join(", ") || "N/A"}
                </p>
                <p>
                  <b>Licensors:</b>{" "}
                  {anime.licensors?.map((l) => l.name).join(", ") || "N/A"}
                </p>
                <p>
                  <b>Source:</b> {anime.source}
                </p>
                <p>
                  <b>Genres:</b>{" "}
                  {anime.genres?.map((g) => g.name).join(", ") || "N/A"}
                </p>
                <p>
                  <b>Demographics:</b>{" "}
                  {anime.demographics?.map((d) => d.name).join(", ") || "N/A"}
                </p>
              </div>

              <div className="md:col-span-2 bg-white/5 p-4 rounded-lg text-sm leading-relaxed">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p>{anime.synopsis || "No description available."}</p>

                {anime.background && (
                  <>
                    <h2 className="text-lg font-semibold mt-4 mb-2">
                      Background
                    </h2>
                    <p className="text-gray-300">{anime.background}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Characters */}
          {activeTab === "characters" && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {characters
                .filter((c) => c.role === "Main")
                .slice(0, 10)
                .map((c) => (
                  <div
                    key={c.character.mal_id}
                    className="bg-white/5 rounded-lg p-3 text-center"
                  >
                    <Image
                      src={c.character.images.jpg.image_url}
                      alt={c.character.name}
                      width={150}
                      height={200}
                      className="rounded-lg mx-auto"
                    />
                    <p className="mt-2 font-semibold text-sm">
                      {c.character.name}
                    </p>
                    <p className="text-gray-400 text-xs">{c.role}</p>
                  </div>
                ))}
            </div>
          )}

          {/* Pictures */}
          {activeTab === "pictures" && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {pictures.slice(0, 10).map((pic, i) => (
                <div key={i} className="bg-white/5 rounded-lg overflow-hidden">
                  <Image
                    src={pic.jpg.image_url}
                    alt={`Picture ${i}`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Statistics */}
          {activeTab === "statistics" && stats && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">User Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Score Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scoreData}>
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#f472b6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Recommendations */}
      <Recommendations data={recommendations} />
      {/* Trailer modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-pink-400"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                className="w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
