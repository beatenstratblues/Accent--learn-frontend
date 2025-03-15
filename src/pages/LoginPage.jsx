import React from "react";
import AppLogo from "../components/AppLogo";
import hero from "../assets/HeroImage.png"

const LoginPage = () => {
  return (
    <div className="login-container">
        <div className="heroImage"> 
            <img src={hero}/>
        </div>
      <div className="login-box">
        <AppLogo/>
        <h2>Log in</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Email or username" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit" className="login-button">LOG IN</button>
        </form>
        <p className="terms-text">
          By signing in, you agree to our <span className="link">Terms</span> and <span className="link">Privacy Policy</span>. If you do not have an account please <br/><span className="link">Sign up</span>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;