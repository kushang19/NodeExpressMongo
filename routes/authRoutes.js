import express from "express";
const router = express.Router();
import {body, validationResult} from "express-validator";

import {registerUser,loginUser} from "../controllers/authController.js";

router.post("/register",[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a vaild email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters"),
],registerUser);

router.post("/login",loginUser);

export default router;
