import { BusinessInsights } from "../types";

export const insights: Record<string, BusinessInsights> = {
  "b1": {
    businessId: "b1",
    executiveSummary: "Customers are highly satisfied with the coffee quality and staff friendliness. The most frequent concerns relate to seating availability during peak hours and occasional WiFi drops. Expanding seating could significantly improve overall customer satisfaction.",
    recommendations: [
      {
        id: "rec1",
        title: "Increase Seating Capacity",
        impact: "High",
        evidence: "Several customers mention lack of seating during morning hours.",
        action: "Consider rearranging furniture or adding bar seating."
      },
      {
        id: "rec2",
        title: "Upgrade WiFi Router",
        impact: "Medium",
        evidence: "Occasional complaints about internet stability.",
        action: "Invest in a mesh network or higher bandwidth plan."
      }
    ],
    topStrengths: [
      { topic: "Coffee", mentionCount: 142, sentimentScore: 92, trend: "up" },
      { topic: "Staff", mentionCount: 98, sentimentScore: 88, trend: "up" },
      { topic: "Pastries", mentionCount: 76, sentimentScore: 85, trend: "flat" }
    ],
    topWeaknesses: [
      { topic: "Seating", mentionCount: 45, sentimentScore: 32, trend: "down" },
      { topic: "WiFi", mentionCount: 22, sentimentScore: 41, trend: "flat" }
    ],
    healthScore: {
      overall: 87,
      food: 92,
      service: 88,
      staff: 90,
      value: 82,
      ambience: 85
    },
    sentimentDistribution: {
      positive: 78,
      neutral: 14,
      negative: 8
    },
    smartInsights: [
      "🔥 'Oat milk latte' is trending in positive reviews this week.",
      "⚠️ Emerging complaints about table cleanliness on weekends.",
      "📈 Staff friendliness sentiment is up 5% this month."
    ]
  },
  "b2": {
    businessId: "b2",
    executiveSummary: "Green Leaf Restaurant is praised for its exceptional food quality and healthy options. However, waiting times and pricing are common pain points. Streamlining the kitchen process could reduce wait times.",
    recommendations: [
      {
        id: "rec3",
        title: "Reduce Waiting Time",
        impact: "High",
        evidence: "38 complaints about slow service during dinner service.",
        action: "Optimize kitchen workflow and hire an extra prep cook."
      },
      {
        id: "rec4",
        title: "Review Pricing Strategy",
        impact: "Medium",
        evidence: "Price-related complaints appear frequently in neutral/negative reviews.",
        action: "Introduce lunch specials or combo deals to improve perceived value."
      }
    ],
    topStrengths: [
      { topic: "Food Quality", mentionCount: 215, sentimentScore: 94, trend: "up" },
      { topic: "Atmosphere", mentionCount: 156, sentimentScore: 89, trend: "up" }
    ],
    topWeaknesses: [
      { topic: "Waiting Time", mentionCount: 89, sentimentScore: 25, trend: "down" },
      { topic: "Pricing", mentionCount: 64, sentimentScore: 45, trend: "flat" }
    ],
    healthScore: {
      overall: 82,
      food: 94,
      service: 72,
      staff: 85,
      value: 68,
      ambience: 89
    },
    sentimentDistribution: {
      positive: 71,
      neutral: 18,
      negative: 11
    },
    smartInsights: [
      "⭐ Most loved feature is the Vegan Menu.",
      "📉 Service speed sentiment declined slightly last month."
    ]
  }
};
