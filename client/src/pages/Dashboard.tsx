import { useState } from "react";
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
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

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

// Mock Agents Data
const myAgents = [
  {
    id: 1,
    name: "CodeWizard Pro",
    category: "Development",
    status: "Approved",
    views: 12405,
    upvotes: 843,
    score: 4.9,
    submitted: "2 days ago",
  },
  {
    id: 2,
    name: "DataSense",
    category: "Analytics",
    status: "Pending",
    views: 0,
    upvotes: 0,
    score: 0,
    submitted: "Just now",
  },
  {
    id: 3,
    name: "CopyCraft AI",
    category: "Marketing",
    status: "Rejected",
    views: 45,
    upvotes: 2,
    score: 2.1,
    submitted: "1 week ago",
  },
];

// Mock Saved Agents
const savedAgents = [
  {
    id: 101,
    name: "LegalEagle",
    category: "Legal",
    rating: 4.8,
    reviews: 320,
  },
  {
    id: 102,
    name: "ResearchMate",
    category: "Research",
    rating: 4.9,
    reviews: 512,
  },
];

// Mock Chart Data
const engagementData = [
  { name: "Mon", views: 400, votes: 24 },
  { name: "Tue", views: 300, votes: 13 },
  { name: "Wed", views: 550, votes: 38 },
  { name: "Thu", views: 480, votes: 29 },
  { name: "Fri", views: 690, votes: 48 },
  { name: "Sat", views: 800, votes: 65 },
  { name: "Sun", views: 750, votes: 55 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("agents");
  const { user: authUser, signOut } = useAuth();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "Pending": return <Clock className="w-3 h-3 mr-1" />;
      case "Rejected": return <XCircle className="w-3 h-3 mr-1" />;
      default: return null;
    }
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
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Button>
                  </div>
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
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Views</span>
                            <Eye className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">12.5k</div>
                          <p className="text-xs text-green-500 flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12% from last week
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Upvotes</span>
                            <ThumbsUp className="w-4 h-4 text-amber-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">845</div>
                          <p className="text-xs text-green-500 flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" /> +5% from last week
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Score</span>
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">4.8</div>
                          <p className="text-xs text-slate-500 mt-1">
                            Based on 3 active agents
                          </p>
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
                        <div className="space-y-4">
                          {myAgents.map((agent) => (
                            <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors gap-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                                  {agent.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {agent.name}
                                    <Badge variant="outline" className={`${getStatusColor(agent.status)} border-none`}>
                                      {getStatusIcon(agent.status)}
                                      {agent.status}
                                    </Badge>
                                  </h4>
                                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    <span>{agent.category}</span>
                                    <span>•</span>
                                    <span>Submitted {agent.submitted}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold">{agent.views.toLocaleString()}</span>
                                    <span className="text-xs text-slate-400">Views</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold">{agent.upvotes}</span>
                                    <span className="text-xs text-slate-400">Upvotes</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-amber-500">{agent.score || "-"}</span>
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
                                    <DropdownMenuItem className="cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                                      <Edit className="w-4 h-4 mr-2" /> Edit Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                                      <Eye className="w-4 h-4 mr-2" /> View Public Page
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20">
                                      <Trash2 className="w-4 h-4 mr-2" /> Delete Agent
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Analytics Tab */}
                  <TabsContent value="analytics" className="space-y-6">
                    <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg">
                      <CardHeader>
                        <CardTitle>Engagement Overview</CardTitle>
                        <CardDescription>Views and votes over the last 7 days.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={engagementData}>
                              <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                              <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'currentColor', opacity: 0.5 }}
                                dy={10}
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'currentColor', opacity: 0.5 }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                  backdropFilter: 'blur(8px)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#0066FF"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorViews)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Saved Agents Tab */}
                  <TabsContent value="saved" className="space-y-6">
                    <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg">
                      <CardHeader>
                        <CardTitle>Saved Collection</CardTitle>
                        <CardDescription>Agents you've bookmarked for later.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {savedAgents.map((agent) => (
                            <div key={agent.id} className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all flex justify-between items-center group">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{agent.name}</h4>
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>{agent.category}</span>
                                    <span className="flex items-center text-amber-500">
                                      <TrendingUp className="w-3 h-3 mr-0.5" /> {agent.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          ))}
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
