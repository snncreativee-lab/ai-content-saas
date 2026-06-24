import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { product, platform, category } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Kau ialah pakar marketing untuk seller online Malaysia.

Produk: ${product}
Platform: ${platform}
Kategori Perniagaan: ${category}

Tugasan:
Beri 3 idea content jualan untuk hari ini.

Content 1:
- Soft Sell

Content 2:
- Trust / Story

Content 3:
- Hard Sell CTA

Untuk setiap content berikan:
- Hook
- Idea Video/Post
- Caption
- CTA

Sesuaikan gaya penulisan mengikut kategori perniagaan dan platform.

Jika kategori Jersi Muslimah:
Fokus pada custom design, sopan, aurat-friendly, team, sekolah, event, sukan dan confidence wanita.

Jika kategori Perfume:
Fokus pada bau, personaliti, hadiah, keyakinan dan daily use.

Jika kategori Makanan:
Fokus pada rasa, craving, repeat order, delivery dan waktu lapar.

Jika kategori Ejen Takaful:
Fokus pada kesedaran perlindungan, keluarga dan masa depan.

Jika kategori Hartanah:
Fokus pada rumah pertama, pelaburan, lokasi dan kemampuan bulanan.

Jika platform TikTok:
Fokus hook kuat 3 saat pertama, idea video pendek 15-30 saat dan CTA ringkas.

Jika platform Facebook:
Fokus storytelling, caption panjang dan engagement.

Jika platform Instagram:
Fokus visual, carousel, caption aesthetic dan CTA DM.

Jika platform WhatsApp:
Fokus mesej broadcast, soft closing dan ayat follow up.

Gunakan Bahasa Melayu Malaysia yang santai, jelas, meyakinkan dan sesuai untuk seller online.
`,
    });

    return Response.json({
      result: response.text,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message || "Unknown error",
    });
  }
}