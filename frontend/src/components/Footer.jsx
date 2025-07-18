import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
       
        <div>
          <h2 className="text-xl font-bold mb-3">JobPortal</h2>
          <p className="text-sm text-gray-400">
            Your gateway to the best career opportunities. Connecting talent with top companies.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline text-gray-300">Home</Link></li>
            <li><Link to="/jobs" className="hover:underline text-gray-300">Jobs</Link></li>
            <li><Link to="/about" className="hover:underline text-gray-300">About</Link></li>
            <li><Link to="/contact" className="hover:underline text-gray-300">Contact</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@jobportal.com</p>
          <p className="text-sm text-gray-400">Phone: +91 9876543210</p>
          <p className="text-sm text-gray-400 mb-3">Address: New Delhi, India</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
