"use client";

import { use, useEffect, useRef, useState } from "react";

export default function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch(`/api/paste/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);
useEffect(() => {
  if (!data?.expiresAt) return;

  const expiresAt = new Date(data.expiresAt).getTime();
  const now = Date.now();
  const remaining = expiresAt - now;

  if (remaining <= 0) {
    setData({ error: "Paste expired" });
    return;
  }

  const timer = setTimeout(() => {
    setData({ error: "Paste expired" });
  }, remaining);

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
      <p>
        Views: {data.views}
        {data.maxViews ? ` / ${data.maxViews}` : ""}
      </p>
    </main>
  );
}