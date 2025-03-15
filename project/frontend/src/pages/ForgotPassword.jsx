import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../css/Login.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    
    setMessage("A password reset link has been sent to your email.");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="login-button">Send Reset Link</button>
        </form>

        <button className="forgot-password-button" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
