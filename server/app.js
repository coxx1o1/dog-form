import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/dogs", dogRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;

