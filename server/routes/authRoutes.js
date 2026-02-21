import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password } = req.body;

  // For now simple check (you can upgrade later)
  if (password !== "admin123") {
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
