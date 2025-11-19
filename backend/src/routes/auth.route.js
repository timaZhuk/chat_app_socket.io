import express from "express";

const router = express.Router();

//-----routes
//---sign up
router.get("/signup", (req, res) => {
  res.send("Signup endpoint");
});

//---login
router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

//----Logout
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

export default router;
