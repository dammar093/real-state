import { Request, Response } from "express";
import app from "./app";
import authRouter from "./routes/auth/auth.route";
import userRouter from "./routes/user/user.route";
import categoryRouter from "./routes/category/category.route";
import propertyRouter from "./routes/property/property.route";
import wishlistRouter from "./routes/wishlist/wishlist.route";
import { setupSwagger } from './utils/swagger';
import bookingRouter from "./routes/booking/booking.routes";

const PORT = process.env.PORT || 8000;

// Setup Swagger docs route
setupSwagger(app);

// === Base Route ===
app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on PORT:: ${PORT}`);
});

// === API Routes ===
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/booking", bookingRouter);

// === Start Server ===
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
