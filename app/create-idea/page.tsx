import React, { useState } from 'react';
import { Sparkles, RefreshCw, Wand2, Brain, Grid3x3, Code, Target, TrendingUp, Upload } from 'lucide-react';

const CreateIdeaForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showTagline, setShowTagline] = useState(false);

  const aiTools = [
    { icon: <Wand2 className="w-5 h-5" />, label: "Expand Idea" },
    { icon: <Brain className="w-5 h-5" />, label: "Summarize" },
    { icon: <Grid3x3 className="w-5 h-5" />, label: "Add Use Cases" },
    { icon: <Code className="w-5 h-5" />, label: "Make Technical" },
    { icon: <Target className="w-5 h-5" />, label: "Market Positioning" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Generate Roadmap" }
  ];

  const handleGenerateTagline = () => {
    setShowTagline(true);
    setTimeout(() => setShowTagline(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h1 className="text-3xl font-bold">Create a New Idea</h1>
          </div>
          <p className="text-slate-400 text-sm">Turn your concept into a structured innovation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Idea Title */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium mb-3">Idea Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your idea title..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              
              {/* AI-generated tagline */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {showTagline ? "AI-generated tagline appears here..." : "AI-generated tagline appears here..."}
                </span>
                <button
                  onClick={handleGenerateTagline}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium mb-3">Description / Idea Body</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your idea in detail. Use our AI tools on the right to expand, summarize, or add structure..."
                rows={10}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* AI Moodboard */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-medium mb-4">AI Moodboard (Optional)</label>
              
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Drag and drop images or let our AI generate a moodboard for you.</p>
                  </div>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm">
                <Sparkles className="w-4 h-4" />
                Generate Moodboard
              </button>
            </div>
          </div>

          {/* AI Tools Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm sticky top-8">
              <h3 className="text-sm font-medium mb-4">AI Tools</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {aiTools.map((tool, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 bg-slate-950/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="text-blue-400 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <span className="text-xs text-slate-300 text-center leading-tight">
                      {tool.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
            Save Draft
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <Sparkles className="w-5 h-5" />
            Generate Full Concept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateIdeaForm;