import mongoose from "mongoose";

export interface IMenuItem extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

export default mongoose.model<IMenuItem>("MenuItem", menuItemSchema);
