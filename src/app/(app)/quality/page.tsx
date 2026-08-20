"use client";

import { CheckCircle2, XCircle, AlertCircle, PlayCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function QualityPage() {
  const testCases = [
    { id: "TC-01", name: "Search valid business", status: "passed", category: "Functional" },
    { id: "TC-02", name: "Search empty input", status: "passed", category: "Negative" },
    { id: "TC-03", name: "Search unknown business", status: "passed", category: "Functional" },
    { id: "TC-04", name: "Analyze reviews layout", status: "passed", category: "UI" },
    { id: "TC-05", name: "Filter positive reviews", status: "passed", category: "Functional" },
    { id: "TC-06", name: "AI Insight fallback handling", status: "passed", category: "Negative" },
    { id: "TC-07", name: "Compare businesses logic", status: "passed", category: "Functional" },
    { id: "TC-08", name: "Dark mode toggle", status: "failed", category: "UI" },
    { id: "TC-09", name: "Mobile responsive sidebar", status: "passed", category: "UI" },
    { id: "TC-10", name: "API Timeout handling", status: "failed", category: "Negative" },
  ];

  const total = testCases.length;
  const passed = testCases.filter(t => t.status === "passed").length;
  const failed = testCases.filter(t => t.status === "failed").length;
  const coverage = 85;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">QA & Testing</h1>
        <p className="text-muted-foreground">
          Demo dashboard for quality assurance tracking.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{coverage}%</div>
            <Progress value={coverage} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Test Execution</CardTitle>
          <CardDescription>Automated test suite run on current build</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testCases.map((tc) => (
              <div key={tc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {tc.status === "passed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <span className="font-medium">{tc.id}:</span> {tc.name}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{tc.category}</Badge>
                  <span className={tc.status === "passed" ? "text-green-600 text-sm font-medium" : "text-red-600 text-sm font-medium"}>
                    {tc.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
