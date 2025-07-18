import React from 'react'
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';


const HeroSection = () => {
  return (
    <div className='text-center'>
       <div className='flex flex-col gap-3 my-8'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[rgb(184,91,70)] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-4xl font-bold'>Search ,Apply &<br />Get Your<span className='text-[#6236ad]'>Dream Jobs</span></h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam dolore veritatis perferendis d</p>
      <div className='flex w-[40%] shadow-lg  border border-gray-200 pl-3 rounded-full items center gap-4 mx-auto'>
        <input type="text"
        placeholder='Find Your dream jobs'
        className='outline-none border-none w-full'
        
        />
        <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 w-5"/>
        </Button>
      </div>
       </div>
    </div>
  )
}

export default HeroSection
