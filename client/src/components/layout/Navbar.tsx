import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Agents", href: "/#agents" },
    { name: "Features", href: "/#features" },
    { name: "Submit", href: "/submit" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            Scorely
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/submit">
            <Button className="bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              Submit Agent
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) =>
                  link.href.startsWith("/#") ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-slate-900 dark:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-slate-900 dark:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                )}
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                <Link href="/submit" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Submit Agent</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
