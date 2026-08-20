"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AnalyzeProgressPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const steps = [
    "Reading reviews",
    "Detecting sentiment",
    "Finding recurring themes",
    "Selecting representative quotes",
    "Preparing final insights"
  ];

  useEffect(() => {
    let isMounted = true;
    
    // Simulate progression for the UI feeling
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    const performAnalysis = async () => {
      try {
        const source = sessionStorage.getItem("reviewiq_analysis_source");
        let reviewsToAnalyze = [];

        if (source === "public") {
          // Fetch the bundled dataset
          const res = await fetch("/data/reviews.json");
          reviewsToAnalyze = await res.json();
        } else if (source === "pasted") {
          const stored = sessionStorage.getItem("reviewiq_pasted_data");
          if (stored) reviewsToAnalyze = JSON.parse(stored);
        }

        if (!reviewsToAnalyze || reviewsToAnalyze.length === 0) {
          throw new Error("No reviews found to analyze.");
        }

        // Call our backend API route
        const apiRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviews: reviewsToAnalyze })
        });

        if (!apiRes.ok) {
          throw new Error("Analysis failed. Please try again.");
        }

        const data = await apiRes.json();
        
        // Save the result for the dashboard
        sessionStorage.setItem("reviewiq_current_dataset", JSON.stringify(reviewsToAnalyze));
        sessionStorage.setItem("reviewiq_current_insights", JSON.stringify(data.insights));
        
        // Redirect to dashboard
        if (isMounted) {
          clearInterval(interval);
          setStep(steps.length);
          setTimeout(() => {
            router.push("/dashboard/custom");
          }, 500);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An unexpected error occurred");
          clearInterval(interval);
        }
      }
    };

    performAnalysis();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [router, steps.length]);

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">We couldn't analyze these reviews.</h2>
            <p className="text-slate-500">{error}</p>
            <p className="text-sm text-slate-400">Please try again. Your reviews have not been lost.</p>
            <button 
              onClick={() => router.push("/analyze")}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-md w-full"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Analyzing customer feedback...</h2>
          <p className="text-muted-foreground text-sm">Our AI is processing the dataset to extract key insights.</p>
        </div>

        <Card className="border-indigo-100 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {steps.map((s, i) => {
              const isCompleted = i < step;
              const isCurrent = i === step;
              const isPending = i > step;

              return (
                <div key={i} className={`flex items-center gap-4 ${isPending ? "opacity-40" : "opacity-100"} transition-opacity duration-300`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                  <span className={`font-medium ${isCurrent ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
