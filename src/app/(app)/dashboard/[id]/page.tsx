"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Minus, 
  Sparkles, 
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  Quote
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { businesses } from "@/lib/data/businesses";
import { insights } from "@/lib/data/insights";
import { reviews } from "@/lib/data/reviews";
import { SentimentDonutChart } from "@/components/dashboard/sentiment-chart";
import { RatingDistribution } from "@/components/dashboard/rating-distribution";

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [businessReviews, setBusinessReviews] = useState<any[]>([]);
  const [insight, setInsight] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === "custom") {
      const storedReviews = sessionStorage.getItem("reviewiq_current_dataset");
      const storedInsights = sessionStorage.getItem("reviewiq_current_insights");
      
      if (storedReviews && storedInsights) {
        setBusinessReviews(JSON.parse(storedReviews));
        
        const parsedAI = JSON.parse(storedInsights);
        setInsight({
          executiveSummary: parsedAI.summary,
          sentimentDistribution: {
            positive: parsedAI.sentiment.positive_percentage,
            neutral: parsedAI.sentiment.neutral_percentage,
            negative: parsedAI.sentiment.negative_percentage,
          },
          topStrengths: parsedAI.positive_themes.map((t: any) => ({
            topic: t.theme,
            mentionCount: t.mention_count,
            description: t.description,
          })),
          topWeaknesses: parsedAI.negative_themes.map((t: any) => ({
            topic: t.theme,
            mentionCount: t.mention_count,
            description: t.description,
          })),
          quotes: parsedAI.representative_quotes
        });
      }
      setIsLoading(false);
    } else {
      // Fallback for demo static routes
      const b = businesses.find(b => b.id === id);
      if (b) {
        setBusinessReviews(reviews.filter(r => r.businessId === id));
        setInsight(insights[id]); // Note: old structure didn't have quotes, so it will break quotes below unless handled
      }
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center animate-pulse">Loading dashboard...</div>;
  }

  if (!insight) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Data Not Found</h2>
        <p className="text-muted-foreground">The requested analysis data could not be found.</p>
        <Link href="/analyze" className={buttonVariants()}>
          Start New Analysis
        </Link>
      </div>
    );
  }

  const avgRating = businessReviews.length > 0 
    ? (businessReviews.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / businessReviews.length).toFixed(1)
    : "0.0";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header Info */}
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Review Insights</h1>
          <div className="flex items-center text-muted-foreground mt-1 gap-2">
            <span>Based on {businessReviews.length} provided reviews</span>
          </div>
        </div>
          <div className="flex gap-2">
            <Link href={`/analyze`} className={buttonVariants({ variant: "outline" })}>
              Analyze Again
            </Link>
            <Link href={`/dashboard/${id}/reviews`} className={cn(buttonVariants(), "bg-indigo-600 hover:bg-indigo-700")}>
              Explore Reviews
            </Link>
          </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-slate-50 dark:bg-slate-900 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgRating} <span className="text-lg text-muted-foreground font-normal">/ 5</span></div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-50 dark:bg-slate-900 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Analyzed</CardTitle>
            <MessageCircle className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{businessReviews.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50/50 dark:bg-green-900/10 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Positive</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">{insight.sentimentDistribution.positive}%</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-50 dark:bg-slate-900 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Neutral</CardTitle>
            <Minus className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">{insight.sentimentDistribution.neutral}%</div>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 dark:bg-red-900/10 shadow-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">Negative</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700 dark:text-red-400">{insight.sentimentDistribution.negative}%</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Summary */}
      <motion.div variants={item}>
        <Card className="border-indigo-100 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-900/10 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-700 dark:text-indigo-400 text-xl">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base md:text-lg leading-relaxed">{insight.executiveSummary}</p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2" />
            Evidence-based summary • Generated directly from the {businessReviews.length} provided reviews.
          </div>
        </CardContent>
      </Card>
      </motion.div>

      <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
        {/* Charts Row */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>How Customers Feel</CardTitle>
            <CardDescription>Sentiment distribution across the dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <SentimentDonutChart data={insight.sentimentDistribution} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of star ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <RatingDistribution reviews={businessReviews} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Topics Analysis */}
      <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-t-4 border-t-green-500">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              What Customers Love ❤️
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {insight.topStrengths?.length > 0 ? insight.topStrengths.map((topic: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">{topic.topic}</div>
                  <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{topic.mentionCount} mentions</span>
                </div>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            )) : (
              <p className="text-muted-foreground italic">Not enough positive themes detected.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-t-4 border-t-red-500">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              Areas To Improve ⚠️
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {insight.topWeaknesses?.length > 0 ? insight.topWeaknesses.map((topic: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">{topic.topic}</div>
                  <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{topic.mentionCount} mentions</span>
                </div>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            )) : (
              <p className="text-muted-foreground italic">No clear negative themes identified in the data.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quotes Section */}
      {insight.quotes && insight.quotes.length > 0 && (
        <motion.div variants={item} className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">What Customers Are Saying</h2>
          <p className="text-muted-foreground mb-4">Representative quotes verified from the provided review data.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insight.quotes.map((q: any, i: number) => (
              <Card key={i} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="flex text-amber-500 mb-3">
                    {Array.from({ length: q.rating || 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <div className="relative flex-1">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-slate-200 dark:text-slate-800 -z-10 transform -scale-x-100" />
                    <p className="text-sm font-medium italic relative z-10">"{q.quote}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                    <span className={`font-bold ${q.sentiment === 'Positive' ? 'text-green-600' : q.sentiment === 'Negative' ? 'text-red-600' : 'text-slate-600'}`}>
                      {q.sentiment}
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded font-medium">
                      {q.theme}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
