"use client";
import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Users,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

const IdeaAnalyzer: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState("AI-Powered Personal Chef");

  const ideaData = {
    title: "AI-Powered Personal Chef",
    description:
      "A smart kitchen assistant that generates personalized weekly meal plans based on dietary needs, ingredient availability, and user preferences, and guides users through cooking with interactive tutorials.",
    tags: ["Draft", "AI-Generated", "FoodTech"],
    strengths: [
      "High market demand for personalized nutrition.",
      "Scalable business model with subscription options.",
      "Reduces food waste by planning ingredient usage.",
    ],
    weaknesses: [
      "Competition from existing meal kit services.",
      "Requires complex AI and data integration.",
      "User adoption may depend on kitchen tech.",
    ],
    useCases: [
      "Busy professionals seeking healthy, quick meals.",
      "Families needing diverse weekly meal plans.",
      "Individuals with specific dietary restrictions.",
    ],
    recommendations: [
      "Partner with smart appliance manufacturers.",
      "Develop a freemium model to attract users.",
      "Focus on a niche diet (e.g., vegan) initially.",
    ],
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center md:ml-52">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />
      <div className="ml-0 md:ml-52 p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Idea Analyzer</h1>
              <p className="text-slate-400 text-sm">
                AI-powered insights to enhance your idea.
              </p>
            </div>

            {/* Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-700 transition-colors">
                <span className="text-slate-300">Select an Idea...</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Main Idea Card */}
          <div
            className="group relative backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            style={{
              backgroundColor: "rgba(22, 33, 53, 0.7)",
              boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px 5px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 0 rgba(59, 130, 246, 0)";
            }}
          >
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
              <h2 className="text-2xl font-bold text-white mb-3">
                {ideaData.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {ideaData.description}
              </p>
              <div className="flex gap-2">
                {ideaData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      tag === "Draft"
                        ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                        : tag === "AI-Generated"
                        ? "bg-blue-400/10 text-blue-400 border-blue-400/20"
                        : "bg-purple-400/10 text-purple-400 border-purple-400/20"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <div
              className="group relative backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
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
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-lg">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {ideaData.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <span className="text-green-400 mt-1">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weaknesses */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-lg">Weaknesses</h3>
              </div>
              <ul className="space-y-3">
                {ideaData.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <span className="text-red-400 mt-1">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential Use Cases */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-lg">Potential Use Cases</h3>
              </div>
              <ul className="space-y-3">
                {ideaData.useCases.map((useCase, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Recommendations */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-lg">AI Recommendations</h3>
              </div>
              <ul className="space-y-3">
                {ideaData.recommendations.map((recommendation, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Metrics Analysis */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm mb-8">
            <h3 className="font-semibold text-lg mb-6">
              Core Metrics Analysis
            </h3>

            {/* Score Meters */}
            <div className="space-y-6">
              {/* Market Viability */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">
                    Market Viability
                  </span>
                  <span className="text-sm font-semibold text-white">85%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 animate-pulse"
                    style={{ 
                      width: "85%",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite"
                    }}
                  />
                </div>
              </div>

              {/* Technical Feasibility */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">
                    Technical Feasibility
                  </span>
                  <span className="text-sm font-semibold text-white">72%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                    style={{ 
                      width: "72%",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2.5s infinite"
                    }}
                  />
                </div>
              </div>

              {/* Innovation Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">
                    Innovation Score
                  </span>
                  <span className="text-sm font-semibold text-white">90%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-1000"
                    style={{ 
                      width: "90%",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 3s infinite"
                    }}
                  />
                </div>
              </div>

              {/* Competition Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">
                    Competition Level
                  </span>
                  <span className="text-sm font-semibold text-white">65%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-yellow-500 to-orange-400 rounded-full transition-all duration-1000"
                    style={{ 
                      width: "65%",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2.2s infinite"
                    }}
                  />
                </div>
              </div>

              {/* Overall Score */}
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-semibold text-white">
                    Overall Viability Score
                  </span>
                  <span className="text-2xl font-bold text-white">78%</span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ 
                      width: "78%",
                      backgroundSize: "300% 100%",
                      animation: "shimmer 2.8s infinite"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Save Analysis Snapshot
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium">
              Export as PDF
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default IdeaAnalyzer;
