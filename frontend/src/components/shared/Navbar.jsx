import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast(res.data.message, {
          className: 'bg-green-500 text-white font-semibold',
          icon: '✅',
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  const getInitials = () => {
    if (user?.fullname) {
      return user.fullname
        .split(' ')
        .map(word => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
    } else if (user?.email) {
      return user.email
        .split('@')[0]
        .split(/[._]/)
        .map(word => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
    }
    return 'U';
  };

  return (
    <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
      <div>
        <h1 className='text-2xl font-bold'>
          Job<span className='text-[#F83002]'>Portal</span>
        </h1>
      </div>

      <div className='flex items-center gap-6'>
        <ul className='flex font-medium items-center gap-6 list-none'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/browse">Browse</Link></li>
        </ul>

        {!user ? (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline" className="cursor-pointer">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="cursor-pointer bg-[#6A38C2] hover:bg-[#523f72] text-white">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger className='cursor-pointer'>
              <Avatar className="w-10 h-10 rounded-full bg-[#6A38C2] text-white flex items-center justify-center font-bold">
                {user?.profile?.avatar ? (
                  <AvatarImage
                    src={user.profile.avatar}
                    alt="Avatar"
                    className='w-10 h-10 rounded-full'
                  />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-4 space-y-4">
              <div className='flex items-center gap-4'>
                <Avatar className="w-12 h-12 rounded-full bg-[#6A38C2] text-white flex items-center justify-center font-bold text-lg">
                  {user?.profile?.avatar ? (
                    <AvatarImage
                      src={user.profile.avatar}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span>{getInitials()}</span>
                  )}
                </Avatar>
                <div>
                  <h4 className='font-semibold text-lg'>
                    {user?.fullname || 'User Name'}
                  </h4>
                  <p className='text-sm text-gray-500'>
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              <div className="space-y-2">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-2 hover:bg-gray-100"
                  >
                    <User2 className="w-4 h-4" />
                    View Profile
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-2 hover:bg-red-50 text-red-600 hover:text-red-700"
                  onClick={logoutHandler}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
