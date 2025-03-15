import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import timetableRouter from "./routes/timetableRoute.js";

const app = express();
app.use(express.json());
const port = 3000;

dotenv.config();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api/timetable", timetableRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
