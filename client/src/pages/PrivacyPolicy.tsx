import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, Eye, Share2, Server, Globe, Mail, Cookie } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="container px-4 py-24 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4 text-green-600 dark:text-green-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Last updated: <span className="font-semibold text-slate-900 dark:text-white">February 18, 2026</span>
              </p>
            </div>

            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <ScrollArea className="h-[70vh] w-full p-8 md:p-12">
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-blue-600">
                    <p className="lead text-xl text-slate-600 dark:text-slate-300">
                      Scorely Inc. ("Scorely," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at <span className="text-primary font-medium">scorely.com</span> ("Service").
                    </p>

                    <Separator className="my-8" />

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-primary">
                          <Eye className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">1. Information We Collect</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0 mb-3">Information You Provide</h4>
                          <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Agent Submissions:</strong> Agent name, description, category, GitHub URL, and MCP endpoint URL. This information is publicly displayed.</li>
                            <li><strong>Account Information:</strong> Name, email address, and profile picture from Google OAuth.</li>
                            <li><strong>Votes:</strong> Your upvote and downvote activity.</li>
                          </ul>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0 mb-3">Information Collected Automatically</h4>
                          <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Log Data:</strong> IP address, browser type, device type, operating system, pages visited, timestamps.</li>
                            <li><strong>Hosting Analytics:</strong> Basic performance and traffic analytics via Vercel.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-4 rounded-lg">
                        <h4 className="text-green-800 dark:text-green-300 font-bold mt-0 mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" /> Information We Do NOT Collect
                        </h4>
                        <ul className="list-disc pl-5 m-0 text-sm text-green-800 dark:text-green-300/80">
                          <li>Payment or financial information (Scorely is free to use).</li>
                          <li>Location data beyond what is inferred from IP addresses.</li>
                          <li>Contacts, photos, or files from your device.</li>
                        </ul>
                      </div>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">2. How We Use Your Information</h2>
                      <p>We use the information we collect to:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 list-none">
                        {[
                          "Display agent listings and community votes",
                          "Operate, maintain, and improve the Service",
                          "Authenticate users who create accounts",
                          "Detect and prevent abuse or fraud",
                          "Respond to user inquiries and support requests",
                          "Generate aggregated, anonymized usage statistics"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-primary font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-medium mt-4">We do not sell your personal information to third parties.</p>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                          <Share2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">3. How We Share Your Information</h2>
                      </div>
                      <p>We may share your information in the following circumstances:</p>
                      <ul className="space-y-4 list-none pl-0">
                        <li className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg">
                          <strong>Publicly Displayed Content:</strong> Agent submissions (name, description, category, URLs) and vote counts are publicly visible to all users.
                        </li>
                        <li className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg">
                          <strong>Service Providers:</strong> We use third-party services to operate the platform:
                          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                            <li><strong>Supabase</strong> — Database hosting and authentication.</li>
                            <li><strong>Vercel</strong> — Website hosting and serverless function execution.</li>
                            <li><strong>Google</strong> — Authentication provider for account sign-in.</li>
                          </ul>
                        </li>
                        <li className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg">
                          <strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental request.
                        </li>
                      </ul>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                          <Lock className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">4. Data Storage and Security</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <p>Your data is stored in Supabase's cloud infrastructure (PostgreSQL database hosted on AWS).</p>
                          <p>We use industry-standard security measures including HTTPS encryption for all data in transit.</p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 text-sm">
                          <p className="font-bold text-amber-800 dark:text-amber-200 mb-2">Security Disclaimer</p>
                          <p className="text-amber-900/80 dark:text-amber-200/80 m-0">While we take reasonable steps to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
                        </div>
                      </div>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400">
                          <Server className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">5. Data Retention</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                          <strong className="block text-primary mb-1">Agent Listings</strong>
                          <span className="text-sm">Retained as long as active. Can be removed anytime.</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                          <strong className="block text-primary mb-1">Account Data</strong>
                          <span className="text-sm">Retained as long as active. Deleted with account deletion.</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                          <strong className="block text-primary mb-1">Vote Data</strong>
                          <span className="text-sm">Retained as aggregate counts. Individual records periodically purged.</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                          <strong className="block text-primary mb-1">Log Data</strong>
                          <span className="text-sm">Automatically collected logs retained for up to 90 days.</span>
                        </div>
                      </div>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">6. Your Rights and Choices</h2>
                      <p>Depending on your jurisdiction, you may have the right to:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["Access", "Correct", "Delete", "Export", "Opt Out"].map((right) => (
                          <span key={right} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                            {right}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm mb-6">To exercise any of these rights, contact us at support@scorely.com. We will respond within 30 days.</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-bold mb-2">California Residents (CCPA)</h4>
                          <p className="text-sm">You have the right to know what personal information we collect, request its deletion, and opt out of its sale. We do not sell personal information.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-2">European Residents (GDPR)</h4>
                          <p className="text-sm">Our legal basis for processing is: (a) consent, (b) contract performance, and (c) legitimate interests. You may withdraw consent at any time.</p>
                        </div>
                      </div>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                          <Cookie className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">7. Cookies and Tracking</h2>
                      </div>
                      <p>Scorely currently uses minimal cookies:</p>
                      <ul className="list-disc pl-5 mb-4">
                        <li><strong>Essential Cookies:</strong> Session cookies necessary for the Service to function (authentication state).</li>
                        <li><strong>No Third-Party Tracking:</strong> We do not use advertising cookies, social media trackers, or third-party analytics cookies.</li>
                      </ul>
                      <p className="text-sm text-slate-500">You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the Service.</p>
                    </section>

                    <Separator className="my-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section>
                        <h2 className="text-xl mb-3">8. Children's Privacy</h2>
                        <p className="text-sm">Scorely is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>
                      </section>

                      <section>
                        <div className="flex items-center gap-2 mb-3">
                          <Globe className="w-5 h-5 text-slate-400" />
                          <h2 className="text-xl m-0">9. International Transfers</h2>
                        </div>
                        <p className="text-sm">Scorely is based in the United States. Your information may be transferred to and processed in the United States.</p>
                      </section>

                      <section className="md:col-span-2">
                        <h2 className="text-xl mb-3">10. Changes to This Policy</h2>
                        <p className="text-sm">We may update this Privacy Policy from time to time. We will notify users of material changes by updating the "Last updated" date at the top of this page.</p>
                      </section>
                    </div>

                    <Separator className="my-8" />

                    <section className="flex flex-col items-center justify-center text-center p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2 m-0">Contact Us</h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        If you have questions or concerns about this Privacy Policy, please contact us.
                      </p>
                      <a 
                        href="mailto:support@scorely.com" 
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors no-underline"
                      >
                        support@scorely.com
                      </a>
                      <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">Scorely Inc.</p>
                    </section>

                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
