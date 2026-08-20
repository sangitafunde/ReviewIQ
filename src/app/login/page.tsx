"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    const supabase = createClient();

    try {
      if (isSignUp) {
        // Handle Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        // Supabase might require email confirmation, but let's assume auto-login if disabled
        setSuccessMsg("Account created! Logging you in...");
        
        // Extract name to save in session like before for UI compatibility
        const namePart = email.split("@")[0].replace(/[0-9]/g, '');
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1) || "User";
        
        sessionStorage.setItem("reviewiq_user", JSON.stringify({
          name: formattedName,
          email: email,
          plan: "Free Plan",
          joined: new Date().toLocaleDateString()
        }));
        window.dispatchEvent(new Event("auth-change"));

        setTimeout(() => {
          router.push("/profile");
        }, 1000);

      } else {
        // Handle Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Save session for UI components
        const namePart = email.split("@")[0].replace(/[0-9]/g, '');
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1) || "User";
        
        sessionStorage.setItem("reviewiq_user", JSON.stringify({
          name: formattedName,
          email: email,
          plan: "Pro Plan",
          joined: new Date().toLocaleDateString()
        }));
        window.dispatchEvent(new Event("auth-change"));

        router.push("/profile");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Unique Feature: Animated Glowing Blobs Background for Attractiveness */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-400/20 dark:bg-indigo-600/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
        />
      </div>

      <div className="w-full max-w-md p-4 relative z-10">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "mb-6 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50 shadow-2xl">
            <CardHeader className="space-y-3 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 150 }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {isSignUp ? "Create an account" : "Welcome back"}
              </CardTitle>
              <CardDescription>
                {isSignUp ? "Sign up to start unlocking insights" : "Enter your credentials to access your insights"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAuth}>
                
                {errorMsg && (
                  <div className="p-3 text-sm bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>{errorMsg}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="p-3 text-sm bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
                    {successMsg}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <Input 
                      placeholder="name@company.com" 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-950/50 focus-visible:ring-indigo-500 transition-shadow" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <Input 
                      placeholder="••••••••" 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-950/50 focus-visible:ring-indigo-500 transition-shadow" 
                    />
                  </div>
                  {!isSignUp && (
                    <div className="flex justify-end">
                      <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md transition-transform hover:scale-[1.02] active:scale-95" 
                  size="lg"
                >
                  {isSubmitting ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
                </Button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 rounded-full">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full bg-white/50 dark:bg-slate-950/50 hover:bg-slate-100 transition-colors">
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full bg-white/50 dark:bg-slate-950/50 hover:bg-slate-100 transition-colors">
                    Github
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-slate-500">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button 
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)} 
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      {isSignUp ? "Sign In" : "Sign up for free"}
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
