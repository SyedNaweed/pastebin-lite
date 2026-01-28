export const runtime = "edge";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, expiresIn, maxViews } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const expiresAt =
    typeof expiresIn === "number"
      ? new Date(Date.now() + expiresIn * 1000)
      : null;

  const paste = await prisma.paste.create({
    data: {
      content,
      expiresAt,
      maxViews: typeof maxViews === "number" ? maxViews : null,
    },
  });

  const origin = req.headers.get("origin");

  return NextResponse.json({
    id: paste.id,
    url: `${origin}/p/${paste.id}`,
  });
}