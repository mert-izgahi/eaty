import mongoose, { FilterQuery, Model } from "mongoose";
import NotFoundError from "../errors/NotFound.error";

export interface IMenuItemSchema extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface IMenuItem extends Model<IMenuItemSchema> {
  getAllItems(): Promise<IMenuItemSchema[]>;
  getOneItem(id: string): Promise<IMenuItemSchema>;
  createOneItem(Item: IMenuItemSchema): Promise<IMenuItemSchema>;
  deleteOneItem(query: FilterQuery<IMenuItemSchema>): Promise<IMenuItemSchema | null>;
  updateOneItem(id: string, Item: IMenuItemSchema): Promise<IMenuItemSchema>;
}

const menuItemSchema = new mongoose.Schema({
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
  image: {
    type: String,
    default: "image.jpg",
  },
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

menuItemSchema.statics.getAllItems = async function () {
  const menuItems = await this.find();
  return menuItems;
};

menuItemSchema.statics.createOneItem = async function (Item: IMenuItemSchema) {
  const menuItem = await this.create(Item);
  return menuItem;
};

menuItemSchema.statics.deleteOneItem = async function (query: FilterQuery<IMenuItemSchema>) {
  const menuItem = await this.findByIdAndDelete(query);
  if (!menuItem) {
    throw new NotFoundError(`Menu item with id ${query} not found`);
  }
  return menuItem;
};

menuItemSchema.statics.getOneItem = async function (id: string) {
  const menuItem = await this.findById(id);
  if (!menuItem) {
    throw new NotFoundError(`Menu item with id ${id} not found`);
  }
  return menuItem;
};

menuItemSchema.statics.updateOneItem = async function (
  id: string,
  Item: IMenuItemSchema
) {
  const menuItem = await this.findByIdAndUpdate(id, Item);
  if (!menuItem) {
    throw new NotFoundError(`Menu item with id ${id} not found`);
  }
  return menuItem;
};

const MenuItem = mongoose.model<IMenuItemSchema, IMenuItem>(
  "MenuItem",
  menuItemSchema
);

export default MenuItem;
