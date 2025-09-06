// frontend/src/data/products.js

const products = [
  // Mobiles
  { id: 1, name: "Eco Mobile X1", category: "mobile", description: "Eco-friendly smartphone with recycled materials", price: 299, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", deal: true },
  { id: 2, name: "GreenPhone Lite", category: "mobile", description: "Low-energy, sustainable phone", price: 199, image: "https://images.unsplash.com/photo-1510557880182-3d4d3c1b2604?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Refurbished iPhone 11", category: "mobile", description: "Certified pre-owned iPhone", price: 249, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "SolarCell S2", category: "mobile", description: "Solar-powered smartphone", price: 350, image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Minimalist Phone", category: "mobile", description: "Simple, distraction-free phone", price: 99, image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Eco Mobile Z2", category: "mobile", description: "Latest eco smartphone", price: 399, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "GreenPhone Pro", category: "mobile", description: "Flagship sustainable phone", price: 499, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Refurbished Pixel 4a", category: "mobile", description: "Certified pre-owned Pixel", price: 179, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },

  // Furnitures
  { id: 9, name: "Bamboo Chair", category: "furnitures", description: "Sustainable bamboo chair", price: 59, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80", deal: true },
  { id: 10, name: "Recycled Wood Table", category: "furnitures", description: "Table made from recycled wood", price: 120, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Vintage Sofa", category: "furnitures", description: "Restored vintage sofa", price: 200, image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Eco Bookshelf", category: "furnitures", description: "Bookshelf from reclaimed wood", price: 80, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" },
  { id: 13, name: "Upcycled Coffee Table", category: "furnitures", description: "Coffee table from upcycled materials", price: 90, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 14, name: "Eco Bed Frame", category: "furnitures", description: "Bed frame from sustainable wood", price: 150, image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" },
  { id: 15, name: "Minimalist Desk", category: "furnitures", description: "Minimalist, eco-friendly desk", price: 110, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" },
  { id: 16, name: "Recycled Plastic Chair", category: "furnitures", description: "Chair made from recycled plastic", price: 45, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },

  // Books
  { id: 17, name: "Sustainable Living", category: "books", description: "Guide to sustainable living", price: 12, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", deal: true },
  { id: 18, name: "Eco Warriors", category: "books", description: "Stories of eco heroes", price: 10, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80" },
  { id: 19, name: "Green Tech", category: "books", description: "Technology for a greener world", price: 15, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: 20, name: "Zero Waste Home", category: "books", description: "How to live zero waste", price: 13, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80" },
  { id: 21, name: "Eco Kids", category: "books", description: "Teaching kids about the environment", price: 8, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: 22, name: "Green Recipes", category: "books", description: "Eco-friendly recipes", price: 14, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80" },
  { id: 23, name: "The Watchers", category: "books", description: "Eco-thriller novel", price: 11, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: 24, name: "Fitness for Earth", category: "books", description: "Eco fitness guide", price: 9, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80" },

  // Watches
  { id: 25, name: "Eco Watch Classic", category: "watch", description: "Watch made from recycled materials", price: 49, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 26, name: "Solar Watch", category: "watch", description: "Solar-powered wristwatch", price: 59, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" },
  { id: 27, name: "Minimalist Watch", category: "watch", description: "Minimalist, eco-friendly watch", price: 39, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 28, name: "Recycled Plastic Watch", category: "watch", description: "Watch made from recycled plastic", price: 29, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" },
  { id: 29, name: "Vintage Watch", category: "watch", description: "Restored vintage watch", price: 99, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 30, name: "Fitness Watch", category: "watch", description: "Fitness tracker with eco band", price: 69, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" },
  { id: 31, name: "Eco Watch Pro", category: "watch", description: "Premium eco-friendly watch", price: 79, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 32, name: "Solar Watch Mini", category: "watch", description: "Compact solar-powered watch", price: 35, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" },

  // Gym and Fitness
  { id: 33, name: "Eco Yoga Mat", category: "gym and fitness", description: "Yoga mat from recycled rubber", price: 25, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", deal: true },
  { id: 34, name: "Bamboo Dumbbells", category: "gym and fitness", description: "Dumbbells made from bamboo", price: 35, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 35, name: "Recycled Jump Rope", category: "gym and fitness", description: "Jump rope from recycled plastic", price: 12, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 36, name: "Eco Water Bottle", category: "gym and fitness", description: "Reusable stainless steel bottle", price: 15, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 37, name: "Fitness Resistance Bands", category: "gym and fitness", description: "Bands from recycled materials", price: 18, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 38, name: "Eco Gym Bag", category: "gym and fitness", description: "Bag from recycled fabrics", price: 22, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 39, name: "Upcycled Towel", category: "gym and fitness", description: "Towel from upcycled cotton", price: 10, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  { id: 40, name: "Eco Protein Shaker", category: "gym and fitness", description: "Shaker from recycled plastic", price: 8, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
];

export default products;
