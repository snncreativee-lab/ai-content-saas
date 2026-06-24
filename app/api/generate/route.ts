import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum diisi dalam .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { productName, description, targetCustomer, benefits } = body;

    const prompt = `
Anda ialah AI marketing assistant untuk usahawan Malaysia.

Maklumat bisnes:
Nama Produk/Servis: ${productName}
Penerangan Produk/Servis: ${description}
Target Pelanggan: ${targetCustomer || "Tidak dinyatakan"}
Kelebihan Utama: ${benefits || "Tidak dinyatakan"}

Tugasan:
Kenal pasti sendiri kategori perniagaan produk/servis ini.
Hasilkan 3 idea kandungan pemasaran harian.

Setiap konten mesti ada:
1. Tajuk konten
2. Hook permulaan
3. Caption pendek gaya Malaysia
4. Call-to-action
5. Cadangan hashtag

Gaya bahasa:
Bahasa Melayu santai, sesuai untuk TikTok, Instagram dan Facebook.
Ayat menjual tetapi tidak terlalu hard sell.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    return NextResponse.json({
      content: content || "AI tidak mengembalikan jawapan.",
    });
  } catch (error: any) {
    console.error("GEMINI_GENERATE_ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Gagal generate content dengan Gemini. Semak terminal.",
      },
      { status: 500 }
    );
  }
}