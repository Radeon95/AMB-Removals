// server.js
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Set your SendGrid API Key
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing!");
  process.exit(1);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to Vite output inside 'my-react-app/dist'
const distPath = path.join(__dirname, "my-react-app", "dist");

if (!fs.existsSync(distPath)) {
  console.error(`❌ Static build folder not found at ${distPath}`);
  process.exit(1);
} else {
  console.log(`✅ Static build folder found at ${distPath}`);
}

app.use(express.static(distPath));

// Submit Quote Route
app.post("/submit-quote", async (req, res) => {
  const formData = req.body;

  const msg = {
    to: process.env.SENDGRID_RECEIVER,
    from: process.env.SENDGRID_SENDER,
    subject: "New Quote Submission from AMB Removals",
    text: `New Quote received from ${formData.name || "unknown user"}`,
    html: `
      <h2>New Quote Submission</h2>
      <p><strong>Name:</strong> ${formData.name || "N/A"}</p>
      <p><strong>Email:</strong> ${formData.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
      <p><strong>Moving From:</strong> ${formData.movingFrom || "N/A"}</p>
      <p><strong>Moving To:</strong> ${formData.movingTo || "N/A"}</p>
      <p><strong>Move Date:</strong> ${formData.moveDate || "N/A"}</p>
      <p><strong>Message:</strong> ${formData.message || "N/A"}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(
      `✅ Email sent from ${process.env.SENDGRID_SENDER} to ${process.env.SENDGRID_RECEIVER}`
    );
    res.json({ success: true, message: "Form submitted and email sent!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error.response?.body || error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// React fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
