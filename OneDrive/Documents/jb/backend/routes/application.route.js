import express from 'express';
import { applyjob,getAppliedJobs,getApplicants,updatestatus } from '../controllers/application.controller.js';

import isAuthenticated from '../middlewares/isAuthenticate.js';



const router = express.Router();
router.route('/apply/:id').get(isAuthenticated, applyjob);
router.route('/get').get(isAuthenticated, getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated, getApplicants); 
router.route('/status/:id/update').get(isAuthenticated,updatestatus);



export default router;
