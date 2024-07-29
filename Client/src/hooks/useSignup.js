import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useAuthContext();
  const signup = async ({
    fullname,
    username,
    email,
    phone,
    password,
    profilePic,
  }) => {
    const isInputValid = handleInputErrors({
      fullname,
      username,
      email,
      phone,
      password,
    });

    if (!isInputValid) {
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("profilePic", profilePic);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      const data = await res.json();
      toast.success(data.message || "Signup successful!");
      localStorage.setItem("chat-user", JSON.stringify(data));
      setIsAuth(data);
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

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullname, username, email, phone, password }) {
  if (!fullname || !username || !email || !phone || !password) {
    toast.error("PLEASE FILL ALL THE DETAILS");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  if (!/^\d{10}$/.test(phone)) {
    toast.error("Phone number must be 10 digits");
    return false;
  }
  return true;
}
