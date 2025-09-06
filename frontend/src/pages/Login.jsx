import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/pages/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await authService.login(email, password);
    console.log(res);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-subtext">
        Don't have an account?{' '}
        <span
          className="login-link"
          onClick={() => navigate("/signup")}
        >
          Create a free account
        </span>
      </div>
      <form onSubmit={handleLogin}>
        <div className="login-label-row">
          <label htmlFor="login-email" className="login-label">Enter username</label>
        </div>
        <input
          id="login-email"
          type="email"
          placeholder="Enter Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="login-label-row">
          <label htmlFor="login-password" className="login-label">Enter Password</label>
          <span
            className="login-link login-forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forget password?
          </span>
        </div>
        <input
          id="login-password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
