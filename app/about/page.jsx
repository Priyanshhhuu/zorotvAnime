"use client";

export default function AboutPage() {
  return (
    <section className="min-h-screen px-6 py-12   text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-300 leading-relaxed mb-4">
          Welcome to <span className="text-pink-500 font-semibold">ZoroTV</span>
          , your go-to platform for discovering and streaming anime. We are
          passionate about anime and strive to bring the best viewing experience
          with a modern, fast, and user-friendly design.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to connect anime fans across the globe, making anime
          accessible and enjoyable for everyone.
        </p>
      </div>
    </section>
  );
}
