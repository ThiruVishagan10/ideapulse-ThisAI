"use client";
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SideNav from '@/components/SideNav';
import GlowingOrb from '@/components/GlowingOrb';
import Particles from '@/components/particles';

interface Idea {
  id: number;
  title: string;
  description: string;
  category: 'AI Generated' | 'Manual' | 'High Potential' | 'Draft';
}

const IdeaVault: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Ideas');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All Ideas', 'Favorites', 'High Potential', 'Drafts', 'AI Generated'];

  const ideas: Idea[] = [
    { id: 1, title: 'Smart Home Energy Grid', description: 'AI-powered energy optimization', category: 'AI Generated' },
    { id: 2, title: 'Personalized Learning Platform', description: 'Adaptive e-learning system', category: 'Manual' },
    { id: 3, title: 'AR Shopping Assistant', description: 'Augmented reality for retail', category: 'High Potential' },
    { id: 4, title: 'Fitness Gamification App', description: 'Team-based wellness challenges', category: 'Draft' },
    { id: 5, title: 'AI Code Reviewer', description: 'Automated code analysis tool', category: 'AI Generated' },
    { id: 6, title: 'Sustainable Packaging Hub', description: 'B2B eco-friendly materials', category: 'Manual' },
    { id: 7, title: 'Mental Health Tracker', description: 'Daily mood and wellness logging', category: 'Draft' },
    { id: 8, title: 'Smart Recipe Generator', description: 'AI-based meal planning', category: 'AI Generated' }
  ];

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
          {ideas.map((idea) => (
            <div
              key={idea.id}
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
              <div className="relative z-10">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {idea.description}
                  </p>
                </div>
                
                <div className="mt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(idea.category)}`}>
                    {idea.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[1, 2, 3].map((page) => (
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
          
          <span className="text-slate-500 px-2">...</span>
          
          <button
            onClick={() => setCurrentPage(10)}
            className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors"
          >
            10
          </button>
          
          <button
            onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaVault;