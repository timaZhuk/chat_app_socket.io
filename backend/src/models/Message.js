//who is sender, reciever, message has text or image
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tex: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

//--
const Message = mongoose.model("Message", messageSchema); //messages

//---
export default Message;
