"use client";
import { useState } from "react";
import { runAIToolAction } from "@/actions/create-idea/AiAction";

export function useIdeaEditor(ideaId?: string) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runTool = async (tool: string, content: string) => {
    if (!ideaId) return;
    setLoading(true);

    const result = await runAIToolAction(ideaId, content, tool);
    setOutput(result.result);

    setLoading(false);
    return result.result;
  };

  return {
    output,
    loading,
    runTool,
    setOutput,
  };
}
