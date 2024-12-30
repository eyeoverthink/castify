"use client";

import { useState } from "react";
import { Pencil, Type, Image, Bold, Italic, Link as LinkIcon, Save, Wand2 } from "lucide-react";
import { CreditDisplay } from "@/components/shared/credit-display";
import Link from "next/link";

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "technical", label: "Technical" },
  { value: "storytelling", label: "Storytelling" },
];

const lengths = [
  { value: "short", label: "Short (~500 words)" },
  { value: "medium", label: "Medium (~1000 words)" },
  { value: "long", label: "Long (~2000 words)" },
];

export default function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, length }),
      });

      if (!response.ok) throw new Error("Failed to generate blog");

      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error generating blog:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    // Implement save functionality
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition">
          <Pencil className="w-8 h-8" />
          <span className="text-xl font-semibold">CreativeAI Studio</span>
        </Link>
        <CreditDisplay cost={5} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Topic</label>
            <input
              type="text"
              placeholder="Enter your blog topic..."
              className="w-full bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tone</label>
            <select
              className="w-full bg-gray-800/50 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {tones.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-400">Length</label>
            <div className="flex gap-2">
              {lengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value)}
                  className={`flex-1 py-2 px-4 rounded-lg transition ${
                    length === l.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {l.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-2">
              <button className="p-2 hover:bg-gray-700 rounded">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <LinkIcon className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Image className="w-4 h-4" />
              </button>
            </div>
            <textarea
              className="w-full h-[500px] bg-gray-800/50 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your blog content will appear here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <button
              onClick={handleSave}
              disabled={!content}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
