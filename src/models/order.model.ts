import mongoose, { FilterQuery, Model, QueryOptions } from "mongoose";
import NotFoundError from "../errors/NotFound.error";

interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export interface IOrderSchema extends mongoose.Document {
  user: string;
  orderItems: IOrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "Türkiye" },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: {
      values: ["Cart", "Stripe", "Cash"],
      message: "Invalid payment method",
    },
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
});

export interface IOrder extends Model<IOrderSchema> {
  getOrders(Query: FilterQuery<IOrderSchema>): Promise<IOrderSchema[]>;
  getOneOrder(id: string): Promise<IOrderSchema>;
  createOneOrder(Order: IOrderSchema): Promise<IOrderSchema>;
  deleteOneOrder(
    query: FilterQuery<IOrderSchema>
  ): Promise<IOrderSchema | null>;
  updateOneOrder(
    query: FilterQuery<IOrderSchema>,
    Order: IOrderSchema,
    options: QueryOptions
  ): Promise<IOrderSchema>;
}

orderSchema.statics.getOrders = async function (
  query: FilterQuery<IOrderSchema> = {}
) {
  const orders = await this.find(query);
  return orders;
};

orderSchema.statics.getOneOrder = async function (
  query: FilterQuery<IOrderSchema>
) {
  const order = await this.findOne(query);
  if (!order) {
    throw new NotFoundError(`Order with id ${query} not found`);
  }
  return order;
};

orderSchema.statics.createOneOrder = async function (Order: IOrderSchema) {
  const order = await this.create(Order);
  return order;
};

orderSchema.statics.deleteOneOrder = async function (
  query: FilterQuery<IOrderSchema>
) {
  const order = await this.findByIdAndDelete(query);
  if (!order) {
    throw new NotFoundError(`Order with id ${query} not found`);
  }
  return order;
};

orderSchema.statics.updateOneOrder = async function (
  query: FilterQuery<IOrderSchema>,
  Order: IOrderSchema,
  options: QueryOptions
){
  const order = await this.findByIdAndUpdate(query, Order, options);
  if (!order) {
    throw new NotFoundError(`Order with id ${query} not found`);
  }
  return order;
}

const Order = mongoose.model<IOrderSchema, IOrder>("Order", orderSchema);

export default Order