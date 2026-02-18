import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ArrowUpRight, Zap, Shield, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const TRENDING_AGENTS = [
  {
    id: "1",
    name: "CodePilot",
    category: "Development",
    description:
      "AI-powered code review and refactoring assistant. Analyzes pull requests, suggests improvements, and catches bugs before they reach production.",
    score: 4.8,
    upvotes: 1243,
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    id: "2",
    name: "DataSense",
    category: "Analytics",
    description:
      "Turn raw data into actionable insights. Connects to your databases, generates reports, and surfaces trends with natural language queries.",
    score: 4.6,
    upvotes: 987,
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    id: "3",
    name: "ContentForge",
    category: "Marketing",
    description:
      "End-to-end content creation agent. Drafts blog posts, social media copy, and email campaigns tailored to your brand voice and audience.",
    score: 4.5,
    upvotes: 862,
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
} as const;

export default function AgentSearch() {
  return (
    <section id="agents" className="py-24 relative z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Trending Agents
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              Explore the highest-rated AI agents this week, vetted by the
              community for performance and reliability.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="gap-2 hover:bg-white hover:text-primary transition-all"
            >
              View All Agents <ArrowUpRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Agent cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TRENDING_AGENTS.map((agent) => (
            <motion.div key={agent.id} variants={item}>
              <Card className="group h-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className={agent.badgeColor}>
                      {agent.category}
                    </Badge>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-1.5 rounded-full cursor-help"
                      title="Verified Agent"
                    >
                      <Shield className="w-3 h-3 fill-current" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {agent.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{agent.score.toFixed(1)}</span>
                    <span className="text-slate-400 dark:text-slate-600 font-normal ml-1">
                      ({agent.upvotes.toLocaleString()} upvotes)
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {agent.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-slate-200 transition-colors group/btn">
                    View Details
                    <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Zap, label: "Productivity", color: "text-amber-500" },
            {
              icon: Users,
              label: "HR & Recruiting",
              color: "text-blue-500",
            },
            {
              icon: Shield,
              label: "Legal & Compliance",
              color: "text-indigo-500",
            },
            {
              icon: Sparkles,
              label: "Creative & Design",
              color: "text-purple-500",
            },
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-white/50 dark:bg-slate-800/50 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}
              >
                <cat.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-900 dark:text-white">
                {cat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Seamless transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}
