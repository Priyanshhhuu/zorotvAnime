"use client";

export default function ContactPage() {
  return (
    <section className="min-h-screen px-6 py-12  text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 mb-6">
          Have questions, feedback, or collaboration ideas? Reach out to us
          below.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
