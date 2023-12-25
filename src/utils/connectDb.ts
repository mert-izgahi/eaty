import mongoose from "mongoose";

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log(` Connected to MongoDB`);
  } catch (error) {
    console.log(error);
  }
};
