const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const verifyToken = require("../middlewares/authRoute");

router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessage);

module.exports = router;
