import fs from "fs/promises"; // Import the promise-based fs API
import path from "path";

import { getGlobals } from "common-es";

const { __dirname } = getGlobals(import.meta.url);

/**
 * Function to remove a file from the filesystem asynchronously.
 */
const fileRemover = async (filename) => {
  // Construct the absolute path to the file
  const filePath = path.join(__dirname, "../uploads", filename);

  try {
    await fs.unlink(filePath); // Use await for async unlink operation
    console.log(`Removed ${filename}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`File ${filename} doesn't exist, won't remove it.`);
    } else {
      console.error(
        `Error occurred while trying to remove file ${filename}:`,
        err
      );
      // Consider re-throwing or handling the error as needed
    }
  }
};

export { fileRemover };
