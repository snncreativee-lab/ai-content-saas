"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Akaun berjaya didaftarkan. Sila check email untuk verify.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold mb-6">
          Daftar Akaun
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-purple-600 text-white p-3 rounded-lg w-full"
        >
          Daftar
        </button>
      </div>
    </main>
  );
}