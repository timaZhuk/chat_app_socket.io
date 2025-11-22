import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//-----routes
//---sign up --> POST
router.post("/signup", signup);

//---login
router.post("/login", login);

//----Logout
router.post("/logout", logout);

//--update profile
router.put("/update-profile", protectRoute, updateProfile);

//--check if user authenticated
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);

export default router;
