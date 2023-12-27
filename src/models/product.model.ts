import mongoose, { FilterQuery, Model, Query, QueryOptions } from "mongoose";
import NotFoundError from "../errors/NotFound.error";

export interface IProductSchema extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export interface IProduct extends Model<IProductSchema> {
  getProducts(Query: FilterQuery<IProductSchema>): Promise<IProductSchema[]>;
  getOneProduct(id: string): Promise<IProductSchema>;
  createOneProduct(Product: IProductSchema): Promise<IProductSchema>;
  deleteOneProduct(
    query: FilterQuery<IProductSchema>
  ): Promise<IProductSchema | null>;
  updateOneProduct(
    id: string,
    Product: IProductSchema
  ): Promise<IProductSchema>;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    max: [256, "Name can not be more than 256 characters"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    max: [512, "Description can not be more than 512 characters"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price can not be negative"],
  },

  images: [
    {
      type: String,
      required: [true, "Image is required"],
      trim: true,
      max: [256, "Image can not be more than 256 characters"],
    },
  ],

  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    max: [256, "Category can not be more than 256 characters"],
    enum: {
      values: ["starter", "main course", "dessert"],
      message: "Invalid category",
    },
  },

});

productSchema.statics.getProducts = async function (
  query: FilterQuery<IProductSchema> = {}
) {
  const products = await this.find(query);
  return products;
};

productSchema.statics.createOneProduct = async function (
  Product: IProductSchema
) {
  const product = await this.create(Product);
  return product;
};

productSchema.statics.deleteOneProduct = async function (
  query: FilterQuery<IProductSchema>
) {
  const product = await this.findByIdAndDelete(query);
  if (!product) {
    throw new NotFoundError(`Product with id ${query} not found`);
  }
  return product;
};

productSchema.statics.getOneProduct = async function (id: string) {
  const product = await this.findById(id);
  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  return product;
};

productSchema.statics.updateOneProduct = async function (
  id: string,
  Product: IProductSchema,
  options: QueryOptions = { new: true }
) {
  const product = await this.findByIdAndUpdate(id, Product, options);
  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  return product;
};

const Product = mongoose.model<IProductSchema, IProduct>(
  "Product",
  productSchema
);

export default Product;
