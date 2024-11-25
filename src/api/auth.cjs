const express = require("express");
const router = express.Router();

const users = [
  { email: "test@example.com", password: "password123", token: "dummy-token" },
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", token: user.token });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  users.push({ email, password });
  console.log("New user registered:", email);

  res.status(201).json({ message: "User registered successfully." });
});

module.exports = router;
