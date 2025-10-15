import fs from "fs/promises"; // Import the promise-based fs API
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Function to remove a file from the filesystem asynchronously.
 */
const fileRemover = async (filename) => {
  // Construct the absolute path to the file
  const filePath = path.join(__dirname, "../uploads", filename);

  try {
    await fs.unlink(filePath); // Use await for async unlink operation
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist, ignore
    } else {
      // Error occurred, but don't log in production
    }
  }
};

export { fileRemover };
