import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Scale, UserCheck, FileText, AlertTriangle, Gavel, Mail } from "lucide-react";

export default function TermsOfService() {
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
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 text-primary">
                <Scale className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
                Terms of Service
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
                      Welcome to Scorely. By accessing or using our platform at <span className="text-primary font-medium">scorely.com</span> ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
                    </p>

                    <Separator className="my-8" />

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-primary">
                          <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">1. About Scorely</h2>
                      </div>
                      <p>
                        Scorely is a community-driven marketplace for discovering, reviewing, and listing AI agents. Users can browse agent listings, submit their own AI agents, and participate in community voting.
                      </p>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">2. Eligibility</h2>
                      <p>
                        You must be at least <strong>13 years old</strong> to use Scorely. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.
                      </p>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-primary">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">3. User Accounts</h2>
                      </div>
                      <p>
                        Scorely may offer optional account creation through third-party authentication providers (such as Google). By creating an account, you agree to provide accurate information and to keep your login credentials secure. You are responsible for all activity that occurs under your account.
                      </p>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">4. Agent Submissions</h2>
                      <p>When you submit an AI agent listing to Scorely, you agree that:</p>
                      <ul className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 list-none space-y-3 pl-0">
                        <li className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>All information provided (agent name, description, category, URLs) is accurate and not misleading.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>You have the right to list the agent and share any associated links (GitHub repositories, API endpoints).</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Your submission does not infringe on the intellectual property rights of any third party.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Your submission does not contain or link to malicious software, malware, or harmful content.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Scorely reserves the right to review, approve, reject, or remove any submission at its sole discretion.</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-sm text-slate-500">Submitted agent listings may be displayed publicly on the platform.</p>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">5. Community Voting and Reviews</h2>
                      <p>Users may upvote or downvote agent listings. By participating in the voting system, you agree to:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Vote honestly and in good faith.</li>
                        <li>Not manipulate votes through automated means, multiple accounts, or coordinated activity.</li>
                        <li>Not engage in vote brigading or targeted harassment of any listing.</li>
                      </ul>
                      <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
                        <strong>Note:</strong> Scorely reserves the right to reset votes or take action against accounts that violate these guidelines.
                      </div>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">6. Prohibited Conduct</h2>
                      </div>
                      <p>You agree not to:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "Use the Service for any unlawful purpose.",
                          "Submit false, misleading, or spam agent listings.",
                          "Attempt to interfere with, compromise, or disrupt the Service.",
                          "Scrape, crawl, or harvest data without permission.",
                          "Impersonate another person or entity.",
                          "Use automated tools or bots (unless disclosed).",
                          "Circumvent any content moderation or security measures."
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-sm">
                            <span className="text-red-500 font-bold">✕</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">7. Intellectual Property</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold mb-2">Scorely's Content</h3>
                          <p className="text-sm">The Scorely name, logo, website design, and original content are the property of Scorely Inc. You may not copy, modify, or distribute these without written permission.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">User-Generated Content</h3>
                          <p className="text-sm">By submitting an agent listing, you grant Scorely a non-exclusive, worldwide, royalty-free license to display, distribute, and promote your listing on the platform. You retain ownership of your original content. You may request removal of your listing at any time.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">Third-Party Links</h3>
                          <p className="text-sm">Agent listings may include links to external websites (GitHub, API endpoints). Scorely does not control and is not responsible for the content, availability, or practices of any linked third-party sites.</p>
                        </div>
                      </div>
                    </section>

                    <section className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl m-0">8. Disclaimers</h2>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <p className="font-bold mb-4 text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">
                          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                        </p>
                        <p className="mb-2">Scorely does not guarantee that:</p>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                          <li>Any listed agent will perform as described.</li>
                          <li>Agent ratings or reviews are accurate or unbiased.</li>
                          <li>The Service will be available without interruption.</li>
                          <li>Listed agents are free from security vulnerabilities or defects.</li>
                        </ul>
                        <p className="text-sm font-medium">
                          You use any listed AI agent at your own risk. Scorely is a directory and discovery platform — we do not develop, operate, or maintain the AI agents listed by our users.
                        </p>
                      </div>
                    </section>

                    <section className="mb-10">
                      <h2 className="text-2xl mb-4">9. Limitation of Liability</h2>
                      <p className="uppercase text-sm font-bold text-slate-500 mb-4">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCORELY INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO DAMAGES FROM ANY AI AGENT DISCOVERED THROUGH THE PLATFORM.
                      </p>
                      <p>Our total liability for any claim arising from the Service shall not exceed $100 USD.</p>
                    </section>

                    <Separator className="my-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section>
                        <h2 className="text-xl mb-3">10. Indemnification</h2>
                        <p className="text-sm">You agree to indemnify and hold harmless Scorely Inc. and its officers, employees, and agents from any claims, losses, or damages (including legal fees) arising from your use of the Service, your submissions, or your violation of these Terms.</p>
                      </section>

                      <section>
                        <h2 className="text-xl mb-3">11. Modifications</h2>
                        <p className="text-sm">We may update these Terms at any time. We will notify users of material changes by updating the "Last updated" date. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
                      </section>

                      <section>
                        <h2 className="text-xl mb-3">12. Termination</h2>
                        <p className="text-sm">We reserve the right to suspend or terminate your access to the Service at any time, for any reason, without notice. Upon termination, your right to use the Service ceases immediately.</p>
                      </section>

                      <section>
                        <h2 className="text-xl mb-3">13. Governing Law</h2>
                        <p className="text-sm">These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.</p>
                      </section>
                    </div>

                    <Separator className="my-8" />

                    <section className="flex flex-col items-center justify-center text-center p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2 m-0">Contact Us</h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        If you have questions about these Terms, please contact us.
                      </p>
                      <a 
                        href="mailto:support@scorely.com" 
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors no-underline"
                      >
                        support@scorely.com
                      </a>
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
