import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-slate-50 dark:bg-slate-950">
      {/* Interactive Gradient Orb following mouse */}
      <div 
        className="fixed w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[100px] transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
        }}
      />

      <div className="fixed inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vh] bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vh] bg-yellow-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vh] bg-pink-300 dark:bg-cyan-900/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Grid overlay for structure */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
