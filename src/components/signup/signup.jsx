import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { ReturnButton } from "../returnButton";

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
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registrering misslyckades. Försök igen.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      console.error("Registrering misslyckades:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="signupMain">
      <ReturnButton onClick={() => navigate("/login")} />
      <h2>Skapa konto:</h2>
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
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrera</button>
      </form>
      {success && (
        <p style={{ color: "green" }}>
          Registrering lyckades! Du omdirigeras...
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
