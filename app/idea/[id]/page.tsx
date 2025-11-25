"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, BookOpen, Download, BarChart3, Copy, Check } from "lucide-react";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

interface ToolResult {
  tool: string;
  result: string;
}

interface IdeaData {
  idea_id: string;
  title: string;
  description: string;
  combined_result: string;
  status: string;
  per_tool_results?: ToolResult[];
}

// Simple markdown parser for basic formatting
const parseMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/^\* ([^*]+?):(.*)$/gm, '<strong>• $1:</strong>$2') // * Description: format
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-blue-300 mt-6 mb-3">$1</h3>') // H3
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-blue-200 mt-8 mb-4">$1</h2>') // H2
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-blue-100 mt-8 mb-4">$1</h1>') // H1
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>') // Bullet points
    .replace(/\n\n/g, '</p><p class="mb-4">') // Paragraphs
    .replace(/\n/g, '<br />'); // Line breaks
};

export default function IdeaPage() {
  const params = useParams();
  const router = useRouter();
  const ideaId = params.id as string;
  const [copied, setCopied] = React.useState(false);
  const [ideaData, setIdeaData] = React.useState<IdeaData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [popup, setPopup] = React.useState<{show: boolean, message: string, type: 'success' | 'error'}>({show: false, message: '', type: 'success'});

  React.useEffect(() => {
    const stored = localStorage.getItem(`idea-${ideaId}`);
    setIdeaData(stored ? JSON.parse(stored) : null);
    setLoading(false);
  }, [ideaId]);

  if (loading || !ideaData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          {loading ? (
            <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Idea Not Found</h1>
              <button 
                onClick={() => router.push('/create')}
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
              >
                Create New Idea
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ideaData.combined_result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center md:ml-52">
          <GlowingOrb />
        </div>
        <Particles />
      </div>
      
      <SideNav />
      
      <div className="ml-0 md:ml-52 p-4 md:p-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Create
            </button>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {ideaData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Generated Idea
                    </span>
                    <span>•</span>
                    <span>ID: {ideaId.slice(0, 8)}...</span>
                    <span>•</span>
                    <span suppressHydrationWarning>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Content */}
          <div className="glass-card relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Generated Content
              </h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-slate-100 leading-relaxed text-base md:text-lg"
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="mb-4">${parseMarkdown(ideaData.combined_result)}</p>` 
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={async () => {
                try {
                  const response = await fetch('http://127.0.0.1:8081/api/ai/save-to-vault', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: ideaData.title,
                      content: ideaData.description,
                      creator_id: 'user123',
                      snapshots: ideaData.per_tool_results?.map((result: ToolResult) => ({
                        tool: result.tool,
                        content: result.result
                      })) || []
                    })
                  });
                  
                  const data = await response.json();
                  
                  if (data.success) {
                    const message = `Idea saved successfully! ${data.snapshots_saved} snapshots saved` + 
                      (data.snapshots_failed > 0 ? `, ${data.snapshots_failed} failed` : '');
                    setPopup({show: true, message, type: 'success'});
                  } else {
                    setPopup({show: true, message: `Save failed: ${data.error || 'Unknown error'}`, type: 'error'});
                  }
                } catch {
                  setPopup({show: true, message: 'Failed to save to vault. Please try again.', type: 'error'});
                }
              }}
              className="action-btn bg-blue-600 hover:bg-blue-500 group"
            >
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Save to Vault</span>
            </button>
            <button className="action-btn bg-slate-700 hover:bg-slate-600 group">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Export PDF</span>
            </button>
            <button 
              onClick={() => router.push('/analyzer')}
              className="action-btn bg-purple-600 hover:bg-purple-500 group"
            >
              <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Analyze Idea</span>
            </button>
          </div>
          
          {/* Bottom Spacing */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPopup({...popup, show: false})}>
          <div className={`glass-card max-w-md mx-4 ${popup.type === 'success' ? 'border-green-500/30' : 'border-red-500/30'}`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              {popup.type === 'success' ? (
                <Check className="w-6 h-6 text-green-400" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">!</div>
              )}
              <h3 className="text-lg font-semibold">{popup.type === 'success' ? 'Success' : 'Error'}</h3>
            </div>
            <p className="text-slate-300 mb-6">{popup.message}</p>
            <button 
              onClick={() => setPopup({...popup, show: false})}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          transition: all 0.2s ease;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .glass-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
        }
      `}</style>
    </div>
  );
}