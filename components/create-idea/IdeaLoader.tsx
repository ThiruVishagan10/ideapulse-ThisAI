"use client";

import React from "react";
import { Brain, Sparkles } from "lucide-react";

export default function IdeaLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <Brain className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 justify-center text-white">
              <Sparkles className="w-6 h-6 text-blue-400" />
              Processing Your Idea
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              AI is enhancing your concept with selected tools...
            </p>
          </div>
          
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}