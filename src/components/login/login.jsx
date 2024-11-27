import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Felaktiga uppgifter. Försök igen.");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);

      if (response.ok) {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mainMain">
      <div className="innerMain">
        <h1>Välkommen</h1>
        <h2>Logga in</h2>
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
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Logga in
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Skapa konto? <Link to="/signup">Registrera Konto</Link>
        </p>
      </div>
    </div>
  );
};
