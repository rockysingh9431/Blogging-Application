require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const staticRouter = require("./routes/staticRouter");
const blogRouter = require("./routes/blogRouter");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then((e) => {  
  console.log("mongoDB is Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
