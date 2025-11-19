//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import path from "path";

//import routers
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//to read from .env
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//D:\1AProjects2025\NodeFull2025\NodeRepeating2026\ChatApp\backend
const __dirname = path.resolve();

//------endpoints-----

//---auth routes functionality
app.use("/api/auth", authRoutes);
//---message routes
app.use("/api/messages", messageRoutes);

//make ready for deployment
//serve as frontend as static folder in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //all routes will be resolved by "index.html"
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(__dirname);
});
