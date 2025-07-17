import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h1 className='font-bold text-2xl text-center'>Sign Up</h1>

          {/* Full Name */}
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" type="text" placeholder="Kuldeep Kumar" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="9876543210" />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>

          {/* Role Selection */}
          <div>
            <Label className="mb-2 block">Select Role</Label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="accent-blue-600"
                />
                Student
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="accent-blue-600"
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full bg-[#A38c2] hover:bg-[#8d7a1d] text-white">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
