const express = require("express");
const cors = require("cors");

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


const users = [
  { email: "test@example.com", password: "password123", token: "dummy-token" },
];


app.post("/login", (req, res) => {
  const { email, password } = req.body;

 
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  
  res.json({ message: "Login successful", token: user.token });
});


app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  
  users.push({ email, password });
  console.log("New user registered:", email);

  res.status(201).json({ message: "User registered successfully." });
});

// Starta servern
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
