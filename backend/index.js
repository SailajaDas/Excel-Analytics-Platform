import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import fileRouter from "./routes/file.routes.js";
import historyRouter from "./routes/history.routes.js";

const app = express();
const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/contacts", contactRouter);
app.use("/api/files", fileRouter);
app.use("/api/history", historyRouter);
app.listen(port, () => {
  connectDb();
  console.log(`server started at ${port}`);
});
