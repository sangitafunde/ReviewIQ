"use client";

import { use } from "react";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businesses } from "@/lib/data/businesses";
import { insights } from "@/lib/data/insights";

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const business = businesses.find(b => b.id === id);
  const insight = insights[id];

  if (!business || !insight) return <div>Data not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-slate-900 min-h-screen">
      <div className="print:hidden flex justify-between mb-8">
        <Link href={`/dashboard/${id}`}>
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
        </Link>
        <Button onClick={() => window.print()} className="bg-indigo-600 text-white hover:bg-indigo-700">
          <Printer className="mr-2 h-4 w-4" /> Print Report
        </Button>
      </div>

      {/* Report Content */}
      <div className="space-y-8 border-2 border-slate-200 p-10 rounded-lg">
        <div className="text-center border-b pb-8">
          <h1 className="text-4xl font-bold text-indigo-900">{business.name}</h1>
          <p className="text-lg text-slate-500 mt-2">Customer Review Intelligence Report</p>
          <p className="text-sm text-slate-400 mt-1">{business.location} • Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded">
            <p className="text-sm text-slate-500 uppercase tracking-wide">Overall Rating</p>
            <p className="text-3xl font-bold">{business.rating} / 5</p>
          </div>
          <div className="p-4 bg-slate-50 rounded">
            <p className="text-sm text-slate-500 uppercase tracking-wide">Total Reviews</p>
            <p className="text-3xl font-bold">{business.totalReviews}</p>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <p className="text-sm text-green-700 uppercase tracking-wide">Positive Sentiment</p>
            <p className="text-3xl font-bold text-green-700">{insight.sentimentDistribution.positive}%</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Executive Summary</h2>
          <p className="text-lg leading-relaxed">{insight.executiveSummary}</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700">Top Strengths</h2>
            <ul className="space-y-3">
              {insight.topStrengths.map(s => (
                <li key={s.topic} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{s.topic}</span>
                  <span className="text-slate-500 text-sm">{s.mentionCount} mentions</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-700">Top Complaints</h2>
            <ul className="space-y-3">
              {insight.topWeaknesses.map(w => (
                <li key={w.topic} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{w.topic}</span>
                  <span className="text-slate-500 text-sm">{w.mentionCount} complaints</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Actionable Recommendations</h2>
          <div className="space-y-4">
            {insight.recommendations.map((rec, i) => (
              <div key={rec.id} className="p-4 border rounded bg-slate-50">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{i + 1}. {rec.title}</h3>
                  <span className="text-sm font-bold text-slate-500">{rec.impact} Impact</span>
                </div>
                <p className="mt-2 text-slate-600"><span className="font-semibold text-slate-800">Observation:</span> {rec.evidence}</p>
                <p className="mt-1 text-slate-600"><span className="font-semibold text-slate-800">Action:</span> {rec.action}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center pt-8 border-t text-sm text-slate-400">
          Powered by ReviewIQ AI Platform
        </div>
      </div>
    </div>
  );
}
