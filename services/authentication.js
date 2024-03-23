const JWT = require("jsonwebtoken");

const SECRET_KEY = "@vengersAssemble@2024";

function createTokenForUser(user) {
  const payload = { 
    id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = JWT.sign(payload, SECRET_KEY);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, SECRET_KEY);
  return payload;
}
module.exports = {
  validateToken,
  createTokenForUser,
};
