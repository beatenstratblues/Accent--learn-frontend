import React, { useState } from "react";
import AppLogo from "../components/AppLogo";
import hero from "../assets/HeroImage.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token); // Store token for authentication
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="heroImage">
        <img src={hero} />
      </div>
      <div className="login-box">
        <AppLogo />
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
        <p className="terms-text">
          By signing in, you agree to our <span className="link">Terms</span>{" "}
          and <span className="link">Privacy Policy</span>. If you do not have
          an account please <br />
          <span className="link">Sign up</span>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
