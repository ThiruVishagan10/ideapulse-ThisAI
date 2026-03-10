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



const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const applyInlineMarkdown = (line: string) =>
  line
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800/80 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-xs border border-gray-700">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-gray-200">$1</em>');

const parseMarkdown = (text: string) => {
  const lines = text.split(/\r?\n/);
  const html: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  let inCodeBlock = false;
  let paragraph: string[] = [];

  const closeParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p class="mb-4 text-gray-300 leading-relaxed">${paragraph.join("<br />")}</p>`);
    paragraph = [];
  };

  const closeLists = () => {
    if (inUnorderedList) {
      html.push("</ul>");
      inUnorderedList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      closeParagraph();
      closeLists();
      if (inCodeBlock) {
        html.push("</code></pre>");
      } else {
        html.push('<pre class="mb-4 rounded-lg border border-gray-700 bg-gray-900/80 p-4 overflow-x-auto"><code class="font-mono text-xs text-cyan-200">');
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      html.push(`${escapeHtml(line)}\n`);
      continue;
    }

    if (line === "") {
      closeParagraph();
      closeLists();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      closeParagraph();
      closeLists();
      const level = heading[1].length;
      const content = applyInlineMarkdown(escapeHtml(heading[2]));
      const headingClasses =
        level === 1
          ? "text-2xl md:text-3xl font-bold text-blue-100 mt-7 mb-4 border-b border-gray-600 pb-2"
          : level === 2
            ? "text-xl md:text-2xl font-bold text-blue-200 mt-6 mb-3 border-b border-gray-700 pb-2"
            : "text-lg font-semibold text-blue-300 mt-5 mb-2";
      html.push(`<h${level} class="${headingClasses}">${content}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(line)) {
      closeParagraph();
      closeLists();
      html.push('<hr class="my-6 border-gray-700" />');
      continue;
    }

    const unorderedItem = line.match(/^\s*[-*]\s+(.*)$/);
    if (unorderedItem) {
      closeParagraph();
      if (!inUnorderedList) {
        if (inOrderedList) {
          html.push("</ol>");
          inOrderedList = false;
        }
        html.push('<ul class="mb-4 list-disc pl-6 space-y-1 text-gray-300">');
        inUnorderedList = true;
      }
      html.push(`<li>${applyInlineMarkdown(escapeHtml(unorderedItem[1]))}</li>`);
      continue;
    }

    const orderedItem = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (orderedItem) {
      closeParagraph();
      if (!inOrderedList) {
        if (inUnorderedList) {
          html.push("</ul>");
          inUnorderedList = false;
        }
        html.push('<ol class="mb-4 list-decimal pl-6 space-y-1 text-gray-300">');
        inOrderedList = true;
      }
      html.push(`<li>${applyInlineMarkdown(escapeHtml(orderedItem[2]))}</li>`);
      continue;
    }

    const quote = line.match(/^\s*>\s?(.*)$/);
    if (quote) {
      closeParagraph();
      closeLists();
      html.push(
        `<blockquote class="mb-4 border-l-4 border-blue-500/50 pl-4 text-gray-300 italic">${applyInlineMarkdown(escapeHtml(quote[1]))}</blockquote>`
      );
      continue;
    }

    closeLists();
    paragraph.push(applyInlineMarkdown(escapeHtml(line)));
  }

  closeParagraph();
  closeLists();
  if (inCodeBlock) {
    html.push("</code></pre>");
  }

  return html.join("");
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch(`${API_URL}/idea-vault/ideas/${ideaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const latestVersion = data.version.find((v: {version: number}) => v.version === data.currentVersion);
          
          setIdeaData({
            idea_id: data.id,
            title: latestVersion?.title || 'Untitled',
            description: data.version[0]?.content || '',
            combined_result: latestVersion?.content || '',
            status: data.status.toLowerCase(),
            per_tool_results: latestVersion?.aiResults?.map((ai: {tool: string; response: {content?: string}}) => ({
              tool: ai.tool,
              result: ai.response?.content || 'No details available'
            })) || []
          });
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
                {ideaData.description ? (
                  <div
                    className="text-gray-300 leading-relaxed prose prose-invert max-w-none text-sm prose-headings:text-white prose-strong:text-white"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(ideaData.description)
                    }}
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm">No original description available.</p>
                )}
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
                    className="text-gray-300 leading-relaxed prose prose-invert max-w-none text-sm prose-headings:text-white prose-strong:text-white"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(ideaData.combined_result)
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
                  onClick={() => {
                    setPopup({show: true, message: 'This idea is already in your vault!', type: 'success'});
                  }}
                  className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl transition-all duration-200 shadow-lg cursor-not-allowed opacity-75"
                  disabled
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg transition-colors">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-white font-semibold block">Already in Vault</span>
                      <span className="text-xs text-gray-100 opacity-80">This idea is saved</span>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-white/60" />
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
