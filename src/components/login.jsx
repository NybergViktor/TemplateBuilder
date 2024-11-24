import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Rensa tidigare felmeddelanden

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Skicka inloggningsuppgifter
      });

      if (!response.ok) {
        // Om statuskod inte är 200-299, hantera fel
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Spara eventuell token (om backend skickar en) i localStorage
      localStorage.setItem("authToken", data.token);

      // Navigera till startsidan eller en skyddad rutt
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message); // Visa felmeddelande
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Visa fel */}
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};
