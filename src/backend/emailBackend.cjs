const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config({
  path: "/Users/viktornyberg/VSCode/TemplateBuilder/.env",
}); 

const app = express();

app.use(cors());
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true, 
  })
);

// API-endpoint för att skicka e-post
app.post("/send-email", async (req, res) => {
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

// Starta servern
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
