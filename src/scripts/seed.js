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
    const wholesalerPassword = await bcrypt.hash("wholesaler123", 10);

    const users = [
      {
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        username: "admin_user",
      },
      {
        email: "wholesaler@example.com",
        password: wholesalerPassword,
        role: "wholesaler",
        firstName: "John",
        lastName: "Doe",
        phone: "+92 300 1234567",
        businessName: "JD Wholesale",
        storeAddress: "123 Market St, Karachi",
        monthlyUnitSales: "500",
        website: "https://jdwholesale.com",
        briefIntro: "A leading wholesaler of electronics.",
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
