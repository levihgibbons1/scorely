import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Check,
  Loader2,
  Github,
  Globe,
  Code2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCreateAgent } from "@/lib/api";
import { CATEGORIES } from "@shared/schema";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  category: z.enum(CATEGORIES, {
    required_error: "Please select a category",
  }),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  mcpEndpoint: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export default function Submit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createAgent = useCreateAgent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubUrl: "",
      mcpEndpoint: "",
    },
    mode: "onChange",
  });

  const watchedValues = form.watch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createAgent.mutateAsync({
        name: values.name,
        description: values.description,
        category: values.category,
        github_url: values.githubUrl || "",
        mcp_endpoint: values.mcpEndpoint || "",
      });
      toast({
        title: "Agent Submitted Successfully!",
        description: "Your agent has been added to the review queue.",
        duration: 5000,
      });
      setLocation("/");
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container px-4 py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    List Your Agent
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Share your AI agent with the community. Get discovered by thousands of developers and businesses.
                  </p>
                </div>

                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle>Agent Details</CardTitle>
                    <CardDescription>
                      Provide the core information about your agent.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Agent Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. CodeWizard Pro"
                                  className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl z-50">
                                  {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category} className="cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Description</FormLabel>
                                <span className={`text-xs ${field.value?.length > 500 ? "text-red-500" : "text-slate-400"}`}>
                                  {field.value?.length || 0}/500
                                </span>
                              </div>
                              <FormControl>
                                <Textarea
                                  placeholder="What does your agent do? What problems does it solve?"
                                  className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20 min-h-[120px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <FormField
                            control={form.control}
                            name="githubUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GitHub URL <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Github className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                      placeholder="https://github.com/..."
                                      className="pl-9 bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20"
                                      {...field}
                                    />
                                    {field.value && !form.getFieldState("githubUrl").invalid && (
                                      <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mcpEndpoint"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>MCP Endpoint <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Code2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                      placeholder="https://api.example.com/..."
                                      className="pl-9 bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-primary/20"
                                      {...field}
                                    />
                                    {field.value && !form.getFieldState("mcpEndpoint").invalid && (
                                      <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="pt-6">
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            disabled={createAgent.isPending}
                          >
                            {createAgent.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Agent"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column: Preview & Benefits */}
            <div className="lg:col-span-5 space-y-8">

              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live Preview</h3>
                </div>

                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 overflow-hidden shadow-lg">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400" />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {watchedValues.category || "Category"}
                      </Badge>
                      <div className="bg-slate-100 dark:bg-slate-800 text-slate-400 p-1.5 rounded-full" title="Verification Pending">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white truncate">
                      {watchedValues.name || "Agent Name"}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span className="font-medium text-amber-500">New</span>
                      <span>•</span>
                      <span>0 reviews</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {watchedValues.description || "Your agent description will appear here. Make it catchy and descriptive to attract users!"}
                    </p>

                    <div className="flex gap-2 mt-4">
                      {watchedValues.githubUrl && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          <Github className="h-3 w-3" /> GitHub
                        </div>
                      )}
                      {watchedValues.mcpEndpoint && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          <Code2 className="h-3 w-3" /> MCP
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Why Submit Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Why submit to Scorely?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-primary">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Global Visibility</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Get discovered by thousands of potential users and companies.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-primary">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Trust & Verification</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Verified agents get 3x more engagement on average.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-primary">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Performance Analytics</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Track how users interact with your agent listings.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
