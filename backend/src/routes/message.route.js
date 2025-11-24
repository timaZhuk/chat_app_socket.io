import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//-----routes---
//middleware
//router.use(arcjetProtection);
router.use(protectRoute);

//--get all contacts
router.get("/contacts", getAllContacts);

//--get all Chats
router.get("/chats", getChatPartners);

//--get messages with particular user
router.get("/:id", getMessagesByUserId);

//--send message
router.post("/send/:id", sendMessage);

//---
export default router;
