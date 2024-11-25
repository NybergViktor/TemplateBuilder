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

// Starta servern
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
