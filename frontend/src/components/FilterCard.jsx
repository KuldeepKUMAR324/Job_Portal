import React from 'react'
import { RadioGroup,RadioGroupItem, } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
const filterData=[
  {
    filterType:"Locatio",
    array:["Delhi NCR","Bangalore","Hyderabad","Pune","Mumbai"]
  },
   {
    filterType:"Industry",
    array:["Frontend developer","Backend Developer","FullStack Developer"]
  },
   {
    filterType:"Salary",
    array:["0-40ki","42-1lakh","1lakh"]
  },
]


const FilterCard = () => {
  return (
    <div >
      <h1 className='font-bold  text-lg'>Filter Jobs</h1>
      <hr  className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,index)=>(
              <div>
                <h1 className='font-bold text-lg'>{data.filterType}</h1>
                {
                  data.array.map((item,index)=>{
                    return(
                      <div className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={item}/>
                        <Label>{item}</Label>
                      </div>
                    )
                  })
                }
              </div>
          )
                
          
          
            )
        }

      </RadioGroup>
      
    </div>
  )
}

export default FilterCard
