const express = require("express");
const db = require("../../db.cjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Skydda mot SQL-injektion genom att använda placeholders
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], async (err, user) => {
    if (err) {
      console.error("Fel vid inloggning:", err.message);
      return res.status(500).send("Kunde inte logga in.");
    }

    // Kontrollera om användaren inte finns
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Jämför det hashade lösenordet
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generera JWT-token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email },
    });
  });
});

module.exports = router;

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.get(checkSql, [email], async (err, existingUser) => {
    if (err) {
      console.error("Fel vid kontroll av användare:", err.message);
      return res.status(500).send("Kunde inte skapa användare.");
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.run(insertSql, [email, hashedPassword], function (err) {
      if (err) {
        console.error("Fel vid skapande av användare:", err.message);
        return res.status(500).send("Kunde inte skapa användare.");
      }

      // Hämta den nyligen skapade användaren från databasen
      const selectSql = "SELECT id, email FROM users WHERE id = ?";
      db.get(selectSql, [this.lastID], (err, newUser) => {
        if (err) {
          console.error("Fel vid hämtning av ny användare:", err.message);
          return res.status(500).send("Kunde inte hämta användare.");
        }

        res.status(201).json({
          message: "Användare skapad",
          user: newUser, 
        });
      });
    });
  });
});

// get all users
const verifyToken = require("../../middlewares/VerifyToken.cjs");

router.get("/", verifyToken, (req, res) => {
  const sql = "SELECT id, email FROM users"; // Exkludera lösenord från resultatet
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Fel vid hämtning av användare:", err.message);
      return res.status(500).send("Kunde inte hämta användare.");
    }

    res.json(rows);
  });
});

module.exports = router;
