const { Router } = require("express");
const router = Router();
const {
  handleCreateBlog,
  handlePopulateBlogAndComment,
  handleCreateComment,
} = require("../controllers/blog");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/addblog", upload.single("coverImage"), handleCreateBlog);

router.get("/:id", handlePopulateBlogAndComment);

router.post("/comment/:blogId", handleCreateComment);

module.exports = router;
