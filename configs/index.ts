import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "test") {
  dotenv.config({ path: "../.env.test" });
}

if (NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
}

export default {
  port: Number(process.env.PORT) || 3000,
  mongoUrl: process.env.MONGO_URL,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  stripeBackendKey: process.env.STRIPE_BACKEND_KEY,
  stripeFrontendKey: process.env.STRIPE_FRONTEND_KEY,
};
