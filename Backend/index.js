import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",(req,res)=>{
  res.send("API is running...");
});


app.listen(port,async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});

