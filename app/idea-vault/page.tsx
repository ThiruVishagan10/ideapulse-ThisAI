"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Archive, Clock, Star, Sparkles } from "lucide-react";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

interface AiResult {
  tool: string;
  response?: { content?: string };
}

interface IdeaVersion {
  id: string;
  version: number;
  title: string;
  content: string;
  sourceType: "USER" | "AI";
  createdAt: string;
  aiResults?: AiResult[];
}

interface Idea {
  id: string;
  status: string;
  currentVersion: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  version: IdeaVersion[];
}

const getToolDisplayName = (tool: string): string => {
  const toolNames: Record<string, string> = {
    expand: "Expand",
    summarize: "Summarize",
    use_cases: "Use Cases",
    technical: "Technical",
    market_positioning: "Market",
    roadmap: "Roadmap",
  };
  return toolNames[tool] || tool;
};

const getToolColor = (tool: string): string => {
  const colors: Record<string, string> = {
    expand: "bg-green-500/20 text-green-400 border-green-500/30",
    summarize: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    use_cases: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    technical: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    market_positioning: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    roadmap: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  };
  return colors[tool] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
};

export default function IdeaVault() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_URL}/idea-vault/ideas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestVersion = (idea: Idea) => {
    return idea.version.find(v => v.version === idea.currentVersion);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />

      <div className="ml-0 md:ml-52 p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Archive className="w-6 h-6 text-blue-400" />
              <h1 className="text-3xl font-bold">Idea Vault</h1>
            </div>
            <p className="text-slate-400 text-sm">
              Your collection of ideas and their evolution
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-4">Loading ideas...</p>
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-12">
              <Archive className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No ideas yet</p>
              <button
                onClick={() => router.push('/create')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
              >
                Create Your First Idea
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideas.map((idea) => {
                const latestVersion = getLatestVersion(idea);
                return (
                  <div
                    key={idea.id}
                    onClick={() => router.push(`/idea/${idea.id}`)}
                    className="glass-card p-6 cursor-pointer hover:border-blue-500/50 transition group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
                        {latestVersion?.title || 'Untitled'}
                      </h3>
                      {idea.isFavorite && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {latestVersion?.content || ''}
                    </p>

                    {latestVersion?.aiResults && latestVersion.aiResults.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-slate-500">AI Tools Used</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {latestVersion.aiResults.slice(0, 4).map((ai, index) => (
                            <span
                              key={index}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded border ${getToolColor(ai.tool)}`}
                            >
                              {getToolDisplayName(ai.tool)}
                            </span>
                          ))}
                          {latestVersion.aiResults.length > 4 && (
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">
                              +{latestVersion.aiResults.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>v{idea.currentVersion}</span>
                      </div>
                      <span className={`px-2 py-1 rounded ${
                        latestVersion?.sourceType === 'AI' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {latestVersion?.sourceType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(22, 33, 53, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}
