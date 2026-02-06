const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running" });
});

// ⬇️ INSERTED HERE
const { scanUrls } = require("./server/scanner");

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
// ⬆️ INSERTED HERE

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
