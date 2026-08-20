"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Filter, Star, ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { businesses } from "@/lib/data/businesses";
import { reviews as staticReviews } from "@/lib/data/reviews";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ReviewsExplorer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [businessReviews, setBusinessReviews] = useState<any[]>([]);
  const [businessName, setBusinessName] = useState("Custom Dataset");
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    if (id === "custom") {
      const storedReviews = sessionStorage.getItem("reviewiq_current_dataset");
      if (storedReviews) {
        setBusinessReviews(JSON.parse(storedReviews));
      }
      setIsLoading(false);
    } else {
      const b = businesses.find(b => b.id === id);
      if (b) {
        setBusinessName(b.name);
        setBusinessReviews(staticReviews.filter(r => r.businessId === id));
      }
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) return <div className="p-8">Loading reviews...</div>;

  const filteredReviews = businessReviews.filter(review => {
    const textToSearch = (review.review || review.text || "").toLowerCase();
    const authorToSearch = (review.author || "").toLowerCase();
    
    const matchesSearch = textToSearch.includes(searchQuery.toLowerCase()) || authorToSearch.includes(searchQuery.toLowerCase());
    
    const matchesSentiment = sentimentFilter === "All" || review.sentiment === sentimentFilter;
    
    const matchesRating = ratingFilter === "All" || (Number(review.rating) || 5).toString() === ratingFilter;

    return matchesSearch && matchesSentiment && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/${id}`} className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Reviews</h1>
          <p className="text-muted-foreground">
            Browse and filter {businessReviews.length} reviews for {businessName}
          </p>
        </div>
      </div>

      {/* Explicit Rating Filter Requested by user */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button 
          variant={ratingFilter === "All" ? "default" : "outline"} 
          size="sm"
          onClick={() => setRatingFilter("All")}
        >
          All Reviews
        </Button>
        {[5, 4, 3, 2, 1].map(stars => (
          <Button 
            key={stars}
            variant={ratingFilter === stars.toString() ? "default" : "outline"} 
            size="sm"
            onClick={() => setRatingFilter(stars.toString())}
            className="flex items-center"
          >
            {stars} <Star className="h-3 w-3 ml-1 fill-current" />
          </Button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews or customers..."
            className="pl-8 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {sentimentFilter === "All" ? "Sentiment: All" : sentimentFilter}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sentimentFilter} onValueChange={setSentimentFilter}>
                <DropdownMenuRadioItem value="All">All Sentiments</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Positive">Positive</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Neutral">Neutral</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Negative">Negative</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Customer</TableHead>
              <TableHead className="w-[100px]">Rating</TableHead>
              <TableHead className="hidden md:table-cell w-[120px]">Date</TableHead>
              <TableHead>Review</TableHead>
              <TableHead className="w-[120px] text-right">Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-semibold text-lg">No reviews match your search.</p>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
                    <Button onClick={() => { setSearchQuery(""); setSentimentFilter("All"); setRatingFilter("All"); }} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review, i) => {
                const reviewText = review.review || review.text || "";
                const sentiment = review.sentiment || (review.rating >= 4 ? "Positive" : review.rating <= 2 ? "Negative" : "Neutral");
                
                return (
                <TableRow key={review.id || i} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{review.author || "Anonymous"}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500 mr-1" />
                      {review.rating || 5}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {review.date ? format(new Date(review.date), "MMM d, yyyy") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm">{reviewText}</p>
                    {review.topics && review.topics.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {review.topics.map((t: string) => (
                          <span key={t} className="text-[10px] bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.5 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={
                      sentiment === "Positive" ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" :
                      sentiment === "Negative" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" :
                      "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    }>
                      {sentiment}
                    </Badge>
                  </TableCell>
                </TableRow>
              )})
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
