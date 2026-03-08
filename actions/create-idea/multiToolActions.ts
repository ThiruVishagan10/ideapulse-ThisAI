"use server";

export async function runMultiToolJob(idea_id: string, content: string, tools: string[]) {
  const res = await fetch("http://localhost:3001/api/ai/multi-tools", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idea_id,
      content,
      tools,
      mode: "async",
      reference_url: "/mnt/data/10e86bab-e707-40db-b62e-1082c4fed295.png"
    })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}
