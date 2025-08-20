"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchBox from "@/components/SearchBox";
import { getAnimeByLetter } from "@/lib/jikan";
import Link from "next/link";
import {
  Twitter,
  Github,
  Home,
  Flame,
  ListVideo,
  Clock,
  ArrowUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayout({ children }) {
  const navRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 🔥 Animate Nav + Scroll Hide/Show
  useEffect(() => {
    const nav = navRef.current;
    gsap.to(nav, {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top -80",
        toggleActions: "play none none reverse",
      },
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      nav.style.transform =
        currentScrollY > prevScrollY ? "translateY(-100%)" : "translateY(0)";
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  // 🔝 Scroll to Top Btn
  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 🔍 Search debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length > 1) {
        const res = await getAnimeByLetter({
          q: searchQuery,
          page: 1,
          limit: 5,
        });
        setSearchResults(res?.data || []);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-transform duration-300 ease-in-out backdrop-blur-md bg-transparent shadow-md"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-green-400">
            <img src="/zoro.png" alt="Zoro Anime Logo" className="w-8 h-8" />
            <p className="font-bold text-lg hidden md:inline">Zoro Anime</p>
          </Link>

          {/* Nav Links (desktop only) */}
          <nav className="hidden lg:flex gap-6 text-sm text-gray-200">
            <Link
              href="/top-anime"
              className="hover:text-white flex items-center gap-1"
            >
              <Flame size={16} /> Top
            </Link>
            <Link
              href="/season"
              className="hover:text-white flex items-center gap-1"
            >
              <ListVideo size={16} /> Season
            </Link>
            <Link href="/genre" className="hover:text-white">
              Genres
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="relative w-full max-w-lg ml-auto">
            <input
              type="text"
              aria-label="Search Anime"
              role="searchbox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search anime..."
              className="bg-white/10 text-white px-4 py-2 rounded-lg w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            />
            {searchQuery && (
              <SearchBox
                results={searchResults}
                onClose={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-24 p-6 min-h-screen">{children}</main>

      {/* Scroll to Top Btn */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 backdrop-blur-md bg-green-500/20 border border-green-400/30 text-white p-3 rounded-full shadow-xl transition hover:scale-110 hover:bg-green-400/30 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-green-300" />
        </button>
      )}

      {/* FOOTER */}
      <footer className="w-full bg-black/40 backdrop-blur-md border-t border-white/10 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          {/* Branding */}
          <div>
            {isHome ? (
              <h1 className="text-white text-xl font-semibold">Zoro Anime</h1>
            ) : (
              <p className="text-white text-xl font-semibold">Zoro Anime</p>
            )}
            <h2 className="text-sm mt-1 text-gray-400">
              Discover, track, and enjoy your favorite anime anytime.
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <Link href="/about" className="hover:text-green-400 transition">
                About
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-green-400 transition">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4 justify-center md:justify-end">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>

        {/* A-Z List */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center">
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link
              href="/az-list/all"
              className="hover:text-green-400 transition"
            >
              All
            </Link>
            <Link
              href="/az-list/0-9"
              className="hover:text-green-400 transition"
            >
              0–9
            </Link>
            {Array.from("abcdefghijklmnopqrstuvwxyz").map((char) => (
              <Link
                key={char}
                href={`/az-list/${char}`}
                className="hover:text-green-400 transition"
              >
                {char.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6 border-t border-white/10 pt-4">
          © {new Date().getFullYear()} Zoro Anime. Built with ❤️ for anime fans.
        </div>
      </footer>
    </>
  );
}
