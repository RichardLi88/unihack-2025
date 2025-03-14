import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
const port = 3000;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {    
  connectDB();
  console.log(`Server is running on port ${port}`);
});