const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock-databas för användare
const users = [
  { email: "test@example.com", password: "password123", token: "dummy-token" },
];

// Login-endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Kontrollera om användaren finns i "databasen"
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Returnera en token (eller annan data om det behövs)
  res.json({ message: "Login successful", token: user.token });
});

// Signup-endpoint
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Kontrollera om användaren redan finns
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Lägg till ny användare i mock-databasen
  users.push({ email, password });
  console.log("New user registered:", email);

  res.status(201).json({ message: "User registered successfully." });
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
