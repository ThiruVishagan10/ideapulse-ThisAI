"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

export default function IdeaPage() {
  const params = useParams();
  const router = useRouter();
  const ideaId = params.id as string;

  // Get idea data from localStorage or API
  const getIdeaData = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`idea-${ideaId}`);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  };

  const ideaData = getIdeaData();

  if (!ideaData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Idea Not Found</h1>
          <button 
            onClick={() => router.push('/create')}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Create New Idea
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center md:ml-52">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />
      
      <div className="ml-0 md:ml-52 p-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h1 className="text-3xl font-bold">{ideaData.title}</h1>
            </div>
            <p className="text-slate-400 text-sm">Generated Idea • ID: {ideaId}</p>
          </div>

          {/* Generated Content */}
          <div className="glass-card">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                {ideaData.combined_result}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
              Save to Vault
            </button>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
              Export PDF
            </button>
            <button 
              onClick={() => router.push('/analyzer')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
            >
              Analyze Idea
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(22, 33, 53, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}