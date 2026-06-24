export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold">
          Tak Payah Pening Fikir Nak Post Apa Lagi
        </h1>

        <p className="mt-6 text-gray-600">
          Masukkan produk anda dan AI akan cadangkan content
          yang boleh membantu meningkatkan jualan.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/pricing"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Lihat Harga
          </a>

          <a
            href="/register"
            className="border px-6 py-3 rounded-lg"
          >
            Daftar
          </a>
        </div>
      </section>
    </main>
  );
}