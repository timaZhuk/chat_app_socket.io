import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

//-----routes
//---sign up --> POST
router.post("/signup", signup);

//---login
router.post("/login", login);

//----Logout
router.post("/logout", logout);

export default router;
