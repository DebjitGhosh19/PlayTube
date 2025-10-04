
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/auth',authRoute)

app.listen(port,async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});

