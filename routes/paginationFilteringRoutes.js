import express from "express";
import User from "../models/userModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get Users with Pagination & Filtering
router.get("/", authMiddleware, async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  try {
    const users = await User.find({ name: { $regex: search, $options: "i" } })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
