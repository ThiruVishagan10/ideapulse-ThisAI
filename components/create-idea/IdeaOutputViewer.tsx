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

  const renderMarkdown = (text: string) => {
    // Extract JSON from text if present
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
    let mainText = text;
    let jsonData = null;

    if (jsonMatch) {
      mainText = text.replace(jsonMatch[0], '').trim();
      try {
        jsonData = JSON.parse(jsonMatch[1].trim());
      } catch (e) {
        console.error('Failed to parse JSON:', e);
      }
    }

    return (
      <>
        {mainText.split('\n').map((line, i) => {
          // Headers
          if (line.startsWith('**') && line.endsWith('**')) {
            return <h3 key={i} className="text-lg font-bold text-blue-300 mt-4 mb-2">{line.slice(2, -2)}</h3>;
          }
          // Bold text
          if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <p key={i} className="mb-2">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{part}</strong> : part)}
              </p>
            );
          }
          // Bullet points
          if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
            return <li key={i} className="ml-6 mb-1 list-disc">{line.trim().slice(1).trim()}</li>;
          }
          // Empty lines
          if (!line.trim()) return <br key={i} />;
          // Regular paragraphs
          return <p key={i} className="mb-2">{line}</p>;
        })}
        
        {jsonData && Array.isArray(jsonData) && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-semibold text-blue-400 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {jsonData.map((tag, idx) => (
                <span key={idx} className="bg-blue-600 px-3 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-slate-900/60 border border-slate-700 p-6 rounded-2xl mt-6">
      <h3 className="text-lg font-semibold text-blue-400 mb-3">AI Result</h3>

      <div className="text-slate-300 leading-relaxed">{renderMarkdown(output)}</div>

      <div className="flex gap-3 mt-6">
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
