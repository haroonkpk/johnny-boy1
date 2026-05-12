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
    },
    fruits: {
      type: String,
    },
    bg: {
      type: String,
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
if (models.Product) {
  delete models.Product;
}
const Product = model("Product", ProductSchema);

export default Product;
