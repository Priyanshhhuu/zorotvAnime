"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchAnimeTrailer } from "@/lib/jikan";

function SpotLight({ data }) {
  const [animeInfo] = useState(data);
  const [malId] = useState(data?.mal_id);
  const [trailerId, setTrailerId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const playerContainerRef = useRef(null);
  const ytPlayer = useRef(null);

  if (!animeInfo) return null;

  /** 🔹 Fetch trailer from API */
  useEffect(() => {
    if (!malId) return;
    (async () => {
      try {
        const res = await fetchAnimeTrailer({ id: malId });
        console.log(res);
        const trailer = res?.data?.promo[2]?.trailer;
        if (trailer?.youtube_id) {
          setTrailerId(trailer.youtube_id);
        }
      } catch (e) {
        console.error("Trailer fetch failed:", e);
      }
    })();
  }, [malId]);

  /** 🔹 Load YT API and init player */
  useEffect(() => {
    if (!trailerId || !playerContainerRef.current) return;

    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve(window.YT);
        if (document.getElementById("youtube-iframe-api")) return;
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    };

    loadYouTubeAPI().then((YT) => {
      if (!playerContainerRef.current) return;

      ytPlayer.current = new YT.Player(playerContainerRef.current, {
        videoId: trailerId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: trailerId,
        },
        events: {
          onReady: (e) => {
            isMuted ? e.target.mute() : e.target.unMute();
            e.target.playVideo();
          },
          onError: (err) => console.error("YouTube Player Error:", err),
        },
      });
    });

    return () => {
      ytPlayer.current?.destroy();
      ytPlayer.current = null;
    };
  }, [trailerId]);

  /** 🔹 Sync mute toggle */
  useEffect(() => {
    const player = ytPlayer.current;
    if (player?.mute && player?.unMute) {
      isMuted ? player.mute() : player.unMute();
    }
  }, [isMuted]);

  return (
    <section className="relative mt-[-72px] z-0 h-[60vh] md:h-screen w-full">
      <div className="relative w-full h-full overflow-hidden bg-black shadow-xl">
        {/* Trailer or Poster */}
        <div className="absolute inset-0 w-full h-full z-0">
          {trailerId ? (
            <div
              ref={playerContainerRef}
              key={trailerId}
              className="w-full h-full"
            />
          ) : (
            <Image
              unoptimized
              src={
                animeInfo.images?.jpg?.large_image_url ||
                animeInfo.images?.webp?.large_image_url ||
                animeInfo.images?.jpg?.image_url
              }
              alt={animeInfo?.title}
              fill
              className="object-cover brightness-75"
              priority
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

        {/* Content */}
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-white">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl md:text-4xl font-bold">
              {animeInfo?.title}
            </h2>
            {trailerId && (
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80"
              >
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
            )}
          </div>
          <p className="text-sm md:text-base line-clamp-3 mb-4 max-w-2xl">
            {animeInfo?.synopsis}
          </p>
          <Link
            href={`/anime/${animeInfo?.mal_id}`}
            className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 active:scale-95 transition-transform duration-200 text-white font-semibold shadow-lg hover:shadow-pink-500/30"
          >
            <PlayCircle size={18} className="stroke-white" />
            Watch Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SpotLight;
