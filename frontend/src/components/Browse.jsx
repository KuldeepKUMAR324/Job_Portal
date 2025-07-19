import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job' // ✅ Capital 'J' for React Component

const randomJobs = [1, 2, 3,4,5,6];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-5">
        <h1 className="text-xl font-bold mb-4">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {randomJobs.map((item, index) => (
            <Job key={index} />
          ))}   
        </div>
      </div>
    </div>
  );
};

export default Browse;
