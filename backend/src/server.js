//const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";

import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";

//import routers
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//to read from .env

const PORT = ENV.PORT || 3000;

const app = express();

//D:\1AProjects2025\NodeFull2025\NodeRepeating2026\ChatApp\backend
const __dirname = path.resolve();

//------Middleware-----
app.use(express.json()); //get access to the fields of req.body
app.use(cookieParser()); //reading the cookies from req body

//------endpoints-----

//---auth routes functionality
app.use("/api/auth", authRoutes);
//---message routes
app.use("/api/messages", messageRoutes);

//make ready for deployment
//serve as frontend as static folder in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //all routes will be resolved by "index.html"
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
  console.log(__dirname);
});
