const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  console.log("🔥 Received Token:", token); // 👀 check karo console me

  if (!token) {
    return res.status(401).json({ error: "❌ Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.user?.id || decoded.UserInfo?.id);
    if (!user) return res.status(404).json({ error: "❌ User not found" });

    req.user = user; // ✅ full user

    next();
  } catch (err) {
    console.log("❌ JWT Error:", err.message);
    return res.status(401).json({ error: "❌ Invalid token" });
  }
};

module.exports = fetchUser;
