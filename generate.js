const fs = require('fs');

const rawData = `
Urban Spice|Restaurant
Food Junction|Restaurant
Cafe Aroma|Cafe
Taste Hub|Restaurant
Spice Garden|Restaurant
The Food Studio|Restaurant
Brew & Bite|Cafe
Royal Tadka|Restaurant
Cafe Bliss|Cafe
The Hungry Fork|Restaurant
Style Street|Fashion
Urban Wear|Fashion
Fashion Point|Fashion
Trendy Threads|Fashion
Style Hub|Fashion
Fashion Avenue|Fashion
The Wardrobe|Fashion
Urban Closet|Fashion
Trend House|Fashion
Fashion Factory|Fashion
Glow Studio|Salon
Beauty Lounge|Salon
Style & Glow|Salon
Glam Studio|Salon
The Beauty Room|Salon
Aura Salon|Salon
Glow & Grace|Salon
Urban Salon|Salon
Beauty Bliss|Salon
Glamour Point|Salon
Prime Properties|RealEstate
Urban Estates|RealEstate
Dream Homes|RealEstate
BlueStone Realty|RealEstate
HomeSphere|RealEstate
Elite Properties|RealEstate
CityScape Realty|RealEstate
Green Valley Properties|RealEstate
Landmark Estates|RealEstate
Royal Realty|RealEstate
TechNova Solutions|Tech
DigitalNest|Tech
WebCraft Studio|Tech
CodeSphere|Tech
PixelWorks|Tech
DigitalEdge|Tech
TechBridge|Tech
WebWave Solutions|Tech
SmartTech Solutions|Tech
NextGen Digital|Tech
Royal Furniture|Furniture
Classic Jewellers|Jewelry
Shree Motors|Automotive
Prime Electronics|Electronics
GreenLeaf Nursery|Nature
City Dental Care|Healthcare
Care Pharmacy|Pharmacy
Perfect Prints|Printing
Bright Education|Education
Elite Coaching Classes|Education
`;

const locations = [
  "Dadar, Mumbai", "Kothrud, Pune", "Sitabuldi, Nagpur", "CIDCO, Nashik", "Camp, Pune",
  "Bandra, Mumbai", "Mahadwar Road, Kolhapur", "Vashi, Navi Mumbai", "Kalyan, Thane", "Navi Peth, Solapur",
  "Andheri, Mumbai", "Deccan Gymkhana, Pune", "Dharampeth, Nagpur", "Panchavati, Nashik", "Thane West",
  "Aurangabad City", "Amravati Camp", "Jalgaon Center", "Latur MIDC", "Nanded City", "Satara Road", "Ratnagiri"
];

const lines = rawData.trim().split('\n');
const businesses = lines.map((line, i) => {
  const [name, category] = line.split('|');
  const imageKeyword = category.toLowerCase().replace(/[^a-z]/g, '');
  const randLoc = locations[Math.floor(Math.random() * locations.length)];
  
  return {
    id: `b${i+1}`,
    name,
    category,
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    totalReviews: Math.floor(Math.random() * 2000) + 15,
    priceLevel: '$'.repeat(Math.floor(Math.random() * 3) + 1),
    isOpen: Math.random() > 0.1,
    location: randLoc,
    imageUrl: `https://loremflickr.com/600/400/${imageKeyword},india?lock=${i+100}`
  };
});

const fileContent = `export const businesses = ${JSON.stringify(businesses, null, 2)};\n`;

fs.writeFileSync('src/lib/data/businesses.ts', fileContent);
console.log('Created businesses.ts with ' + businesses.length + ' entries.');
