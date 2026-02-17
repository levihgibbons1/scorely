import { useRoute, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Terminal,
} from "lucide-react";
import { useAgent, useVoteAgent } from "@/lib/api";
import { getScore, CATEGORY_COLORS } from "@shared/schema";

export default function AgentDetail() {
  const [, params] = useRoute("/agents/:id");
  const id = params?.id ?? "";
  const { data: agent, isLoading, error } = useAgent(id);
  const voteAgent = useVoteAgent();

  function handleVote(direction: "up" | "down") {
    if (!agent) return;
    voteAgent.mutate({ id: agent.id, direction });
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container px-4 mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-blue-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all agents
            </Link>

            {/* Loading state */}
            {isLoading && (
              <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <Skeleton className="h-5 w-24 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-8" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>
            )}

            {/* Error / Not found */}
            {!isLoading && (error || !agent) && (
              <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Agent not found
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    The agent you're looking for doesn't exist or has been
                    removed.
                  </p>
                  <Link href="/">
                    <Button>Back to Home</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Agent detail */}
            {!isLoading && agent && (
              <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                      {agent.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className={
                        CATEGORY_COLORS[agent.category] ||
                        CATEGORY_COLORS.Other
                      }
                    >
                      {agent.category}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <span className="flex items-center gap-1.5 text-amber-500 font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {getScore(agent) > 0
                        ? `${getScore(agent).toFixed(1)}/5`
                        : "N/A"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4" />
                      {agent.upvotes} upvotes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ThumbsDown className="w-4 h-4" />
                      {agent.downvotes} downvotes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(agent.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                    {agent.description}
                  </p>

                  {/* Vote buttons */}
                  <div className="flex items-center gap-3 mb-8">
                    <Button
                      variant="outline"
                      onClick={() => handleVote("up")}
                      disabled={voteAgent.isPending}
                      className="gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/20 dark:hover:text-green-400 dark:hover:border-green-800"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Upvote
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVote("down")}
                      disabled={voteAgent.isPending}
                      className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Downvote
                    </Button>
                  </div>

                  {/* Links */}
                  {(agent.github_url || agent.mcp_endpoint) && (
                    <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-6">
                      {agent.github_url && (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-28 flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" /> GitHub
                          </span>
                          <a
                            href={agent.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-blue-600 underline break-all transition-colors"
                          >
                            {agent.github_url}
                          </a>
                        </div>
                      )}
                      {agent.mcp_endpoint && (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-28 flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5" /> MCP Endpoint
                          </span>
                          <span className="text-sm text-slate-700 dark:text-slate-300 break-all font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {agent.mcp_endpoint}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
