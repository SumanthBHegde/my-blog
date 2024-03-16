import multer from "multer";
import path from "path";
import { getGlobals } from "common-es";

const { __dirname } = getGlobals(import.meta.url);

/**
 * Multer storage configuration for uploading pictures.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for storing uploaded pictures
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded picture
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * Multer middleware configuration for uploading pictures.
 */
const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB
  },
  fileFilter: function (req, file, cb) {
    // Check the file extension to allow only images with .png, .jpg, or .jpeg extensions
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

export { uploadPicture };
