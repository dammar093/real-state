import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import connectDb, { db } from "./config/db";

// === Load env variables ===
dotenv.config();

const app: Express = express();

// === Security Middlewares ===
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL, // like http://localhost:3000
  credentials: true,
}));

// === Rate Limiter ===
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 15,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(limiter);

// === Body Parsers ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Connect to DB ===
connectDb().catch((error) => {
  console.error("DB connection failed:", error);
  process.exit(1);
});

// Optional: Graceful shutdown
process.on("SIGINT", async () => {
  await db.$disconnect();
  process.exit(0);
});

export default app