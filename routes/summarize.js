import express from "express";
import multer from "multer";
import fs from "fs";
import { summarizeLongText } from "../services/aiService.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/summarize", upload.single("file"), async (req, res) => {
  console.log("FILE:", req.file);

  let uploadedFilePath;

  try {
    let text = req.body.text;

    if (req.file) {
      uploadedFilePath = req.file.path;
      console.log("Uploaded Path:", uploadedFilePath);
      const dataBuffer = fs.readFileSync(uploadedFilePath);
      const pdfData = await pdfParse(dataBuffer); // ✅ works

      text = pdfData.text || "";
      console.log("PDF TEXT:",text.slice(0, 200));

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Could not extract text from PDF" });
    }
  }
if (!text|| text.trim() === ""){
  return res.status(400).json({error: "provide text or PDF"});
}
    text = text.replace(/\s+/g, " ").trim();

    const summary = await summarizeLongText(text);

    res.json({ summary });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  } finally {
    if (uploadedFilePath) {
      fs.unlink(uploadedFilePath, () => {});
    }
  }
});

export default router;