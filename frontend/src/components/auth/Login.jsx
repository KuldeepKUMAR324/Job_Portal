import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { Link } from 'react-router-dom'

const Login = () => {
  const[input, setInput] = React.useState({
      email: '',
      password: '',
      role: ''
  });
  const changeEventHandler= (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });}
    const changeFileHandler = (e) => {
      setInput({
        ...input,
        file: e.target.files[0]
      });
    } 
     const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto '>
        <form onSubmit={submitHandler} className='w-1/2 max-w-md p-5 bg-white shadow-md rounded-lg mt-10'>
          <h1 className='font-bold text-2xl mb-b'>Login</h1>
          
          <div className='my-2'>
            <Label >Email</Label>
            <Input id="name" type="email"
             value={input.email}
                name="email"
                onChange={changeEventHandler}
 placeholder="kuldeep.kumar@gmail.com" className='mb-4' />

          </div>

         
          <div className='my-2'>
            <Label >Password</Label>
            <Input id="password" type="password"
             value={input.password}
                name="password"
                onChange={changeEventHandler}
            
            placeholder="********" className='mb-4' />
          </div>
          <div className='flex items-center justify-between my-2'>

            <RadioGroup className="flex items-center gap-4 my-5" >
              <div className="flex items-center gap-3">
               <Input 
                type="radio" name="role" 
                  value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}

               
               className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                type="radio" name="role" 
                  value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                
                
                
                className="cursor-pointer" />
                
                <Label htmlFor="r2">Recruiter</Label>
              </div>
              
            </RadioGroup>
           

          </div>
          <Button type="submit" className="w-full  my-4">Login</Button>
          
          <span className='text-sm text-gray-500'>Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>signup</Link></span>

        </form>
      </div>



    </div>
  )
}

export default Login
