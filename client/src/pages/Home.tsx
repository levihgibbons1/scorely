import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AgentSearch from "@/components/home/AgentSearch";
import Features from "@/components/home/Features";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <AgentSearch />
          <div id="features">
            <Features />
          </div>

          {/* CTA Section */}
          <section className="py-24 bg-slate-900 dark:bg-blue-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Ready to find your AI workforce?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
                Join thousands of developers and businesses building the future
                with the best AI agents available today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/discover">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-primary hover:bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                  >
                    Start Exploring Now
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg border-white/20 hover:bg-white/10 text-white"
                  >
                    List Your Agent
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
          <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white">
                Scorely
              </span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>
            <div className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Scorely Inc.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
