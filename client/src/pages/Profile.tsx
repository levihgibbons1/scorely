import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  Calendar, 
  Settings, 
  LogOut,
  Heart,
  Grid,
  List,
  MessageSquare,
  Trophy,
  Activity,
  User as UserIcon
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

// Reuse AgentCard component logic or import it (mocking it here for self-containment)
const AgentCard = ({ agent }: { agent: any }) => {
  const [, setLocation] = useLocation();
  return (
    <Card 
      className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/40 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all overflow-hidden cursor-pointer group"
      onClick={() => setLocation(`/agents/${agent.id}`)}
    >
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">
            {agent.name.charAt(0)}
          </div>
          <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal text-xs">
            {agent.category}
          </Badge>
        </div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 truncate group-hover:text-primary transition-colors">{agent.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {agent.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
           <span>{agent.upvotes} upvotes</span>
           <span>{agent.price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Profile() {
  const [, setLocation] = useLocation();

  // Mock User Data
  const user = {
    name: "Alex Designer",
    handle: "@alexdesign",
    bio: "Product Designer & AI Enthusiast. Building tools to help creators work faster.",
    location: "San Francisco, CA",
    website: "alex.design",
    joined: "January 2024",
    avatar: "https://github.com/shadcn.png", // using shadcn avatar as placeholder
    stats: {
      submissions: 12,
      favorites: 45,
      reputation: 890
    }
  };

  // Mock Submissions
  const submissions = [
    { id: 1, name: "DesignGen", category: "Other", description: "Generates UI layouts and color palettes.", upvotes: 150, price: "Paid" },
    { id: 2, name: "CopyCraft AI", category: "Marketing", description: "Marketing copywriter that adapts to your brand.", upvotes: 310, price: "Freemium" },
    { id: 12, name: "ColorPal", category: "Design", description: "AI color palette generator.", upvotes: 85, price: "Free" },
  ];

  // Mock Favorites
  const favorites = [
    { id: 5, name: "SupportBot 3000", category: "Customer Service", description: "Automated customer support agent.", upvotes: 180, price: "Free" },
    { id: 6, name: "TaskMaster", category: "Productivity", description: "Personal productivity agent.", upvotes: 420, price: "Freemium" },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container px-4 py-24 mx-auto max-w-5xl">
          
          {/* Profile Header */}
          <div className="mb-12">
            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/20 dark:border-white/10 overflow-hidden">
              {/* Cover Photo */}
              <div className="h-48 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-90 relative">
                <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md" onClick={() => setLocation("/settings")}>
                        <Settings className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 -mt-12 items-start">
                    {/* Avatar */}
                    <div className="shrink-0 relative">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl rounded-full">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900" title="Online" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-14 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">{user.handle}</p>
                            </div>
                            <div className="flex gap-3">
                                <Button className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                    Follow
                                </Button>
                                <Button variant="outline">
                                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                                </Button>
                            </div>
                        </div>

                        <p className="text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                            {user.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> {user.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <LinkIcon className="w-4 h-4" /> 
                                <a href="#" className="hover:text-primary transition-colors">{user.website}</a>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Joined {user.joined}
                            </div>
                            <div className="flex items-center gap-3 ml-auto md:ml-0">
                                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-slate-200 dark:bg-slate-800" />

                {/* Stats */}
                <div className="flex gap-8 md:gap-16">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{user.stats.submissions}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Agents</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{user.stats.favorites}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Favorites</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{user.stats.reputation}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Reputation</span>
                    </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="submissions" className="space-y-8">
            <TabsList className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 p-1 rounded-xl h-auto">
                <TabsTrigger value="submissions" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Grid className="w-4 h-4 mr-2" /> Submissions
                </TabsTrigger>
                <TabsTrigger value="favorites" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Heart className="w-4 h-4 mr-2" /> Favorites
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Activity className="w-4 h-4 mr-2" /> Activity
                </TabsTrigger>
            </TabsList>

            <TabsContent value="submissions" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map(agent => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                    {/* Add New Card Placeholder */}
                    <Card className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border-dashed border-2 border-slate-300 dark:border-slate-700 shadow-none hover:border-primary/50 hover:bg-white/50 dark:hover:bg-slate-900/50 transition-all cursor-pointer flex items-center justify-center min-h-[200px]" onClick={() => setLocation("/submit")}>
                        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <span className="text-2xl font-light">+</span>
                            </div>
                            <span className="font-medium">Submit New Agent</span>
                        </div>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(agent => (
                         <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="activity">
                 <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/40 dark:border-white/5 p-8 text-center text-slate-500 dark:text-slate-400">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No recent activity to show.</p>
                 </Card>
            </TabsContent>
          </Tabs>

        </main>
      </div>
    </div>
  );
}
