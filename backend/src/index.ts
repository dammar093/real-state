import { Request, Response } from "express";
import app from "./app";
import authRouter from "./routes/auth/auth.route";

const PORT = process.env.PORT || 8000;

// === Base Route ===
app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on PORT:: ${PORT}`);
});

// === API Routes ===
app.use("/api/v1", authRouter);

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
