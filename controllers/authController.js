import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

import Auth from "../models/authModel.js";

// Register User
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password} = req.body;
  
    try {
      let user = await Auth.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new Auth({ name, email, password: hashedPassword });
  
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error("❌ Server Error:", error);  // Log the actual error
      res.status(500).json({ message: "Server error" });
    }
  };

export const loginUser = async(req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await Auth.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};


  
