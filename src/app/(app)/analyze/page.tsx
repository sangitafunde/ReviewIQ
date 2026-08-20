"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, Upload, Database, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function AnalyzePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"public" | "paste">("public");
  const [pastedReviews, setPastedReviews] = useState("");
  const [error, setError] = useState("");

  const handleAnalyzePublic = async () => {
    // In a real app, this would fetch the public JSON and send to API.
    // For demo flow, we can directly route to progress screen which will handle it.
    sessionStorage.setItem("reviewiq_analysis_source", "public");
    router.push("/analyze/progress");
  };

  const handleAnalyzePasted = () => {
    const reviews = pastedReviews.split("\n").filter(r => r.trim().length > 10);
    if (reviews.length < 3) {
      setError("Please provide at least 3 valid reviews for a meaningful analysis.");
      return;
    }
    
    // Format into standard schema
    const formattedReviews = reviews.map((text, i) => ({
      id: `pasted_${i}`,
      review: text,
      rating: 5, // Default for pasted if not provided inline
      date: new Date().toISOString().split('T')[0]
    }));

    sessionStorage.setItem("reviewiq_analysis_source", "pasted");
    sessionStorage.setItem("reviewiq_pasted_data", JSON.stringify(formattedReviews));
    router.push("/analyze/progress");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-indigo-900 dark:text-indigo-400">Analyze Customer Reviews</h1>
        <p className="text-lg text-muted-foreground">Select a dataset or paste your own reviews to generate insights.</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          variant={activeTab === "public" ? "default" : "outline"} 
          className={activeTab === "public" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          onClick={() => { setActiveTab("public"); setError(""); }}
          size="lg"
        >
          <Database className="mr-2 h-4 w-4" />
          Public Dataset
        </Button>
        <Button 
          variant={activeTab === "paste" ? "default" : "outline"} 
          className={activeTab === "paste" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          onClick={() => { setActiveTab("paste"); setError(""); }}
          size="lg"
        >
          <FileText className="mr-2 h-4 w-4" />
          Paste Reviews
        </Button>
      </div>

      {activeTab === "public" ? (
        <Card className="border-indigo-100 shadow-md">
          <CardHeader>
            <CardTitle>Restaurant Reviews Dataset</CardTitle>
            <CardDescription>Explore our bundled public review dataset containing realistic feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100">
              <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm text-center">
                <span className="block text-2xl font-bold text-indigo-600">60</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Total Reviews</span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm text-center">
                <span className="flex items-center justify-center text-2xl font-bold text-amber-500">
                  <Star className="h-5 w-5 fill-amber-500 mr-1" /> 3.9
                </span>
                <span className="text-xs text-muted-foreground uppercase font-semibold">Average Rating</span>
              </div>
              <div className="text-sm text-muted-foreground flex-1">
                This dataset contains reviews covering food quality, service, and atmosphere from a popular local dining spot.
              </div>
            </div>

            <Button onClick={handleAnalyzePublic} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6 shadow-md hover:shadow-lg transition-all">
              <Sparkles className="mr-2 h-5 w-5" />
              Load Demo Reviews
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-indigo-100 shadow-md">
          <CardHeader>
            <CardTitle>Paste Custom Reviews</CardTitle>
            <CardDescription>Paste 10–20 customer reviews below (one per line) for the best results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Example:&#10;The food was excellent and the staff were extremely friendly.&#10;The waiting time was too long but the pizza was decent.&#10;Terrible service, will not be coming back."
              className="min-h-[250px] resize-y p-4 text-base bg-slate-50 dark:bg-slate-900/50"
              value={pastedReviews}
              onChange={(e) => { setPastedReviews(e.target.value); setError(""); }}
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <Button onClick={handleAnalyzePasted} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6 shadow-md hover:shadow-lg transition-all">
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze with AI
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
