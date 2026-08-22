require("dotenv").config();

const express = require("express");
const cors = require("cors");

const chatRoute = require("./routes/chat");
const goalsRoute = require("./routes/goals");
const portfolioRoute = require("./routes/portfolio");
const compareRoute = require("./routes/compare");
const learnRoute = require("./routes/learn");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/chat", chatRoute);
app.use("/api/goals", goalsRoute);
app.use("/api/portfolio", portfolioRoute);
app.use("/api/compare", compareRoute);
app.use("/api/learn", learnRoute);
app.use("/api/auth", authRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    groqConfigured: Boolean(process.env.GROQ_API_KEY),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Investment Copilot backend running at http://localhost:${PORT}`
  );

  if (!process.env.GROQ_API_KEY) {
    console.warn(
      "WARNING: GROQ_API_KEY is not set. Chat and comparison AI features will fail until you add it to backend/.env"
    );
  } else {
    console.log("Groq API key loaded successfully.");
  }
});