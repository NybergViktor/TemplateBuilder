const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// API-endpoint för att skicka e-post
router.post("/send", async (req, res) => {
  const { message, signature } = req.body;

  if (!message || !signature) {
    return res.status(400).send("Både meddelande och signatur måste anges.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: signature,
      to: process.env.EMAIL,
      subject: "Meddelande från kontaktformulär",
      text: `Meddelande: ${message}`,
      replyTo: signature,
    });

    res.status(200).send("E-post skickades framgångsrikt!");
  } catch (error) {
    console.error("Fel vid e-postskickning:", error);
    res.status(500).send("Kunde inte skicka e-post. Försök igen senare.");
  }
});

module.exports = router;
