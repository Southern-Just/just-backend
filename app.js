import express from "express";
import { PORT } from "./config/.env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import membershipRouter from "./routes/membership.routes.js";
import connectToDatabase from "./database/mongoDb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //process form data in html form
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/memberships", membershipRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Valar Morghulis, mori");
});
app.listen(PORT, async () => {
  console.log(`Just Tracker API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
