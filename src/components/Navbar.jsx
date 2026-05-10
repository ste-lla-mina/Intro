import React from 'react';
import logo from '../assets/hilightlogo.jpg'; 

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'About Us', href: '#', active: false },
    { name: 'Why Us', href: '#', active: false },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black italic text-[#6a5acd] tracking-tight">
              HerIngress
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold relative py-2 ${
                  link.active ? 'text-[#6a5acd]' : 'text-gray-500 hover:text-[#6a5acd]'
                }`}
              >
                {link.name}
                {link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6a5acd] rounded-full"></span>
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="text-sm font-bold text-gray-500 hover:text-[#6a5acd]">
              Login
            </button>
            <button className="bg-[#6a5acd] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#5a4acb] shadow-lg shadow-[#6a5acd]">
              Join Now!
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;