const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postsController");

// get all posts
router.get("/", getPosts);

// create post
router.post("/", requireAuth, createPost);

// update post
router.put("/:id", requireAuth, updatePost);

// delete post
router.delete("/:id", requireAuth, deletePost);

// update likes
router.put("/like/:id", requireAuth, likePost);

module.exports = router;
