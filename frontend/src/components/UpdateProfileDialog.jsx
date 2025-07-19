import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills || [],
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setInput({ ...input, skills: value.split(',').map((s) => s.trim()) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills.join(','));
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="fullname"
              onChange={changeEventHandler}
              value={input.fullname}
              placeholder="Enter your name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              onChange={changeEventHandler}
              value={input.email}
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phoneNumber"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              onChange={changeEventHandler}
              value={input.bio}
              rows={4}
              placeholder="Write a short bio about yourself"
              className="border border-gray-300 rounded p-2"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              onChange={changeEventHandler}
              value={input.skills.join(', ')}
              placeholder="E.g. React, Node.js, MongoDB"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="resume">Resume (PDF only)</Label>
            <Input
              id="resume"
              name="resume"
              onChange={fileChangeHandler}
              type="file"
              accept=".pdf"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
