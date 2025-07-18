import express from 'express';
import { register, login, updateProfile, logout } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticate.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// User registration route
router.post('/register',singleUpload, register);

// User login route
router.post('/login', login);
router.get('/logout',logout);

// Profile update (protected)
router.post('/profile/update', isAuthenticated, updateProfile);

export default router;
