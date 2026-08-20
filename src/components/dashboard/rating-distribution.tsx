"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Review } from "@/lib/types";

export function RatingDistribution({ reviews }: { reviews: Review[] }) {
  // Calculate distribution
  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return {
      name: `${stars} Stars`,
      stars: stars.toString(),
      count,
      fill: stars >= 4 ? "#22c55e" : stars === 3 ? "#f59e0b" : "#ef4444"
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={distribution}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
        <XAxis type="number" hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          fontSize={12}
          width={60}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar 
          dataKey="count" 
          radius={[0, 4, 4, 0]} 
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
