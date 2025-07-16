import Job from '../models/job.model.js';

// Admin will post a job
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      jobType,        // ✅ must match schema
      requirements,
      salary,
      position,
      experience,
      companyId,
    } = req.body;

    const userId = req.id;

    // Check all required fields
    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !jobType ||
      !salary ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields', success: false });
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      location,
      jobType, // ✅ passed to schema properly
      requirements: requirements.split(',').map(req => req.trim()),
      salary: Number(salary),
      position,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: 'Job posted successfully',
      job,
      success: true,
    });
  } catch (error) {
    console.error('Error in postjob controller:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

// Get all jobs (with optional keyword search)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };

    const jobs = await Job.find(query).populate({path:'company'}).sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: 'No jobs found', success: false });
    }

    return res.status(200).json({
      message: 'Jobs fetched successfully',
      jobs,
      success: true,
    });
  } catch (error) {
    console.error('Error in getAllJobs controller:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

// Admin: Get all jobs created by them
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: 'No jobs found for this admin', success: false });
    }

    return res.status(200).json({
      message: 'Admin jobs fetched successfully',
      jobs,
      success: true,
    });
  } catch (error) {
    console.error('Error in getAdminJobs controller:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res
        .status(404)
        .json({ message: 'Job not found', success: false });
    }

    return res.status(200).json({
      message: 'Job fetched successfully',
      job,
      success: true,
    });
  } catch (error) {
    console.error('Error in getJobById controller:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};
