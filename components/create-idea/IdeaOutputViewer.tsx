"use client";
import React from "react";
import { Clipboard, Replace } from "lucide-react";

export default function IdeaOutputViewer({
  output,
  onReplace,
}: {
  output: string;
  onReplace: () => void;
}) {
  if (!output) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-700 p-6 rounded-2xl mt-6">
      <h3 className="text-lg font-semibold text-blue-400 mb-3">AI Result</h3>

      <div className="text-slate-300 whitespace-pre-wrap mb-4">{output}</div>

      <div className="flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
        >
          <Clipboard className="w-4 h-4" /> Copy
        </button>

        <button
          onClick={onReplace}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition shadow-md shadow-blue-500/30"
        >
          <Replace className="w-4 h-4" /> Replace Idea
        </button>
      </div>
    </div>
  );
}
