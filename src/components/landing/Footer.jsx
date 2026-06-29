import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-black tracking-tight text-[#115D98]">
            HerIngress.
          </span>
          <p className="text-sm font-medium text-slate-400 leading-relaxed">
            Empowering the next generation of female leaders through data-driven mentorship.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#115D98] text-white hover:scale-105 transition-all" aria-label="X (formerly Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#115D98] text-white hover:scale-105 transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#115D98] text-white hover:scale-105 transition-all" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Explore Paths</h3>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">STEM & Technology.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Creative Arts & Design.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Business & Leadership.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Healthcare & Science.</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Resources</h3>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Asha AI Assistance.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Interest Assement.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Scholarships.</a></li>
            <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Job announcements.</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#115D98] shrink-0 mt-0.5" />
              <span>Kigali, Rwanda</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#115D98] shrink-0" />
              <a href="mailto:support@heringress.org" className="hover:text-white">heringress@ac.rw</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#115D98] shrink-0" />
              <a href="tel:+250788000000" className="hover:text-white">+250 788 123 456</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
        <p>© {new Date().getFullYear()} HerIngress. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Cookie Preferences</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;