const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "/Users/viktornyberg/VSCode/TemplateBuilder/.env",
});

const app = express();

app.use(cors());
app.use(express.json());

const emailRoutes = require("./src/api/email.cjs");
const userRoutes = require("./src/api/auth.cjs");

app.use("/api/email", emailRoutes); // Rutter för e-post
app.use("/api/auth", userRoutes); // Rutter för användarhantering

const db = require("./db.cjs"); // Importera databasen

// Skapa tabellen om den inte redan finns
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `,
    (err) => {
      if (err) {
        console.error("Fel vid skapande av tabellen:", err.message);
      } else {
        console.log("Tabellen 'users' är skapad eller redan existerar.");
      }
    }
  );
});

// Starta servern
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
