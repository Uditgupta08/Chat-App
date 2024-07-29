// const User = require("../models/userModel");
// const upload = require("../middlewares/upload");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const registerUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     const newUser = new User(userData);
//     await newUser.save();
//     res.status(200).json({ userData });
//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(400).json({ error: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "USER NOT FOUND" });
//     }
//     const isMatch = await user.comparePass(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "PASSWORD IS INCORRECT" });
//     }
//     const accessToken = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });
//     res.cookie("accessToken", accessToken);
//     res.status(200).json({
//       message: "USER LOGGED IN SUCCESSFULLY",
//       accessToken: accessToken,
//     });
//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(400).json({ message: "SERVER ERROR" });
//   }
// };

// const logoutUser = async (req, res) => {
//   res.clearCookie("accessToken");
//   res.status(200).json({ message: "USER LOGGED OUT SUCCESSFULLY" });
// };

// const updateUser = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(400).json({ message: "SERVER ERROR" });
//     }
//     const { username, fullname, password } = req.body;
//     const profilePic = req.file ? req.file.path : req.body.existingImage;
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "USER NOT FOUND" });
//       }
//       user.username = username || user.username;
//       user.fullname = fullname || user.fullname;
//       if (password) {
//         user.password = password;
//       }
//       user.profilePic = profilePic;
//       await user.save();
//       res.status(200).json({ message: "Profile Updated" });
//     } catch (err) {
//       console.error(err);
//       return res.status(400).json({ message: "SERVER ERROR" });
//     }
//   });
// };

// const changePassword = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { currentPassword, newPassword } = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "USER NOT FOUND" });
//     }
//     const isMatch = await user.comparePass(currentPassword);
//     if (!isMatch) {
//       return res.status(400).json({ message: "CURRENT PASSWORD IS INCORRECT" });
//     }
//     user.password = newPassword;
//     await user.save();
//     res.status(200).json({ message: "PASSWORD UPDATED SUCCESSFULLY" });
//   } catch (err) {
//     console.error("ERROR:", err);
//     res.status(400).json({ message: "SERVER ERROR" });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { password } = req.body;
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "USER NOT FOUND" });
//     }
//     const isMatch = await user.comparePass(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "PASSWORD IS INCORRECT" });
//     }
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "USER DELETED SUCCESSFULLY" });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "SERVER ERROR" });
//   }
// };
// const getfriends = async (req, res) => {
//   try {
//     const loggedInUser = req.user._id;
//     const friends = await User.find({ _id: { $ne: loggedInUser } }).select(
//       "-password"
//     );
//     res.status(200).json(friends);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "GET FRIENDS ERROR" });
//   }
// };
// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
//   updateUser,
//   changePassword,
//   deleteUser,
//   getfriends,
// };
const User = require("../models/userModel");
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Image upload error" });
    }

    const { fullname, username, email, phone, password } = req.body;
    const profilePic = req.file ? req.file.path : "";

    try {
      if (!fullname || !username || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res
          .status(400)
          .json({ error: "Phone number is already in use" });
      }
      const newUser = new User({
        fullname,
        username,
        email,
        phone,
        password,
        profilePic,
      });

      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      console.log("ERROR:", err);
      res.status(400).json({ error: err.message });
    }
  });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "USER NOT FOUND" });
    }
    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return res.status(400).json({ message: "PASSWORD IS INCORRECT" });
    }
    const accessToken = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("accessToken", accessToken);
    res.status(200).json({
      message: "USER LOGGED IN SUCCESSFULLY",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).json({ message: "SERVER ERROR" });
  }
};

const logoutUser = async (req, res) => {
  console.log("Logout request received");
  res.clearCookie("accessToken", { path: "/" });
  console.log("accessToken cookie cleared");
  res.status(200).json({ message: "USER LOGGED OUT SUCCESSFULLY" });
};

const updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "SERVER ERROR" });
    }
    const { username, fullname, password } = req.body;
    const profilePic = req.file ? req.file.path : req.body.existingImage;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "USER NOT FOUND" });
      }
      user.username = username || user.username;
      user.fullname = fullname || user.fullname;
      if (password) {
        user.password = password;
      }
      user.profilePic = profilePic;
      await user.save();
      res.status(200).json({ message: "Profile Updated" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "SERVER ERROR" });
    }
  });
};

const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    const isMatch = await user.comparePass(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "CURRENT PASSWORD IS INCORRECT" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "PASSWORD UPDATED SUCCESSFULLY" });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(400).json({ message: "SERVER ERROR" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return res.status(400).json({ message: "PASSWORD IS INCORRECT" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "USER DELETED SUCCESSFULLY" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "SERVER ERROR" });
  }
};

const getFriends = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const friends = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(friends);
  } catch (err) {
    console.error("GET FRIENDS ERROR:", err);
    res.status(400).json({ message: "GET FRIENDS ERROR" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const searchRegex = new RegExp(query, "i");
    const users = await User.find({
      $or: [{ username: searchRegex }, { phone: searchRegex }],
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    console.error("Error in searchUsers controller:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
  deleteUser,
  getFriends,
  searchUsers,
};
