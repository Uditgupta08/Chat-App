const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
