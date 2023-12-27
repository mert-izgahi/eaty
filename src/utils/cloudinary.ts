import { v2 as cloudinary } from "cloudinary";
import config from "../../configs";

export default function cloudinaryUpload(tempPath: string): Promise<any> {
  // Configure cloudinary storage with the credentials
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return cloudinary.uploader.upload(tempPath, {
    use_filename: true,
    folder: config.cloudinaryFolder,
  });
}
