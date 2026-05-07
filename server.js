import "dotenv/config";

import express from "express";
import cors from "cors";
import summarizeRoute from "./routes/summarize.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", summarizeRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");});