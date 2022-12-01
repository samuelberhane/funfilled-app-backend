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
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
