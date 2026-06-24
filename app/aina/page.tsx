"use client";

import { useState } from "react";

export default function AinaPage() {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    targetCustomer: "",
    benefits: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateContent = async () => {
    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Gagal generate content.");
        return;
      }

      setResult(data.content || "Tiada konten dijana.");
    } catch {
      setResult("Error: API tidak respon. Sila semak terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold">AINA AI Content Booster</h1>

        <p className="mb-6 text-gray-600">
          Masukkan maklumat bisnes anda dan AI akan hasilkan 3 idea konten.
        </p>

        <div className="space-y-4">
          <input
            name="productName"
            placeholder="Nama Produk/Servis"
            value={form.productName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="description"
            placeholder="Penerangan Produk/Servis"
            value={form.description}
            onChange={handleChange}
            className="h-28 w-full rounded-lg border p-3"
          />

          <input
            name="targetCustomer"
            placeholder="Target Pelanggan"
            value={form.targetCustomer}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="benefits"
            placeholder="Kelebihan Utama"
            value={form.benefits}
            onChange={handleChange}
            className="h-24 w-full rounded-lg border p-3"
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
          >
            {loading ? "Sedang Generate..." : "Generate 3 Content"}
          </button>
        </div>

        {result && (
          <div className="mt-6 whitespace-pre-wrap rounded-xl bg-purple-50 p-4 text-gray-800">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}