import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      console.log("Sending logout request...");
      const res = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Response received:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setIsAuth(null);
      console.log("Logout successful");
    } catch (error) {
      toast.error(error.message);
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
