export type Sentiment = "Positive" | "Neutral" | "Negative";

export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  totalReviews: number;
  priceLevel: "$" | "$$" | "$$$" | "$$$$";
  isOpen: boolean;
  contact: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  sentiment: Sentiment;
  topics: string[];
  positiveKeywords: string[];
  negativeKeywords: string[];
}

export interface TopicInsight {
  topic: string;
  mentionCount: number;
  sentimentScore: number; // 0 to 100
  trend: "up" | "down" | "flat";
}

export interface RecommendedAction {
  id: string;
  title: string;
  impact: "High" | "Medium" | "Low";
  evidence: string;
  action: string;
}

export interface BusinessInsights {
  businessId: string;
  executiveSummary: string;
  recommendations: RecommendedAction[];
  topStrengths: TopicInsight[];
  topWeaknesses: TopicInsight[];
  healthScore: {
    overall: number;
    food: number;
    service: number;
    staff: number;
    value: number;
    ambience: number;
  };
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  smartInsights: string[];
}
