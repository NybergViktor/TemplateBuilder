const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ange sökvägen till databasen
const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Kunde inte ansluta till SQLite-databasen:", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen.");
  }
});

module.exports = db;
