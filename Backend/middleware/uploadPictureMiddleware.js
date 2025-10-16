// Import Cloudinary upload configurations
import { uploadPostPicture, uploadAvatar } from "../config/cloudinary.js";

/**
 * Export Cloudinary upload middleware
 * These will be used in controllers for handling image uploads
 */
export const uploadPicture = uploadPostPicture;
export const uploadProfilePicture = uploadAvatar;
