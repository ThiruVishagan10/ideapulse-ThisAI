"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";
import { Lightbulb, TrendingUp } from "lucide-react";

interface ActionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IdeaCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  created_at?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [recentIdeas] = useState<IdeaCard[]>([
    {
      id: '1',
      title: 'Smart Home Energy System',
      description: 'AI-powered energy management system that optimizes household energy consumption and integrates with renewable sources.',
      tag: 'AI Generated',
      created_at: new Date().toISOString()
    },
    {
      id: '2', 
      title: 'Sustainable Food Delivery',
      description: 'Eco-friendly food delivery platform using electric vehicles and biodegradable packaging.',
      tag: 'Manual',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Virtual Reality Learning',
      description: 'Immersive VR platform for educational content delivery and interactive learning experiences.',
      tag: 'AI Generated',
      created_at: new Date().toISOString()
    }
  ]);

  const actionCards: ActionCard[] = [
    {
      icon: <span className="text-2xl">+</span>,
      title: "New Idea",
      description: "Start with a blank canvas.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analyze Idea",
      description: "Get AI-powered insights.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Idea Vault",
      description: "Analyze the seed of thoughts.",
    },
  ];



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
          <div className="mb-8 mt-16 md:mt-0">
            <h1 className="text-4xl font-bold mb-2">
              Welcome to IdeaPulse
            </h1>
            <p className="text-gray-400">What do you want to create today?</p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {actionCards.map((card, index) => (
              <button
                key={index}
                className="group relative backdrop-blur-md text-white rounded-2xl p-6 text-left border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                style={{
                  backgroundColor: "rgba(22, 33, 53, 0.7)",
                  boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 30px 5px rgba(59, 130, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 0 rgba(59, 130, 246, 0)";
                }}
              >
                {/* Gradient border effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)",
                    filter: "blur(20px)",
                    transform: "translate(-10px, -10px)",
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
              {recentIdeas.length > 0 ? recentIdeas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => router.push(`/idea/${idea.id}`)}
                  className="group relative backdrop-blur-md rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/20"
                  style={{
                    backgroundColor: "rgba(22, 33, 53, 0.7)",
                    boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px 5px rgba(59, 130, 246, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 0 rgba(59, 130, 246, 0)";
                  }}
                >
                  {/* Gradient border effect on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)",
                      filter: "blur(20px)",
                      transform: "translate(-10px, -10px)",
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2 text-lg text-white">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {idea.description}
                    </p>
                    <span className="inline-block bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      {idea.tag}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No recent ideas found. Start creating your first idea!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
