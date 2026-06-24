import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@foodiety.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@foodiety.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isEmailVerified: true,
    },
  });

  // Create regular users
  const users = [
    {
      username: "johndoe",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "USER",
    },
    {
      username: "janesmith",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "USER",
    },
    {
      username: "mikejohnson",
      email: "mike.johnson@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      role: "USER",
    },
    {
      username: "sarahwilson",
      email: "sarah.wilson@example.com",
      firstName: "Sarah",
      lastName: "Wilson",
      role: "USER",
    },
  ];

  const createdUsers = [];
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash("password123", 12);
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        role: userData.role as any, // Cast role to avoid type issues
        password: hashedPassword,
        isEmailVerified: true,
      },
    });
    createdUsers.push(user);
  }

  // Create sample recipes
  const recipes = [
    {
      title: "Classic Margherita Pizza",
      slug: "classic-margherita-pizza",
      description:
        "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil",
      ingredients: [
        { name: "Pizza dough", amount: "1 lb", unit: "piece" },
        { name: "San Marzano tomatoes", amount: "1", unit: "can" },
        { name: "Fresh mozzarella", amount: "8 oz", unit: "piece" },
        { name: "Fresh basil", amount: "1/4 cup", unit: "cup" },
        { name: "Extra virgin olive oil", amount: "2 tbsp", unit: "tbsp" },
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Roll out pizza dough on floured surface",
        "Spread tomato sauce evenly",
        "Add torn mozzarella pieces",
        "Bake for 12-15 minutes until golden",
        "Top with fresh basil and olive oil",
      ],
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      difficulty: "Easy",
      category: "MAIN_COURSE",
      cuisine: "Italian",
      tags: ["vegetarian", "quick", "family-friendly"],
      image:
        "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800",
      nutritionInfo: {
        calories: 285,
        protein: "12g",
        carbs: "35g",
        fat: "10g",
        fiber: "3g",
      },
      isPublished: true,
      isFeatured: true,
      rating: 4.8,
      totalRatings: 156,
      authorId: createdUsers[0].id,
    },
    {
      title: "Thai Green Curry",
      slug: "thai-green-curry",
      description:
        "Aromatic and creamy Thai curry with fresh herbs and vegetables",
      ingredients: [
        { name: "Green curry paste", amount: "3 tbsp", unit: "tbsp" },
        { name: "Coconut milk", amount: "1", unit: "can" },
        { name: "Chicken breast", amount: "1 lb", unit: "lb" },
        { name: "Thai eggplant", amount: "2", unit: "pieces" },
        { name: "Thai basil", amount: "1/2 cup", unit: "cup" },
      ],
      instructions: [
        "Heat oil in a large pan",
        "Fry curry paste until fragrant",
        "Add coconut milk gradually",
        "Add chicken and vegetables",
        "Simmer for 20 minutes",
        "Garnish with Thai basil",
      ],
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      difficulty: "Medium",
      category: "MAIN_COURSE",
      cuisine: "Thai",
      tags: ["spicy", "coconut", "gluten-free"],
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
      nutritionInfo: {
        calories: 342,
        protein: "28g",
        carbs: "12g",
        fat: "22g",
        fiber: "4g",
      },
      isPublished: true,
      rating: 4.7,
      totalRatings: 89,
      authorId: createdUsers[1].id,
    },
  ];

  for (const recipeData of recipes) {
    await prisma.recipe.upsert({
      where: { slug: recipeData.slug },
      update: {},
      create: {
        ...recipeData,
        category: recipeData.category as any, // Cast category to avoid type issues
      },
    });
  }

  // Create sample restaurants
  const restaurants = [
    {
      name: "Bella Notte",
      slug: "bella-notte",
      description:
        "Authentic Italian dining with handmade pasta and traditional recipes",
      address: "123 Mission Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94103",
      phone: "+1 (555) 123-4567",
      email: "info@bellanotte.com",
      website: "https://bellanotte.com",
      category: "ITALIAN",
      cuisine: ["Italian", "Mediterranean"],
      priceRange: "$$$",
      hours: {
        monday: "5:00 PM - 10:00 PM",
        tuesday: "5:00 PM - 10:00 PM",
        wednesday: "5:00 PM - 10:00 PM",
        thursday: "5:00 PM - 10:00 PM",
        friday: "5:00 PM - 11:00 PM",
        saturday: "5:00 PM - 11:00 PM",
        sunday: "5:00 PM - 10:00 PM",
      },
      features: ["Dine-in", "Takeout", "Delivery", "Outdoor Seating"],
      image:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      isFeatured: true,
      rating: 4.6,
      totalRatings: 234,
    },
    {
      name: "Sakura Sushi",
      slug: "sakura-sushi",
      description:
        "Premium sushi experience with the freshest fish flown in daily from Japan",
      address: "456 Union Square",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94108",
      phone: "+1 (555) 234-5678",
      email: "info@sakurasushi.com",
      website: "https://sakurasushi.com",
      category: "JAPANESE",
      cuisine: ["Japanese", "Sushi"],
      priceRange: "$$$$",
      hours: {
        tuesday: "6:00 PM - 11:00 PM",
        wednesday: "6:00 PM - 11:00 PM",
        thursday: "6:00 PM - 11:00 PM",
        friday: "6:00 PM - 11:00 PM",
        saturday: "6:00 PM - 11:00 PM",
        sunday: "Closed",
        monday: "Closed",
      },
      features: ["Dine-in", "Omakase", "Sake Bar"],
      image:
        "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      totalRatings: 167,
    },
  ];

  for (const restaurantData of restaurants) {
    await prisma.restaurant.upsert({
      where: { slug: restaurantData.slug },
      update: {},
      create: {
        ...restaurantData,
        category: restaurantData.category as any, // Cast category to avoid type issues
      },
    });
  }

  // Create sample blog posts
  const blogPosts = [
    {
      title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
      slug: "art-of-perfect-pasta",
      excerpt:
        "Discover the time-honored techniques that make Italian pasta truly exceptional",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image:
        "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Cooking Tips",
      tags: ["pasta", "italian", "techniques"],
      isPublished: true,
      isFeatured: true,
      readTime: 8,
      authorId: admin.id,
    },
  ];

  for (const blogData of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: blogData.slug },
      update: {},
      create: blogData,
    });
  }

  console.log("✅ Database seeded successfully");
  console.log(`👤 Admin user: admin@foodiety.com / admin123`);
  console.log(`👥 Regular users: password123 for all users`);
  console.log(`🍳 Created ${recipes.length} sample recipes`);
  console.log(`🏪 Created ${restaurants.length} sample restaurants`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
