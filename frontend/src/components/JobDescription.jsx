import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { Button } from './ui/button'

const JobDescription = () => {
  const isApplied = true

  return (
    <div className='max-w-7xl ml-20 my-10'>

      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>Frontend Developer</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge variant={Ghost} className="text-blue-700 font-bold">12 Positions</Badge>
            <Badge variant={Ghost} className="text-[#F83002] font-bold">Part Time</Badge>
            <Badge variant={Ghost} className="text-[#7209b7] font-bold">24 LPA</Badge>
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

        <p><span className='font-bold'>Role:</span> Frontend Developer</p>
        <p><span className='font-bold'>Location:</span> Bangalore, India</p>
        <p><span className='font-bold'>Description:</span> We are seeking a skilled frontend developer with a strong understanding of React and modern web technologies. You'll work closely with product designers and backend engineers.</p>
        <p><span className='font-bold'>Experience:</span> 2 - 4 years</p>
        <p><span className='font-bold'>Salary:</span> 24 LPA</p>
        <p><span className='font-bold'>Total Applicants:</span> 135</p>
        <p><span className='font-bold'>Posted:</span> 3 days ago</p>

      </div>

    </div>
  )
}

export default JobDescription
