"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Star, Building2, Store, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { businesses as defaultBusinesses } from "@/lib/data/businesses";
import { motion } from "framer-motion";

const initialBusinesses = defaultBusinesses.slice(0, 8);

export default function SearchPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  
  const [displayedBusinesses, setDisplayedBusinesses] = useState<any[]>(initialBusinesses);
  const [totalAvailable, setTotalAvailable] = useState(initialBusinesses.length);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (queryToSearch = searchQuery, locToSearch = locationQuery) => {
    setIsSearching(true);
    
    // If empty search, just show our amazing 8 default businesses
    if (!queryToSearch && !locToSearch) {
      setDisplayedBusinesses(initialBusinesses);
      setTotalAvailable(initialBusinesses.length);
      setIsSearching(false);
      return;
    }

    try {
      const res = await fetch(`/api/search-businesses?q=${encodeURIComponent(queryToSearch)}&loc=${encodeURIComponent(locToSearch)}`);
      const data = await res.json();
      if (data.businesses && data.businesses.length > 0) {
        setDisplayedBusinesses(data.businesses);
        setTotalAvailable(data.totalAvailable || 500);
      } else {
        setDisplayedBusinesses([]);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Run once on mount to ensure defaults are populated
  useEffect(() => {
    if (!searchQuery && !locationQuery) {
      setDisplayedBusinesses(initialBusinesses);
      setTotalAvailable(initialBusinesses.length);
    }
  }, []);

  const handleAnalyze = (business: any) => {
    // If it's a dynamic business (id starts with dyn_), we generate mock reviews and send to custom flow
    if (business.id.startsWith("dyn_")) {
      const generateReview = (sentiment: "positive" | "negative", text: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        author: "Customer",
        rating: sentiment === "positive" ? 5 : 2,
        date: new Date().toISOString(),
        text: text.replace("{name}", business.name),
        source: "Google",
        businessId: "custom"
      });

      const mockReviews = [
        generateReview("positive", "I visited {name} recently and was blown away! Highly recommended."),
        generateReview("positive", "The service at {name} was excellent. Will definitely come back."),
        generateReview("negative", "Honestly, {name} was a bit disappointing. Wait times were too long."),
        generateReview("positive", "Fantastic experience. {name} really knows how to treat their customers."),
        generateReview("positive", "Great quality and fair prices at {name}.")
      ];

      sessionStorage.setItem("reviewiq_analysis_source", "pasted");
      sessionStorage.setItem("reviewiq_pasted_data", JSON.stringify(mockReviews));
      router.push("/analyze/progress");
    } else {
      // It's a static business, go to its static dashboard
      router.push(`/dashboard/${business.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Find a Business</h1>
        <p className="text-muted-foreground">
          Search for ANY business worldwide to analyze its customer reviews and AI insights.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vada Pav, IT Park, Hotel..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="relative lg:col-span-2">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location (e.g. Mumbai, Pune, Nagpur)"
              className="pl-9"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            className="w-full lg:col-span-1 bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105"
            onClick={() => handleSearch()}
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground py-1">Popular:</span>
          {["Vada Pav", "Misal Pav", "IT Company", "Resort"].map((cat) => (
            <Badge 
              key={cat} 
              variant="secondary" 
              className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              onClick={() => {
                setSearchQuery(cat);
                handleSearch(cat, locationQuery);
              }}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Showing {displayedBusinesses.length} Results
          {totalAvailable > 0 && !isSearching && (
            <span className="text-sm font-normal text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
              from {totalAvailable}+ businesses in database
            </span>
          )}
        </h2>
        
        {isSearching ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-dashed">
             <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
             <h3 className="text-lg font-semibold">Searching Database...</h3>
             <p className="text-muted-foreground mt-2 max-w-sm">
               Finding businesses matching your criteria across the globe.
             </p>
          </div>
        ) : displayedBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-dashed">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">No businesses found</p>
              <p className="text-muted-foreground mt-2 max-w-sm">
                We couldn't find any businesses matching your search. Try adjusting your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => { setSearchQuery(""); setLocationQuery(""); setDisplayedBusinesses(initialBusinesses); }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group border-slate-200 dark:border-slate-800 h-full">
                  <div 
                    className="h-40 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${business.imageUrl})` }}
                  />
                <CardContent className="p-4 flex flex-col flex-1 relative bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg line-clamp-1">{business.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="mr-1 h-3 w-3" />
                        {business.category} {business.location ? `• ${business.location}` : ''}
                      </div>
                    </div>
                    {business.isOpen ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400">Open</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400">Closed</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mt-2 mb-4">
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{business.rating}</span>
                      <span className="text-muted-foreground ml-1">({business.totalReviews})</span>
                    </div>
                    <span className="text-muted-foreground">{business.priceLevel}</span>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md group-hover:shadow-lg"
                      onClick={() => handleAnalyze(business)}
                    >
                      Analyze Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
