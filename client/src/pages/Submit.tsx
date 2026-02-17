import { useState } from "react";
import { useLocation, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ArrowLeft } from "lucide-react";
import { useCreateAgent } from "@/lib/api";
import { CATEGORIES } from "@shared/schema";
import { toast } from "sonner";

const BENEFITS = [
  "Get discovered by thousands of users",
  "Receive community feedback and reviews",
  "Build credibility with a public score",
  "Drive traffic to your GitHub or API",
  "Join a growing directory of top agents",
];

function isValidUrl(str: string): boolean {
  if (!str) return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function Submit() {
  const [, setLocation] = useLocation();
  const createAgent = useCreateAgent();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    githubUrl: "",
    mcpEndpoint: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createAgent.mutateAsync({
        name: form.name,
        description: form.description,
        category: form.category as any,
        github_url: form.githubUrl || "",
        mcp_endpoint: form.mcpEndpoint || "",
      });
      toast.success("Agent submitted successfully!");
      setLocation("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit agent");
    }
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container px-4 mx-auto max-w-5xl">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-blue-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all agents
            </Link>

            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
                {"\uD83D\uDE80"}
              </div>
              <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Submit an Agent
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Add your AI agent to the Scorely directory for the community to
                discover and review.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                  <CardContent className="p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-7">
                      {/* Agent Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Agent Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                          placeholder="e.g. AutoCoder, DataWiz, SupportBot"
                        />
                        <p className="text-xs text-slate-400 mt-1.5">
                          A unique, memorable name for your agent.
                        </p>
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          required
                          rows={4}
                          maxLength={500}
                          value={form.description}
                          onChange={(e) =>
                            update("description", e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-shadow"
                          placeholder="Describe what your agent does, its key features, and what makes it unique..."
                        />
                        <div className="flex justify-between mt-1.5">
                          <p className="text-xs text-slate-400">
                            Explain what your agent does and why it's useful.
                          </p>
                          <span
                            className={`text-xs font-medium ${
                              form.description.length > 450
                                ? "text-amber-500"
                                : "text-slate-400"
                            }`}
                          >
                            {form.description.length} / 500
                          </span>
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          required
                          value={form.category}
                          onChange={(e) => update("category", e.target.value)}
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        >
                          <option value="">Select a category</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-400 mt-1.5">
                          Choose the category that best describes your agent.
                        </p>
                      </div>

                      {/* GitHub URL */}
                      <div>
                        <label
                          htmlFor="githubUrl"
                          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          GitHub URL
                          <span className="text-slate-400 font-normal ml-1">
                            (optional)
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="githubUrl"
                            type="url"
                            value={form.githubUrl}
                            onChange={(e) =>
                              update("githubUrl", e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="https://github.com/your-org/your-agent"
                          />
                          {form.githubUrl && (
                            <span
                              className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${
                                isValidUrl(form.githubUrl)
                                  ? "text-green-500"
                                  : "text-red-400"
                              }`}
                            >
                              {isValidUrl(form.githubUrl) ? "\u2713" : "\u2717"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">
                          Link to your agent's source code repository.
                        </p>
                      </div>

                      {/* MCP Endpoint */}
                      <div>
                        <label
                          htmlFor="mcpEndpoint"
                          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          MCP Endpoint
                          <span className="text-slate-400 font-normal ml-1">
                            (optional)
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="mcpEndpoint"
                            type="url"
                            value={form.mcpEndpoint}
                            onChange={(e) =>
                              update("mcpEndpoint", e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 pr-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="https://api.example.com/mcp"
                          />
                          {form.mcpEndpoint && (
                            <span
                              className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${
                                isValidUrl(form.mcpEndpoint)
                                  ? "text-green-500"
                                  : "text-red-400"
                              }`}
                            >
                              {isValidUrl(form.mcpEndpoint)
                                ? "\u2713"
                                : "\u2717"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">
                          The Model Context Protocol endpoint for your agent.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        disabled={createAgent.isPending}
                        className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        {createAgent.isPending
                          ? "Submitting..."
                          : "Submit Agent"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Preview card */}
                {form.name && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                      Preview
                    </h3>
                    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            {form.name || "Agent Name"}
                          </h4>
                          {form.category && (
                            <Badge variant="secondary">{form.category}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {form.description ||
                            "Your agent description will appear here..."}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" /> N/A
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3.5 h-3.5" /> 0 upvotes
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Why submit */}
                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                    <CardContent className="p-7">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                        Why submit your agent?
                      </h3>
                      <ul className="space-y-3">
                        {BENEFITS.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <span className="text-green-500 font-bold mt-0.5 shrink-0">
                              {"\u2713"}
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Example agent */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-100 dark:border-blue-900/30">
                    <CardContent className="p-7">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                        Example Agent
                      </p>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                        AutoCoder Pro
                      </h4>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mb-2"
                      >
                        Development
                      </Badge>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        An AI coding assistant that writes, reviews, and
                        refactors code across 20+ languages with context-aware
                        suggestions.
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-primary font-semibold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current" /> 4.8/5
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" /> 234 upvotes
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
