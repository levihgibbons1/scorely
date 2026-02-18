import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Filter, 
  ArrowRight,
  Quote
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Review Data
const mockReviews = [
  {
    id: 1,
    agentId: 1,
    agentName: "CodeWizard Pro",
    agentCategory: "Development",
    user: {
      name: "Sarah Chen",
      handle: "@sarahc_dev",
      avatar: "https://github.com/shadcn.png"
    },
    rating: 5,
    date: "2 hours ago",
    content: "Absolutely mind-blowing. I used to spend hours debugging race conditions in my React apps. CodeWizard Pro found the issue in seconds and suggested a fix that actually followed best practices. Worth every penny.",
    likes: 24,
    replies: 2
  },
  {
    id: 2,
    agentId: 2,
    agentName: "DataSense",
    agentCategory: "Analytics",
    user: {
      name: "Marcus Johnson",
      handle: "@mj_analytics",
      avatar: "https://github.com/shadcn.png" // placeholder
    },
    rating: 4,
    date: "5 hours ago",
    content: "Great for quick visualizations, but it struggles a bit with extremely large datasets (1M+ rows). For everyday reporting though, it's a game changer. The CSV import is seamless.",
    likes: 12,
    replies: 0
  },
  {
    id: 3,
    agentId: 3,
    agentName: "CopyCraft AI",
    agentCategory: "Marketing",
    user: {
      name: "Elena Rodriguez",
      handle: "@elena_writes",
      avatar: "https://github.com/shadcn.png" // placeholder
    },
    rating: 5,
    date: "1 day ago",
    content: "Finally, an AI writer that doesn't sound like a robot! It captured our brand voice perfectly after just analyzing three of our blog posts. The SEO suggestions are also spot on.",
    likes: 45,
    replies: 5
  },
  {
    id: 4,
    agentId: 6,
    agentName: "TaskMaster",
    agentCategory: "Productivity",
    user: {
      name: "David Kim",
      handle: "@dkim_prod",
      avatar: "https://github.com/shadcn.png" // placeholder
    },
    rating: 3,
    date: "2 days ago",
    content: "It's okay, but the calendar integration is a bit buggy with Outlook. Works great with Google Calendar though. hopefully they fix the sync issues soon.",
    likes: 8,
    replies: 1
  },
  {
    id: 5,
    agentId: 1,
    agentName: "CodeWizard Pro",
    agentCategory: "Development",
    user: {
      name: "Alex Rivera",
      handle: "@arivera",
      avatar: "https://github.com/shadcn.png" // placeholder
    },
    rating: 5,
    date: "3 days ago",
    content: "This agent just taught me how to use generics properly in TypeScript. It's not just a code generator, it's a tutor. Highly recommend for junior devs looking to level up.",
    likes: 32,
    replies: 3
  }
];

const ReviewCard = ({ review }: { review: any }) => {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/40 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-white/20">
                <AvatarImage src={review.user.avatar} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{review.user.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{review.user.handle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">{review.rating}.0</span>
            </div>
          </div>

          <div className="mb-4">
             <div className="flex items-center gap-2 mb-3 cursor-pointer group" onClick={() => setLocation(`/agents/${review.agentId}`)}>
                <span className="text-sm text-slate-500 dark:text-slate-400">Reviewed</span>
                <span className="text-sm font-bold text-primary group-hover:underline flex items-center gap-1">
                    {review.agentName}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <Badge variant="outline" className="text-[10px] h-5">{review.agentCategory}</Badge>
             </div>
             
             <div className="relative">
                <Quote className="w-8 h-8 text-slate-200 dark:text-slate-800 absolute -top-2 -left-2 -z-10" />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    "{review.content}"
                </p>
             </div>
          </div>

          <Separator className="bg-slate-100 dark:bg-slate-800 mb-4" />

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{review.date}</span>
            <div className="flex gap-4">
                <button className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> {review.likes} Helpful
                </button>
                <button className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" /> {review.replies} Replies
                </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container px-4 py-24 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    Community Reviews
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    See what the community is saying about the latest AI agents.
                </p>
            </div>
            
            <div className="flex items-center gap-2">
                <Select defaultValue="latest">
                    <SelectTrigger className="w-[180px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
                        <Filter className="w-4 h-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest Reviews</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          <div className="space-y-6">
            {mockReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
            
            <div className="text-center pt-8">
                <Button variant="outline" size="lg" className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md min-w-[200px]">
                    Load More Reviews
                </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
