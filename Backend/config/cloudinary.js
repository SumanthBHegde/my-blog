import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration for blog post images
const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
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
  },
});

// Storage configuration for user profile avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
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
