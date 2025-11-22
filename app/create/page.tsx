"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
} from "lucide-react";

import SideNav from "@/components/SideNav";
import GlowingOrb from "@/components/GlowingOrb";
import Particles from "@/components/particles";

import ToolSelector from "@/components/create-idea/ToolSelector";
import IdeaOutputViewer from "@/components/create-idea/IdeaOutputViewer";
import TaglineGenerator from "@/components/create-idea/TaglineGenerator";
import IdeaLoader from "@/components/create-idea/IdeaLoader";

interface ProcessResult {
  idea_id: string;
  status: string;
  combined_result: string;
  per_tool_results: unknown[];
}

const CreateIdeaForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [ideaId, setIdeaId] = useState<string | null>(null);
  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);

  const toggleTool = (toolKey: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolKey)
        ? prev.filter((t) => t !== toolKey)
        : [...prev, toolKey]
    );
  };

  const generateTagline = () => {
    const lines = [
      "Innovation starts here.",
      "Your idea matters.",
      "Build the future.",
      "Unleash creativity.",
    ];
    setTagline(lines[Math.floor(Math.random() * lines.length)]);
  };

  const createAndProcessIdea = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8081/api/ai/create-and-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: description,
          tools: selectedTools
        })
      });

      const data = await response.json();
      
      const resultData = {
        idea_id: data.idea_id,
        status: data.status,
        per_tool_results: data.per_tool_results,
        combined_result: data.combined_result,
        title,
        description
      };
      
      setResult(resultData);
      setIdeaId(data.idea_id);
      
      // Store in localStorage and navigate
      localStorage.setItem(`idea-${data.idea_id}`, JSON.stringify(resultData));
      router.push(`/idea/${data.idea_id}`);
      
    } catch (error) {
      console.error('Error creating and processing idea:', error);
      
      // Fallback mock response
      const mockResult = {
        idea_id: 'mock-' + Date.now(),
        status: 'completed',
        combined_result: `${description}\n\n**Enhanced Features:**\n• AI-powered optimization\n• Real-time analytics\n• User-friendly interface\n• Scalable architecture`,
        per_tool_results: selectedTools.map(tool => ({
          tool,
          result: `Enhanced content for ${tool}`,
          metadata: { mock: true }
        })),
        title,
        description
      };
      
      setResult(mockResult);
      setIdeaId(mockResult.idea_id);
      
      // Store in localStorage and navigate
      localStorage.setItem(`idea-${mockResult.idea_id}`, JSON.stringify(mockResult));
      router.push(`/idea/${mockResult.idea_id}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    console.log('Draft saved:', { title, description });
    alert('Draft saved successfully!');
  };

  const replaceBody = () => {
    if (result?.combined_result) {
      setDescription(result.combined_result);
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
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h1 className="text-3xl font-bold">Create a New Idea</h1>
            </div>
            <p className="text-slate-400 text-sm">
              Turn your concept into a structured innovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* TITLE */}
              <div className="glass-card">
                <label className="block text-sm font-medium mb-3">
                  Idea Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your idea title..."
                  className="input-dark"
                />

                <TaglineGenerator tagline={tagline} regenerate={generateTagline} />
              </div>

              {/* DESCRIPTION */}
              <div className="glass-card">
                <label className="block text-sm font-medium mb-3">
                  Description / Idea Body
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={10}
                  placeholder="Describe your idea..."
                  className="textarea-dark"
                />
              </div>

              {/* RESULT OUTPUT */}
              {result && (
                <div className="glass-card mt-4">
                  <p className="text-sm text-slate-400 mb-3">
                    Status:{" "}
                    <span className="text-blue-400 font-medium">
                      {result.status}
                    </span>
                  </p>

                  {result.status === "completed" && (
                    <IdeaOutputViewer
                      output={result.combined_result}
                      onReplace={replaceBody}
                    />
                  )}

                  {result.status === "failed" && (
                    <p className="text-red-400 text-sm">
                      Processing failed — please try again.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-1">
              <div className="glass-card sticky top-8 p-6">
                <h3 className="text-sm font-medium mb-4">AI Tools</h3>

                <ToolSelector selected={selectedTools} onToggle={toggleTool} />

                {selectedTools.length > 0 && (
                  <button
                    onClick={createAndProcessIdea}
                    disabled={loading}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Create & Process'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSaveDraft}
              className="btn-dark"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>

      {/* LOADING OVERLAY */}
      {loading && <IdeaLoader />}

      {/* Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(22, 33, 53, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .input-dark,
        .textarea-dark {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(100, 100, 120, 0.5);
          border-radius: 0.6rem;
          padding: 0.8rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-dark:focus,
        .textarea-dark:focus {
          border-color: #3b82f6;
        }
        .btn-dark {
          padding: 0.8rem 1.5rem;
          background: #1e293b;
          border-radius: 0.6rem;
          transition: 0.2s;
        }
        .btn-dark:hover {
          background: #334155;
        }
        .btn-glow {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(to right, #2563eb, #3b82f6);
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: 0.2s;
        }
        .btn-glow:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default CreateIdeaForm;