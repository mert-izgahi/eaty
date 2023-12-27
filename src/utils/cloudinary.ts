import { v2 as cloudinary } from "cloudinary";
import config from "config";

export default function cloudinaryUpload(tempPath: string): Promise<any> {
  // Configure cloudinary storage with the credentials
  cloudinary.config({
    cloud_name: config.get<string>("cloudinaryCloudName"),
    api_key: config.get<string>("cloudinaryApiKey"),
    api_secret: config.get<string>("cloudinaryApiSecret"),
  });

  return cloudinary.uploader.upload(tempPath, {
    use_filename: true,
    folder: config.get<string>("cloudinaryFolder"),
  });
}
