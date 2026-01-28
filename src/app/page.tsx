"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [content, setContent] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const router = useRouter();

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        maxViews: maxViews ? Number(maxViews) : undefined,
        expiresIn: expiresIn ? Number(expiresIn) : undefined,
      }),
    });

    const data = await res.json();

    // ✅ Spec-compliant redirect
    router.push(data.url);
  }

  return (
    <main style={{ padding: 24, maxWidth: 800 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        style={{ width: "100%", marginTop: 12 }}
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max views (optional)"
        style={{ marginTop: 12, display: "block" }}
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
      />

      <input
        type="number"
        placeholder="Expires in seconds (optional)"
        style={{ marginTop: 12, display: "block" }}
        value={expiresIn}
        onChange={(e) => setExpiresIn(e.target.value)}
      />

      <button onClick={createPaste} style={{ marginTop: 12 }}>
        Create Paste
      </button>
    </main>
  );
}