export const runtime = "edge";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("healthz error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}