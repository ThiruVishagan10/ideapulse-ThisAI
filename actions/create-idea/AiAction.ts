"use server";

const ACTION_MAP: Record<string, string> = {
  "Expand Idea": "expand",
  "Summarize": "summarize",
  "Add Use Cases": "use_cases",
  "Make Technical": "technical",
  "Market Positioning": "market_positioning",
  "Generate Roadmap": "roadmap",
};

export async function runAIToolAction(
  idea_id: string,
  content: string,
  tool: string
) {
  const action = ACTION_MAP[tool];
  
  if (!action) {
    throw new Error(`Unsupported tool: ${tool}`);
  }

  const apiUrl = process.env.AI_API_URL || "https://localhost:8081";
  
  const response = await fetch(`${apiUrl}/api/ai/idea-tools`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idea_id,
      content,
      action,
    }),
  });

  if (!response.ok) {
    console.error('AI API error:', response.status, response.statusText);
    throw new Error("AI processing failed");
  }

  return response.json();
}
