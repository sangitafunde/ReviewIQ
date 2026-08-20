"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { businesses } from "@/lib/data/businesses";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first business in the demo data by default
    if (businesses.length > 0) {
      router.push(`/dashboard/${businesses[0].id}`);
    } else {
      router.push("/search");
    }
  }, [router]);

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
    </div>
  );
}
