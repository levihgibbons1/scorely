import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  ThumbsUp, 
  Clock, 
  ExternalLink, 
  Share2, 
  MoreHorizontal, 
  Download,
  MessageSquare,
  Zap,
  CheckCircle2,
  Globe,
  Code2,
  Cpu,
  PenLine
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// --- Mock Data (Ideally this would be shared or fetched) ---
// Duplicated from Discovery.tsx for now to keep this page self-contained for the prototype
const mockAgents = [
  {
    id: 1,
    name: "CodeWizard Pro",
    description: "An advanced coding assistant specialized in React, TypeScript, and Python. It can debug complex issues, refactor legacy codebases, and generate boilerplate code instantly. CodeWizard Pro integrates directly with your IDE and offers real-time performance optimization suggestions.",
    longDescription: `
      CodeWizard Pro is the ultimate companion for modern developers. Whether you're debugging a tricky race condition or scaffolding a new microservice, CodeWizard Pro has your back.
      
      It connects seamlessly with VS Code, IntelliJ, and GitHub Codespaces to provide intelligent autocomplete, automated refactoring, and security vulnerability detection. 
      
      Key features include:
      - Context-aware code generation
      - Automated unit test writing (Jest, Vitest, PyTest)
      - Documentation generation
      - Legacy code modernization
    `,
    category: "Development",
    score: 4.9,
    upvotes: 843,
    isVerified: true,
    createdAt: "2 days ago",
    featured: true,
    price: "Free",
    tags: ["React", "TypeScript", "Debugging", "Refactoring"],
    developer: "DevTools Inc.",
    version: "2.4.0",
    lastUpdated: "Yesterday"
  },
  {
    id: 2,
    name: "DataSense",
    description: "Turn messy CSVs and Excel sheets into actionable insights.",
    longDescription: "DataSense transforms raw data into beautiful, interactive dashboards.",
    category: "Analytics",
    score: 4.7,
    upvotes: 520,
    isVerified: true,
    createdAt: "1 week ago",
    featured: true,
    price: "Paid",
    tags: ["Data Viz", "Analytics", "Business Intelligence"],
    developer: "DataFlow Systems",
    version: "1.1.2",
    lastUpdated: "3 days ago"
  },
  // Add other basic mocks if needed to prevent crashes if ID is not 1 or 2
  { id: 3, name: "CopyCraft AI", category: "Marketing", score: 4.5, upvotes: 310, isVerified: false, price: "Freemium", description: "Marketing copywriter.", tags: ["Marketing"] },
  { id: 4, name: "LegalEagle", category: "Research", score: 4.8, upvotes: 615, isVerified: true, price: "Paid", description: "Legal document analysis.", tags: ["Legal"] },
  { id: 5, name: "SupportBot 3000", category: "Customer Service", score: 4.2, upvotes: 180, isVerified: false, price: "Free", description: "Customer support automation.", tags: ["Support"] },
  { id: 6, name: "TaskMaster", category: "Productivity", score: 4.6, upvotes: 420, isVerified: true, price: "Freemium", description: "Productivity and task management.", tags: ["Productivity"] },
  { id: 7, name: "ResearchMate", category: "Research", score: 4.9, upvotes: 890, isVerified: true, price: "Paid", description: "Academic research assistant.", tags: ["Research"] },
  { id: 8, name: "SocialBuzz", category: "Marketing", score: 4.3, upvotes: 250, isVerified: false, price: "Free", description: "Social media management.", tags: ["Social Media"] },
  { id: 9, name: "BugHunter", category: "Coding", score: 4.7, upvotes: 380, isVerified: true, price: "Paid", description: "Security vulnerability scanner.", tags: ["Security"] },
  { id: 10, name: "FinanceFlow", category: "Analytics", score: 4.4, upvotes: 190, isVerified: false, price: "Freemium", description: "Financial tracking.", tags: ["Finance"] },
  { id: 11, name: "EmailNinja", category: "Productivity", score: 4.8, upvotes: 720, isVerified: true, price: "Free", description: "Email management.", tags: ["Email"] },
  { id: 12, name: "DesignGen", category: "Other", score: 4.1, upvotes: 150, isVerified: false, price: "Paid", description: "UI design generation.", tags: ["Design"] },
];

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

export default function AgentDetails() {
  const [match,params] = useRoute("/agents/:id");
  const [, setLocation] = useLocation();
  const id = params?.id ? parseInt(params.id) : 1;
  const agent = mockAgents.find(a => a.id === id) || mockAgents[0];
  const { toast } = useToast();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review is pending moderation.",
    });
    setIsReviewOpen(false);
    setRating(0);
    setReviewText("");
  };

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
              <div className={`h-48 w-full bg-gradient-to-r from-blue-400 to-cyan-300 relative`}>
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
                        <div className="flex items-center gap-3 flex-wrap">
                          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{agent.name}</h1>
                          {agent.isVerified && (
                            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-none px-2 py-0.5 h-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Code2 className="w-4 h-4 text-slate-400" /> {agent.developer || "DevTools Inc."}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" /> Updated {agent.lastUpdated || "Yesterday"}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="font-medium text-slate-900 dark:text-white">{agent.version || "2.4.0"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-5 h-5 ${star <= Math.round(agent.score) ? "fill-amber-400 text-amber-400" : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"}`} 
                              />
                            ))}
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white ml-1">{agent.score}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm">({agent.upvotes} ratings)</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 min-w-[200px] mt-2 lg:mt-0">
                        <div className="flex flex-col gap-2 w-full">
                          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 text-base font-medium h-11">
                            Try Agent <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-9 text-sm">
                              <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> Upvote
                            </Button>
                            <Button variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-9 text-sm">
                              <Download className="w-3.5 h-3.5 mr-1.5" /> Save
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
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                    {agent.description}
                  </p>
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {agent.longDescription || "This agent is designed to help you with your daily tasks and improve your workflow efficiently."}
                  </div>
                </Card>
              </section>

              {/* Screenshots Mock */}
              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                </div>
              </section>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Community Reviews</h3>
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <PenLine className="w-4 h-4" /> Write a Review
                      </Button>
                    </DialogTrigger>
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
                        <Button onClick={handleSubmitReview} disabled={rating === 0 || !reviewText.trim()}>Submit Review</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">User {i}</h4>
                            <span className="text-slate-400 text-sm">• 2 days ago</span>
                          </div>
                          <div className="flex text-amber-400 mb-2">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">
                            This agent completely changed my workflow. Highly recommended for anyone working with this tech stack!
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar (Right Column) */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Information</h4>
                  
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">License</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.price}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Version</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.version || "1.0.0"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Size</span>
                    <span className="font-medium text-slate-900 dark:text-white">12 MB</span>
                  </div>
                  
                  <div className="pt-4">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {agent.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Developer Card */}
              <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      DT
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">DevTools Inc.</h4>
                      <div className="flex items-center text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-blue-500 mr-1" /> Verified Developer
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Developer
                  </Button>
                  <div className="flex justify-center gap-4 mt-4">
                    <Globe className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <ExternalLink className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
