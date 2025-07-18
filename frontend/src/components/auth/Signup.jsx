import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
    file: ''
  });
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 max-w-md p-5 bg-white shadow-md rounded-lg mt-10'>
          <h1 className='font-bold text-2xl mb-4'>Sign Up</h1>

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

          <div className='flex items-center gap-2 my-4'>
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

          {
            loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">Sign Up</Button>
            )
          }

          <span className='text-sm text-gray-500'>
            Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
