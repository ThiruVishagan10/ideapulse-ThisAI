"use client";

import React, { useState } from 'react';
import { Bell, ArrowRight, Plus, Play, Download, Sparkles, TrendingUp, Users, Target, Zap, BarChart3, Globe, DollarSign, Shield, Calendar, FileText } from 'lucide-react';
import SideNav from '@/components/SideNav';
import GlowingOrb from '@/components/GlowingOrb';
import Particles from '@/components/particles';

interface ProgressItem {
  name: string;
  percentage: number;
}

interface NavigationItem {
  name: string;
}

interface SnapshotItem {
  title: string;
  timestamp: string;
}

interface FeatureItem {
  title: string;
  details: string[];
}

interface PersonaItem {
  name: string;
  description: string;
  imageUrl: string;
}

interface CompetitorItem {
  name: string;
  description: string;
  imageUrl: string;
}

interface FeasibilityMetric {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface RoadmapPhase {
  title: string;
  timeline: string;
}

const IdeaPulseAnalyzer: React.FC = () => {
  const [problemStatement, setProblemStatement] = useState('');

  const progressData: ProgressItem[] = [
    { name: 'Foundation Layer', percentage: 30 },
    { name: 'Intelligence Layer', percentage: 15 },
    { name: 'Specialist Layer', percentage: 5 }
  ];

  const navigationItems: NavigationItem[] = [
    { name: 'Problem' },
    { name: 'Solution' },
    { name: 'Target Audience' },
    { name: 'Features' },
    { name: 'Personas' },
    { name: 'Use Cases' },
    { name: 'Feasibility' },
    { name: 'Competitors' },
    { name: 'Architecture' },
    { name: 'Diagrams' },
    { name: 'Monetization' },
    { name: 'SWOT' },
    { name: 'Red Flags' },
    { name: 'Roadmap' },
    { name: 'Export' }
  ];

  const snapshots: SnapshotItem[] = [
    { title: 'Initial Analysis', timestamp: '2024-03-15 14:30' },
    { title: 'Iteration 1', timestamp: '2024-03-16 09:15' }
  ];

  const features: FeatureItem[] = [
    {
      title: 'Advanced Solar Panels',
      details: [
        'Modular design for easy installation and scalability.',
        'High-efficiency solar panels utilizing advanced materials for increased energy conversion rates.'
      ]
    },
    {
      title: 'AI-Powered Optimization',
      details: [
        'Predictive maintenance features to minimize downtime.',
        'AI algorithms optimize energy production and distribution in real-time.'
      ]
    },
    {
      title: 'Smart Grid Integration',
      details: [
        'User-friendly interface for monitoring and control.',
        'Integration with smart grids for efficient energy management.'
      ]
    }
  ];

  const personas: PersonaItem[] = [
    {
      name: 'Eco-Conscious Consumer',
      description: 'Olivia, a homeowner passionate about sustainability, seeks a reliable and environmentally friendly energy solution.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop'
    },
    {
      name: 'Business Owner',
      description: 'Ethan, a business owner, aims to reduce operational costs and enhance his company\'s green image.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'
    }
  ];

  const useCases: FeatureItem[] = [
    {
      title: 'Residential Power',
      details: [
        'Integration with home energy management systems.',
        'Powering residential homes with clean energy, reducing reliance on traditional power grids.'
      ]
    },
    {
      title: 'Commercial Power',
      details: [
        'Scalable systems for various business sizes.',
        'Providing sustainable energy solutions for businesses, lowering energy costs and carbon footprint.'
      ]
    },
    {
      title: 'Community and Remote Power',
      details: [
        'Off-grid and microgrid solutions.',
        'Supplying renewable energy to communities and remote areas, improving energy access.'
      ]
    }
  ];

  const feasibilityMetrics: FeasibilityMetric[] = [
    { name: 'Technical Feasibility', value: 'High', change: '+10%', isPositive: true },
    { name: 'Market Viability', value: 'Medium', change: '-5%', isPositive: false },
    { name: 'Financial Feasibility', value: 'Medium', change: '+2%', isPositive: true }
  ];

  const competitors: CompetitorItem[] = [
    {
      name: 'SolarTech Innovations',
      description: 'Focuses on high-efficiency solar panels.',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop'
    },
    {
      name: 'GreenEnergy Solutions',
      description: 'Offers a range of renewable energy solutions.',
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=300&fit=crop'
    },
    {
      name: 'EcoPower Systems',
      description: 'Specializes in large-scale renewable energy projects.',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=300&fit=crop'
    }
  ];

  const roadmapPhases: RoadmapPhase[] = [
    { title: 'Phase 1: Development and Testing', timeline: 'Q1 2024 - Q4 2024' },
    { title: 'Phase 2: Pilot Deployment', timeline: 'Q1 2025 - Q2 2025' },
    { title: 'Phase 3: Market Launch', timeline: 'Q3 2025' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden">
      <div className="fixed inset-0 flex items-center justify-center md:ml-52 pointer-events-none">
        <GlowingOrb />
      </div>
      <Particles />
      <SideNav />
      
      <div className="ml-0 md:ml-52 relative z-10">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Left Sidebar */}
          <div className="flex flex-col w-80 bg-gray-900/60 backdrop-blur-xl border-r border-gray-700/50 shadow-2xl">
            <div className="flex items-center gap-3 px-4 pt-6 pb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-2xl font-bold leading-tight">
                Idea Summary
              </h3>
            </div>
            
            {/* Project Card */}
            <div className="p-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                      Active
                    </div>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2">Project Phoenix</h4>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Revolutionizing renewable energy solutions with AI-powered optimization
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                    <Play className="w-4 h-4" />
                    View Project
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="flex items-center gap-3 px-4 pb-3 pt-6">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-white text-lg font-bold leading-tight">
                Progress Tracker
              </h3>
            </div>
            <div className="mx-4 mb-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/50">
              {progressData.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4 last:mb-0">
                  <div className="flex justify-between items-center">
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <span className="text-blue-400 text-sm font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" 
                      style={{ width: `${item.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Section Navigation */}
            <div className="flex items-center gap-3 px-4 pb-3 pt-6">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-white text-lg font-bold leading-tight">
                Quick Navigation
              </h3>
            </div>
            <div className="px-4 space-y-1">
              {navigationItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800/60 transition-all duration-200 group">
                  <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors" />
                  <p className="text-gray-300 text-sm font-medium flex-1 group-hover:text-white transition-colors">
                    {item.name}
                  </p>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                </div>
              ))}
            </div>

            {/* Snapshot History */}
            <div className="flex items-center gap-3 px-4 pb-3 pt-6">
              <Calendar className="w-5 h-5 text-orange-400" />
              <h3 className="text-white text-lg font-bold leading-tight">
                Recent Snapshots
              </h3>
            </div>
            <div className="px-4 space-y-2">
              {snapshots.map((snapshot, index) => (
                <div key={index} className="p-3 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white text-sm font-semibold">
                      {snapshot.title}
                    </p>
                    <button className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium rounded-md transition-colors">
                      Compare
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {snapshot.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col max-w-[960px] flex-1 bg-gray-900/40 backdrop-blur-xl border-l border-gray-700/30">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-white text-3xl font-bold">AI Analyzer</h1>
                  <p className="text-gray-400 text-sm">Comprehensive idea analysis powered by AI</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Problem Section */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Problem Definition
                </h2>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                <label className="flex flex-col">
                  <p className="text-gray-300 text-sm font-medium mb-3">Problem Statement</p>
                  <textarea
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    className="w-full resize-none rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-600/50 bg-gray-900/50 min-h-32 placeholder:text-gray-500 p-4 text-sm leading-relaxed transition-all"
                    placeholder="Describe the core problem your idea aims to solve..."
                  />
                </label>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  AI Analysis Summary
                </h2>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">Analysis Complete</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-3">Key Insights</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    The analysis highlights the critical need for renewable energy solutions due to the drawbacks of current fossil fuel dependence. Market opportunity shows strong potential with growing environmental awareness.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Proposed Solution
                </h2>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Project Phoenix proposes a novel approach to renewable energy, leveraging advanced materials and AI-driven optimization to create highly efficient solar energy systems.
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Target Audience
                </h2>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our target audience includes residential consumers, commercial businesses, and government entities seeking to transition to sustainable energy sources.
                </p>
              </div>
            </div>

            {/* Feature Breakdown */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Key Features
                </h2>
              </div>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <h3 className="text-white text-base font-semibold mb-3">{feature.title}</h3>
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Personas */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  User Personas
                </h2>
              </div>
              <div className="grid gap-6">
                {personas.map((persona, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 bg-indigo-400 rounded-full" />
                          <h3 className="text-white text-lg font-bold">{persona.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {persona.description}
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-sm font-medium rounded-lg transition-colors">
                          <Users className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                      <div 
                        className="w-24 h-24 bg-center bg-cover rounded-xl border-2 border-gray-600/50 flex-shrink-0"
                        style={{ backgroundImage: `url("${persona.imageUrl}")` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Use Cases & Applications
                </h2>
              </div>
              <div className="grid gap-6">
                {useCases.map((useCase, index) => {
                  const icons = [Globe, Users, Zap];
                  const colors = ['blue', 'green', 'purple'];
                  const Icon = icons[index % icons.length];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div key={index} className="relative overflow-hidden bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${color}-500/10 to-transparent rounded-full -translate-y-12 translate-x-12`} />
                      <div className="relative">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 bg-${color}-500/20 rounded-xl border border-${color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-6 h-6 text-${color}-400`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white text-lg font-bold mb-2">{useCase.title}</h3>
                            <div className="space-y-3">
                              {useCase.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className={`w-1.5 h-1.5 bg-${color}-400 rounded-full mt-2 flex-shrink-0`} />
                                  <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                          <div className={`px-3 py-1 bg-${color}-500/20 text-${color}-400 text-xs font-semibold rounded-full border border-${color}-500/30`}>
                            {index === 0 ? 'Residential' : index === 1 ? 'Commercial' : 'Community'}
                          </div>
                          <button className={`text-${color}-400 hover:text-${color}-300 text-sm font-medium transition-colors`}>
                            Learn More →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feasibility Analysis */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Feasibility Analysis
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feasibilityMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-gray-300 text-sm font-medium">{metric.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${metric.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-white text-2xl font-bold mb-1">{metric.value}</p>
                    <div className="w-full bg-gray-700/50 rounded-full h-1">
                      <div className={`h-1 rounded-full ${metric.isPositive ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: '70%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Intelligence */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Globe className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Competitor Analysis
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {competitors.map((competitor, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                    <div 
                      className="w-full h-32 bg-center bg-cover rounded-lg mb-4 border border-gray-600/30 group-hover:border-gray-500/50 transition-colors"
                      style={{ backgroundImage: `url("${competitor.imageUrl}")` }}
                    />
                    <h3 className="text-white text-sm font-semibold mb-2">{competitor.name}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{competitor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization Models */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Revenue Streams
                </h2>
              </div>
              <div className="grid gap-3">
                {['Direct Sales of Solar Systems', 'Subscription-Based Energy Services', 'Partnerships with Energy Providers'].map((model, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-800/40 rounded-lg px-4 py-3 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-gray-300 text-sm font-medium flex-1">{model}</p>
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                      Active
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SWOT Analysis */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  SWOT Analysis
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Strengths', content: 'Innovative technology, high efficiency, modular design.', color: 'green' },
                  { title: 'Weaknesses', content: 'High initial investment, market competition, regulatory hurdles.', color: 'red' },
                  { title: 'Opportunities', content: 'Growing demand for renewable energy, government incentives, technological advancements.', color: 'blue' },
                  { title: 'Threats', content: 'Economic downturns, technological disruptions, changing regulations.', color: 'orange' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.color === 'green' ? 'bg-green-400' :
                        item.color === 'red' ? 'bg-red-400' :
                        item.color === 'blue' ? 'bg-blue-400' : 'bg-orange-400'
                      }`} />
                      <h3 className="text-white text-base font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-white text-xl font-bold">
                    Development Roadmap
                  </h2>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  On Track
                </div>
              </div>
              
              <div className="relative">
                {/* Enhanced Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-60" />
                <div className="absolute left-8 top-0 w-1 h-16 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full animate-pulse" />
                
                <div className="space-y-8">
                  {roadmapPhases.map((phase, index) => {
                    const isActive = index === 0;
                    const isCompleted = false;
                    const phaseIcons = [Zap, TrendingUp, Globe];
                    const PhaseIcon = phaseIcons[index % phaseIcons.length];
                    
                    return (
                      <div key={index} className="relative flex items-start gap-8">
                        {/* Enhanced Timeline Node */}
                        <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/25 scale-110' 
                            : isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400'
                            : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                        }`}>
                          {isCompleted ? (
                            <div className="w-6 h-6 text-white">✓</div>
                          ) : (
                            <PhaseIcon className={`w-6 h-6 ${
                              isActive ? 'text-white' : 'text-gray-400'
                            }`} />
                          )}
                        </div>
                        
                        {/* Enhanced Phase Card */}
                        <div className={`flex-1 rounded-2xl p-6 border transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30 shadow-lg'
                            : 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600/50'
                        }`}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`text-lg font-bold mb-2 ${
                                isActive ? 'text-white' : 'text-gray-200'
                              }`}>
                                {phase.title}
                              </h3>
                              <p className={`text-sm font-medium ${
                                isActive ? 'text-indigo-300' : 'text-gray-400'
                              }`}>
                                {phase.timeline}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isActive 
                                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                : isCompleted
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                            }`}>
                              {isActive ? 'In Progress' : isCompleted ? 'Completed' : 'Planned'}
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-4">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isActive 
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                  : isCompleted
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                  : 'bg-gray-600'
                              }`}
                              style={{ 
                                width: isActive ? '35%' : isCompleted ? '100%' : '0%' 
                              }}
                            />
                          </div>
                          
                          {/* Phase Details */}
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-gray-400 font-medium">Duration:</span>
                              <p className="text-gray-300 mt-1">
                                {index === 0 ? '12 months' : index === 1 ? '6 months' : '3 months'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium">Key Milestone:</span>
                              <p className="text-gray-300 mt-1">
                                {index === 0 ? 'MVP Ready' : index === 1 ? 'Beta Launch' : 'Full Release'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Export Panel */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-400" />
                </div>
                <h2 className="text-white text-xl font-bold">
                  Export Options
                </h2>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg">
                  <FileText className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg">
                  <FileText className="w-4 h-4" />
                  Export Markdown
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center group">
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-200 flex items-center justify-center group">
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-200 flex items-center justify-center group">
            <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaPulseAnalyzer;