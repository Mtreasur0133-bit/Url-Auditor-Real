const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// ⭐ Correct CORS rule
app.use(cors({
  origin: "https://mtreasur0133-bit.github.io"
}));

app.use(express.json());

// Optional: static files (safe to keep)
app.use(express.static("public"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running" });
});

const { scanUrls } = require("./server/scanner");

// Main scan route
app.post("/api/scan", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid URL list" });
  }

  try {
    const results = await scanUrls(urls);
    res.json({ results });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Scan failed" });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
