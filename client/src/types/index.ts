export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export interface ICartItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  image: string;
  paymentMethod: string;
  agent: string;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  _id?: string;
  user: string;
  orderItems: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
