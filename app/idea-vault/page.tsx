"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SideNav from '@/components/SideNav';
import GlowingOrb from '@/components/GlowingOrb';
import Particles from '@/components/particles';

interface Idea {
  id: string;
  title: string;
  description: string;
  original_text?: string;
  category: 'AI Generated' | 'Manual' | 'High Potential' | 'Draft';
  tools?: (string | {tool: string; result?: string})[];
}

interface DbIdea {
  id: string;
  title: string;
  original_text?: string;
  generated_text?: string;
  description?: string;
  creator_id?: string;
  tags?: string[];
  is_draft?: boolean;
  is_ai_generated?: boolean;
  ai_tools_used?: string[] | string;
  created_at?: string;
  updated_at?: string;
}

const IdeaVault: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All Ideas');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: '1', title: 'Smart Home Energy Grid', description: 'AI-powered energy optimization system that learns from usage patterns', category: 'AI Generated', tools: ['expand', 'technical', 'market_positioning'] },
    { id: '2', title: 'Personalized Learning Platform', description: 'Adaptive e-learning system with AI tutoring', category: 'Draft', tools: ['use_cases', 'roadmap'] },
    { id: '3', title: 'AR Shopping Assistant', description: 'Augmented reality app for enhanced retail experience', category: 'AI Generated', tools: ['expand', 'technical'] },
    { id: '4', title: 'Fitness Gamification App', description: 'Team-based wellness challenges with rewards', category: 'Draft', tools: ['summarize'] }
  ]);
  const [loading, setLoading] = useState(false);

  const filters = ['All Ideas', 'Favorites', 'High Potential', 'Drafts', 'AI Generated'];

  // Filter and search ideas
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = (idea.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (idea.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All Ideas' || 
                         (activeFilter === 'Drafts' && idea.category === 'Draft') ||
                         (activeFilter === 'AI Generated' && idea.category === 'AI Generated');
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIdeas = filteredIdeas.slice(startIndex, startIndex + itemsPerPage);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI Generated':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Manual':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'High Potential':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Draft':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getToolColor = (tool: string) => {
    switch (tool) {
      case 'expand':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'technical':
        return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'market_positioning':
      case 'market':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'use_cases':
        return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
      case 'roadmap':
        return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
      case 'summarize':
        return 'text-violet-400 bg-violet-400/10 border-violet-400/20';
      default:
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center md:ml-52">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />
      <div className="ml-0 md:ml-52 p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Idea Vault</h1>
          <p className="text-slate-400">All your innovations, neatly organized.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ideas..."
            className="w-full bg-white/95 text-gray-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="animate-spin w-12 h-12 border-3 border-blue-400/30 border-t-blue-400 rounded-full"></div>
                <div className="absolute inset-0 animate-ping w-12 h-12 border-2 border-blue-400/20 rounded-full"></div>
              </div>
              <p className="text-slate-400 mt-4 animate-pulse">Loading your brilliant ideas...</p>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="col-span-full text-center py-16">
              {ideas.length === 0 ? (
                <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
                  <div className="relative">
                    <div className="w-32 h-32 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <div className="text-6xl animate-bounce">💡</div>
                    </div>
                    <div className="absolute -inset-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">Your Vault Awaits</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">Ready to capture your next breakthrough? Every great innovation starts with a single idea ✨</p>
                  </div>
                  <button
                    onClick={() => router.push('/create')}
                    className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      🚀 Create Your First Idea
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-slate-400 text-lg">No ideas match your search or filter</p>
                  <p className="text-slate-500 text-sm">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          ) : paginatedIdeas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => {
                localStorage.setItem(`idea-${idea.id}`, JSON.stringify({
                  idea_id: idea.id,
                  title: idea.title,
                  description: idea.description,
                  combined_result: idea.description,
                  status: 'completed'
                }));
                router.push(`/idea/${idea.id}`);
              }}
              className="group relative backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer min-h-[200px] flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(22, 33, 53, 0.7)',
                boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px 5px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59, 130, 246, 0)';
              }}
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                  filter: 'blur(20px)',
                  transform: 'translate(-10px, -10px)'
                }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-blue-200 font-semibold text-lg mb-2 line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {idea.original_text || idea.description}
                  </p>
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(idea.category)}`}>
                    {idea.category}
                  </span>
                  {idea.tools && idea.tools.length > 0 && (
                    <>
                      {idea.tools.slice(0, 2).map((tool, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded border ${getToolColor(typeof tool === 'string' ? tool : tool.tool || 'unknown')}`}>
                          {typeof tool === 'string' ? tool : tool.tool || 'Tool'}
                        </span>
                      ))}
                      {idea.tools.length > 2 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded border border-slate-600/50">
                          +{idea.tools.length - 2}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default IdeaVault;