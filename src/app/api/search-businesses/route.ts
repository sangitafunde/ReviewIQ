import { NextResponse } from "next/server";

const maharashtraLocations = [
  "Dadar, Mumbai", "Kothrud, Pune", "Sitabuldi, Nagpur", "CIDCO, Nashik", "Camp, Pune",
  "Bandra, Mumbai", "Mahadwar Road, Kolhapur", "Vashi, Navi Mumbai", "Kalyan, Thane", "Navi Peth, Solapur",
  "Andheri, Mumbai", "Deccan Gymkhana, Pune", "Dharampeth, Nagpur", "Panchavati, Nashik", "Thane West",
  "Aurangabad City", "Amravati Camp", "Jalgaon Center", "Latur MIDC", "Nanded City", "Satara Road", "Ratnagiri"
];

function generateMockBusinesses(query: string, location: string) {
  const baseQuery = query.trim() || "Store";
  const baseLoc = location.trim();
  
  const adjectives = ["Shree", "Jai Maharashtra", "Shivneri", "Royal", "Deccan", "Sahyadri", "Maratha", "Peshwa", "Supreme", "Global", "Elite", "Prime", "Metro", "Grand", "Apex"];
  const suffixes = ["Center", "Hub", "Enterprise", "Bazaar", "Market", "Wada", "Point", "Agency", "Solutions", "Group", "Traders", "Associates", "Ventures"];
  
  const results = [];
  
  // We want to return 12 results (10+)
  for (let i = 0; i < 12; i++) {
    // Generate diverse names
    let name = "";
    const randAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randSuf = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randLoc = baseLoc || maharashtraLocations[Math.floor(Math.random() * maharashtraLocations.length)];
    
    if (i % 3 === 0) name = `${randAdj} ${baseQuery} ${randLoc.split(',')[0]}`;
    else if (i % 3 === 1) name = `${randLoc.split(',')[0]} ${baseQuery} ${randSuf}`;
    else name = `The ${baseQuery} ${randSuf} ${randLoc.split(',')[0]}`;
    
    // Create a safe keyword for image searching (remove spaces, just use the main query)
    const imageKeyword = baseQuery.replace(/[^a-zA-Z]/g, '').toLowerCase() || "business";
    // Using loremflickr which provides unique images per category when using lock or random
    const uniqueImageUrl = `https://loremflickr.com/600/400/${imageKeyword},india?lock=${Date.now() + i}`;

    results.push({
      id: `dyn_${query}_${i}_${Date.now()}`,
      name,
      category: baseQuery.charAt(0).toUpperCase() + baseQuery.slice(1),
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      totalReviews: Math.floor(Math.random() * 2000) + 10,
      priceLevel: "$".repeat(Math.floor(Math.random() * 3) + 1),
      isOpen: Math.random() > 0.1, // 90% chance of being open
      location: randLoc,
      imageUrl: uniqueImageUrl
    });
  }
  
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const loc = searchParams.get('loc') || '';

  // Simulate network delay to feel like searching 500+ businesses
  await new Promise(resolve => setTimeout(resolve, 600));

  const results = generateMockBusinesses(q, loc);
  return NextResponse.json({ 
    businesses: results,
    totalAvailable: 543 // Tell frontend we have 500+ results
  });
}
