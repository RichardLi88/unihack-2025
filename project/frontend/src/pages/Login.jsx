import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/login-animation.json";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    if (email === "user@example.com" && password === "password123") {
      alert("Login successful!");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = () => {
    window.location.href = "/ForgotPassword.jsx";
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0, y: -30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className="login-title-main"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Allocate++
      </motion.h1>

      <div className="login-content">
        <motion.div
          className="animation-container"
          initial={{ x: -50 }}
          animate={{ x: [0, 10, -10, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>

        <motion.div 
          className="login-card"
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2 
            className="login-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Login
          </motion.h2>

          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <motion.button 
              type="submit" 
              className="login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>

          <motion.button 
            className="forgot-password-button"
            onClick={handleForgotPassword}
            animate={{ y: [0, -5, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Forgot Password?
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
