import { NextResponse, NextRequest } from "next/server";
import { getSlider } from "@/services/service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const bannerType = searchParams.get("bannerType") || "main-surat";

  try {
    const data = await getSlider(bannerType);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка загрузки данных" },
      { status: 500 }
    );
  }
}
