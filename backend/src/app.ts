import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

// === dotenv configuration ===
dotenv.config();

const app: Express = express();

// === Security Middlewares ===
app.use(helmet()); // Adds security-related HTTP headers
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g., http://localhost:3000
    credentials: true, // If you want to allow cookies/auth headers
  })
);
// === Rate Limiting ===
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // Apply rate limiting to all requests

// === JSON Parsing Middleware ===
app.use(express.json()); // Parses incoming JSON requests
// == URL Encoded Parsing Middleware==
app.use(express.urlencoded({ extended: true }));

export const router = express.Router();
export default app;
