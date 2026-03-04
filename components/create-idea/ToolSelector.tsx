"use client";

import React from "react";
import { Wand2, Brain, Sparkles, Type, FileText, Tag } from "lucide-react";

const TOOL_LIST = [
  { key: "REFINE", label: "Refine", icon: Wand2 },
  { key: "EXPAND", label: "Expand", icon: Brain },
  { key: "SUMMARIZE", label: "Summarize", icon: FileText },
  { key: "TONE", label: "Adjust Tone", icon: Type },
  { key: "STRUCTURE", label: "Structure", icon: Sparkles },
  { key: "GENERATE_TAGS", label: "Generate Tags", icon: Tag },
];

interface ToolSelectorProps {
  selected: string[];
  onToggle: (toolKey: string) => void;
}

export default function ToolSelector({ selected, onToggle }: ToolSelectorProps) {
  return (
    <div className="space-y-3">
      {TOOL_LIST.map((tool) => {
        const Icon = tool.icon;
        const isSelected = selected.includes(tool.key);
        return (
          <button
            key={tool.key}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border ${
              isSelected
                ? "border-blue-500 bg-slate-800/50"
                : "border-slate-700 bg-slate-900/40"
            } hover:bg-slate-800/40 transition`}
            onClick={() => onToggle(tool.key)}
          >
            <div className="text-blue-400"><Icon className="w-5 h-5" /></div>
            <span className="text-sm">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}
