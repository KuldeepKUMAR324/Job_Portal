// import User from '../models/user.model.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import getDataUri from '../utils/datauri.js';
// import cloudinary from '../utils/cloudinary.js';

// // Register a new user
// export const register = async (req, res) => {
//     try {
//         const { fullname, email, password, phoneNumber, role } = req.body;

//         if (!fullname || !email || !password) {
//             return res.status(400).json({ message: 'All fields are required', success: false });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists', success: false });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         let user = await User.create({
//             fullname,
//             email,
//             password: hashedPassword,
//             phoneNumber,
//             role,
//         });

//         // Generate JWT token
//         const tokendata = { userId: user._id };
//         const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

//         // Prepare user data to send
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,
//         };

//         // Send cookie and response
//         return res.status(201)
//             .cookie('token', token, {
//                 maxAge: 24 * 60 * 60 * 1000, // 1 day
//                 httpOnly: true,
//                 sameSite: 'strict',
//             })
//             .json({ message: 'User registered and logged in', user, success: true });

//     } catch (error) {
//         console.error('Error during registration:', error);
//         return res.status(500).json({ message: 'Internal server error', success: false });
//     }
// };

// // Login user
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required', success: false });
//         }

//         // Check if user exists
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password', success: false });
//         }

//         // Compare passwords
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password', success: false });
//         }

//         // Validate role
//         if (user.role !== 'student' && user.role !== 'recruiter') {
//             return res.status(400).json({ message: 'Invalid role', success: false });
//         }

//         // Generate JWT
//         const tokendata = { userId: user._id };
//         const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

//         // Prepare user object to return
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,
//         };

//         // Send cookie and response
//         return res.status(200)
//             .cookie('token', token, {
//                 maxAge: 24 * 60 * 60 * 1000,
//                 httpOnly: true,
//                 sameSite: 'strict',
//             })
//             .json({ message: 'Login successful', user, success: true });

//     } catch (error) {
//         console.error('Error during login:', error);
//         return res.status(500).json({ message: 'Internal server error', success: false });
//     }
// };

// // Logout user
// export const logout = async (req, res) => {
//     try {
//         res.clearCookie('token');
//         return res.status(200).json({ message: 'Logout successful', success: true });
//     } catch (error) {
//         console.error('Error during logout:', error);
//         return res.status(500).json({ message: 'Internal server error', success: false });
//     }
// };

// // Update user profile
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file;

//         // Upload resume to Cloudinary
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }

//         const userId = req.id;
//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found', success: false });
//         }

//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skillsArray) user.profile.skills = skillsArray;

//         if (cloudResponse) {
//             user.profile.resume = cloudResponse.secure_url;
//             user.profile.resumeOriginalname = file.originalname;
//         }

//         await user.save();

//         // Return updated user info
//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,
//         };

//         return res.status(200).json({ message: 'Profile updated successfully', user, success: true });

//     } catch (error) {
//         console.error('Error updating profile:', error);
//         return res.status(500).json({ message: 'Internal server error', success: false });
//     }
// };
// //kuldeep kumar
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        });

        const tokendata = { userId: user._id };
        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(201)
            .cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'lax',
            })
            .json({ message: 'User registered and logged in', user, success: true });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        if (user.role !== 'student' && user.role !== 'recruiter') {
            return res.status(400).json({ message: 'Invalid role', success: false });
        }

        const tokendata = { userId: user._id };
        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200)
            .cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
            })
            .json({ message: 'Login successful', user, success: true });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful', success: true });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Update user profile (Resume is mandatory)
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Resume file is required', success: false });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        let skillsArray = skills ? skills.split(",") : [];

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;

        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalname = file.originalname;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({ message: 'Profile updated successfully', user, success: true });

    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
