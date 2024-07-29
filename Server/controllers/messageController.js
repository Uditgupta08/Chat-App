const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { message } = req.body;
    const { id: receiverId } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      conversationId: conversation._id,
    });
    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();
    res.status(201).json({ message: newMessage });
  } catch (err) {
    console.error("ERROR IN SEND MESSAGE CONTROLLER : ", err);
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (err) {
    console.error("ERROR IN GET MESSAGES CONTROLLER : ", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
