"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Edit, Maximize2, Share2, Trash2, ArrowUpRight, Code, BarChart3, TrendingUp, Grid3x3, BookOpen, Download, Copy, Check } from "lucide-react";
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
  selectedTools?: string[];
}

interface DbIdea {
  id: string;
  title: string;
  original_text?: string;
  generated_text?: string;
  description?: string;
  body?: string;
  ai_tools_used?: (string | {tool: string; result?: string})[];
}



// Enhanced markdown parser for better formatting
const parseMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>') // Bold
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-gray-200">$1</em>') // Italic
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-blue-300 mt-6 mb-3 border-b border-gray-700 pb-2">$1</h3>') // H3
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-blue-200 mt-8 mb-4 border-b border-gray-600 pb-2">$1</h2>') // H2
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-blue-100 mt-8 mb-4 border-b border-gray-500 pb-3">$1</h1>') // H1
    .replace(/^(\s*)\* (.*$)/gm, '<li class="ml-6 mb-2 text-gray-300 relative before:content-[\"•\"] before:text-blue-400 before:absolute before:-left-4">$2</li>') // Bullet points
    .replace(/^(\s*)\d+\. (.*$)/gm, '<li class="ml-6 mb-2 text-gray-300 list-decimal">$2</li>') // Numbered lists
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-cyan-300 font-mono text-sm border border-gray-700">$1</code>') // Inline code
    .replace(/---+/g, '<hr class="border-gray-600 my-8 border-t-2" />') // Horizontal rule
    .replace(/\n\s*\n/g, '</p><p class="mb-4 text-gray-300 leading-relaxed">') // Paragraphs
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
    const fetchIdeaData = async () => {
      try {
        // Fetch from API (skip localStorage to ensure fresh data)
        const response = await fetch(`http://127.0.0.1:8081/api/ideas`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.ideas) {
            const idea = data.ideas.find((i: DbIdea) => i.id === ideaId);
            if (idea) {
              setIdeaData({
                idea_id: idea.id,
                title: idea.title,
                description: idea.original_text || '',
                combined_result: idea.generated_text || '',
                status: 'completed',
                per_tool_results: idea.ai_tools_used ? (Array.isArray(idea.ai_tools_used) ? idea.ai_tools_used.map((tool: string | {tool: string; result?: string}) => ({
                  tool: typeof tool === 'string' ? tool : tool.tool || 'unknown',
                  result: typeof tool === 'object' ? tool.result || 'No details available' : 'Tool used'
                })) : []) : []
              });
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch idea:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaData();
  }, [ideaId]);

  if (loading || !ideaData) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
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

  const aiTools = [
    { name: 'Expand', icon: Maximize2 },
    { name: 'Summarize', icon: Grid3x3 },
    { name: 'Use Cases', icon: Grid3x3 },
    { name: 'Tech Stack', icon: Code },
    { name: 'Market Fit', icon: BarChart3 },
    { name: 'Roadmap', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center md:ml-52">
          <GlowingOrb />
        </div>
        <Particles />
      </div>
      
      <SideNav />
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-xl bg-gray-900/60 px-6 py-6 ml-0 md:ml-52 shadow-2xl">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-200 group"
            >
              <div className="p-2 bg-gray-800/60 group-hover:bg-gray-700/60 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back</span>
            </button>
            <div className="w-px h-6 bg-gray-600" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-white">Idea Details</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group">
              <Edit className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
            </button>
            <button 
              onClick={copyToClipboard}
              className="p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400 group-hover:text-green-400" />}
            </button>
            <button className="p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group">
              <Share2 className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
            </button>
            <button className="p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group">
              <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 ml-0 md:ml-52 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Metadata */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/30 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block mr-2" />
                    Active
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  {ideaData.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Created: {new Date().toLocaleDateString()}</span>
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>Last Updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Original Description */}
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Edit className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Original Description</h3>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
                <p className="text-gray-300 leading-relaxed text-sm">
                  {ideaData.description || 'No original description available.'}
                </p>
              </div>
            </div>

            {/* AI-Enhanced Content */}
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI-Enhanced Content</h3>
                <div className="ml-auto px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/30">
                  AI Generated
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
                {ideaData.combined_result ? (
                  <div 
                    className="text-gray-300 leading-relaxed prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ 
                      __html: '<p class="mb-4 text-gray-300 leading-relaxed">' + parseMarkdown(ideaData.combined_result) + '</p>'
                    }}
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm">No AI-enhanced content available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Project Metrics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                  <p className="text-xs text-gray-500 mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-semibold capitalize">
                      {ideaData.status}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                  <p className="text-xs text-gray-500 mb-2">AI Tools</p>
                  <p className="text-white text-lg font-bold">
                    {ideaData.per_tool_results?.length || ideaData.selectedTools?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Tools Used */}
            {ideaData.per_tool_results && ideaData.per_tool_results.length > 0 && (
              <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Code className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">AI Tools Arsenal</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {ideaData.per_tool_results.map((result, index) => {
                    const getToolColor = (tool: string) => {
                      switch (tool) {
                        case 'expand':
                          return 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400';
                        case 'technical':
                          return 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400';
                        case 'market_positioning':
                        case 'market':
                          return 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400';
                        case 'use_cases':
                          return 'from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400';
                        case 'roadmap':
                          return 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-400';
                        case 'summarize':
                          return 'from-violet-500/20 to-violet-600/20 border-violet-500/30 text-violet-400';
                        default:
                          return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400';
                      }
                    };

                    const getToolEmoji = (tool: string) => {
                      switch (tool) {
                        case 'expand':
                          return '🔍';
                        case 'technical':
                          return '⚙️';
                        case 'market_positioning':
                        case 'market':
                          return '📊';
                        case 'use_cases':
                          return '💡';
                        case 'roadmap':
                          return '🗺️';
                        case 'summarize':
                          return '📝';
                        default:
                          return '🔧';
                      }
                    };
                    
                    return (
                      <div
                        key={index}
                        className={`relative overflow-hidden bg-gradient-to-br ${getToolColor(result.tool)} rounded-xl p-4 border hover:scale-105 transition-all duration-200 group`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getToolEmoji(result.tool)}</span>
                          <div>
                            <span className="text-sm font-semibold capitalize block">
                              {result.tool}
                            </span>
                            <span className="text-xs opacity-80">AI Tool</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tool Results */}
            {ideaData.per_tool_results && ideaData.per_tool_results.length > 0 && (
              <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Analysis Results</h3>
                </div>
                <div className="space-y-3">
                  {ideaData.per_tool_results.map((result, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <span className="text-sm font-semibold text-white capitalize">{result.tool}</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                          Complete
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                        {result.result.substring(0, 120)}...
                      </p>
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group-hover:gap-2">
                        View Details
                        <ArrowUpRight className="w-3 h-3 transition-all" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Download className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={async () => {
                    try {
                      const requestBody = {
                        title: ideaData.title,
                        original_text: ideaData.description,
                        generated_text: ideaData.combined_result,
                        creator_id: null,
                        is_draft: false,
                        is_ai_generated: true,
                        ai_tools_used: ideaData.per_tool_results?.map((result: ToolResult) => ({
                          tool: result.tool,
                          result: result.result
                        })) || ideaData.selectedTools?.map(tool => ({
                          tool,
                          result: 'Tool selected but no detailed results available'
                        })) || []
                      };
                      
                      const response = await fetch('http://127.0.0.1:8081/api/ideas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                      });
                      
                      const responseText = await response.text();
                      let data;
                      try {
                        data = responseText ? JSON.parse(responseText) : {};
                      } catch {
                        data = { error: 'Invalid JSON response', raw: responseText };
                      }
                      
                      if (response.ok && data.success && data.idea?.id) {
                        const toolsCount = ideaData.per_tool_results?.length || ideaData.selectedTools?.length || 0;
                        const message = `Idea saved successfully to database! ${toolsCount} AI tools recorded.`;
                        setPopup({show: true, message, type: 'success'});
                      } else {
                        const errorMsg = data.error || data.message || data.details || responseText || `HTTP ${response.status}: ${response.statusText}`;
                        setPopup({show: true, message: `Save failed: ${errorMsg}`, type: 'error'});
                      }
                    } catch {
                      setPopup({show: true, message: 'Backend server not available. Please check if the server is running on port 8081.', type: 'error'});
                    }
                  }}
                  className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-white font-semibold block">Save to Vault</span>
                      <span className="text-xs text-blue-100 opacity-80">Store in your collection</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                </button>
                
                <button 
                  onClick={() => {
                    try {
                      // Create DOC content with proper formatting
                      const docContent = `${ideaData.title || 'Untitled Idea'}\n\n` +
                        `Original Description:\n${ideaData.description || 'No description available'}\n\n` +
                        `AI-Enhanced Content:\n${ideaData.combined_result || 'No content available'}\n\n` +
                        `AI Tools Used:\n${ideaData.per_tool_results?.map(result => `• ${result.tool || 'Unknown tool'}`).join('\n') || 'None'}\n\n` +
                        `---\nGenerated by IdeaPulse`;
                      
                      // Create blob with DOC MIME type
                      const blob = new Blob([docContent], { 
                        type: 'application/msword' 
                      });
                      
                      // Create download link
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${(ideaData.title || 'untitled_idea').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.doc`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      
                      setPopup({show: true, message: 'DOC file exported successfully!', type: 'success'});
                    } catch (error) {
                      console.error('DOC export failed:', error);
                      setPopup({show: true, message: 'DOC export failed. Please try again.', type: 'error'});
                    }
                  }}
                  className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-white font-semibold block">Export DOC</span>
                      <span className="text-xs text-green-100 opacity-80">Download as Word document</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                </button>
                
                <button 
                  onClick={() => router.push('/analyzer')}
                  className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-white font-semibold block">Analyze Further</span>
                      <span className="text-xs text-purple-100 opacity-80">Deep dive analysis</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setPopup({...popup, show: false})}>
          <div className={`bg-gray-900/95 backdrop-blur-xl border max-w-md mx-4 rounded-2xl p-8 shadow-2xl ${popup.type === 'success' ? 'border-green-500/30' : 'border-red-500/30'}`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${popup.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {popup.type === 'success' ? (
                  <Check className="w-6 h-6 text-green-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">!</div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{popup.type === 'success' ? 'Success!' : 'Error'}</h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">{popup.message}</p>
            <button 
              onClick={() => setPopup({...popup, show: false})}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${popup.type === 'success' ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-green-500/25' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-red-500/25'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}