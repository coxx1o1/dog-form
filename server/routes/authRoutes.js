import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password } = req.body;

  // Use an environment variable for password in development/simple admin setup
  // IMPORTANT: For production, integrate with a secure user management system (e.g., database with hashed passwords)
  const ADMIN_PASSWORD_DEV = process.env.ADMIN_PASSWORD_DEV;

  if (!ADMIN_PASSWORD_DEV) {
    console.error("ADMIN_PASSWORD_DEV is not set in environment variables. Login check will always fail.");
    return res.status(500).json({ message: "Server configuration error: Admin password not set." });
  }

  if (password !== ADMIN_PASSWORD_DEV) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
