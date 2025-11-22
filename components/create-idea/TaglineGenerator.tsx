"use client";
import React from "react";
import { RefreshCw } from "lucide-react";

export default function TaglineGenerator({
  tagline,
  regenerate,
}: {
  tagline: string;
  regenerate: () => void;
}) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="text-xs text-slate-400">
        {tagline || "AI-generated tagline appears here..."}
      </span>

      <button
        onClick={regenerate}
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
}
