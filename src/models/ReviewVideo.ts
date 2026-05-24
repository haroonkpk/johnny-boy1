import mongoose, { Schema, Document } from "mongoose";

export interface IReviewVideo extends Document {
  name: string;
  role: string;
  videoUrl: string; 
  thumbnailUrl: string;
  tag: string;
  publicId?: string;
  thumbnailPublicId?: string;
}

const ReviewVideoSchema = new Schema({
  name: { type: String, default: "" },
  role: { type: String, default: "" },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  tag: { type: String, default: "Review" },
  publicId: { type: String },
  thumbnailPublicId: { type: String }
}, { timestamps: true });

export default mongoose.models.ReviewVideo || mongoose.model("ReviewVideo", ReviewVideoSchema);