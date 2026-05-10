const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

// Minimal schema for seeding (or we could import, but importing TS into JS/TS script can be tricky without config)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: "pending" },
  firstName: String,
  lastName: String,
  phone: String,
  businessName: String,
  storeAddress: String,
  monthlyUnitSales: String,
  website: String,
  briefIntro: String,
  username: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const retailerPassword = await bcrypt.hash("retailer123", 10);

    const users = [
      {
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        status: "approved",
        username: "admin_user",
      },
      {
        email: "retailer@example.com",
        password: retailerPassword,
        role: "retailer",
        status: "pending",
        firstName: "John",
        lastName: "Doe",
        phone: "+92 300 1234567",
        businessName: "JD Retail",
        storeAddress: "123 Market St, Karachi",
        monthlyUnitSales: "500",
        website: "https://jdretail.com",
        briefIntro: "A leading retailer of electronics.",
      },
    ];

    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        await User.create(u);
        console.log(`Created user: ${u.email} (${u.role})`);
      } else {
        console.log(`User already exists: ${u.email}`);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
