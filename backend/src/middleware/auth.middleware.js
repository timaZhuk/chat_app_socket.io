import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    //-- get token from cookies
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    //-- decode the token to the object
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    //-- get the user by decode.userId
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    //--add user to the req
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
