import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from '@radix-ui/react-label';
import UpdateProfileDialog from './UpdateProfileDialog';
import AppliedJobTable from './AppliedJobTable';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Get initials (from name or email)
  const getInitials = () => {
    if (user?.fullname) {
      return user.fullname
        .split(' ')
        .map((word) => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
    } else if (user?.email) {
      return user.email
        .split('@')[0]
        .split(/[._]/)
        .map((word) => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
    }
    return 'U'; // Default fallback
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 rounded-full flex items-center justify-center bg-[#6A38C2] text-white text-3xl font-semibold">
            {user?.profile?.avatar ? (
              <AvatarImage src={user.profile.avatar} />
            ) : (
              <span>{getInitials()}</span>
            )}
          </Avatar>

          <div className="flex-1">
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>{user?.profile?.bio || 'No bio provided'}</p>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || 'NA'}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-bold text-2xl mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="font-bold">
                  {skill}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user.profile.resumeOrginalName || 'View Resume'}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
