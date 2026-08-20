"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export function SentimentDonutChart({ data }: { data: SentimentData }) {
  const chartData = [
    { name: "Positive", value: data.positive, color: "#22c55e" }, // green-500
    { name: "Neutral", value: data.neutral, color: "#64748b" }, // slate-500
    { name: "Negative", value: data.negative, color: "#ef4444" }, // red-500
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: any) => [`${value}%`, "Share"]}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
