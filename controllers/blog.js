const Comment = require("../models/comment");
const path = require("path");
const BLOG = require("../models/blog");

async function handleCreateBlog(req, res) {
  const { title, body } = req.body;
  const blog = await BLOG.create({
    body,
    title,
    createdBy: req.user.id, 
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}
async function handlePopulateBlogAndComment(req, res) {
  const blog = await BLOG.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

async function handleCreateComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}
module.exports = {
  handleCreateBlog,
  handlePopulateBlogAndComment,
  handleCreateComment,
};
