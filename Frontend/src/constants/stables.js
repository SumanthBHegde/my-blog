// Configuration for upload folder base URL
// With Cloudinary integration, images are stored with full URLs
// So we don't need to prepend any base URL

// For backwards compatibility with old local uploads (if any exist)
const UPLOAD_FOLDER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Cloudinary URLs are complete, no prefix needed
    : "http://localhost:5000/uploads/";

const stables = { UPLOAD_FOLDER_BASE_URL };

export default stables;
