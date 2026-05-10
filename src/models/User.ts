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
      enum: ["admin", "wholesaler"],
      required: true,
      default: "wholesaler",
    },

    // Wholesaler specific fields
    firstName: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
      },
    },
    lastName: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
      },
    },
    phone: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
      },
    },
    businessName: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
      },
    },
    storeAddress: {
      type: String,
    },
    monthlyUnitSales: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
      },
    },
    website: {
      type: String,
    },
    briefIntro: {
      type: String,
      required: function (this: any) {
        return this.role === "wholesaler";
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
