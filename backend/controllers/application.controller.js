import { populate } from 'dotenv';
import Application from '../models/application.model.js';
import Job from '../models/job.model.js';


export const applyjob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required', success: false });
        }
        //check user is already applied for this job
        const existingApplication = await Application.findOne({ applicant:userId, job:jobId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job', success: false });
        }
        //check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }
        //create new application
        const application = await Application.create({
            applicant: userId,
            job: jobId,
            
        });
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({
            message: 'Application submitted successfully',
            application,
            success: true
        });
        
    } catch (error) {
        console.error('Error in applyjob controller:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
        
    }};

    export const getAppliedJobs = async (req, res) => {
        try {
            const userId = req.id;
            const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({path: 'job', options: { sort: { createdAt: -1 } },populate:{
                path: 'company',
                options: { sort: { createdAt: -1 } }

            } });
            if (!applications || applications.length === 0) {
                return res.status(404).json({ message: 'No applications found', success: false });
            }
            return res.status(200).json({ message: 'Applications fetched successfully', applications, success: true });

        } catch (error) {
            console.error('Error in getAppliedJobs controller:', error);
            return res.status(500).json({ message: 'Internal server error', success: false });
            
        }}
        //admin dekhega kitane user ne apply kiye hain
        export const getApplicants = async (req, res) => {
            try {
                const jobId= req.params.id;
                const job= await Job.findById(jobId).populate({
                    path: 'applications',
                    options: { sort: { createdAt: -1 } },
                    populate: {
                        path: 'applicant'
                    }
                });
                if(!job) {
                    return res.status(404).json({ message: 'Job not found', success: false });
                }
                return res.status(200).json({job,success: true });
            } catch (error) {
                console.error('Error in getApplicants controller:', error);
                return res.status(500).json({ message: 'Internal server error', success: false });
                
            }};
            //rejected or selected
            export const updatestatus = async (req, res) => {
                try {
                    const { status } = req.body;
                    const applicationId = req.params.id;
                    if (!status || !applicationId) {
                        return res.status(400).json({ message: 'Status and Application ID are required', success: false });
                    }
                    const application = await Application.findById(applicationId);
                    if (!application) {
                        return res.status(404).json({ message: 'Application not found', success: false });
                    }
                    application.status = status.toLowerCase();
                    await application.save();
                    return res.status(200).json({ message: 'Application status updated successfully', success: true });
                } catch (error) {
                    console.error('Error in updatestatus controller:', error);
                    return res.status(500).json({ message: 'Internal server error', success: false });
                    
                }}
            



    

            
           
