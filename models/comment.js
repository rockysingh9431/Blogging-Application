const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Comment = model("comments", commentSchema);
module.exports = Comment;
