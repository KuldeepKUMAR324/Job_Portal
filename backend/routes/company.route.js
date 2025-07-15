import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticate.js';
import { getCompany, registerCompany,updateCompany,getCompanyById } from '../controllers/company.controller.js';

const router = express.Router();

// Register a new company (protected)
router.route('/register').post(isAuthenticated,registerCompany);

router.route('/get').get(isAuthenticated,getCompany);
// Get company by ID (protected)
router.route('/get/:id').get(isAuthenticated, getCompanyById);
// Update company details (protected)
router.route('/update/:id').put(isAuthenticated, updateCompany);

export default router;
