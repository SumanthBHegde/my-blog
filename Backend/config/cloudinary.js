import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables HERE in this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

// Debug: Log to verify env variables are loaded (comment out in production)
// console.log(
//   "Cloudinary Config - Cloud Name:",
//   process.env.CLOUDINARY_CLOUD_NAME ? "✓" : "✗"
// );
// console.log(
//   "Cloudinary Config - API Key:",
//   process.env.CLOUDINARY_API_KEY ? "✓" : "✗"
// );
// console.log(
//   "Cloudinary Config - API Secret:",
//   process.env.CLOUDINARY_API_SECRET ? "✓" : "✗"
// );

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration for blog post images with explicit credentials
const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "blog/posts",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
      transformation: [
        {
          width: 1200,
          height: 630,
          crop: "limit",
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    };
  },
});

// Storage configuration for user profile avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "blog/avatars",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        {
          width: 400,
          height: 400,
          crop: "fill",
          gravity: "face",
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    };
  },
});

// Create multer upload instances with file size limits
export const uploadPostPicture = multer({
  storage: postStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max
  },
});

// Export cloudinary instance for deletion operations
export { cloudinary };
