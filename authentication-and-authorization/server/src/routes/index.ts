// server/src/routes/index.ts

// Global dependencies
import {Router} from 'express';
const router = Router();
import userRoute from './user';
import resourceRoute from './resource';
import { checkAuthToken } from '../middleware/auth';

// All routes for api
router.use('/user', userRoute);
router.use('/resource', checkAuthToken, resourceRoute);

export default router;