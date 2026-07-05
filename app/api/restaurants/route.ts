import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function getRestaurantsHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "Nepal";

  // Fetch local database records
  const dbRestaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  let osmEstablishments: any[] = [];
  if (location && location.trim().length > 0) {
    try {
      let query = "";
      
      // Attempt geocoding with Nominatim to get lat/lon for a precise bounding box
      let latVal: number | null = null;
      let lonVal: number | null = null;
      try {
        const geocodeRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
          {
            headers: {
              "User-Agent": "FoodietyTravelApp/1.0"
            }
          }
        );
        if (geocodeRes.ok) {
          const geoData = await geocodeRes.json();
          if (geoData && geoData.length > 0) {
            latVal = parseFloat(geoData[0].lat);
            lonVal = parseFloat(geoData[0].lon);
          }
        }
      } catch (err) {
        console.error("Nominatim geocoding failed, falling back to area query:", err);
      }

      if (latVal !== null && lonVal !== null && !isNaN(latVal) && !isNaN(lonVal)) {
        // Construct bounding box around coordinates
        const minLat = latVal - 0.03;
        const maxLat = latVal + 0.03;
        const minLon = lonVal - 0.03;
        const maxLon = lonVal + 0.03;
        
        query = `[out:json][timeout:8];
(
  node["tourism"="hotel"](${minLat},${minLon},${maxLat},${maxLon});
  node["tourism"="hostel"](${minLat},${minLon},${maxLat},${maxLon});
  node["tourism"="motel"](${minLat},${minLon},${maxLat},${maxLon});
  node["amenity"="cafe"](${minLat},${minLon},${maxLat},${maxLon});
  node["amenity"="restaurant"](${minLat},${minLon},${maxLat},${maxLon});
);
out body 35;`;
      } else {
        // Fallback to area query
        const escapedLocation = location.replace(/"/g, '\\"');
        query = `[out:json][timeout:8];
area["name"~"^${escapedLocation}$",i]->.searchArea;
(
  node["tourism"="hotel"](area.searchArea);
  node["tourism"="hostel"](area.searchArea);
  node["tourism"="motel"](area.searchArea);
  node["amenity"="cafe"](area.searchArea);
  node["amenity"="restaurant"](area.searchArea);
);
out body 35;`;
      }

      const overpassUrl = process.env.OVERPASS_API_URL || "https://overpass-api.de/api/interpreter";
      const response = await fetch(overpassUrl, {
        method: "POST",
        body: `data=${encodeURIComponent(query)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.ok) {
        const osmData = await response.json();
        if (osmData && osmData.elements) {
          osmEstablishments = osmData.elements.map((el: any) => {
            const tags = el.tags || {};
            const name = tags.name || tags.operator || "Unnamed Venue";
            
            // Map category
            let category = "RESTAURANT";
            if (tags.tourism === "hotel") category = "HOTEL";
            else if (tags.tourism === "hostel") category = "HOSTEL";
            else if (tags.tourism === "motel") category = "MOTEL";
            else if (tags.amenity === "cafe") category = "CAFE";
            else if (tags.amenity === "restaurant") category = "RESTAURANT";

            // Map cuisine as array of strings
            const cuisineList = tags.cuisine
              ? tags.cuisine.split(";").map((c: string) => c.trim())
              : [category === "CAFE" ? "Cafe" : category === "HOTEL" || category === "HOSTEL" || category === "MOTEL" ? "Stay" : "Global"];

            // Unsplash image placeholders based on category
            let image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=compress&cs=tinysrgb&w=800";
            if (category === "CAFE") {
              image = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=compress&cs=tinysrgb&w=800";
            } else if (category === "HOTEL" || category === "HOSTEL" || category === "MOTEL") {
              image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=compress&cs=tinysrgb&w=800";
            }

            // Pseudo-random rating & reviews Count
            const rating = parseFloat((4.0 + (el.id % 11) / 10).toFixed(1));
            const totalRatings = (el.id % 90) + 10;

            const addrCity = tags["addr:city"] || tags["addr:suburb"] || "";
            const addrStreet = tags["addr:street"] || "";
            const fullAddress = [addrStreet, addrCity, location].filter(Boolean).join(", ");

            // Generate some dummy reviews matching the review model structure
            const reviewAuthors = ["Alex M.", "Sophia L.", "David K.", "Elena R.", "Pradeep B."];
            const reviewComments = [
              "Awesome service and a really cozy atmosphere. Highly recommend visiting this spot!",
              "Decent quality, helpful staff. Clean place.",
              "Excellent vibe! Visited with family and enjoyed it very much.",
              "A must-visit local gem."
            ];
            
            const dummyReviews = Array.from({ length: (el.id % 2) + 1 }).map((_, rIdx) => ({
              id: `osm-rev-${el.id}-${rIdx}`,
              rating: Math.floor(rating),
              title: "Great Place",
              content: reviewComments[(el.id + rIdx) % reviewComments.length],
              createdAt: new Date().toISOString(),
              user: {
                username: `osm_user_${rIdx}`,
                firstName: reviewAuthors[(el.id + rIdx) % reviewAuthors.length],
                lastName: "",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=osm-${el.id}-${rIdx}`
              }
            }));

            return {
              id: `osm-${el.id}`,
              name,
              slug: `osm-${el.id}`,
              description: tags.description || `A verified ${category.toLowerCase()} listed on OpenStreetMap.`,
              address: fullAddress,
              city: addrCity || location,
              country: location,
              phone: tags.phone || tags["contact:phone"] || "N/A",
              website: tags.website || null,
              category,
              cuisine: cuisineList,
              priceRange: (el.id % 3) === 0 ? "$" : (el.id % 3) === 1 ? "$$" : "$$$",
              hours: tags.opening_hours || "Mon-Sun: 9:00 AM - 10:00 PM",
              features: tags.internet_access ? ["Free Wi-Fi"] : [],
              image,
              rating,
              totalRatings,
              reviews: dummyReviews,
              isOsm: true,
              location: {
                lat: el.lat,
                lon: el.lon
              }
            };
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch OSM data from Overpass API:", error);
    }
  }

  // Merge database restaurants with OSM establishments
  const mergedRestaurants = [...dbRestaurants, ...osmEstablishments];

  return NextResponse.json({
    success: true,
    data: mergedRestaurants
  });
}

async function postRestaurantHandler(request: NextRequest) {
  const authError = await withAuth(request, "ADMIN");
  if (authError) return authError;

  const body = await request.json();
  const {
    name,
    description,
    address,
    city,
    country,
    category,
    cuisine,
    priceRange,
    hours,
    features,
    image
  } = body;

  const slug = `${slugify(name)}-${Date.now().toString().slice(-4)}`;

  const newRestaurant = await prisma.restaurant.create({
    data: {
      name,
      slug,
      description,
      address,
      city: city || "San Francisco",
      country: country || "USA",
      category: category || "ITALIAN",
      cuisine: cuisine || [],
      priceRange: priceRange || "$$",
      hours: hours || {},
      features: features || [],
      image: image || "",
      rating: 5.0,
      totalRatings: 1
    }
  });

  return NextResponse.json({
    success: true,
    data: newRestaurant
  });
}

export const GET = withErrorHandling(getRestaurantsHandler);
export const POST = withErrorHandling(postRestaurantHandler);
export const PUT = withErrorHandling(postRestaurantHandler);
