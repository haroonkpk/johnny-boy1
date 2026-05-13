import mongoose, { Schema, Document } from "mongoose";

// Cart item structure jo order ke andar store hoga
interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  customerName: string;
  email: string;
  items: IOrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true}, // Retailer min order validation
      image: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

// Model export (Next.js compatibility ke liye check)
export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);