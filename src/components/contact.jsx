import React, { useState } from "react";

export const Contact = () => {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          signature,
        }),
      });

      if (response.ok) {
        alert("Meddelandet skickades framgångsrikt!");
        setMessage("");
        setSignature("");
      } else {
        alert("Kunde inte skicka meddelandet. Försök igen.");
      }
    } catch (error) {
      console.error("Fel vid skickning:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    }
  };

  return (
    <div>
      <h2>Kontaktformulär</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="message">Meddelande:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br />
        <label htmlFor="signature">Din e-post:</label>
        <input
          type="email"
          id="signature"
          name="signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          required
        />
        <br />
        <button type="submit">Skicka</button>
      </form>
    </div>
  );
};
