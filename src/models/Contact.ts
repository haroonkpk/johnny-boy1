// import mongoose, { Schema, models, model } from "mongoose";

// const ContactSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });


// const Contact = models.Contact || model("Contact", ContactSchema);

// export default Contact;
import mongoose, { Schema, models, model, Document } from "mongoose";

// 1. Interface define karein (Data ki shakal)
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// 2. Schema banayein
const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Model export karein
const Contact = models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;