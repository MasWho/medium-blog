// global dependencies
import * as dotenv from 'dotenv';
dotenv.config();

// set express app
import express from 'express';
const app = express();

// middlewares
app.use(express.json());

export default app;