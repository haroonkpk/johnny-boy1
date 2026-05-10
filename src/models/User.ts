import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    // Common fields
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "retailer"],
      required: true,
      default: "retailer",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Retailer specific fields
    firstName: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },
    lastName: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },
    phone: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },
    businessName: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },
    storeAddress: {
      type: String,
    },
    monthlyUnitSales: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },
    website: {
      type: String,
    },
    briefIntro: {
      type: String,
      required: function (this: any) {
        return this.role === "retailer";
      },
    },

    // Admin specific fields
    username: {
      type: String,
      required: function (this: any) {
        return this.role === "admin";
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
