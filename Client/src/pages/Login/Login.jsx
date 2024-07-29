import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import styles from "./Login.module.css";

const Login = () => {
  const { login, loading } = useLogin();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <input
          className={styles.btn}
          type="submit"
          value="Login"
          disabled={loading}
        />
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
};

export default Login;
