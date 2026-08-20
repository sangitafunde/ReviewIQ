import { GoogleGenAI, Type } from "@google/genai";

// We initialize the client if the API key is present
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzeReviewsWithAI(reviews: any[]) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const prompt = `
You are an expert customer feedback analyst.
Analyze the following customer reviews and return a JSON object with your findings.
You MUST analyze ONLY the supplied reviews.
Do not invent facts, statistics, or quotes. Every quote must exist in the supplied reviews.
Do not infer information that cannot be supported by the reviews.
Percentages must correspond to the supplied review set.
If you cannot confidently identify something, return an empty array or 0 rather than inventing information.

Reviews:
${JSON.stringify(reviews, null, 2)}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: {
            type: Type.OBJECT,
            properties: {
              positive_percentage: { type: Type.INTEGER },
              neutral_percentage: { type: Type.INTEGER },
              negative_percentage: { type: Type.INTEGER },
            },
            required: ["positive_percentage", "neutral_percentage", "negative_percentage"],
          },
          positive_themes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                theme: { type: Type.STRING },
                mention_count: { type: Type.INTEGER },
                description: { type: Type.STRING },
              },
              required: ["theme", "mention_count", "description"],
            },
          },
          negative_themes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                theme: { type: Type.STRING },
                mention_count: { type: Type.INTEGER },
                description: { type: Type.STRING },
              },
              required: ["theme", "mention_count", "description"],
            },
          },
          representative_quotes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quote: { type: Type.STRING },
                rating: { type: Type.INTEGER },
                sentiment: { type: Type.STRING },
                theme: { type: Type.STRING },
              },
              required: ["quote", "rating", "sentiment", "theme"],
            },
          },
          summary: { type: Type.STRING },
        },
        required: [
          "sentiment",
          "positive_themes",
          "negative_themes",
          "representative_quotes",
          "summary",
        ],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI");
  }
  
  return JSON.parse(text);
}
