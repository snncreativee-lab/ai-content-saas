"use client";

import { supabase } from "../lib/supabase";

export default function UpgradePage() {
  async function upgradeNow() {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/toyyibpay/create-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        userId: user.id,
      }),
    });

    const result = await res.json();
    console.log(result);
alert(JSON.stringify(result));

    if (result.url) {
      window.location.href = result.url;
    } else {
      alert(result.error || "Gagal create payment");
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">Upgrade AI Content Booster</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-bold">FREE</h2>
          <p className="mt-4">3 Generate Sehari</p>
          <p>History Content</p>
          <button className="mt-6 border px-5 py-3 rounded-lg">
            Pelan Semasa
          </button>
        </div>

        <div className="border p-6 rounded-xl border-purple-500">
          <h2 className="text-2xl font-bold">PREMIUM</h2>
          <p className="mt-4">Unlimited Generate</p>
          <p>Semua Platform</p>
          <p>Priority AI</p>

          <h3 className="text-3xl font-bold mt-6">RM19 / Bulan</h3>

          <button
            onClick={upgradeNow}
            className="mt-6 bg-purple-600 text-white px-5 py-3 rounded-lg"
          >
            Upgrade Sekarang
          </button>
        </div>
      </div>
    </main>
  );
}