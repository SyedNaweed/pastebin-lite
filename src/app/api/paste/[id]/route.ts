export const runtime = "edge";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  if (paste.expiresAt && paste.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Paste expired" },
      { status: 410 }
    );
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return NextResponse.json(
      { error: "Paste view limit reached" },
      { status: 410 }
    );
  }

  await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

return NextResponse.json({
  content: paste.content,
  createdAt: paste.createdAt,
  expiresAt: paste.expiresAt,
  views: paste.views + 1,
  maxViews: paste.maxViews,
});
}