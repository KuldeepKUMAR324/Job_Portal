import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from '@radix-ui/react-label'
import UpdateProfileDialog from './UpdateProfileDialog'
import AppliedJobTable from './AppliedJobTable'
import { useSelector } from 'react-redux'


const isResume = true;

const Profile = () => {
  const[open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);
  

  return (
    <div>
      <Navbar />
      <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex  items-center gap-4'>
          <Avatar className='h-24 w-24'>
            <AvatarImage src="data:image/png;base64,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">

            </AvatarImage>


          </Avatar>


          <div> <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            <p>{user?.profile?.bio}</p>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right " variant="outline"><Pen /></Button>


        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>

        </div>
        <div>
          <h1>Skills</h1>
          <div variant="outline" className='flex items-center gap-1'>
            {
            user?.profile?.skills.length != 0 ?  user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className=" text-md font-bold">Resume</Label>
          {
            isResume ? <a target="blank" href='http://youtube.com/@patelmernstack' className='text-blue-500 w-full hover:underline cursor-pointer'>Patel mern stack</a> : <span>
              NA
            </span>
          }





        </div>


      </div>
      <div className='max-w-4xl  mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />

      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
