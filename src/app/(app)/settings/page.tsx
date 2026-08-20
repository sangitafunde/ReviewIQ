"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [demoMode, setDemoMode] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and application preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Mode</CardTitle>
          <CardDescription>
            Toggle between live API data and demo mode for testing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Demo Mode</p>
              <p className="text-sm text-muted-foreground">Uses realistic mock data without requiring API keys.</p>
            </div>
            <div 
              className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${demoMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
              onClick={() => setDemoMode(!demoMode)}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${demoMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Enter your API keys for live data analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Places API Key</label>
            <Input type="password" placeholder="AIzaSy..." disabled={demoMode} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenAI API Key</label>
            <Input type="password" placeholder="sk-..." disabled={demoMode} />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={demoMode} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            Save Keys
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
