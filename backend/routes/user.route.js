import express from 'express';
import { register, login, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticate.js';

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Profile update (protected)
router.post('/profile/update', isAuthenticated, updateProfile);

export default router;
