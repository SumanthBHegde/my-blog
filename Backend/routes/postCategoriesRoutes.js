import express from "express";
const router = express.Router();

import {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategory,
} from "../controllers/postCategCont.js";

import { adminGuard, authGuard } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route("/:postCategoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

export default router;
