const mongoose = require("mongoose");

// create post schema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    creator: {
      type: String,
    },
    tags: {
      type: [String],
    },
    selectedImage: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
