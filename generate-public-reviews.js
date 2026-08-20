const fs = require('fs');
const path = require('path');

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const positiveTemplates = [
  "The {topic} here is incredible. Definitely one of the best I've ever had.",
  "We loved the {topic}! The staff was super friendly and made our evening special.",
  "Excellent {topic}, great atmosphere. Would definitely recommend to anyone visiting.",
  "A hidden gem. The {topic} blew us away. 10/10.",
  "Really enjoyed the {topic}. Everything was cooked to perfection and the service was quick.",
  "This is our go-to spot for {topic}. Always consistent and delicious.",
  "Fantastic experience! The {topic} was fresh and very flavorful.",
  "Great {topic} and lovely ambience. Highly recommend for a date night."
];

const neutralTemplates = [
  "The {topic} was okay, nothing special but not bad either.",
  "Decent place. The {topic} could use a bit more seasoning.",
  "Average experience. Expected better {topic} given the reviews.",
  "It's fine if you're in a rush, but the {topic} is just average.",
  "The {topic} was acceptable, but a bit overpriced for what you get."
];

const negativeTemplates = [
  "Very disappointed with the {topic}. It was cold and tasteless.",
  "Waited 45 minutes and the {topic} was terrible. Not coming back.",
  "Overpriced. The {topic} is definitely not worth the money.",
  "Terrible service and the {topic} was subpar. Avoid this place.",
  "I had high expectations, but the {topic} was a huge letdown."
];

const topics = [
  "pizza", "pasta", "seafood", "steak", "burger", "coffee", "dessert", "brunch", "sushi", "tacos",
  "ambience", "service", "customer service", "waiting time"
];

const reviews = [];
let idCounter = 1;

for (let i = 0; i < 60; i++) {
  const author = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  
  const ratingRoll = Math.random();
  let rating = 5;
  let templateArray = positiveTemplates;
  
  if (ratingRoll > 0.9) { rating = 1; templateArray = negativeTemplates; }
  else if (ratingRoll > 0.8) { rating = 2; templateArray = negativeTemplates; }
  else if (ratingRoll > 0.65) { rating = 3; templateArray = neutralTemplates; }
  else if (ratingRoll > 0.4) { rating = 4; templateArray = positiveTemplates; }

  const template = templateArray[Math.floor(Math.random() * templateArray.length)];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  const text = template.replace("{topic}", topic);
  
  // Random date within last 6 months
  const dateObj = new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000);
  const date = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

  reviews.push({
    id: `r${idCounter++}`,
    rating,
    review: text,
    date,
    author
  });
}

const dirPath = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(path.join(dirPath, 'reviews.json'), JSON.stringify(reviews, null, 2));
console.log("Generated public/data/reviews.json");
