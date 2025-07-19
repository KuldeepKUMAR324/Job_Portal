import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <FilterCard />

          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            {jobsArray.length <= 0 ? (
              <span>Jobs not found</span>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-auto mt-12
              '>
                {jobsArray.slice(0,6).map((item, index) => (
                  <Job key={index} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
