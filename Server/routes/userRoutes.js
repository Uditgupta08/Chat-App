const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
  deleteUser,
  getFriends,
  searchUsers,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authRoute");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/update/:id", updateUser);
router.post("/change-password/:userId", changePassword);
router.post("/delete/:id", deleteUser);
router.get("/friends", verifyToken, getFriends);
router.get("/search", verifyToken, searchUsers);

module.exports = router;
