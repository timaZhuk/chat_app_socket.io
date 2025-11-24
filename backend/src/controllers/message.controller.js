import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

//----GET ALL CONTACTS
export const getAllContacts = async (req, res) => {
  try {
    //--- chat's owner Id
    const loggedInUserId = req.user.id;

    //--- in contacts only other users id
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

//--GET ALL MESSAGES
export const getMessagesByUserId = async (req, res) => {
  try {
    //authenticated user id
    const myId = req.user._id;

    //id of a user with whom you are chatting
    const { id: userToChatId } = req.params;

    //filter messages where: senderId:authenticated user and recevierId:chat app user
    //and vice versa
    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    // --- message body
    const { text, image } = req.body;

    //--- id of receiver
    const { id: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself" });
    }
    //----
    const receiverExists = await User.exists({ _id: receiverId });
    //-----
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    //--sender id
    const senderId = req.user.id;
    let imageUrl;
    if (image) {
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    //--save mesage in DB
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    //----
    await newMessage.save();
    res.status(201).json(newMessage);

    //todo: send message in real-time if user is online
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//--get Chats
export const getChatPartners = async (req, res) => {
  try {
    //authentificated uder
    const loggedInUserId = req.user.id;

    //find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    //get the chats users id
    //if iam sender we return receiverIds
    //if iam receiver we return senderIds
    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    //get users from DB by messages ids
    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in chatPartners controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
