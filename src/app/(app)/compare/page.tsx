"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Star, TrendingUp } from "lucide-react";
import { businesses } from "@/lib/data/businesses";
import { insights } from "@/lib/data/insights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ComparePage() {
  // Hardcoded for demo mode. In a real app, this would be a selection UI.
  const b1 = businesses[0];
  const b2 = businesses[1];
  
  const i1 = insights[b1.id];
  const i2 = insights[b2.id];

  const categories = [
    { name: "Overall Health", key: "overall" as const },
    { name: "Food Quality", key: "food" as const },
    { name: "Service Speed", key: "service" as const },
    { name: "Staff Friendliness", key: "staff" as const },
    { name: "Value for Money", key: "value" as const },
    { name: "Ambience", key: "ambience" as const },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2 text-center items-center">
        <h1 className="text-3xl font-bold tracking-tight">Compare Businesses</h1>
        <p className="text-muted-foreground max-w-lg">
          Benchmark performance metrics and AI sentiment analysis across multiple locations or competitors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative max-w-5xl mx-auto">
        <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 h-12 w-12 rounded-full bg-background border shadow-sm items-center justify-center z-10 text-muted-foreground">
          <ArrowLeftRight className="h-5 w-5" />
        </div>

        {/* Business 1 */}
        <Card className="relative overflow-hidden border-indigo-100 shadow-md">
          <div className="h-2 bg-indigo-500 w-full" />
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{b1.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{b1.category} • {b1.location}</p>
            <div className="flex justify-center items-center mt-2 gap-1 font-bold text-lg">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              {b1.rating}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-700 dark:text-indigo-300">
              <span className="font-medium">Positive Sentiment</span>
              <span className="font-bold text-lg">{i1.sentimentDistribution.positive}%</span>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Health Scores</h4>
              {categories.map(cat => (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{cat.name}</span>
                    <span className="font-medium">{i1.healthScore[cat.key]}/100</span>
                  </div>
                  <Progress value={i1.healthScore[cat.key]} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business 2 */}
        <Card className="relative overflow-hidden border-slate-200 shadow-md">
          <div className="h-2 bg-slate-500 w-full" />
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{b2.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{b2.category} • {b2.location}</p>
            <div className="flex justify-center items-center mt-2 gap-1 font-bold text-lg">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              {b2.rating}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
              <span className="font-medium">Positive Sentiment</span>
              <span className="font-bold text-lg">{i2.sentimentDistribution.positive}%</span>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Health Scores</h4>
              {categories.map(cat => (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{cat.name}</span>
                    <span className="font-medium">{i2.healthScore[cat.key]}/100</span>
                  </div>
                  <Progress value={i2.healthScore[cat.key]} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8 pb-8">
        <Link 
          href="/search"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-transform hover:scale-105"
        >
          Change Businesses
        </Link>
      </div>
    </div>
  );
}
