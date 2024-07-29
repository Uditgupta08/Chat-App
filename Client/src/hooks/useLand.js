import { useState, useEffect } from "react";
import axios from "axios";

const useLand = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getAccessToken = () => {
    const accessToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1] || null;
    return accessToken;
  };

  const fetchUsers = async (query) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/user/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get(
        `http://localhost:3000/message/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const accessToken = getAccessToken();
      const response = await axios.post(
        `http://localhost:3000/message/send/${selectedUser._id}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    users,
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    messages,
    newMessage,
    setNewMessage,
    fetchUsers,
    fetchMessages,
    handleSendMessage,
  };
};

export default useLand;
