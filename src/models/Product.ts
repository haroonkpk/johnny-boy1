import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  series: 'local' | 'regular';
  price: number;
  image: string;
  bg: string;
  fruits: string; // Flavor icon path
  comingSoon: boolean;
  minOrder: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  series: { type: String, enum: ['local', 'regular'], required: true },
  price: { type: Number, default: 15.0 },
  image: { type: String, required: true },
  bg: { type: String, required: true },
  fruits: { type: String, required: true },
  comingSoon: { type: Boolean, default: false },
  minOrder: { type: Number, default: 10 },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);