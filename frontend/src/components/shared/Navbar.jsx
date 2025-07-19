import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

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
                            <Avatar>
                                <AvatarImage
                                    src="https://i.ibb.co/6n1f3xH/Avatar.png"
                                    alt="Avatar"
                                    className='w-10 h-10 rounded-full'
                                />
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-80 p-4 space-y-4">
                            <div className='flex items-center gap-4'>
                                <Avatar>
                                    <AvatarImage
                                        src="https://i.ibb.co/6n1f3xH/Avatar.png"
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full"
                                    />
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
