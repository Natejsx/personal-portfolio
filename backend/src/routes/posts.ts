import { Router } from "express";
import {
  getAllPosts,
  getAllPostsAdmin,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllPosts);
router.get("/admin/all", requireAuth, getAllPostsAdmin);
router.get("/:slug", getPostBySlug);
router.post("/", requireAuth, createPost);
router.put("/:slug", requireAuth, updatePost);
router.delete("/:slug", requireAuth, deletePost);

export default router;
