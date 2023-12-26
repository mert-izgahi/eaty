import mongoose, { FilterQuery, Model, QueryOptions } from "mongoose";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";
import { BadRequestError } from "../errors/BadRequest.error";
export interface IUserSchema extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phone: string;
  image: string;
  paymentMethod: string;
  agent: string;
  generateToken(): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUser extends Model<IUserSchema> {
  createUser(User: IUserSchema): Promise<IUserSchema>;
  loginUser(email: string, password: string): Promise<IUserSchema>;
  getUsers(Query: FilterQuery<IUserSchema>): Promise<IUserSchema[]>;
  getOneUser(query: FilterQuery<IUserSchema>): Promise<IUserSchema>;
  getOneUserById(id: string): Promise<IUserSchema>;
  getOneUserByEmail(email: string): Promise<IUserSchema> | null;
  updateUser(
    query: FilterQuery<IUserSchema>,
    User: QueryOptions<IUserSchema>,
    options: QueryOptions
  ): Promise<IUserSchema>;
  deleteUser(query: FilterQuery<IUserSchema>): Promise<IUserSchema | null>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    max: [256, "Name can not be more than 256 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    max: [256, "Email can not be more than 256 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    max: [256, "Password can not be more than 256 characters"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true,
    max: [256, "Role can not be more than 256 characters"],
    enum: {
      values: ["user", "admin"],
      message: "Invalid role",
    },
  },

  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    max: [256, "Address can not be more than 256 characters"],
  },

  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
    max: [256, "Phone can not be more than 256 characters"],
  },

  image: {
    type: String,
    default: "image.jpg",
  },

  paymentMethod: {
    type: String,
    required: [true, "PaymentMethod is required"],
    trim: true,
    max: [256, "PaymentMethod can not be more than 256 characters"],
    enum: {
      values: ["cash", "card"],
      message: "Invalid payment method",
    },
  },

  agent: {
    type: String,
    default: "unknown",
  }
});

userSchema.statics.getUsers = async function (
  query: FilterQuery<IUserSchema> = {}
) {
  const users = await this.find(query);
  return users;
};

userSchema.statics.getOneUser = async function (
  query: FilterQuery<IUserSchema>
) {
  const user = await this.findOne(query);
  if (!user) {
    throw new BadRequestError(`User with id ${query} not found`);
  }
  return user;
};

userSchema.statics.getOneUserById = async function (id: string) {
  const user = await this.findById(id);
  if (!user) {
    throw new BadRequestError(`User with id ${id} not found`);
  }
  return user;
};

// ########## USER STATIC METHODS ##########
userSchema.statics.getOneUserByEmail = async function (email: string) {
  const user = await this.findOne({ email });
  return user ? user : null;
};

userSchema.statics.updateUser = async function (
  query: FilterQuery<IUserSchema>,
  User: IUserSchema,
  options: QueryOptions = { new: true }
) {
  const user = await this.findOneAndUpdate(query, User, options);
  if (!user) {
    throw new BadRequestError(`User with query: ${query} not found`);
  }
  return user;
};

userSchema.statics.deleteUser = async function (
  query: FilterQuery<IUserSchema>
) {
  const user = await this.findByIdAndDelete(query);
  if (!user) {
    throw new Error(`User with id ${query} not found`);
  }
  return user;
};
userSchema.statics.createUser = async function (User: IUserSchema) {
  const user = await this.create(User);
  return user;
};

// ########## USER METHODS ##########
userSchema.methods.generateToken = function () {
  try {
    const token = sign({ id: this._id }, config.get<string>("jwtPrivateKey"), {
      expiresIn: config.get<string>("jwtExpireIn"),
    });
    return token;
  } catch (error) {
    throw new BadRequestError("Could not generate token");
  }
};

userSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// ########## USER MIDDLEWARES ##########
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const saltRounds = config.get<number>("saltRounds");
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model<IUserSchema, IUser>("User", userSchema);

export default User;
