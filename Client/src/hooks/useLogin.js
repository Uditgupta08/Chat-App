import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    const isInputValid = handleInputErrors({ username, password });

    if (!isInputValid) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      toast.success(data.message || "Login successful!");
      localStorage.setItem("accessToken", data.accessToken);
      console.log(data.accessToken);
      setIsAuth(data);
      navigate("/");
    } catch (error) {
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        toast.error("Network error. Please check your connection or server.");
      } else {
        toast.error(error.message || "An error occurred. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
