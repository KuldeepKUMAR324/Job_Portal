import express from 'express';
import {
  register,
  login,
  updateProfile,
  logout
} from '../controllers/user.controller.js';

import isAuthenticated from '../middlewares/isAuthenticate.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// Register route (with file upload, optional resume/profile pic)
router.post('/register', singleUpload, register);


router.post('/login', login);
router.get('/logout', logout);


router.put('/profile/update', isAuthenticated, singleUpload, updateProfile);

export default router;
