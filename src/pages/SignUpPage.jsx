import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../signup.css"; // Import the separate CSS file
import AppLogo from "../components/AppLogo";
import greenBird from "../assets/GreenBird2.png";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        localStorage.setItem("token", data.token); // Store token for authentication
        alert("Signup successful!");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // Simple password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  return (
    <div className="signup-container">
      <div className="hero-image">
        <img src={greenBird} alt="3D Character with laptop" />
      </div>

      <div className="signup-box">
        <AppLogo />

        <h2>Create Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email or username"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {formData.password && (
            <div className="password-strength">
              <div className={`strength-meter ${passwordStrength}`}></div>
            </div>
          )}

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <div className="error-message">Passwords do not match</div>
            )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signup-button">
            SIGN UP
          </button>
        </form>

        <p className="terms-text">
          By signing up, you agree to our <span className="link">Terms</span>{" "}
          and <span className="link">Privacy Policy</span>.<br />
          Already have an account?{" "}
          <Link to="/login" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
