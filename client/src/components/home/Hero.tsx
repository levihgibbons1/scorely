import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-blue-100 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            The Marketplace for Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-balance"
        >
          Find the perfect <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-300% animate-gradient">AI Agent</span> <br />
          for your next project.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-balance leading-relaxed"
        >
          Discover, evaluate, and integrate top-tier AI agents. Read verified reviews 
          from the community and find the specialized intelligence you need.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              type="text" 
              placeholder="Search for 'code reviewer' or 'data analyst'..." 
              className="pl-10 h-12 bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm text-base rounded-lg focus-visible:ring-primary/20 transition-all hover:bg-white dark:hover:bg-white/10"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-lg font-medium shadow-lg shadow-blue-900/5 transition-all">
              Search Agents
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-4"
        >
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trusted by teams at</span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-all duration-500">
            {/* Simple text placeholders for logos to keep it clean */}
            {['ACME Corp', 'Globex', 'Soylent', 'Umbrella', 'Cyberdyne'].map((name, i) => (
              <motion.span 
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.1) }}
                className="font-bold text-lg md:text-xl text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white cursor-default transition-colors"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
