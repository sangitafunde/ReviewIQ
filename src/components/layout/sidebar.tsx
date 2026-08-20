"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Store, 
  MessageSquare, 
  Lightbulb, 
  GitCompare, 
  FileText, 
  ShieldCheck, 
  Settings, 
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Businesses", href: "/search", icon: Store },
  { name: "Reviews", href: "/dashboard/b1/reviews", icon: MessageSquare },
  { name: "Insights", href: "/dashboard/b1", icon: Lightbulb },
  { name: "Compare", href: "/compare", icon: GitCompare },
  { name: "Reports", href: "/dashboard/b1", icon: FileText },
  { name: "Quality", href: "/quality", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{name: string, plan: string} | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = sessionStorage.getItem("reviewiq_user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    
    checkUser();
    window.addEventListener("auth-change", checkUser);
    return () => window.removeEventListener("auth-change", checkUser);
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("reviewiq_user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card px-4 py-6">
      <Link href="/" className="flex items-center gap-2 px-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl">
          R
        </div>
        <span className="text-xl font-bold tracking-tight">ReviewIQ</span>
      </Link>
      
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/dashboard" || pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto px-2">
        {user ? (
          <div className="rounded-lg bg-muted p-4 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-indigo-200 shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.plan} Active</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900 transition-colors"
            >
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        ) : (
          <Link href="/login">
            <div className="rounded-lg bg-muted p-4 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-transform hover:scale-110">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sign In</p>
                  <p className="text-xs text-muted-foreground">Manage your account</p>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
