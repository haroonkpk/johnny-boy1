import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    fruits: {
      type: String,
      required: [true, "Fruits image is required"],
    },
    bg: {
      type: String,
      required: [true, "Background image is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
    series: {
      type: String,
      enum: ["local", "regular"],
      required: true,
      default: "regular",
    },
    comingSoon: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Triggering model rebuild for new fields
const Product = models.Product || model("Product", ProductSchema);

export default Product;
