import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

//-----routes
//---sign up --> POST
router.post("/signup", signup);

//---login
router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

//----Logout
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

export default router;
