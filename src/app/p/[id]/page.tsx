"use client";

import { use, useEffect, useRef, useState } from "react";

type PasteResponse = {
  content: string;
  remaining_views: number | null;
  expires_at: string | null;
  error?: string;
};

export default function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<PasteResponse | null>(null);
  const fetchedRef = useRef(false);

  // 1️⃣ Fetch paste ONCE
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch(`/api/pastes/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  // 2️⃣ Auto-expire in UI (based on expires_at)
  useEffect(() => {
    if (!data?.expires_at) return;

    const expiresAt = new Date(data.expires_at).getTime();
    const remainingMs = expiresAt - Date.now();

    if (remainingMs <= 0) {
      setData({ error: "Paste expired" } as PasteResponse);
      return;
    }

    const timer = setTimeout(() => {
      setData({ error: "Paste expired" } as PasteResponse);
    }, remainingMs);

    return () => clearTimeout(timer);
  }, [data]);

  if (!data) return <p>Loading...</p>;
  if (data.error) return <p>{data.error}</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Paste</h1>

      <pre
        style={{
          background: "#111",
          color: "#eee",
          padding: 16,
          whiteSpace: "pre-wrap",
        }}
      >
        {data.content}
      </pre>

     <p
  style={{
    marginTop: 12,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 500,
  }}
>
  Remaining views:{" "}
  {data.remaining_views === null ? "Unlimited" : data.remaining_views}
</p>
    </main>
  );
}