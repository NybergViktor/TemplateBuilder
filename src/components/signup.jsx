import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), 
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      setSuccess(true); 
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      console.error("Signup failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {success && (
        <p style={{ color: "green" }}>Signup successful! Redirecting...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>} 
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
