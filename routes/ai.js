import express from "express";
import multer from "multer";
import { generateCoverLetter } from "../utils/groq.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/generate", upload.single("resume"), async (req, res) => {
  try {
    const { name, company, role, skills, jobDescription } = req.body;

    const resumeText = req.file
      ? "Resume uploaded but parsing is temporarily disabled."
      : "";

    const letter = await generateCoverLetter({
      name,
      company,
      role,
      skills,
      jobDescription,
      resumeText,
    });

    res.json({ letter });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
