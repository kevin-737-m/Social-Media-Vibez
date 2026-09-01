const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, deletePost, likePost, commentPost } = require("../controllers/post.controllers");
const authMiddleware = require("../middleware/middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", authMiddleware, getAllPosts);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

module.exports = router;
