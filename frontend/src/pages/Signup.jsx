import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/pages/signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await authService.signup(email, password);
    console.log(res);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <div className="signup-subtext">
        Already have an account?{' '}
        <span
          className="signup-link"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
      <form onSubmit={handleSignup}>
        <div className="signup-label-row">
          <label htmlFor="signup-email" className="signup-label">Enter email</label>
        </div>
        <input
          id="signup-email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="signup-label-row">
          <label htmlFor="signup-password" className="signup-label">Enter Password</label>
        </div>
        <input
          id="signup-password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
