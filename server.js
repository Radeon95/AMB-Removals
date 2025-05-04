// server.js
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to your Vite build output
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// Submit Quote Route
app.post("/submit-quote", async (req, res) => {
  const formData = req.body;

  const msg = {
    to: process.env.SENDGRID_RECEIVER, // receiver email from env
    from: process.env.SENDGRID_SENDER, // sender email from env
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
    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Form submitted and email sent!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error.response?.body || error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// React fallback (for Vite client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
