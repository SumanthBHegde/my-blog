import express from "express";
const router = express.Router();

import {
  createComment,
  deleteComment,
  updateComment,
  getAllComments,
} from "../controllers/commentControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
