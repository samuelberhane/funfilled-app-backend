const Post = require("../models/postModel");
const mongoose = require("mongoose");

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body });
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// update and like post
const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Post Id!" });
  }
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    if (!updatePost) {
      return res.status(404).json({ error: "No Post Found With This Id!" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Post Id!" });
  }
  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
