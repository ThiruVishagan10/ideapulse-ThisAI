"use server";

export async function runAIToolAction(
  idea_id: string,
  content: string,
  tool: string
) {
  const actionMap: Record<string, string> = {
    "Expand Idea": "expand",
    "Summarize": "summarize",
    "Add Use Cases": "use_cases",
    "Make Technical": "technical",
    "Market Positioning": "market_positioning",
    "Generate Roadmap": "roadmap",
  };

  const action = actionMap[tool];

  const response = await fetch("http://localhost:8081/api/ai/idea-tools", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idea_id,
      content,
      action,
    }),
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error("AI Error: " + txt);
  }

  return response.json();
}
