import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticate.js';
import { getAdminJobs,getAllJobs,postjob,getJobById } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, postjob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
//router.route("/get/:id").post(isAuthenticated, getJobById);
router.route("/get/:id").get(isAuthenticated, getJobById); // Assuming you want to fetch job by ID


export default router;