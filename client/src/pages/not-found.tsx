import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8">
            <h1 className="text-[8rem] md:text-[12rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800 dark:to-transparent opacity-80 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-6 py-2 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
                    Page Not Found
                </span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mb-8 leading-relaxed">
            Oops! It looks like you've ventured into uncharted territory. The agent you're looking for might have gone rogue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button size="lg" className="gap-2 bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                <Home className="w-4 h-4" /> Return Home
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
