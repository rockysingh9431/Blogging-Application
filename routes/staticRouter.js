const { Router } = require("express");
const BLOG = require("../models/blog");
const router = Router();

router.get("/", async (req, res) => {
  const allBlogs = await BLOG.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

router.get("/addblog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
