import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ===== Fix for Windows + ESM =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Force-load .env from server folder
dotenv.config({ path: path.join(__dirname, ".env") });

// ===== Imports AFTER dotenv =====
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

// ===== App setup =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use("/api/ai", aiRoutes);


// ===== Start server =====
const PORT = process.env.PORT || 5000;

console.log("🔑 GROQ_API_KEY loaded:", !!process.env.GROQ_API_KEY);

app.get("/",(res,req)=>{
  console.log("welcome");
  
  res.json({msg:"runig"});
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
