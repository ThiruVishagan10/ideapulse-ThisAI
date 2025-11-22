"use client";
import React from "react";
import { Clipboard } from "lucide-react";

interface SnapshotPanelProps {
  snapshots: { content: string; ai_action: string; created_at: string }[];
}

export default function SnapshotPanel({ snapshots }: SnapshotPanelProps) {
  if (!snapshots.length) return null;

  return (
    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700 space-y-4">
      <h3 className="text-sm font-medium text-slate-300">Snapshots</h3>

      {snapshots.map((snap, i) => (
        <div
          key={i}
          className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="text-blue-400">{snap.ai_action}</span>
            <button
              className="text-slate-400 hover:text-white"
              onClick={() => navigator.clipboard.writeText(snap.content)}
            >
              <Clipboard className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-300 whitespace-pre-line">{snap.content}</p>
        </div>
      ))}
    </div>
  );
}
