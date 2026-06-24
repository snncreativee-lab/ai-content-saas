"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [category, setCategory] = useState("Kedai Online");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  async function loadProfile() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  }

  async function loadHistory() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    const { data } = await supabase
      .from("contents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setHistory(data || []);
  }

  async function generateContent() {
    setLoading(true);
    setResult("");

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: latestProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (
      latestProfile?.package === "free" &&
      latestProfile.daily_used >= latestProfile.daily_limit
    ) {
      window.location.href = "/upgrade";
      return;
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, platform, category }),
    });

    const text = await res.text();
    const data = JSON.parse(text);
    const finalResult = data.result || data.error || text;

    setResult(finalResult);

    if (data.result) {
      await supabase.from("contents").insert({
        user_id: user.id,
        product: `${product} (${category} - ${platform})`,
        result: finalResult,
      });

      await supabase
        .from("profiles")
        .update({
          daily_used: latestProfile.daily_used + 1,
        })
        .eq("id", user.id);

      await loadProfile();
      await loadHistory();
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    alert("Content berjaya copy!");
  }

  useEffect(() => {
    loadProfile();
    loadHistory();
  }, []);

  return (
    <main className="min-h-screen p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Dashboard AI Content Booster</h1>

          {profile && (
            <p className="mt-2 text-gray-600">
              Pelan: <b>{profile.package.toUpperCase()}</b> | Guna hari ini:{" "}
              <b>{profile.daily_used}</b> / {profile.daily_limit}
            </p>
          )}
        </div>

        <button onClick={logout} className="border px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>

      <div className="mt-8 border p-6 rounded-xl max-w-3xl">
        <label className="font-semibold">Kategori Perniagaan</label>
        <select
          className="border p-3 rounded-lg w-full mt-2 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Jersi Muslimah</option>
          <option>Perfume</option>
          <option>Makanan</option>
          <option>Ejen Takaful</option>
          <option>Hartanah</option>
          <option>Kedai Online</option>
          <option>Lain-lain</option>
        </select>

        <label className="font-semibold">Platform</label>
        <select
          className="border p-3 rounded-lg w-full mt-2 mb-4"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>TikTok</option>
          <option>Facebook</option>
          <option>Instagram</option>
          <option>WhatsApp</option>
        </select>

        <input
          placeholder="Contoh: Jersi Muslimah Badminton"
          className="border p-3 rounded-lg w-full"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <button
          onClick={generateContent}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          {loading ? "AI sedang generate..." : "Generate 3 Content"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-100 p-5 rounded-xl whitespace-pre-wrap">
            {result}

            <button
              onClick={() => copyText(result)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg block"
            >
              Copy Content
            </button>
          </div>
        )}
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">History Content</h2>

        {history.map((item) => (
          <div key={item.id} className="border p-5 rounded-xl mb-4">
            <h3 className="font-bold">{item.product}</h3>

            <p className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleString()}
            </p>

            <div className="mt-3 whitespace-pre-wrap">{item.result}</div>

            <button
              onClick={() => copyText(item.result)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
            >
              Copy Content
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}