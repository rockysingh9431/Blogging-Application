const { Router } = require("express");
const BLOG = require("../models/blog");
const router = Router();
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.user);
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/addblog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  console.log(title, body);
  console.log(req.file);
  const blog = await BLOG.create({
    body,
    title,
    createdBy: req.user.id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await BLOG.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log(comments); 
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
