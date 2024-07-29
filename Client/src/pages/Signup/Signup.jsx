import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    profilePic: null,
  });

  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileChange = (e) => {
    setInputs({ ...inputs, profilePic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={inputs.fullname}
            onChange={handleChange}
            required
          />
          <label htmlFor="fullname">Full Name</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="text"
            id="phone"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            required
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
          />
          <label htmlFor="profilePic">Profile Picture</label>
        </div>
        <input
          className={styles.btn}
          type="submit"
          value="Signup"
          disabled={loading}
        />
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default Signup;
