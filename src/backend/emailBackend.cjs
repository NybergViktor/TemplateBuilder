const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config(); // För att hantera miljövariabler (t.ex. maillösenord)

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API-endpoint för att skicka e-post
app.post("/send-email", async (req, res) => {
  const { message, signature } = req.body;

  // Kontrollera om alla fält är ifyllda
  if (!message || !signature) {
    return res.status(400).send("Både meddelande och signatur måste anges.");
  }

  // Skapa en transporter för att skicka e-post
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail används här, ändra vid behov
    auth: {
      user: process.env.EMAIL, // Din e-postadress från miljövariabel
      pass: process.env.EMAIL_PASSWORD, // Lösenord/App-lösenord från miljövariabel
    },
  });

  try {
    // Skicka e-post
    await transporter.sendMail({
      from: process.env.EMAIL, // Din e-post
      to: "viktor.nyberg00@gmail.com", // Mottagare
      subject: "Meddelande från kontaktformulär",
      text: `Meddelande: ${message}\n\nAvsändare: ${signature}`,
      replyTo: signature, // Sätt användarens e-post som reply-to
    });

    res.status(200).send("E-post skickades framgångsrikt!");
  } catch (error) {
    console.error("Fel vid e-postskickning:", error);
    res.status(500).send("Kunde inte skicka e-post. Försök igen senare.");
  }
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
