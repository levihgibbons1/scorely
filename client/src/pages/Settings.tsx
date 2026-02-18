import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  User,
  Settings as SettingsIcon,
  LogOut,
  Palette,
  Trash2,
  Save,
  Moon,
  Sun,
  Laptop,
  AlertTriangle,
  ArrowLeft,
  Check,
  X,
  Loader2
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const { user: authUser, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Derive user info from auth state
  const userEmail = authUser?.email || "";
  const userAvatar = authUser?.user_metadata?.avatar_url || "";
  const userName = authUser?.user_metadata?.full_name || authUser?.email?.split("@")[0] || "User";
  const userBio = authUser?.user_metadata?.bio || "";
  const userUsername = authUser?.user_metadata?.username || authUser?.email?.split("@")[0] || "";
  const memberSince = authUser?.created_at
    ? new Date(authUser.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Unknown";

  const [name, setName] = useState(userName);
  const [username, setUsername] = useState(userUsername);
  const [description, setDescription] = useState(userBio);
  const [theme, setTheme] = useState("system");
  const [isSaving, setIsSaving] = useState(false);

  // Username availability & lockout state
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [usernameChanged, setUsernameChanged] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 30-day lockout check
  const usernameLastChanged = authUser?.user_metadata?.username_changed_at || null;
  const usernameLockedUntil = usernameLastChanged
    ? new Date(new Date(usernameLastChanged).getTime() + 30 * 24 * 60 * 60 * 1000)
    : null;
  const isUsernameLocked = usernameLockedUntil ? new Date() < usernameLockedUntil : false;
  const daysUntilUnlock = usernameLockedUntil
    ? Math.max(0, Math.ceil((usernameLockedUntil.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Check username availability with debounce
  const checkUsernameAvailability = useCallback(async (value: string) => {
    if (!value || value === userUsername) {
      setUsernameStatus("idle");
      setUsernameChanged(false);
      return;
    }

    // Basic validation: lowercase, alphanumeric, hyphens, underscores
    if (!/^[a-z0-9_-]+$/.test(value)) {
      setUsernameStatus("taken");
      return;
    }

    setUsernameStatus("checking");

    try {
      // Check if username is taken by querying all users via a profiles lookup
      // Since we store username in user_metadata, we check via the agents table owner or a direct RPC
      // For now, use a simple approach: query Supabase auth users isn't possible client-side,
      // so we'll use a public profiles table or just check user_metadata
      // Simplified: check against a "profiles" table if it exists, otherwise mark as available
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", value)
        .neq("id", authUser?.id || "")
        .limit(1);

      if (error) {
        // If profiles table doesn't exist yet, just show as available
        setUsernameStatus("available");
        return;
      }

      setUsernameStatus(data && data.length > 0 ? "taken" : "available");
    } catch {
      // On error, don't block the user
      setUsernameStatus("available");
    }
  }, [userUsername, authUser?.id]);

  const handleUsernameChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    setUsername(sanitized);
    setUsernameChanged(sanitized !== userUsername);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!sanitized || sanitized === userUsername) {
      setUsernameStatus("idle");
      setUsernameChanged(false);
      return;
    }

    setUsernameStatus("checking");
    debounceRef.current = setTimeout(() => {
      checkUsernameAvailability(sanitized);
    }, 500);
  };

  // Sync state when auth user loads/changes
  useEffect(() => {
    if (authUser) {
      setName(authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "User");
      setUsername(authUser.user_metadata?.username || authUser.email?.split("@")[0] || "");
      setDescription(authUser.user_metadata?.bio || "");
      setUsernameStatus("idle");
      setUsernameChanged(false);
    }
  }, [authUser]);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  const handleSaveProfile = async () => {
    // Block save if username was changed but is taken
    if (usernameChanged && usernameStatus === "taken") {
      toast({
        title: "Username unavailable",
        description: "Please choose a different username before saving.",
        variant: "destructive",
      });
      return;
    }

    // Block save if username is locked and was changed
    if (usernameChanged && isUsernameLocked) {
      toast({
        title: "Username locked",
        description: `You can change your username again in ${daysUntilUnlock} day${daysUntilUnlock !== 1 ? "s" : ""}.`,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const updateData: Record<string, any> = {
        full_name: name,
        bio: description,
      };

      // Only update username + timestamp if it actually changed
      if (usernameChanged && username !== userUsername) {
        updateData.username = username;
        updateData.username_changed_at = new Date().toISOString();
      }

      const { error } = await supabase.auth.updateUser({
        data: updateData,
      });

      if (error) throw error;

      setUsernameChanged(false);
      setUsernameStatus("idle");

      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else if (value === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    toast({
      title: "Theme updated",
      description: `Appearance set to ${value}.`,
    });
  };

  const handleDeleteAccount = async () => {
    // TODO: Account deletion requires Supabase Admin API (service_role key) —
    // implement via a serverless function that calls supabase.auth.admin.deleteUser(userId)
    toast({
      title: "Contact support",
      description: "Account deletion is currently handled by our support team. Please reach out to us.",
      variant: "destructive",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container px-4 py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <CardContent className="pt-0 relative">
                    <div className="flex justify-center -mt-12 mb-4">
                      <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-900 shadow-md">
                        <AvatarImage src={userAvatar} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-primary">
                        Developer
                      </div>
                    </div>

                    <nav className="space-y-1">
                      <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-white/50 dark:hover:bg-white/5">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                      </Link>
                      <Separator className="my-2 bg-slate-200/50 dark:bg-white/5" />
                      <Button variant="ghost" className="w-full justify-start text-primary bg-blue-50 dark:bg-blue-900/20 font-medium">
                        <SettingsIcon className="w-4 h-4 mr-2" /> Settings
                      </Button>
                    </nav>
                  </CardContent>
                  <CardFooter className="border-t border-slate-200/50 dark:border-white/5 p-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                  <p className="text-slate-600 dark:text-slate-400">Manage your profile, preferences, and account settings.</p>
                </div>

                {/* Profile Section */}
                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your public profile details.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="w-24 h-24 border-2 border-slate-200 dark:border-slate-700">
                          <AvatarImage src={userAvatar} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Display Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/50 dark:bg-slate-950/50"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="description">Bio / Description</Label>
                          <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us a little about yourself..."
                            className="bg-white/50 dark:bg-slate-950/50 min-h-[100px]"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            value={userEmail}
                            disabled
                            className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Email cannot be changed as it is linked to your authentication provider.
                          </p>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => handleUsernameChange(e.target.value)}
                              disabled={isUsernameLocked}
                              className={`bg-white/50 dark:bg-slate-950/50 pr-10 ${
                                isUsernameLocked ? "bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed" : ""
                              } ${
                                usernameChanged && usernameStatus === "available"
                                  ? "border-green-400 focus-visible:ring-green-400/20"
                                  : usernameChanged && usernameStatus === "taken"
                                  ? "border-red-400 focus-visible:ring-red-400/20"
                                  : ""
                              }`}
                            />
                            {usernameChanged && usernameStatus === "checking" && (
                              <Loader2 className="absolute right-3 top-3 h-4 w-4 text-slate-400 animate-spin" />
                            )}
                            {usernameChanged && usernameStatus === "available" && (
                              <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                            )}
                            {usernameChanged && usernameStatus === "taken" && (
                              <X className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                            )}
                          </div>
                          {usernameChanged && usernameStatus === "available" && (
                            <p className="text-xs text-green-600 dark:text-green-400">
                              Username is available!
                            </p>
                          )}
                          {usernameChanged && usernameStatus === "taken" && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                              Username is already taken. Try another one.
                            </p>
                          )}
                          {isUsernameLocked ? (
                            <p className="text-xs text-amber-600 dark:text-amber-400">
                              Username is locked. You can change it again in {daysUntilUnlock} day{daysUntilUnlock !== 1 ? "s" : ""}.
                            </p>
                          ) : (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Lowercase letters, numbers, hyphens, and underscores only. Can only be changed every 30 days.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-200/50 dark:border-white/5 px-6 py-4 flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                      {isSaving ? "Saving..." : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Appearance Section */}
                <Card className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how Scorely looks on your device.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue={theme}
                      onValueChange={handleThemeChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                        >
                          <Sun className="mb-3 h-6 w-6 text-amber-500" />
                          <div className="text-center">
                            <span className="font-semibold block mb-1">Light</span>
                            <span className="text-xs text-muted-foreground font-normal">Bright and clear</span>
                          </div>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                        >
                          <Moon className="mb-3 h-6 w-6 text-blue-500" />
                          <div className="text-center">
                            <span className="font-semibold block mb-1">Dark</span>
                            <span className="text-xs text-muted-foreground font-normal">Easy on the eyes</span>
                          </div>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                        <Label
                          htmlFor="system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                        >
                          <Laptop className="mb-3 h-6 w-6 text-slate-500" />
                          <div className="text-center">
                            <span className="font-semibold block mb-1">System</span>
                            <span className="text-xs text-muted-foreground font-normal">Follows your device</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="bg-red-50/50 dark:bg-red-950/10 backdrop-blur-md border-red-200 dark:border-red-900/30 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-red-700 dark:text-red-400">Danger Zone</CardTitle>
                        <CardDescription className="text-red-600/80 dark:text-red-400/70">Irreversible account actions.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-medium text-slate-900 dark:text-white">Delete Account</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                          Permanently delete your account and all of your submitted agents. This action cannot be undone.
                        </p>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers, including all your submitted AI agents.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                              Yes, delete my account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>

              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
