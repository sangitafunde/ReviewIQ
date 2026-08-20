const fs = require('fs');
const path = require('path');

const businesses = ["b1", "b2", "b3", "b4"];

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

const reviewTemplates = {
  Positive: [
    "Excellent {topic} and very friendly staff.",
    "I absolutely loved the {topic}. Will definitely come back!",
    "Great experience overall. The {topic} was top notch.",
    "Highly recommend! The {topic} exceeded my expectations.",
    "One of the best places in town. {topic} is consistently good."
  ],
  Neutral: [
    "It was okay. The {topic} was fine but nothing special.",
    "Average experience. The {topic} could be better.",
    "Not bad, but a bit overpriced for the {topic}.",
    "Decent place, but the {topic} was just alright."
  ],
  Negative: [
    "Terrible experience. The {topic} was unacceptable.",
    "I was very disappointed with the {topic}.",
    "Would not recommend. The {topic} needs serious improvement.",
    "Waited too long and the {topic} was poor.",
    "Overpriced and bad {topic}."
  ]
};

const topicsList = {
  b1: ["coffee", "pastries", "ambience", "service", "seating", "wifi"],
  b2: ["food quality", "service", "waiting time", "pricing", "parking", "atmosphere"],
  b3: ["equipment", "cleanliness", "staff", "classes", "parking", "pricing"],
  b4: ["stylists", "service", "waiting time", "cleanliness", "pricing", "ambience"]
};

const reviews = [];
let idCounter = 1;

businesses.forEach(businessId => {
  const topics = topicsList[businessId];
  // Generate 25 reviews per business = 100 total
  for (let i = 0; i < 25; i++) {
    const author = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    
    // Weighted random for rating (more 4 and 5 stars to be realistic)
    const ratingRoll = Math.random();
    let rating = 5;
    let sentiment = "Positive";
    if (ratingRoll > 0.9) { rating = 1; sentiment = "Negative"; }
    else if (ratingRoll > 0.8) { rating = 2; sentiment = "Negative"; }
    else if (ratingRoll > 0.65) { rating = 3; sentiment = "Neutral"; }
    else if (ratingRoll > 0.4) { rating = 4; sentiment = "Positive"; }

    const templateArray = reviewTemplates[sentiment];
    const template = templateArray[Math.floor(Math.random() * templateArray.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const text = template.replace("{topic}", topic);
    
    const date = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString();

    reviews.push({
      id: `r${idCounter++}`,
      businessId,
      author,
      rating,
      date,
      text,
      sentiment,
      topics: [topic],
      positiveKeywords: sentiment === "Positive" ? [topic, "great", "excellent"] : [],
      negativeKeywords: sentiment === "Negative" ? [topic, "terrible", "bad"] : []
    });
  }
});

const fileContent = `import { Review } from "../types";

export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'data', 'reviews.ts'), fileContent);
console.log("Generated reviews.ts");
