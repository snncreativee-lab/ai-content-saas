"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function PaymentSuccessPage() {
  useEffect(() => {
    async function upgradeUser() {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userId");

      if (userId) {
        await supabase
          .from("profiles")
          .update({
            package: "premium",
            daily_limit: 999999,
          })
          .eq("id", userId);
      }
    }

    upgradeUser();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded-xl text-center">
        <h1 className="text-3xl font-bold">Payment Berjaya</h1>
        <p className="mt-4">Akaun anda telah diupgrade ke Premium.</p>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Pergi Dashboard
        </a>
      </div>
    </main>
  );
}