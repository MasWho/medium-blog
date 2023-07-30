// Global dependencies
import { Router } from "express";
const router = Router();

// All routes
import { userRouter } from "./users";

// All routes for api
router.use(userRouter);

export default router;
