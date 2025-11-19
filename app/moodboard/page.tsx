"use client";
import React, { useState } from 'react';
import { Sparkles, Rocket, Headphones, BookOpen, Code } from 'lucide-react';
import SideNav from '@/components/SideNav';
import GlowingOrb from '@/components/GlowingOrb';
import Particles from '@/components/particles';

const MoodboardInspiration: React.FC = () => {
  const [mood, setMood] = useState('');
  const [quote] = useState('"The future is not something we enter. The future is something we create."');

  const suggestedActivities = [
    { icon: <Rocket className="w-5 h-5" />, text: 'Sketch futuristic cityscapes.' },
    { icon: <Headphones className="w-5 h-5" />, text: 'Listen to a synthwave playlist.' },
    { icon: <BookOpen className="w-5 h-5" />, text: 'Read a chapter of a sci-fi novel.' },
    { icon: <Code className="w-5 h-5" />, text: 'Try a creative coding challenge.' }
  ];

  const miniProjectIdeas = [
    'Design a concept for a personal AI assistant interface.',
    'Create a 3D model of a futuristic vehicle.',
    'Write a short story about first contact with an alien race.'
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center md:ml-52">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />
      <div className="ml-0 md:ml-52 p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Moodboard Inspiration</h1>
          <p className="text-slate-400">Generate quotes, activities, and micro-projects based on your mood.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="px-5 py-2.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm">
            Upload Image
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm">
            Save Inspiration
          </button>
        </div>

        {/* Mood Input Section */}
        <div className="group relative backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
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
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
              filter: 'blur(20px)',
              transform: 'translate(-10px, -10px)'
            }}
          />
          <div className="relative z-10">
          <h3 className="text-sm font-medium mb-4">Describe your mood</h3>
          <div className="relative">
            <textarea
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., calm ocean blue, retro neo, dark academic energy..."
              rows={4}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Inspiration
            </button>
          </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Generated Quote */}
          <div className="group relative backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
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
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                filter: 'blur(20px)',
                transform: 'translate(-10px, -10px)'
              }}
            />
            <div className="relative z-10">
            <h3 className="text-sm font-medium mb-4 text-slate-300">Generated Quote</h3>
            <div className="flex items-center justify-center min-h-[200px]">
              <blockquote className="text-center">
                <p className="text-lg italic text-slate-200 leading-relaxed mb-2">
                  {quote}
                </p>
              </blockquote>
            </div>
            </div>
          </div>

          {/* Suggested Activities */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-medium mb-4 text-slate-300">Suggested Activities</h3>
            <div className="space-y-4">
              {suggestedActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-blue-400 mt-0.5">
                    {activity.icon}
                  </div>
                  <p className="text-sm text-slate-300">{activity.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Project Ideas */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-medium mb-4 text-slate-300">Mini Project Ideas</h3>
            <ul className="space-y-4">
              {miniProjectIdeas.map((idea, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Theme Summary */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4">Theme Summary</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            The generated aesthetic combines <span className="text-blue-400 font-medium">sleek, futuristic elements</span> with a touch of <span className="text-purple-400 font-medium">retro-futurism</span>. It evokes a sense of pioneering innovation, embracing <span className="text-cyan-400 font-medium">sci-fi landscapes</span>, and low-textured potential of technology. The core theme leans towards <span className="text-pink-400 font-medium">a mix of nostalgia and digital aspiration</span>, where both lived-like shapes appear in the aesthetics of <span className="text-emerald-400 font-medium">digital interfaces</span>.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MoodboardInspiration;