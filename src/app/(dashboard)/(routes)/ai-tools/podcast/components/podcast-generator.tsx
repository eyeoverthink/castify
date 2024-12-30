"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { CreditDisplay } from "@/components/shared/credit-display";
import Link from "next/link";

const voiceTypes = [
  { value: "male", label: "Male Voice" },
  { value: "female", label: "Female Voice" },
  { value: "neutral", label: "Neutral Voice" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
];

export default function PodcastGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement podcast generation logic
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error generating podcast:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition">
          <Mic className="w-8 h-8" />
          <span className="text-xl font-semibold">CreativeAI Studio</span>
        </Link>
        <CreditDisplay cost={1} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Title</label>
          <input
            type="text"
            placeholder="Enter your podcast title"
            className="w-full bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Description</label>
          <textarea
            placeholder="Enter a brief description of your podcast"
            className="w-full h-32 bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Voice Type</label>
          <select
            className="w-full bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={voiceType}
            onChange={(e) => setVoiceType(e.target.value)}
            required
          >
            <option value="">Select a voice type</option>
            {voiceTypes.map((voice) => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Prompt</label>
          <textarea
            placeholder="Enter the text you want to convert to speech"
            className="w-full h-48 bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !title || !description || !voiceType || !prompt}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <div className="flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" />
            {isLoading ? "Generating Podcast..." : "Generate Podcast"}
          </div>
        </button>
      </form>
    </div>
  );
}
