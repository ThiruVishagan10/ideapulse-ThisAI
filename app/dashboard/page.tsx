'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import SideNav from '@/components/SideNav';
import { Sparkles, Lightbulb, TrendingUp, GitCompare } from 'lucide-react';

interface ActionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IdeaCard {
  title: string;
  description: string;
  tag: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const actionCards: ActionCard[] = [
    {
      icon: <span className="text-2xl">+</span>,
      title: "New Idea",
      description: "Start with a blank canvas."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "AI Expand",
      description: "Grow a seed of thought."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analyze Idea",
      description: "Get AI-powered insights."
    }
  ];

  const recentIdeas: IdeaCard[] = [
    {
      title: "Personalized Learning Paths",
      description: "An adaptive e-learning platform that curates content for individual student needs.",
      tag: "AI"
    },
    {
      title: "Smart Home Energy Grid",
      description: "A system to optimize household energy consumption based on usage patterns and grid demand.",
      tag: "IoT"
    },
    {
      title: "AR Shopping Assistant",
      description: "Visualize furniture and decor in your own space before you buy using augmented reality.",
      tag: "AR/VR"
    },
    {
      title: "Gamified Fitness App for Teams",
      description: "Corporate wellness app that encourages physical activity through team challenges and leaderboards.",
      tag: "Health"
    },
    {
      title: "AI-Powered Code Reviewer",
      description: "An intelligent tool that automatically reviews code for bugs, style, and performance issues.",
      tag: "AI"
    },
    {
      title: "Sustainable Packaging Marketplace",
      description: "A B2B platform connecting businesses with suppliers of eco-friendly packaging materials.",
      tag: "E-commerce"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SideNav />
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.email?.split('@')[0]}</h1>
            <p className="text-gray-400">What do you want to create today?</p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {actionCards.map((card, index) => (
              <button
                key={index}
                className="group relative backdrop-blur-md text-white rounded-2xl p-6 text-left border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
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
                  <div className="mb-3 text-cyan-400">{card.icon}</div>
                  <h3 className="font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-300">{card.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Recent Ideas */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Ideas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="group relative backdrop-blur-md rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/20"
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
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                      filter: 'blur(20px)',
                      transform: 'translate(-10px, -10px)'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2 text-lg text-white">{idea.title}</h3>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {idea.description}
                    </p>
                    <span className="inline-block bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      {idea.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}