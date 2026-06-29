import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/hilight.jpg'; 

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Why Us', id: 'why' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="w-full bg-white/90 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div onClick={() => handleNavClick('home')} className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black text-[#115D98] tracking-tight">
              HerIngress
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-semibold relative py-2 transition-colors duration-200 ${
                    isActive ? 'text-[#115D98]' : 'text-gray-500 hover:text-[#115D98]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#115D98] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="text-sm font-bold text-gray-500 hover:text-[#115D98]">
              Login
            </button>
            <button className="bg-[#115D98] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#0d4a7d] shadow-lg shadow-[#115D98]/20 transition-all">
              Join Now!
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-[#115D98] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 pt-2 pb-6 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-base font-bold py-2 ${
                    isActive ? 'text-[#115D98]' : 'text-gray-600 hover:text-[#115D98]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
          
          <hr className="border-gray-100" />
          
          <div className="flex flex-col gap-3">
            <button className="w-full text-center py-3 font-bold text-gray-600 hover:text-[#115D98] rounded-xl border border-gray-100">
              Login
            </button>
            <button className="w-full bg-[#115D98] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0d4a7d] shadow-md shadow-[#115D98]/10">
              Join Now!
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;