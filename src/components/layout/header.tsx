"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Menu, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    { id: 1, title: "Analysis Complete", desc: "Your report for Mumbai Masala Cafe is ready.", time: "10m ago", icon: Sparkles, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/50" },
    { id: 2, title: "New Reviews Detected", desc: "45 new reviews found for your tracked businesses.", time: "2h ago", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/50" },
    { id: 3, title: "System Update", desc: "AI models have been upgraded for better theme detection.", time: "1d ago", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/50" }
  ];

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search businesses..."
            className="w-full appearance-none bg-background pl-8 shadow-none focus-visible:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-background">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-transparent hover:underline" onClick={handleMarkAllRead}>
                Mark all read
              </Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="p-4 cursor-pointer border-b border-slate-50 dark:border-slate-800/50 last:border-0 focus:bg-slate-50 dark:focus:bg-slate-800/50 rounded-none items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-full ${notif.bg}`}>
                    <notif.icon className={`h-4 w-4 ${notif.color}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium leading-none">{notif.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{notif.desc}</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-1">{notif.time}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs hover:bg-slate-200 dark:hover:bg-slate-800">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/profile" className="hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8 transition-transform hover:scale-105 border border-slate-200 dark:border-slate-700">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=DemoUser" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
