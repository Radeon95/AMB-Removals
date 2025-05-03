// server.js at root level
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Path to the built React app inside my-react-app/dist
const distPath = path.join(__dirname, "my-react-app", "dist");

// ✅ Serve the static files
app.use(express.static(distPath));

// ✅ API endpoint for form submissions
app.post("/submit-quote", (req, res) => {
  const formData = req.body;
  const filename = `quote-${
    formData.name?.replace(/\s+/g, "_") || "anonymous"
  }-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

  const formsDir = path.join(__dirname, "forms");

  // Create the forms directory if it doesn't exist
  if (!fs.existsSync(formsDir)) {
    fs.mkdirSync(formsDir);
  }

  fs.writeFile(
    path.join(formsDir, filename),
    JSON.stringify(formData, null, 2),
    (err) => {
      if (err) {
        console.error("❌ Failed to save the form:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to save the form." });
      }
      res.json({ success: true, message: "Form submitted successfully!" });
    }
  );
});

// ✅ React Router fallback for any route not matched above
app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Use dynamic port (Render provides PORT)
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
