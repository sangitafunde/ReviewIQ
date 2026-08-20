"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, CreditCard, Calendar, BarChart3, Settings, ShieldCheck, LogOut, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [user, setUser] = useState<{name: string, email: string, plan: string, joined: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("reviewiq_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setEditName(parsed.name);
      setEditEmail(parsed.email);
    }
  }, []);

  const handleSave = () => {
    if (!user) return;
    const updated = { ...user, name: editName, email: editEmail };
    sessionStorage.setItem("reviewiq_user", JSON.stringify(updated));
    window.dispatchEvent(new Event("auth-change"));
    setUser(updated);
    setIsEditing(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-800 mb-4" />
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row gap-6 items-center md:items-start p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <Avatar className="h-24 w-24 border-4 border-white/20 shadow-xl">
          <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback className="bg-indigo-700 text-2xl">{initial}</AvatarFallback>
        </Avatar>
        
        {isEditing ? (
          <div className="text-center md:text-left z-10 flex-1 space-y-3 w-full md:w-auto">
            <Input 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50 w-full max-w-sm h-10 font-bold text-lg" 
              placeholder="Your Name"
            />
            <Input 
              value={editEmail} 
              onChange={(e) => setEditEmail(e.target.value)} 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50 w-full max-w-sm h-10" 
              placeholder="Email Address"
            />
            <div className="flex flex-col md:flex-row gap-4 text-indigo-100 pt-1">
              <Badge className="bg-white/20 text-white border-none shadow-sm w-max self-center md:self-start">
                {user.plan} Active
              </Badge>
              <span className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Calendar className="h-4 w-4" /> Joined {user.joined}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center md:text-left z-10 flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{user.name}</h1>
            <div className="flex flex-col md:flex-row gap-4 text-indigo-100 mb-4">
              <span className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" /> {user.email}
              </span>
              <span className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="h-4 w-4" /> Joined {user.joined}
              </span>
            </div>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none shadow-sm">
              {user.plan} Active
            </Badge>
          </div>
        )}

        <div className="z-10 flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto mt-4 md:mt-0">
          {isEditing ? (
            <>
              <Button onClick={handleSave} variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-50 font-medium">
                <Check className="h-4 w-4 mr-2" /> Save Profile
              </Button>
              <Button onClick={() => { setIsEditing(false); setEditName(user.name); setEditEmail(user.email); }} variant="ghost" className="text-white hover:bg-white/20 font-medium border border-white/30 hover:text-white">
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-50 font-medium">
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-indigo-500" />
              Total Analyses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this week</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">94%</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent standing</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-orange-500" />
              Credits Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">450<span className="text-lg text-muted-foreground font-normal">/1000</span></div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-orange-500 h-full w-[45%]" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your preferences and subscription details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium">Pro Plan Subscription</h4>
                  <p className="text-sm text-muted-foreground">Next billing date: Oct 1, 2026</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                  <Settings className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <h4 className="font-medium">Email Preferences</h4>
                  <p className="text-sm text-muted-foreground">Weekly digests and alerts</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="flex justify-center pt-6">
        <Button variant="destructive" className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </motion.div>

    </motion.div>
  );
}
