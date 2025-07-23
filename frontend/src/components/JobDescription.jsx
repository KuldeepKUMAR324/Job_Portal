import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
// import useGetSingleJob from '@/hooks/useGetSingleJob'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'


const JobDescription = () => {
  const isApplied = true
  const params=useParams();

const  jobId=params.id;
const {singleJob}=useSelector(store=>store.job);
const {user}=useSelector(store=>store.auth);
const dispatch=useDispatch();

useEffect(() => {
    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
            if(res.data.success){
                  dispatch(setSingleJob(res.data.job));
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchSingleJob();
    
}, [jobId,dispatch,user?._id]);


  return (
    <div className='max-w-7xl ml-20 my-10'>

      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge variant={Ghost} className="text-blue-700 font-bold">{singleJob?.position}</Badge>
            <Badge variant={Ghost} className="text-[#F83002] font-bold">{singleJob?.jobType}</Badge>
            <Badge variant={Ghost} className="text-[#7209b7] font-bold">{singleJob?.salary}LPA</Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#56098a] hover:bg-[#5f32Ad]'}`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className='border-b-2 border-b-gray-300 font-semibold text-lg py-4 mt-6'>Job Description</h2>

      <div className='space-y-3 text-[16px] text-gray-800'>

        <p><span className='font-bold'>Role:</span> {singleJob?.title}</p>
        <p><span className='font-bold'>Location:</span> {singleJob?.location}</p>
        <p><span className='font-bold'>Description:</span>{singleJob?.description}</p>
        <p><span className='font-bold'>Experience:</span>{singleJob?.experience}</p>
        <p><span className='font-bold'>Salary:</span> {singleJob?.salary} LPA</p>
        <p><span className='font-bold'>Total Applicants:</span> 135</p>
        <p><span className='font-bold'>Posted:</span> 3 days ago</p>

      </div>

    </div>
  )
}

export default JobDescription
