import mongoose, { Schema, Document } from "mongoose";

export interface IReviewVideo extends Document {
  name: string;
  role: string;
  videoUrl: string; 
  tag: string;
}

const ReviewVideoSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  videoUrl: { type: String, required: true },
  tag: { type: String, default: "Review" }
}, { timestamps: true });

export default mongoose.models.ReviewVideo || mongoose.model("ReviewVideo", ReviewVideoSchema);