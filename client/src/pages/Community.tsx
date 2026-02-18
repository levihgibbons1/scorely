import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageSquare, Rocket, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function Community() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container px-4 py-24 mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
          
          <div className="max-w-3xl space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20">
                <Users className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Community is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Coming Soon</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We're building a space for agent creators and users to connect, share ideas, and collaborate on the future of AI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
                <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors group">
                    <MessageSquare className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Discussions</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Engage in deep conversations about agent architecture and use cases.</p>
                </Card>
                <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors group">
                    <Rocket className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Showcase</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Share your latest builds and get feedback from top developers.</p>
                </Card>
                <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors group">
                    <Sparkles className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Events</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Participate in hackathons, workshops, and community meetups.</p>
                </Card>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 px-8 h-12 text-base" onClick={() => setLocation("/discover")}>
                    Explore Agents
                </Button>
                <Button variant="outline" size="lg" className="px-8 h-12 text-base bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    Notify Me
                </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
