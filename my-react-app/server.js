import express, { json } from "express";
import { existsSync, mkdirSync, writeFile } from "fs";
import { join } from "path";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(json());
app.use(
  cors({
    origin: "*",
  })
); // Allow requests from React dev server

app.post("/save-quote", (req, res) => {
  const formData = req.body;

  const safeName = formData.name
    ? formData.name.replace(/\s+/g, "-").toLowerCase()
    : "anonymous";

  const date = new Date().toISOString().slice(0, 10);
  const filename = `quote-${safeName}-${date}.json`;

  const formsDir = join(__dirname, "forms");
  if (!existsSync(formsDir)) {
    mkdirSync(formsDir);
  }

  const filePath = join(formsDir, filename);

  writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
    if (err) {
      console.error("Error writing file", err);
      return res.status(500).json({ message: "Failed to save file." });
    }
    res.json({ message: "File saved successfully.", filename });
  });
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
