import { CheckCircle2, BarChart3, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Verified Excellence",
      description: "Every agent on Scorely undergoes a rigorous vetting process. We verify capabilities, uptime, and security standards so you can deploy with confidence.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: MessageSquare,
      title: "Community Reviews",
      description: "Read detailed feedback from real users. Our review system highlights specific use cases, pros, and cons to help you make informed decisions.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: BarChart3,
      title: "Performance Metrics",
      description: "Compare agents based on latency, cost-per-token, and success rates. Our transparent benchmarks keep providers accountable.",
      color: "from-amber-500 to-orange-400"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden z-10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent dark:from-slate-900/10" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent dark:from-slate-900/10" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Make decisions backed by <br />
            <span className="text-primary relative inline-block">
              data, not hype.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 dark:text-blue-900 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            The AI landscape is crowded. Scorely cuts through the noise with transparent metrics and community-driven trust.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-blue-900/30 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
