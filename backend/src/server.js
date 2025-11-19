//const express = require("express");
import express from "express";
import dotenv from "dotenv";

//import routers
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//to read from .env
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//------endpoints-----

//---auth routes functionality
app.use("/api/auth", authRoutes);
//---message routes
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
