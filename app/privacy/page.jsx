"use client";

export default function PrivacyPage() {
  return (
    <section className="min-h-screen px-6 py-12  text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-300 mb-4">
          We respect your privacy and are committed to protecting your personal
          information.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>
            We do not collect sensitive personal information without consent.
          </li>
          <li>Cookies may be used to enhance your experience.</li>
          <li>
            Third-party ads or analytics tools may collect anonymized data.
          </li>
        </ul>
      </div>
    </section>
  );
}
