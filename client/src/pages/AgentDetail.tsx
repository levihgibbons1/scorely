import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  Clock,
  ExternalLink,
  Share2,
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  Code2,
  Cpu,
  PenLine,
  Github,
  Loader2
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useAgent, useAgentReviews, useSubmitReview, useVoteAgent, useAgentSaveStatus, useSaveAgent } from "@/lib/api";
import { getScore, CATEGORY_COLORS } from "@shared/schema";

const getCategoryGradient = (category: string) => {
  switch (category) {
    case "Development": return "from-blue-500 to-cyan-400";
    case "Coding": return "from-indigo-500 to-purple-400";
    case "Analytics": return "from-purple-500 to-pink-400";
    case "Research": return "from-cyan-500 to-teal-400";
    case "Customer Service": return "from-green-500 to-emerald-400";
    case "Marketing": return "from-pink-500 to-rose-400";
    case "Productivity": return "from-amber-500 to-orange-400";
    default: return "from-slate-500 to-slate-400";
  }
};

const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export default function AgentDetails() {
  const [match, params] = useRoute("/agents/:id");
  const [, setLocation] = useLocation();
  const agentId = params?.id || "";
  const { toast } = useToast();
  const { user } = useAuth();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Data fetching
  const { data: agent, isLoading, error } = useAgent(agentId);
  const { data: reviews = [] } = useAgentReviews(agentId);
  const { data: saveStatus } = useAgentSaveStatus(agentId, user?.id);

  // Mutations
  const voteAgent = useVoteAgent();
  const submitReview = useSubmitReview();
  const saveAgent = useSaveAgent();

  const isSaved = saveStatus?.saved || false;

  const handleUpvote = () => {
    if (!agent) return;
    voteAgent.mutate({ id: agent.id, direction: "up" });
  };

  const handleSave = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to save agents.", variant: "destructive" });
      return;
    }
    if (!agent) return;
    saveAgent.mutate({ agent_id: agent.id, user_id: user.id });
  };

  const handleSubmitReview = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to write a review.", variant: "destructive" });
      return;
    }
    if (!agent) return;

    const userName = user.user_metadata?.full_name || user.user_metadata?.username || user.email?.split("@")[0] || "Anonymous";

    submitReview.mutate(
      {
        agent_id: agent.id,
        user_id: user.id,
        user_name: userName,
        rating,
        content: reviewText,
      },
      {
        onSuccess: () => {
          toast({ title: "Review submitted!", description: "Thank you for your feedback." });
          setIsReviewOpen(false);
          setRating(0);
          setReviewText("");
        },
        onError: (err: any) => {
          toast({ title: "Error", description: err.message || "Failed to submit review.", variant: "destructive" });
        },
      }
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative selection:bg-primary/20">
        <div className="fixed inset-0 z-0"><AnimatedBackground /></div>
        <div className="relative z-10">
          <Navbar />
          <main className="container px-4 py-24 mx-auto max-w-6xl">
            <Skeleton className="h-8 w-40 mb-8" />
            <Skeleton className="h-80 w-full rounded-xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error / Not found
  if (error || !agent) {
    return (
      <div className="min-h-screen bg-background relative selection:bg-primary/20">
        <div className="fixed inset-0 z-0"><AnimatedBackground /></div>
        <div className="relative z-10">
          <Navbar />
          <main className="container px-4 py-24 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Agent Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">The agent you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => setLocation("/discover")} className="bg-primary hover:bg-blue-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Discovery
            </Button>
          </main>
        </div>
      </div>
    );
  }

  const score = getScore(agent);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container px-4 py-24 mx-auto max-w-6xl">
          <Button
            variant="ghost"
            className="mb-8 pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setLocation("/discover")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Discovery
          </Button>

          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/20 dark:border-white/10 overflow-hidden mb-8 shadow-sm">
              {/* Banner */}
              <div className={`h-48 w-full bg-gradient-to-r ${getCategoryGradient(agent.category)} relative`}>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md w-8 h-8 rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md w-8 h-8 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="flex flex-col lg:flex-row gap-6 -mt-12 relative z-10">

                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center p-2">
                      <div className={`w-full h-full rounded-[1.5rem] flex items-center justify-center text-white text-5xl font-bold bg-gradient-to-br ${getCategoryGradient(agent.category)}`}>
                        {agent.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 pt-14 lg:pt-14 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">

                      {/* Title & Metadata */}
                      <div className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{agent.name}</h1>

                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
                          <Badge variant="secondary" className={CATEGORY_COLORS[agent.category] || CATEGORY_COLORS["Other"]}>
                            {agent.category}
                          </Badge>
                          <span className="text-slate-300 dark:text-slate-600">|</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" /> Added {formatTimeAgo(agent.created_at)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(score) ? "fill-amber-400 text-amber-400" : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"}`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white ml-1">{score > 0 ? score.toFixed(1) : "N/A"}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm">
                            ({agent.total_reviews} review{agent.total_reviews !== 1 ? "s" : ""})
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 min-w-[200px] mt-2 lg:mt-0">
                        <div className="flex flex-col gap-2 w-full">
                          {agent.github_url ? (
                            <a href={agent.github_url} target="_blank" rel="noopener noreferrer">
                              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 text-base font-medium h-11">
                                View Agent <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </a>
                          ) : agent.mcp_endpoint ? (
                            <a href={agent.mcp_endpoint} target="_blank" rel="noopener noreferrer">
                              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 text-base font-medium h-11">
                                View Agent <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </a>
                          ) : (
                            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 text-base font-medium h-11" disabled>
                              No Link Available
                            </Button>
                          )}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className={`flex-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-9 text-sm ${voteAgent.isPending ? "opacity-50" : ""}`}
                              onClick={handleUpvote}
                              disabled={voteAgent.isPending}
                            >
                              <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> {agent.upvotes}
                            </Button>
                            <Button
                              variant="outline"
                              className={`flex-1 border-slate-200 dark:border-slate-700 h-9 text-sm ${isSaved ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" : "bg-white dark:bg-slate-800"}`}
                              onClick={handleSave}
                              disabled={saveAgent.isPending}
                            >
                              {isSaved ? (
                                <><BookmarkCheck className="w-3.5 h-3.5 mr-1.5" /> Saved</>
                              ) : (
                                <><Bookmark className="w-3.5 h-3.5 mr-1.5" /> Save</>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content (Left Column) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this Agent</h3>
                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 p-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {agent.description}
                  </p>
                </Card>
              </section>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Community Reviews
                    {reviews.length > 0 && (
                      <span className="text-base font-normal text-slate-500 ml-2">({reviews.length})</span>
                    )}
                  </h3>
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={(e) => {
                          if (!user) {
                            e.preventDefault();
                            toast({ title: "Sign in required", description: "Please sign in to write a review.", variant: "destructive" });
                          }
                        }}
                      >
                        <PenLine className="w-4 h-4" /> Write a Review
                      </Button>
                    </DialogTrigger>
                    {user && (
                      <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800">
                        <DialogHeader>
                          <DialogTitle>Write a Review</DialogTitle>
                          <DialogDescription>
                            Share your experience with {agent.name}. Your feedback helps others make informed decisions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  className="focus:outline-none transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={`w-8 h-8 ${
                                      star <= rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300 dark:text-slate-600 hover:text-amber-400"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Tell us what you think..."
                              className="min-h-[100px] bg-white/50 dark:bg-slate-950/50"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsReviewOpen(false)}>Cancel</Button>
                          <Button
                            onClick={handleSubmitReview}
                            disabled={rating === 0 || !reviewText.trim() || submitReview.isPending}
                          >
                            {submitReview.isPending ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 p-8">
                      <div className="text-center">
                        <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No reviews yet</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Be the first to share your experience with {agent.name}.</p>
                      </div>
                    </Card>
                  ) : (
                    reviews.map((review) => (
                      <Card key={review.id} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>{review.user_name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-900 dark:text-white">{review.user_name}</h4>
                              <span className="text-slate-400 text-sm">| {formatTimeAgo(review.created_at)}</span>
                            </div>
                            <div className="flex mb-2">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"}`} />
                              ))}
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {review.content}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar (Right Column) */}
            <div className="space-y-6">
              {/* Info Card */}
              <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Information</h4>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Upvotes</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{agent.upvotes}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Downvotes</span>
                    <span className="font-medium text-red-500 dark:text-red-400">{agent.downvotes}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Score</span>
                    <span className={`font-bold ${score >= 4 ? "text-green-600" : score >= 2.5 ? "text-amber-500" : score > 0 ? "text-red-500" : "text-slate-400"}`}>
                      {score > 0 ? score.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Reviews</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.total_reviews}</span>
                  </div>

                  {/* GitHub & MCP Links */}
                  {(agent.github_url || agent.mcp_endpoint) && (
                    <div className="pt-4">
                      <h5 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Links</h5>
                      <div className="space-y-2">
                        {agent.github_url && (
                          <a
                            href={agent.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                          >
                            <Github className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate flex-1">
                              GitHub Repository
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                        {agent.mcp_endpoint && (
                          <a
                            href={agent.mcp_endpoint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                          >
                            <Cpu className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate flex-1">
                              MCP Endpoint
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Agent Stats Card */}
              <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${getCategoryGradient(agent.category)}`}>
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{agent.name}</h4>
                      <div className="flex items-center text-xs text-slate-500">
                        <Code2 className="w-3 h-3 mr-1" /> Community Agent
                      </div>
                    </div>
                  </div>
                  <Separator className="mb-4" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Added {formatTimeAgo(agent.created_at)} and has received {agent.upvotes + agent.downvotes} total vote{agent.upvotes + agent.downvotes !== 1 ? "s" : ""} from the community.
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
