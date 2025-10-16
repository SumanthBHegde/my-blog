/**
 * Image URL Utilities
 * Helper functions for handling Cloudinary and local image URLs
 */

import { stables } from "../constants";

/**
 * Get the complete image URL
 * Handles both Cloudinary URLs (complete) and local paths (need base URL)
 *
 * @param {string} imagePath - Image path from API (could be Cloudinary URL or local path)
 * @param {string} fallback - Fallback image if imagePath is empty
 * @returns {string} Complete image URL
 */
export const getImageUrl = (imagePath, fallback = "") => {
  // If no image path, return fallback
  if (!imagePath) return fallback;

  // If it's already a complete URL (Cloudinary), return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Otherwise, prepend the base URL for local images
  return stables.UPLOAD_FOLDER_BASE_URL + imagePath;
};

/**
 * Check if an image is from Cloudinary
 *
 * @param {string} imageUrl - Image URL to check
 * @returns {boolean} True if image is from Cloudinary
 */
export const isCloudinaryImage = (imageUrl) => {
  return imageUrl && imageUrl.includes("cloudinary.com");
};

/**
 * Get optimized Cloudinary URL with transformations
 *
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getOptimizedCloudinaryUrl = (imageUrl, options = {}) => {
  if (!isCloudinaryImage(imageUrl)) return imageUrl;

  const {
    width = null,
    height = null,
    quality = "auto",
    format = "auto",
  } = options;

  // Build transformation string
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformString = transformations.join(",");

  // Insert transformation into Cloudinary URL
  // Cloudinary URLs have format: .../upload/v12345/path
  // We need to insert transformations after /upload/
  return imageUrl.replace("/upload/", `/upload/${transformString}/`);
};

const imageUtils = {
  getImageUrl,
  isCloudinaryImage,
  getOptimizedCloudinaryUrl,
};

export default imageUtils;
