const jwt = require("jsonwebtoken");
const { JWT_SECRET, isProduction } = require("../config/env");

// Cross-site cookies (frontend and API on different domains) must be
// SameSite=None and Secure, and clearing them needs the same attributes.
const cookieOptions = {
  httpOnly: true, // Prevent XSS
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
};

const setAuthCookie = (res, userId) => {
  const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    ...cookieOptions,
    expires: new Date(Date.now() + 8 * 3600000), // 8 hours
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", cookieOptions);
};

const verifyAuthToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { setAuthCookie, clearAuthCookie, verifyAuthToken };
