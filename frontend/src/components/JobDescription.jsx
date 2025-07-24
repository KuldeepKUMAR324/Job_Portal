import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  // ✅ Fetch job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  // ✅ Check if already applied
  useEffect(() => {
    if (singleJob?.applications && user?._id) {
      const alreadyApplied = singleJob.applications.some(
        (application) => application.applicant === user._id
      );
      setIsApplied(alreadyApplied);
    }
  }, [singleJob, user]);

  // ✅ Handle apply
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Applied successfully');

        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user._id }],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true);
      }
    } catch (error) {
      console.error('Apply error:', error);
      toast.error(error.response?.data?.message || 'Application failed');
    }
  };

  return (
    <div className='max-w-7xl ml-20 my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge variant='secondary' className='text-blue-700 font-bold'>
              {singleJob?.position}
            </Badge>
            <Badge variant='secondary' className='text-[#F83002] font-bold'>
              {singleJob?.jobType}
            </Badge>
            <Badge variant='secondary' className='text-[#7209b7] font-bold'>
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? 'bg-gray-600 text-white cursor-not-allowed'
              : 'bg-[#56098a] hover:bg-[#5f32Ad] text-white'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className='border-b-2 border-b-gray-300 font-semibold text-lg py-4 mt-6'>
        Job Description
      </h2>

      <div className='space-y-3 text-[16px] text-gray-800'>
        <p><span className='font-bold'>Role:</span> {singleJob?.title}</p>
        <p><span className='font-bold'>Location:</span> {singleJob?.location}</p>
        <p>
          <span className='font-bold'>Description:</span>{' '}
          {typeof singleJob?.description === 'string'
            ? singleJob.description
            : JSON.stringify(singleJob?.description)}
        </p>
        <p><span className='font-bold'>Experience:</span> {singleJob?.experience || 'N/A'} yrs</p>
        <p><span className='font-bold'>Salary:</span> {singleJob?.salary} LPA</p>
        <p><span className='font-bold'>Total Applicants:</span> {singleJob?.applications?.length || 0}</p>
        <p><span className='font-bold'>Posted:</span> {singleJob?.createdAt?.split('T')[0] || 'N/A'}</p>
      </div>
    </div>
  );
};

export default JobDescription;
