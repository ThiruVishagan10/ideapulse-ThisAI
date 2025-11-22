"use server";

export async function generateFullConceptAction(
  idea_id: string,
  content: string
) {
  const steps = ["expand", "use_cases", "market_positioning", "roadmap"];
  let current = content;

  for (const step of steps) {
    const res = await fetch("http://localhost:8081/api/ai/idea-tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idea_id,
        content: current,
        action: step,
      }),
    });

    const output = await res.json();
    current = output.result;
  }

  return current; // return fully processed concept
}
