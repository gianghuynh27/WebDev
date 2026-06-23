import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import coachRoutes from "./routes/coachRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import staticDataRoutes from "./routes/staticDataRoutes.js"
import metaCompRoutes from "./routes/metaCompRoutes.js";
import riotApiRoutes from "./routes/riotApiRoutes.js";

const app = express();
const port = process.env.PORT ?? 4000;
console.log(`Using OpenAI API Key: ${!!process.env.OPENAI_API_KEY}`);
app.use(cors());
app.use(express.json());
app.use("/api/coach", coachRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/static", staticDataRoutes)
app.use("/api/meta-comps", metaCompRoutes);
app.use("/api/riot", riotApiRoutes);
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});