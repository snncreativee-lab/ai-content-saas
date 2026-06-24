export default function PricingPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center">
        Pelan Langganan
      </h1>

      <div className="flex justify-center mt-10">
        <div className="border p-8 rounded-xl w-80">
          <h2 className="text-2xl font-bold">
            Pro Plan
          </h2>

          <p className="mt-4 text-4xl font-bold">
            RM39
            <span className="text-base">/bulan</span>
          </p>

          <ul className="mt-6 space-y-2">
            <li>✔ Unlimited Content</li>
            <li>✔ Viral Hooks</li>
            <li>✔ AI Caption Generator</li>
            <li>✔ TikTok Content Ideas</li>
          </ul>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-6 w-full">
            Langgan Sekarang
          </button>
        </div>
      </div>
    </main>
  );
}