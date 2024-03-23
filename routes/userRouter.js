const { Router } = require("express");
const router = Router();
const USER = require("../models/user");
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await USER.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await USER.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
