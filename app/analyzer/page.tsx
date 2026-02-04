"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Brain,
  Archive,
  Edit3,
  X,
  Target,
  Loader2,
} from "lucide-react";
import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

interface Idea {
  id: string;
  title: string;
  original_text?: string;
  generated_text?: string;
  description?: string;
  tags?: string[];
}

type Goal = "startup" | "academic" | "research" | "refinement";

interface AnalysisState {
  jobId?: string;
  isAnalyzing: boolean;
  progress?: Record<string, unknown>;
  results?: Record<string, unknown>;
  error?: string;
}

const AIAnalyzer = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<
    "vault" | "input" | null
  >(null);
  const [ideaText, setIdeaText] = useState("");
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showGoalSelection, setShowGoalSelection] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isAnalyzing: false,
  });
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userId] = useState(crypto.randomUUID()); // Generate proper UUID

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ideas");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.ideas) {
          setIdeas(data.ideas);
        }
      }
    } catch (error) {
      console.error("Failed to fetch ideas:", error);
    }
    setLoading(false);
  };

  const handleVaultSelection = () => {
    setSelectedOption("vault");
    setShowVaultModal(true);
    fetchIdeas();
  };

  const selectIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setIdeaText(
      idea.original_text ||
        idea.generated_text ||
        idea.description ||
        idea.title ||
        ""
    );
    setShowVaultModal(false);
    setSelectedOption("input");
  };

  const goals: {
    value: Goal;
    label: string;
    description: string;
    color: string;
  }[] = [
    {
      value: "startup",
      label: "Startup",
      description: "Business viability and market analysis",
      color: "blue",
    },
    {
      value: "academic",
      label: "Academic",
      description: "Research methodology and scholarly approach",
      color: "green",
    },
    {
      value: "research",
      label: "Research",
      description: "Scientific investigation and hypothesis testing",
      color: "purple",
    },
    {
      value: "refinement",
      label: "Refinement",
      description: "Improve and optimize existing concepts",
      color: "orange",
    },
  ];

  const startAnalysis = async () => {
    if (!selectedGoal || !ideaText.trim()) return;

    setApiStatus('loading');
    setAnalysis({ isAnalyzing: true });

    try {
      const tempId = selectedIdea?.id || `temp-${crypto.randomUUID()}`;
      const payload = {
        idea_id: tempId,
        idea_title: selectedIdea?.title || "New Idea",
        idea_body: ideaText,
        tags: selectedIdea?.tags || [],
        goal: selectedGoal,
        user_id: userId,
      };

      const response = await fetch("/api/analyzer/run-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setApiStatus('success');
        setAnalysis({ isAnalyzing: true, jobId: data.job_id });
        pollProgress(data.job_id);
      } else {
        throw new Error('Failed to start analysis');
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setApiStatus('error');
      setAnalysis({ isAnalyzing: false, error: 'Failed to start analysis. Please check if the backend is running.' });
    }
  };

  const pollProgress = async (jobId: string, ideaId?: string) => {
    const poll = async () => {
      try {
        const response = await fetch(`/api/analyzer/job/${jobId}/status`);
        if (response.ok) {
          const data = await response.json();

          if (data.status === "completed") {
            setAnalysis({ isAnalyzing: false, results: data.results });
            router.push(`/analyzer/ai?idea_id=${ideaId || selectedIdea?.id || jobId}`);
            return;
          } else if (data.status === "failed") {
            setAnalysis({ isAnalyzing: false, error: 'Analysis failed' });
            setApiStatus('error');
            return;
          }

          setAnalysis((prev) => ({ ...prev, progress: data.progress }));
          setTimeout(poll, 2000);
        }
      } catch (error) {
        console.error("Polling failed:", error);
        setAnalysis({ isAnalyzing: false, error: 'Connection failed' });
        setApiStatus('error');
      }
    };

    poll();
  };

  const handleAnalyzeClick = () => {
    if (!ideaText.trim()) return;
    setShowGoalSelection(true);
  };

  const handleGoalSelect = async (goal: Goal) => {
    setSelectedGoal(goal);
    setShowGoalSelection(false);
    
    if (!ideaText.trim()) return;

    setApiStatus('loading');
    setAnalysis({ isAnalyzing: true });

    try {
      let ideaId = selectedIdea?.id;
      
      if (!ideaId) {
        const createResponse = await fetch("/api/ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "New Idea",
            original_text: ideaText,
            tags: [],
            user_id: userId
          })
        });
        
        if (createResponse.ok) {
          const createData = await createResponse.json();
          ideaId = createData.idea?.id;
        }
      }

      const payload = {
        idea_id: ideaId || crypto.randomUUID(),
        idea_title: selectedIdea?.title || "New Idea",
        idea_body: ideaText,
        tags: selectedIdea?.tags || [],
        goal: goal,
        user_id: userId,
      };

      const response = await fetch("/api/analyzer/run-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setApiStatus('success');
        setAnalysis({ isAnalyzing: true, jobId: data.job_id });
        pollProgress(data.job_id, ideaId);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start analysis');
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setApiStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Failed to start analysis.';
      setAnalysis({ isAnalyzing: false, error: errorMessage });
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
          <div className="mb-8 mt-16 md:mt-0">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <Brain className="w-10 h-10 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                AI Idea Analysis
              </h1>
              <p className="text-gray-400 text-lg">
                Choose your idea source for AI analysis
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
            {/* Select from Vault */}
            <div
              onClick={handleVaultSelection}
              className={`group relative backdrop-blur-md rounded-2xl p-8 cursor-pointer border transition-all duration-300 hover:scale-[1.02] overflow-hidden ${
                selectedOption === "vault"
                  ? "border-indigo-500/50 bg-indigo-500/10"
                  : "border-white/20"
              }`}
              style={{
                backgroundColor:
                  selectedOption === "vault"
                    ? "rgba(99, 102, 241, 0.1)"
                    : "rgba(22, 33, 53, 0.7)",
                boxShadow:
                  selectedOption === "vault"
                    ? "0 0 30px 5px rgba(99, 102, 241, 0.4)"
                    : "0 0 0 0 rgba(99, 102, 241, 0)",
              }}
            >
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                  <Archive className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Select from Vault
                </h2>
                <p className="text-gray-400 mb-6">
                  Choose an existing idea from your vault
                </p>
              </div>
            </div>

            {/* Input New Idea */}
            <div
              onClick={() => setSelectedOption("input")}
              className={`group relative backdrop-blur-md rounded-2xl p-8 cursor-pointer border transition-all duration-300 hover:scale-[1.02] overflow-hidden ${
                selectedOption === "input"
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-white/20"
              }`}
              style={{
                backgroundColor:
                  selectedOption === "input"
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(22, 33, 53, 0.7)",
                boxShadow:
                  selectedOption === "input"
                    ? "0 0 30px 5px rgba(34, 197, 94, 0.4)"
                    : "0 0 0 0 rgba(34, 197, 94, 0)",
              }}
            >
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Edit3 className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Input New Idea
                </h2>
                <p className="text-gray-400 mb-6">
                  Describe your idea directly
                </p>
              </div>
            </div>
          </div>

          {/* API Status Loader */}
          {apiStatus !== 'idle' && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-4">
                  {apiStatus === 'loading' && (
                    <>
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                      <div>
                        <p className="text-white font-medium">Sending request to AI backend...</p>
                        <p className="text-gray-400 text-sm">Please wait while we process your analysis request</p>
                      </div>
                    </>
                  )}
                  {apiStatus === 'success' && (
                    <>
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-green-400 font-medium">Request sent successfully!</p>
                        <p className="text-gray-400 text-sm">Analysis is now in progress...</p>
                      </div>
                    </>
                  )}
                  {apiStatus === 'error' && (
                    <>
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">Request failed</p>
                        <p className="text-gray-400 text-sm">{analysis.error || 'Please check your connection and try again'}</p>
                      </div>
                      <button
                        onClick={() => {
                          setApiStatus('idle');
                          setAnalysis({ isAnalyzing: false });
                        }}
                        className="ml-auto px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        Retry
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          {selectedOption === "input" && (
            <div className="max-w-4xl mx-auto">
              <div
                className="backdrop-blur-md rounded-2xl p-8 border border-white/20"
                style={{ backgroundColor: "rgba(22, 33, 53, 0.7)" }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Describe Your Idea
                </h3>
                <textarea
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="Enter your idea description here..."
                  className="w-full h-32 bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500/50"
                  disabled={analysis.isAnalyzing || apiStatus === 'loading'}
                />
                <button
                  onClick={handleAnalyzeClick}
                  disabled={!ideaText.trim() || analysis.isAnalyzing || apiStatus === 'loading'}
                  className="mt-4 px-6 py-3 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {analysis.isAnalyzing || apiStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {apiStatus === 'loading' ? 'Sending...' : 'Analyzing...'}
                    </>
                  ) : (
                    "Analyze Idea"
                  )}
                </button>
              </div>
            </div>
          )}

          {showGoalSelection && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">
                      Select Analysis Goal
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowGoalSelection(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                    {goals.map((goal) => (
                      <div
                        key={goal.value}
                        onClick={() => handleGoalSelect(goal.value)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          goal.color === "blue"
                            ? "border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/10"
                            : goal.color === "green"
                            ? "border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10"
                            : goal.color === "purple"
                            ? "border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10"
                            : "border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/10"
                        }`}
                      >
                        <h3 className="text-white font-semibold mb-2">
                          {goal.label}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {goal.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis.results && (
            <div className="max-w-4xl mx-auto mt-8">
              <div
                className="backdrop-blur-md rounded-2xl p-8 border border-white/20"
                style={{ backgroundColor: "rgba(22, 33, 53, 0.7)" }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Analysis Complete
                </h3>
                <div className="text-gray-300">
                  <pre className="whitespace-pre-wrap">
                    {analysis.results
                      ? JSON.stringify(analysis.results, null, 2)
                      : "No results available"}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Vault Modal */}
          {showVaultModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white">
                    Select an Idea
                  </h2>
                  <button
                    onClick={() => setShowVaultModal(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400">Loading ideas...</div>
                    </div>
                  ) : ideas.length > 0 ? (
                    <div className="grid gap-4">
                      {ideas.map((idea) => (
                        <div
                          key={idea.id}
                          onClick={() => selectIdea(idea)}
                          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-indigo-500/50 cursor-pointer transition-all duration-200 hover:bg-gray-800/70"
                        >
                          <h3 className="text-white font-semibold mb-2">
                            {idea.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {idea.original_text ||
                              idea.generated_text ||
                              idea.description ||
                              "Click to select this idea"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400">
                        No ideas found in your vault
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzer;
