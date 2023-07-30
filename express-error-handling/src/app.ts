// Global dependencies
import express from "express";
import { json } from "body-parser";

// Project dependencies
import userRouter from "./routes/users";

// Express initialization
const app = express();

// Middlewares
app.use(json());

// Routes
app.use(userRouter);

export default app;