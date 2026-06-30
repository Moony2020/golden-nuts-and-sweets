import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import { Product } from "../models/Product";

const sampleProducts = [
  {
    name: "Premium Raw Almonds",
    slug: "premium-raw-almonds",
    category: "nuts",
    description: "High-quality raw almonds from California. Perfect for restaurants and food businesses.",
    shortDescription: "Premium California almonds",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    originCountry: "USA",
    packaging: "25 kg sacks",
    minimumOrderQuantity: "5 sacks",
    available: true,
    featured: true,
    tags: ["nuts", "raw", "premium"],
  },
  {
    name: "Luxury Roasted Pistachios",
    slug: "luxury-roasted-pistachios",
    category: "pistachio",
    description: "Roasted and salted premium pistachio nuts.",
    shortDescription: "Roasted premium pistachios",
    image: "https://images.unsplash.com/photo-1555529731-4c947099d41b?auto=format&fit=crop&w=600&q=80",
    originCountry: "Iran",
    packaging: "10 kg boxes",
    minimumOrderQuantity: "5 boxes",
    available: true,
    featured: true,
    tags: ["nuts", "pistachios"],
  },
  {
    name: "Jumbo Cashew Nuts",
    slug: "jumbo-cashew-nuts",
    category: "nuts",
    description: "Premium large raw cashew nuts.",
    shortDescription: "Large raw cashews",
    image: "https://images.unsplash.com/photo-1615485925873-7ecbbe90a866?auto=format&fit=crop&w=600&q=80",
    originCountry: "Vietnam",
    packaging: "20 kg boxes",
    minimumOrderQuantity: "5 boxes",
    available: true,
    featured: false,
    tags: ["nuts", "cashews"],
  },
  {
    name: "Mixed Dried Fruits",
    slug: "mixed-dried-fruits",
    category: "dried_fruits",
    description: "A premium blend of tropical and Mediterranean dried fruits.",
    shortDescription: "Premium mixed dried fruits",
    image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=600&q=80",
    originCountry: "Thailand",
    packaging: "10 kg bulk boxes",
    minimumOrderQuantity: "10 boxes",
    available: true,
    featured: true,
    tags: ["dried fruits", "mix"],
  },
  {
    name: "Turkish Dried Apricots",
    slug: "turkish-dried-apricots",
    category: "dried_apricots",
    description: "Soft, sweet, and bright orange dried apricots.",
    shortDescription: "Soft sweet dried apricots",
    image: "https://images.unsplash.com/photo-1595412017587-b7f3117dff54?auto=format&fit=crop&w=600&q=80",
    originCountry: "Turkey",
    packaging: "5 kg trays",
    minimumOrderQuantity: "20 trays",
    available: true,
    featured: false,
    tags: ["apricots", "dried fruits"],
  },
  {
    name: "Golden Sella Basmati Rice",
    slug: "golden-sella-basmati",
    category: "grains_seeds",
    description: "Extra-long grain parboiled basmati rice.",
    shortDescription: "Golden sella basmati",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    originCountry: "India",
    packaging: "39 kg bags",
    minimumOrderQuantity: "10 bags",
    available: true,
    featured: true,
    tags: ["rice", "grains"],
  },
  {
    name: "Pure Saffron Threads",
    slug: "pure-saffron-threads",
    category: "spices",
    description: "Super Negin saffron from Iran. Premium quality for luxury culinary use.",
    shortDescription: "Iranian Super Negin saffron",
    image: "https://images.unsplash.com/photo-1615885108069-7d5bef9a7e22?auto=format&fit=crop&w=600&q=80",
    originCountry: "Iran",
    packaging: "1 / 5 kg",
    minimumOrderQuantity: "500g",
    available: true,
    featured: true,
    tags: ["spices", "saffron"],
  },
  {
    name: "Green Cardamom Jumbo",
    slug: "green-cardamom",
    category: "spices",
    description: "Jumbo green cardamom pods, premium aromatic grade.",
    shortDescription: "Jumbo green cardamom",
    image: "https://images.unsplash.com/photo-1642255521852-7e7c742ac58f?auto=format&fit=crop&w=600&q=80",
    originCountry: "Guatemala",
    packaging: "5 kg boxes",
    minimumOrderQuantity: "10 kg",
    available: true,
    featured: false,
    tags: ["spices", "cardamom"],
  },
  {
    name: "Jumbo Golden Raisins",
    slug: "jumbo-golden-raisins",
    category: "raisins_berries",
    description: "Large, sweet golden raisins for baking and snacking.",
    shortDescription: "Large sweet golden raisins",
    image: "https://images.unsplash.com/photo-1642102903918-b97c37955bbf?auto=format&fit=crop&w=600&q=80",
    originCountry: "Iran",
    packaging: "10 kg boxes",
    minimumOrderQuantity: "10 boxes",
    available: true,
    featured: false,
    tags: ["raisins", "dried fruits"],
  },
  {
    name: "Premium Medjool Dates",
    slug: "premium-medjool-dates",
    category: "dates_figs",
    description: "Large, soft Medjool dates from the Middle East.",
    shortDescription: "Large Medjool dates",
    image: "https://images.unsplash.com/photo-1691657917109-c6e027eac44a?auto=format&fit=crop&w=600&q=80",
    originCountry: "Saudi Arabia",
    packaging: "10 kg boxes",
    minimumOrderQuantity: "5 boxes",
    available: true,
    featured: true,
    tags: ["dates", "medjool"],
  },
  {
    name: "Dried Black Figs",
    slug: "dried-black-figs",
    category: "dates_figs",
    description: "Naturally dried black figs, rich in fiber.",
    shortDescription: "Natural dried figs",
    image: "https://images.unsplash.com/photo-1524593313283-1e092f06b2f0?auto=format&fit=crop&w=600&q=80",
    originCountry: "Turkey",
    packaging: "5 kg boxes",
    minimumOrderQuantity: "10 boxes",
    available: true,
    featured: false,
    tags: ["figs", "dried fruits"],
  },
  {
    name: "Chia Seeds Bulk",
    slug: "chia-seeds-bulk",
    category: "grains_seeds",
    description: "High-quality black chia seeds for health food products.",
    shortDescription: "Bulk black chia seeds",
    image: "https://images.unsplash.com/photo-1604768802835-899055f0e245?auto=format&fit=crop&w=600&q=80",
    originCountry: "Mexico",
    packaging: "25 kg sacks",
    minimumOrderQuantity: "5 sacks",
    available: true,
    featured: false,
    tags: ["seeds", "chia"],
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("✗ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✓ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("✓ Cleared existing products");

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Inserted ${inserted.length} sample products`);

    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("✗ Seed failed:", error);
    process.exit(1);
  }
}

seed();
