"use client";

export default function TermsPage() {
  return (
    <section className="min-h-screen px-6 py-12  text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-300 mb-4">
          By accessing and using our platform, you agree to the following terms:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>You may not use this website for unlawful activities.</li>
          <li>
            We do not own the anime content; links are sourced from third
            parties.
          </li>
          <li>
            Your continued use of the platform constitutes agreement to these
            terms.
          </li>
        </ul>
      </div>
    </section>
  );
}
