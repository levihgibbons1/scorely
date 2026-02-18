import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  LogOut,
  LayoutGrid,
  BarChart3,
  Heart,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ThumbsUp,
  TrendingUp,
  PackageOpen,
  Bookmark,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { getScore } from "@shared/schema";
import type { Agent } from "@shared/schema";

type Timeframe = "daily" | "weekly" | "monthly";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("agents");
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<Timeframe>("weekly");
  const { user: authUser, signOut } = useAuth();
  const [myAgents, setMyAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive display user from auth state
  const user = {
    name: authUser?.user_metadata?.full_name || authUser?.email?.split("@")[0] || "User",
    email: authUser?.email || "",
    avatar: authUser?.user_metadata?.avatar_url || "",
    memberSince: authUser?.created_at
      ? new Date(authUser.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "Unknown",
    role: "Developer",
  };

  // Fetch user's submitted agents
  useEffect(() => {
    async function fetchMyAgents() {
      if (!authUser?.id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMyAgents(data);
      }
      setLoading(false);
    }
    fetchMyAgents();
  }, [authUser?.id]);

  // Compute stats from real data
  const totalUpvotes = myAgents.reduce((sum, a) => sum + (a.upvotes || 0), 0);
  const totalDownvotes = myAgents.reduce((sum, a) => sum + (a.downvotes || 0), 0);
  const avgScore = myAgents.length > 0
    ? Math.round((myAgents.reduce((sum, a) => sum + getScore(a), 0) / myAgents.length) * 10) / 10
    : 0;

  // Analytics: filter agents by timeframe
  const getTimeframeDate = (tf: Timeframe) => {
    const now = new Date();
    if (tf === "daily") return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (tf === "weekly") return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // monthly
  };

  const timeframeLabels: Record<Timeframe, string> = {
    daily: "today",
    weekly: "this week",
    monthly: "this month",
  };

  const timeframeAgents = myAgents.filter(
    (a) => new Date(a.created_at) >= getTimeframeDate(analyticsTimeframe)
  );

  const tfUpvotes = timeframeAgents.reduce((sum, a) => sum + (a.upvotes || 0), 0);
  const tfDownvotes = timeframeAgents.reduce((sum, a) => sum + (a.downvotes || 0), 0);
  const tfAvgScore = timeframeAgents.length > 0
    ? Math.round((timeframeAgents.reduce((sum, a) => sum + getScore(a), 0) / timeframeAgents.length) * 10) / 10
    : 0;
  const tfTotalVotes = tfUpvotes + tfDownvotes;
  const tfVoteRatio = tfTotalVotes > 0 ? Math.round((tfUpvotes / tfTotalVotes) * 100) : 0;

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
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container px-4 py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Profile */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <CardContent className="pt-0 relative">
                    <div className="flex justify-center -mt-12 mb-4">
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-900 shadow-md">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-primary">
                        {user.role}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-slate-500 dark:text-slate-400">Member Since</span>
                        <span className="font-medium text-slate-900 dark:text-white">{user.memberSince}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-slate-500 dark:text-slate-400">Total Agents</span>
                        <span className="font-medium text-slate-900 dark:text-white">{myAgents.length}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-200/50 dark:border-white/5 p-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-blue-500 text-white border-none shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-lg font-bold mb-2">Build a new Agent?</h3>
                    <p className="text-blue-100 text-sm mb-4">Submit your latest AI creation to the marketplace.</p>
                    <Link href="/submit">
                      <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none shadow-md">
                        <Plus className="w-4 h-4 mr-2" /> Submit Agent
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage your agents and view performance analytics.</p>
                  </div>
                  <Link href="/settings">
                    <Button variant="outline" className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:bg-white/80 dark:hover:bg-slate-800/80">
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Button>
                  </Link>
                </div>

                <Tabs defaultValue="agents" className="space-y-6" onValueChange={setActiveTab}>
                  <TabsList className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-1 rounded-xl h-auto">
                    <TabsTrigger value="agents" className="rounded-lg px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <LayoutGrid className="w-4 h-4 mr-2" /> My Agents
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-lg px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <BarChart3 className="w-4 h-4 mr-2" /> Analytics
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="rounded-lg px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Heart className="w-4 h-4 mr-2" /> Saved
                    </TabsTrigger>
                  </TabsList>

                  {/* My Agents Tab */}
                  <TabsContent value="agents" className="space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Agents</span>
                            <LayoutGrid className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">{myAgents.length}</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Upvotes</span>
                            <ThumbsUp className="w-4 h-4 text-amber-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalUpvotes}</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Score</span>
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">{avgScore || "-"}</div>
                          {myAgents.length > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                              Based on {myAgents.length} agent{myAgents.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Agents List */}
                    <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle>Submitted Agents</CardTitle>
                        <CardDescription>Manage and track the status of your submissions.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <div className="flex items-center justify-center py-12 text-slate-400">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          </div>
                        ) : myAgents.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <PackageOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No agents yet</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                              You haven't submitted any agents. List your first AI agent to see it here.
                            </p>
                            <Link href="/submit">
                              <Button className="bg-primary hover:bg-blue-600 text-white">
                                <Plus className="w-4 h-4 mr-2" /> Submit Your First Agent
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {myAgents.map((agent) => (
                              <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors gap-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                                    {agent.name.charAt(0)}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                      {agent.name}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                      <span>{agent.category}</span>
                                      <span>•</span>
                                      <span>{formatTimeAgo(agent.created_at)}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex flex-col items-center">
                                      <span className="font-bold">{agent.upvotes}</span>
                                      <span className="text-xs text-slate-400">Upvotes</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="font-bold">{agent.downvotes}</span>
                                      <span className="text-xs text-slate-400">Downvotes</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="font-bold text-amber-500">{getScore(agent) || "-"}</span>
                                      <span className="text-xs text-slate-400">Score</span>
                                    </div>
                                  </div>

                                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl z-50">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <Link href={`/agents/${agent.id}`}>
                                        <DropdownMenuItem className="cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                                          <Eye className="w-4 h-4 mr-2" /> View Public Page
                                        </DropdownMenuItem>
                                      </Link>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Analytics Tab */}
                  <TabsContent value="analytics" className="space-y-6">
                    {/* Timeframe Selector */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Timeframe</span>
                      </div>
                      <div className="flex items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-lg p-1">
                        {(["daily", "weekly", "monthly"] as Timeframe[]).map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setAnalyticsTimeframe(tf)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                              analyticsTimeframe === tf
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                            }`}
                          >
                            {tf.charAt(0).toUpperCase() + tf.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {myAgents.length === 0 ? (
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg">
                        <CardContent>
                          <div className="flex flex-col items-center justify-center py-16 text-center">
                            <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No analytics data yet</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                              Submit your first agent to start tracking engagement analytics.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <>
                        {/* Analytics Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">New Agents</span>
                                <LayoutGrid className="w-4 h-4 text-blue-500" />
                              </div>
                              <div className="text-2xl font-bold text-slate-900 dark:text-white">{timeframeAgents.length}</div>
                              <p className="text-xs text-slate-500 mt-1">Submitted {timeframeLabels[analyticsTimeframe]}</p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Upvotes</span>
                                <ThumbsUp className="w-4 h-4 text-green-500" />
                              </div>
                              <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{tfUpvotes}</span>
                                {tfUpvotes > 0 && (
                                  <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                                    {timeframeLabels[analyticsTimeframe]}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{totalUpvotes} total all-time</p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Downvotes</span>
                                <ArrowDownRight className="w-4 h-4 text-red-400" />
                              </div>
                              <div className="text-2xl font-bold text-slate-900 dark:text-white">{tfDownvotes}</div>
                              <p className="text-xs text-slate-500 mt-1">{totalDownvotes} total all-time</p>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Approval Rate</span>
                                <TrendingUp className="w-4 h-4 text-purple-500" />
                              </div>
                              <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {tfTotalVotes > 0 ? `${tfVoteRatio}%` : "-"}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                {tfTotalVotes > 0
                                  ? `Based on ${tfTotalVotes} vote${tfTotalVotes !== 1 ? "s" : ""}`
                                  : `No votes ${timeframeLabels[analyticsTimeframe]}`}
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Per-Agent Breakdown */}
                        <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-lg">Agent Performance</CardTitle>
                            <CardDescription>How each of your agents is performing {timeframeLabels[analyticsTimeframe]}.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {myAgents.map((agent) => {
                                const score = getScore(agent);
                                const total = agent.upvotes + agent.downvotes;
                                const ratio = total > 0 ? Math.round((agent.upvotes / total) * 100) : 0;

                                return (
                                  <div key={agent.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {agent.name.charAt(0)}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{agent.name}</h4>
                                        <span className="text-xs text-slate-500">{agent.category}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                      <div className="hidden sm:flex items-center gap-1">
                                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full transition-all ${
                                              ratio >= 70 ? "bg-green-500" : ratio >= 40 ? "bg-amber-500" : ratio > 0 ? "bg-red-400" : "bg-slate-300 dark:bg-slate-600"
                                            }`}
                                            style={{ width: `${total > 0 ? ratio : 0}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-slate-500 w-10 text-right">{total > 0 ? `${ratio}%` : "-"}</span>
                                      </div>

                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                          <ArrowUpRight className="w-3 h-3" />
                                          <span className="font-medium">{agent.upvotes}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-red-400">
                                          <ArrowDownRight className="w-3 h-3" />
                                          <span className="font-medium">{agent.downvotes}</span>
                                        </div>
                                        <span className={`font-bold text-sm ${
                                          score >= 4 ? "text-green-600" : score >= 2.5 ? "text-amber-500" : score > 0 ? "text-red-500" : "text-slate-400"
                                        }`}>
                                          {score || "-"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Summary Card */}
                        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 backdrop-blur-md border-blue-100 dark:border-blue-900/30 shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <BarChart3 className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Analytics Summary</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  You have <span className="font-medium text-slate-900 dark:text-white">{myAgents.length}</span> agent{myAgents.length !== 1 ? "s" : ""} with a combined{" "}
                                  <span className="font-medium text-green-600">{totalUpvotes} upvote{totalUpvotes !== 1 ? "s" : ""}</span> and{" "}
                                  <span className="font-medium text-slate-900 dark:text-white">{avgScore || "no"}</span> average score.
                                  {timeframeAgents.length > 0 && (
                                    <> You submitted <span className="font-medium text-blue-600">{timeframeAgents.length}</span> new agent{timeframeAgents.length !== 1 ? "s" : ""} {timeframeLabels[analyticsTimeframe]}.</>
                                  )}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </TabsContent>

                  {/* Saved Agents Tab */}
                  <TabsContent value="saved" className="space-y-6">
                    <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg">
                      <CardHeader>
                        <CardTitle>Saved Collection</CardTitle>
                        <CardDescription>Agents you've bookmarked for later.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No saved agents yet</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                            When you bookmark agents you like, they'll show up here for easy access.
                          </p>
                          <Link href="/">
                            <Button variant="outline" className="mt-6">
                              Browse Agents
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                </Tabs>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
