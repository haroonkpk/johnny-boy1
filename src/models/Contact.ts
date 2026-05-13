
import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isReplied: boolean;
  repliedAt?: Date;
  replyMessage?: string;
  repliedBy?: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isReplied: { type: Boolean, default: false },
  repliedAt: { type: Date },
  replyMessage: { type: String },
  repliedBy: { type: Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;