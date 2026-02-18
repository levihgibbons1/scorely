import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Search, 
  TrendingUp, 
  LayoutGrid, 
  List as ListIcon,
  ThumbsUp, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Flame, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Code2,
  BarChart3,
  SearchX,
  MessageSquare,
  Zap,
  Globe,
  Check,
  X,
  SlidersHorizontal,
  ExternalLink,
  Share2,
  MoreHorizontal
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// --- Mock Data ---

const categories = [
  "All",
  "Development",
  "Coding",
  "Analytics",
  "Research",
  "Customer Service",
  "Marketing",
  "Productivity",
  "Other"
];

const mockAgents = [
  {
    id: 1,
    name: "CodeWizard Pro",
    description: "An advanced coding assistant specialized in React, TypeScript, and Python. It can debug complex issues, refactor legacy codebases, and generate boilerplate code instantly. CodeWizard Pro integrates directly with your IDE and offers real-time performance optimization suggestions.",
    category: "Development",
    score: 4.9,
    upvotes: 843,
    isVerified: true,
    createdAt: "2 days ago",
    featured: true,
    price: "Free",
    tags: ["React", "TypeScript", "Debugging", "Refactoring"]
  },
  {
    id: 2,
    name: "DataSense",
    description: "Turn messy CSVs and Excel sheets into actionable insights. DataSense visualizes data trends, detects anomalies, and generates executive summaries automatically. Perfect for business analysts who need quick, reliable data storytelling without writing SQL.",
    category: "Analytics",
    score: 4.7,
    upvotes: 520,
    isVerified: true,
    createdAt: "1 week ago",
    featured: true,
    price: "Paid",
    tags: ["Data Viz", "Analytics", "Business Intelligence"]
  },
  {
    id: 3,
    name: "CopyCraft AI",
    description: "A marketing copywriter that adapts to your unique brand voice. Great for writing high-converting emails, engaging landing pages, and viral social media posts. CopyCraft analyzes your past content to learn your tone and style.",
    category: "Marketing",
    score: 4.5,
    upvotes: 310,
    isVerified: false,
    createdAt: "3 days ago",
    featured: false,
    price: "Freemium",
    tags: ["Copywriting", "SEO", "Social Media"]
  },
  {
    id: 4,
    name: "LegalEagle",
    description: "Analyze contracts and legal documents for potential risks. Summarizes complex legal jargon into plain English. LegalEagle highlights clauses that might be unfavorable and suggests standard revisions based on current laws.",
    category: "Research",
    score: 4.8,
    upvotes: 615,
    isVerified: true,
    createdAt: "2 weeks ago",
    featured: true,
    price: "Paid",
    tags: ["Legal", "Contracts", "Analysis"]
  },
  {
    id: 5,
    name: "SupportBot 3000",
    description: "Automated customer support agent that handles Tier 1 queries and escalates complex issues seamlessly. Reduces response times by 80% and integrates with Zendesk, Intercom, and Freshdesk.",
    category: "Customer Service",
    score: 4.2,
    upvotes: 180,
    isVerified: false,
    createdAt: "1 day ago",
    featured: false,
    price: "Free",
    tags: ["Support", "Automation", "Chatbot"]
  },
  {
    id: 6,
    name: "TaskMaster",
    description: "Your personal productivity agent that organizes your calendar, emails, and todo lists based on priority. TaskMaster learns your work habits to suggest the best times for deep work and meetings.",
    category: "Productivity",
    score: 4.6,
    upvotes: 420,
    isVerified: true,
    createdAt: "5 days ago",
    featured: false,
    price: "Freemium",
    tags: ["Productivity", "Calendar", "Organization"]
  },
  {
    id: 7,
    name: "ResearchMate",
    description: "Scours the web for credible academic sources and generates literature reviews in seconds. ResearchMate connects to major academic databases to find peer-reviewed papers relevant to your thesis.",
    category: "Research",
    score: 4.9,
    upvotes: 890,
    isVerified: true,
    createdAt: "1 month ago",
    featured: true,
    price: "Paid",
    tags: ["Academic", "Research", "Citations"]
  },
  {
    id: 8,
    name: "SocialBuzz",
    description: "Generates viral social media hooks and schedules posts for optimal engagement times. Tracks trending topics in your niche and suggests content ideas that are likely to perform well.",
    category: "Marketing",
    score: 4.3,
    upvotes: 250,
    isVerified: false,
    createdAt: "2 days ago",
    featured: false,
    price: "Free",
    tags: ["Social Media", "Trends", "Viral"]
  },
  {
    id: 9,
    name: "BugHunter",
    description: "Scans your GitHub repositories for security vulnerabilities and suggests patches. BugHunter identifies common CVEs and offers automated pull requests to fix dependencies.",
    category: "Coding",
    score: 4.7,
    upvotes: 380,
    isVerified: true,
    createdAt: "3 weeks ago",
    featured: false,
    price: "Paid",
    tags: ["Security", "GitHub", "Vulnerabilities"]
  },
  {
    id: 10,
    name: "FinanceFlow",
    description: "Tracks expenses and predicts cash flow issues for small businesses. Connects to QuickBooks and Xero to provide real-time financial health dashboards and tax estimation.",
    category: "Analytics",
    score: 4.4,
    upvotes: 190,
    isVerified: false,
    createdAt: "4 days ago",
    featured: false,
    price: "Freemium",
    tags: ["Finance", "Accounting", "Business"]
  },
  {
    id: 11,
    name: "EmailNinja",
    description: "Drafts perfect email responses and cleans up your inbox zero style. EmailNinja categorizes incoming mail, drafts quick replies, and unsubscribes from newsletters you never read.",
    category: "Productivity",
    score: 4.8,
    upvotes: 720,
    isVerified: true,
    createdAt: "1 week ago",
    featured: false,
    price: "Free",
    tags: ["Email", "Productivity", "Writing"]
  },
  {
    id: 12,
    name: "DesignGen",
    description: "Generates UI layouts and color palettes based on text descriptions. Export designs directly to Figma or React code. Perfect for rapid prototyping and exploring design directions.",
    category: "Other",
    score: 4.1,
    upvotes: 150,
    isVerified: false,
    createdAt: "2 days ago",
    featured: false,
    price: "Paid",
    tags: ["Design", "UI/UX", "Figma"]
  }
];

// --- Helper Functions ---

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Development": return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
    case "Coding": return "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300";
    case "Analytics": return "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
    case "Research": return "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300";
    case "Customer Service": return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300";
    case "Marketing": return "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300";
    case "Productivity": return "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
    default: return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
};

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

// --- Components ---

const AgentCard = ({ agent }: { agent: any }) => {
  const [, setLocation] = useLocation();
  
  return (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="h-full"
    onClick={() => setLocation(`/agents/${agent.id}`)}
  >
    <Card className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/40 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all overflow-hidden flex flex-col group cursor-pointer">
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold bg-gradient-to-br ${getCategoryGradient(agent.category)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {agent.name.charAt(0)}
          </div>
          {agent.isVerified && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-full text-blue-600 dark:text-blue-400" title="Verified">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 truncate group-hover:text-primary transition-colors">{agent.name}</h3>
        
        <div className="mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(agent.category)}`}>
            {agent.category}
          </span>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {agent.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{agent.score}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs">{agent.price}</span>
          </div>
          
          <Button size="sm" variant="ghost" className="h-8 px-2 text-primary hover:bg-primary/5 hover:text-primary -mr-2">
            View <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
  );
};

const AgentFeedCard = ({ agent }: { agent: any }) => {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className="w-full"
    >
        <Card 
        className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/40 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all overflow-hidden cursor-pointer group"
        onClick={() => setLocation(`/agents/${agent.id}`)}
      >
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* Left: Icon & Score */}
          <div className="shrink-0 flex sm:flex-col items-center gap-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br ${getCategoryGradient(agent.category)} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              {agent.name.charAt(0)}
            </div>
          </div>

          {/* Middle: Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{agent.name}</h3>
              {agent.isVerified && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-1 rounded-full text-blue-600 dark:text-blue-400" title="Verified">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-auto sm:ml-0 ${getCategoryColor(agent.category)}`}>
                {agent.category}
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base line-clamp-2 sm:line-clamp-2">
              {agent.description}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {agent.tags?.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Actions & Stats */}
          <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-white/5 pt-4 sm:pt-0 mt-2 sm:mt-0 justify-between sm:justify-start">
              <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded-lg self-start sm:self-end">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{agent.score}</span>
            </div>
            
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {agent.upvotes}
            </div>

            <Button size="sm" className="w-full sm:w-auto mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors shadow-lg shadow-slate-900/10">
              View Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const filteredAgents = useMemo(() => {
    return mockAgents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory;
      const matchesVerified = !verifiedOnly || agent.isVerified;
      const matchesPrice = priceFilter.length === 0 || priceFilter.includes(agent.price);
      
      return matchesSearch && matchesCategory && matchesVerified && matchesPrice;
    });
  }, [searchQuery, selectedCategory, verifiedOnly, priceFilter]);

  const trendingAgents = useMemo(() => mockAgents.filter(a => a.featured).slice(0, 3), []);
  const isFiltering = searchQuery || verifiedOnly || priceFilter.length > 0;

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container px-4 py-24 mx-auto space-y-12">
          
          {/* Hero Search Section */}
          <section className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI Teammate</span>
              </h1>
              
              <div className="relative max-w-2xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    placeholder="Search agents..." 
                    className="pl-12 h-12 text-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-lg rounded-xl focus:ring-2 focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
                      <SlidersHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem 
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    >
                      Verified Only
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Pricing</DropdownMenuLabel>
                    {["Free", "Freemium", "Paid"].map((price) => (
                      <DropdownMenuCheckboxItem
                        key={price}
                        checked={priceFilter.includes(price)}
                        onCheckedChange={(checked) => {
                          if (checked) setPriceFilter([...priceFilter, price]);
                          else setPriceFilter(priceFilter.filter(p => p !== price));
                        }}
                      >
                        {price}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Pills - Wrapped and Visible */}
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-5 h-9 text-sm transition-all border ${
                      selectedCategory === category 
                        ? "bg-primary text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 border-transparent" 
                        : "bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Featured / Trending Section (Only show when not searching/filtering) */}
          {!isFiltering && selectedCategory === "All" && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trending This Week</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </section>
          )}

          {/* Main List Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <ListIcon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCategory === "All" ? "All Agents" : `${selectedCategory} Agents`}
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-2 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {filteredAgents.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2 bg-white/50 dark:bg-slate-900/50">
                      <Filter className="w-4 h-4" /> Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem 
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    >
                      Verified Only
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Pricing</DropdownMenuLabel>
                    {["Free", "Freemium", "Paid"].map((price) => (
                      <DropdownMenuCheckboxItem
                        key={price}
                        checked={priceFilter.includes(price)}
                        onCheckedChange={(checked) => {
                          if (checked) setPriceFilter([...priceFilter, price]);
                          else setPriceFilter(priceFilter.filter(p => p !== price));
                        }}
                      >
                        {price}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] h-9 bg-white/50 dark:bg-slate-900/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Unified Feed Layout */}
            <motion.div 
              layout
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredAgents.length > 0 ? (
                  filteredAgents.map((agent) => (
                    <AgentFeedCard key={agent.id} agent={agent} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                      <SearchX className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No agents found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">
                      Try adjusting your filters or search term.
                    </p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-primary"
                      onClick={() => {
                        setSearchQuery("");
                        setVerifiedOnly(false);
                        setPriceFilter([]);
                        setSelectedCategory("All");
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Missing icons mock
function Megaphone(props: any) { return <Sparkles {...props} /> }
function Laptop(props: any) { return <Code2 {...props} /> }
