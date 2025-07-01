import React, { useState } from "react";
import classes from "./PasswordLogin.module.css";
import Logo from "../img/home--v1.png";

interface PasswordLoginProps {
  onLogin: () => void;
}

const PasswordLogin: React.FC<PasswordLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Test the password by making a health check request
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:3002/api"
        }/health`,
        {
          headers: {
            "x-api-key": password,
          },
        }
      );

      if (response.ok) {
        // Store password in session storage for the session
        sessionStorage.setItem("housemeter_password", password);
        onLogin();
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      setError("Connection failed. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.headlineContainer}>
        <h1 className={classes.loginH1}>Housemeter</h1>
        <img src={Logo} alt="Logo" className={classes.logo} />

        <div className={classes.wrappingTextAndForm}>
          <h2 className={classes.appText}>
            This app makes your meter readings clear.
          </h2>
          <h3 className={classes.signIn}>Please enter your password</h3>

          <form onSubmit={handleSubmit} className={classes.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={classes.passwordInput}
              disabled={isLoading}
              required
            />

            {error && <p className={classes.errorMessage}>{error}</p>}

            <button
              type="submit"
              className={classes.loginButton}
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordLogin;
