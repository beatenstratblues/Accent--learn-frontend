import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../signup.css'; // Import the separate CSS file
import AppLogo from '../components/AppLogo';
import greenBird from '../assets/GreenBird2.png'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted:', formData);
  };

  // Simple password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  return (
    <div className="signup-container">
      <div className="hero-image">
        <img src={greenBird} alt="3D Character with laptop" />
      </div>
      
      <div className="signup-box">
        <AppLogo/>
        
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
          
          {formData.password && formData.confirmPassword && 
           formData.password !== formData.confirmPassword && (
            <div className="error-message">Passwords do not match</div>
          )}
          
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        
        <p className="terms-text">
          By signing up, you agree to our <span className="link">Terms</span> and{' '}
          <span className="link">Privacy Policy</span>.<br />
          Already have an account?{' '}
          <Link to="/login" className="link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;