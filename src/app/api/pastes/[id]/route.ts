// export const runtime = "edge";

// import { NextResponse } from "next/server";
// import { prisma, getNow } from "@/lib/prisma";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   const paste = await prisma.paste.findUnique({
//     where: { id },
//   });

//   if (!paste) {
//     return NextResponse.json(
//       { error: "Paste not found" },
//       { status: 404 }
//     );
//   }

//   if (paste.expiresAt && paste.expiresAt < getNow(req)) {
//   return NextResponse.json(
//     { error: "Paste expired" },
//     { status: 404 }
//   );
// }

//   if (paste.maxViews && paste.views >= paste.maxViews) {
//     return NextResponse.json(
//       { error: "Paste view limit reached" },
//       { status: 404 }
//     );
//   }

//   await prisma.paste.update({
//     where: { id },
//     data: { views: { increment: 1 } },
//   });

// return NextResponse.json({
//   content: paste.content,
//   createdAt: paste.createdAt,
//   expiresAt: paste.expiresAt,
//   views: paste.views + 1,
//   maxViews: paste.maxViews,
// });
// }
export const runtime = "edge";

import { NextResponse } from "next/server";
import { prisma, getNow } from "@/lib/prisma";

export async function GET(
  req: Request,
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

  // ⏰ Expiry check (deterministic)
  if (paste.expiresAt && paste.expiresAt < getNow(req)) {
    return NextResponse.json(
      { error: "Paste expired" },
      { status: 404 }
    );
  }

  // 👁️ View limit check
  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return NextResponse.json(
      { error: "Paste expired" },
      { status: 404 }
    );
  }

  // ⬆ Increment views
  await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  // 🧮 Remaining views (SPEC FIELD)
  const remainingViews =
    paste.maxViews === null
      ? null
      : Math.max(paste.maxViews - (paste.views + 1), 0);

  // ✅ SPEC-COMPLIANT RESPONSE
  return NextResponse.json({
    content: paste.content,
    remaining_views: remainingViews,
    expires_at: paste.expiresAt,
  });
}