// Global dependencies
import express from "express";
import { json } from "body-parser";

// Project dependencies
import router from "./routes";

// Express initialization
const app = express();

// Middlewares
app.use(json());

// Routes
app.use(router);

export default app;