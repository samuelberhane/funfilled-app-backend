const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

// get all posts
router.get("/", getPosts);

// create post
router.post("/", createPost);

// update post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

// update likes
router.put("/like/:id", updatePost);

module.exports = router;
