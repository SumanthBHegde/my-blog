import fs from "fs";
import path from "path";

import { getGlobals } from "common-es";

const { __dirname } = getGlobals(import.meta.url);

/**
 * Function to remove a file from the filesystem.
 */
const fileRemover = (filename) => {
  // Construct the absolute path to the file using __dirname and "../uploads"
  const filePath = path.join(__dirname, "../uploads", filename);

  // Remove the file from the filesystem
  fs.unlink(filePath, function (err) {
    if (err && err.code == "ENOENT") {
      // If the file doesn't exist, log a message
      console.log(`File ${filename} doesn't exist, won't remove it.`);
    } else if (err) {
      // If an error occurs during file removal, log the error message
      console.log(err.message);
      console.log(`Error occurred while trying to remove file ${filename}`);
    } else {
      // If file removal is successful, log a success message
      console.log(`Removed ${filename}`);
    }
  });
};

export { fileRemover };
