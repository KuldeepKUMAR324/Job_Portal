import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link } from 'react-router-dom';


const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
    file: ''
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0]
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
                   
    } catch (error) {

      
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 max-w-md p-5 bg-white shadow-md rounded-lg mt-10'>
          <h1 className='font-bold text-2xl mb-4'>SignUp</h1>

          <div className='my-5'>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Kuldeep Kumar"
              className='mb-4'
            />
          </div>

          <div className='my-2'>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="kuldeep.kumar@gmail.com"
              className='mb-4'
            />
          </div>

          <div className='my-2'>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91 1234567890"
              className='mb-4'
            />
          </div>

          <div className='my-2'>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className='mb-4'
            />
          </div>

          <div className='flex items-center justify-between my-2'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  id="r1"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  id="r2"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex items-center gap-2'>
              <Label htmlFor="file">Profile</Label>
              <Input
                id="file"
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className='cursor-pointer'
              />
            </div>
          </div>

          <Button type="submit" className="w-full my-4">SignUp</Button>

          <span className='text-sm text-gray-500'>
            Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
