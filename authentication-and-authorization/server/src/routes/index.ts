// Global dependencies
import {Router} from 'express';
const router = Router();
import userRoute from './user';

// All routes for api
router.use('/user', userRoute);

export default router;