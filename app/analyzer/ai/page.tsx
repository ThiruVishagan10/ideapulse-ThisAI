"use client";

import React, { useState, useEffect } from 'react';
import { Play, Loader2, CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';
import SideNav from '@/components/SideNav';
import { useSearchParams } from 'next/navigation';

// V3 API Compatible Interfaces
interface V3ProgressData {
  completed: number;
  running: number;
  failed: number;
  pending: number;
  total: number;
}

interface V3SectionStatus {
  [key: string]: 'pending' | 'running' | 'completed' | 'failed';
}

interface V3StatusResponse {
  job_id: string;
  status: 'created' | 'processing' | 'completed' | 'failed';
  progress: V3ProgressData;
  percentage: number;
  sections: V3SectionStatus;
}

interface V3AnalysisData {
  problem?: {
    problem_statement?: string;
    target_users?: string[];
    pain_severity?: string;
  };
  solution?: {
    core_solution?: string;
    key_differentiators?: string[];
    value_proposition?: string;
  };
  audience?: {
    primary_segments?: string[];
    market_size?: string;
  };
  features?: {
    core_features?: Array<{
      name: string;
      description: string;
      priority: string;
    }>;
  };
  personas?: {
    personas?: Array<{
      name: string;
      role?: string;
      pain_points?: string[];
      goals?: string[];
    }>;
  };
  feasibility?: {
    technical_feasibility?: { score: number };
    business_feasibility?: { score: number };
    financial_feasibility?: { development_cost: string };
  };
  swot?: {
    strengths?: string[];
    weaknesses?: string[];
    opportunities?: string[];
    threats?: string[];
  };
  monetization?: {
    revenue_models?: Array<{
      model: string;
      description: string;
      pricing: string;
    }>;
  };
  roadmap?: {
    phases?: Array<{
      phase: string;
      duration: string;
      milestones: string[];
    }>;
  };
}

interface IdeaData {
  id: string;
  title?: string;
  original_text?: string;
  generated_text?: string;
  tags?: string[];
}

const V3_SECTIONS = {
  foundation: ['problem', 'solution', 'value_proposition', 'target_audience'],
  intelligence: ['market_analysis', 'competitive_landscape', 'technical_requirements', 'business_model', 'implementation_plan', 'risk_assessment', 'success_metrics', 'resource_requirements'],
  specialist: ['legal_considerations', 'financial_projections', 'marketing_strategy', 'operational_plan', 'scalability_analysis', 'exit_strategy']
};

const AIAnalyzerV3: React.FC = () => {
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('idea_id');
  
  const [ideaData, setIdeaData] = useState<IdeaData | null>(null);
  const [analysisData, setAnalysisData] = useState<V3AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressData, setProgressData] = useState<V3ProgressData | null>(null);
  const [sectionStatus, setSectionStatus] = useState<V3SectionStatus>({});
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ideaId) {
      fetchIdeaData();
      fetchExistingResults();
    }
  }, [ideaId]);

  const fetchIdeaData = async () => {
    // Use mock data for presentation
    const mockIdea = {
      id: ideaId || '1',
      title: 'Smart Energy Management System',
      original_text: 'An AI-powered system that learns household energy consumption patterns and automatically optimizes energy usage to reduce costs and environmental impact.',
      tags: ['smart-home', 'energy', 'ai', 'sustainability']
    };
    setIdeaData(mockIdea);
  };

  const fetchExistingResults = async () => {
    try {
      const response = await fetch(`/api/analyzer/results/${ideaId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          setAnalysisData(data.result);
        }
      }
    } catch (error) {
      console.error('No existing results found');
    } finally {
      setIsLoading(false);
    }
  };

  const startAnalysis = async () => {
    if (!ideaId || !ideaData) return;
    
    setIsAnalyzing(true);
    setError(null);
    setProgressData(null);
    setSectionStatus({});
    
    // Demo analysis for presentation
    setTimeout(() => {
      setError('Demo Mode: Showing sample analysis results.');
      setAnalysisData({
        problem: {
          problem_statement: 'Homeowners lack visibility and control over energy consumption, leading to high utility bills and environmental waste.',
          target_users: ['homeowners', 'environmentally conscious consumers', 'tech-savvy households']
        },
        solution: {
          core_solution: 'AI-driven energy management platform with predictive optimization',
          key_differentiators: ['Machine learning adaptation', 'Multi-device integration', 'Predictive analytics']
        },
        swot: {
          strengths: ['AI optimization algorithms', 'IoT integration capabilities', 'Real-time monitoring'],
          weaknesses: ['High initial setup cost', 'Complexity for non-tech users', 'Hardware dependencies'],
          opportunities: ['Growing smart home market', 'Rising energy costs', 'Government incentives'],
          threats: ['Utility company resistance', 'Privacy regulations', 'Established competitors']
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const pollProgress = async (jobId: string) => {
    try {
      const response = await fetch(`/api/analyzer/job/${jobId}/status`);
      if (!response.ok) throw new Error('Failed to get status');
      
      const status: V3StatusResponse = await response.json();
      setProgressData(status.progress);
      setSectionStatus(status.sections);
      
      if (status.status === 'completed') {
        const resultResponse = await fetch(`/api/analyzer/job/${jobId}/result`);
        if (resultResponse.ok) {
          const result = await resultResponse.json();
          setAnalysisData(result.result);
        }
        setIsAnalyzing(false);
        setCurrentJobId(null);
      } else if (status.status === 'failed') {
        setError('Analysis failed');
        setIsAnalyzing(false);
        setCurrentJobId(null);
      } else {
        setTimeout(() => pollProgress(jobId), 3000);
      }
    } catch (error) {
      setError('Failed to get analysis status');
      setIsAnalyzing(false);
      setCurrentJobId(null);
    }
  };

  const getLayerProgress = (layer: keyof typeof V3_SECTIONS): number => {
    if (!sectionStatus) return 0;
    const sections = V3_SECTIONS[layer];
    const completed = sections.filter(section => sectionStatus[section] === 'completed').length;
    return Math.round((completed / sections.length) * 100);
  };

  const getSectionIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SideNav />
      
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Analyzer V3</h1>
            <p className="text-gray-400">
              {ideaData?.title || 'Untitled Idea'} • 18-Section Analysis Pipeline
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Analysis Control */}
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Analysis Status</h2>
                <p className="text-gray-400">
                  {isAnalyzing ? 'Running comprehensive analysis...' : 
                   analysisData ? 'Analysis completed' : 'Ready to analyze'}
                </p>
              </div>
              <button
                onClick={startAnalysis}
                disabled={isAnalyzing || !ideaData}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          {progressData && (
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{progressData.completed}</div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{progressData.running}</div>
                  <div className="text-sm text-gray-400">Running</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{progressData.failed}</div>
                  <div className="text-sm text-gray-400">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">{progressData.pending}</div>
                  <div className="text-sm text-gray-400">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{progressData.total}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
              
              {/* Layer Progress */}
              <div className="space-y-4">
                {Object.entries(V3_SECTIONS).map(([layer, sections]) => (
                  <div key={layer}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="capitalize font-medium">{layer} Layer</span>
                      <span className="text-sm text-gray-400">{getLayerProgress(layer as keyof typeof V3_SECTIONS)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getLayerProgress(layer as keyof typeof V3_SECTIONS)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Status Grid */}
          {Object.keys(sectionStatus).length > 0 && (
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Section Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(sectionStatus).map(([section, status]) => (
                  <div key={section} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                    {getSectionIcon(status)}
                    <span className="text-sm capitalize">{section.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisData && (
            <div className="space-y-6">
              {/* Problem Analysis */}
              {analysisData.problem && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Problem Analysis</h3>
                  <p className="text-gray-300 mb-4">{analysisData.problem.problem_statement}</p>
                  {analysisData.problem.target_users && (
                    <div>
                      <h4 className="font-medium mb-2">Target Users:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.problem.target_users.map((user, idx) => (
                          <span key={idx} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            {user}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Solution */}
              {analysisData.solution && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Solution</h3>
                  <p className="text-gray-300 mb-4">{analysisData.solution.core_solution}</p>
                  {analysisData.solution.key_differentiators && (
                    <div>
                      <h4 className="font-medium mb-2">Key Differentiators:</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {analysisData.solution.key_differentiators.map((diff, idx) => (
                          <li key={idx}>{diff}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* SWOT Analysis */}
              {analysisData.swot && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">SWOT Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(analysisData.swot).map(([category, items]) => (
                      items && (
                        <div key={category}>
                          <h4 className="font-medium mb-2 capitalize">{category}</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {items.map((item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Monetization */}
              {analysisData.monetization?.revenue_models && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue Models</h3>
                  <div className="space-y-4">
                    {analysisData.monetization.revenue_models.map((model, idx) => (
                      <div key={idx} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium">{model.model}</h4>
                        <p className="text-gray-300 text-sm">{model.description}</p>
                        <p className="text-green-400 text-sm">{model.pricing}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzerV3;