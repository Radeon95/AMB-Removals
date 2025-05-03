import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app (dist folder after build)
app.use(express.static(path.join(__dirname, "dist")));

// API route to receive form data and save it
app.post("/submit-quote", (req, res) => {
  const formData = req.body;
  const filename = `quote-${
    formData.name?.replace(/\s+/g, "_") || "anonymous"
  }-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

  const formsDir = path.join(__dirname, "forms");

  // Create forms folder if not exists
  if (!fs.existsSync(formsDir)) {
    fs.mkdirSync(formsDir);
  }

  fs.writeFile(
    path.join(formsDir, filename),
    JSON.stringify(formData, null, 2),
    (err) => {
      if (err) {
        console.error("Failed to save the form:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to save the form." });
      }
      res.json({ success: true, message: "Form submitted successfully!" });
    }
  );
});

// For any other route, serve React's index.html (supporting React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Use dynamic port for production or 5050 for local dev
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
