const USER = require("../models/user");

async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;
  await USER.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const token = await USER.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
}

async function handleUserLogout(req, res) {
  res.clearCookie("token").redirect("/");
}
module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
};
