const { Router } = require("express");
const router = Router();
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user");

router.post("/signup", handleUserSignUp);

router.post("/login", handleUserLogin);

router.get("/logout", handleUserLogout);

module.exports = router;
