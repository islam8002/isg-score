import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// ضع API KEY هنا
const API_KEY = process.env.API_KEY;

app.get("/live", async (req, res) => {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      { headers: { "x-apisports-key": API_KEY } }
    );
    const data = await response.json();
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: "API ERROR" });
  }
});

app.listen(PORT, () => {
  console.log(`⚽ Server running on port ${PORT}`);
});


