import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import labBg from '../../assets/image1.jpg'; 
import techBg from '../../assets/image2.jpg'; 

const Auth = ({ children, onBackToHome }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: "Access from Anywhere.",
      subtitle: "Whether at home, at school, or on the go, we're here for you!",
      image: labBg
    },
    {
      title: "Unlock Your Path to Success",
      subtitle: "Connect with mentors, access resources, and join a global community of ambitious young women.",
      image: techBg
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 font-sans relative">
      
      <button 
        onClick={onBackToHome}
        className="absolute top-6 right-6 lg:right-auto lg:left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 lg:bg-slate-900 lg:text-white backdrop-blur-sm rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-slate-700"
      >
        <ArrowLeft size={14} />
        Back to Home
      </button>

      <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden text-white flex-col justify-between p-12">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt="HerIngress Platform Graphics" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center gap-2 mt-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-3xl font-black text-[#115D98]">H</span>
          </div>
          <span className="text-xl font-black tracking-tight">HerIngress</span>
        </div>

        <div className="relative z-10 max-w-sm mx-auto text-center flex flex-col gap-4 mb-8">
          <h2 className="text-3xl font-black leading-tight transition-all duration-500">
            {slides[slideIndex].title}
          </h2>
          <p className="text-slate-300 font-medium text-sm leading-relaxed transition-all duration-500">
            {slides[slideIndex].subtitle}
          </p>
          
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === slideIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-16 w-full z-10">
        <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-100 lg:border-none p-6 sm:p-10 lg:p-0 shadow-xl shadow-slate-100/50 lg:shadow-none mt-12 lg:mt-0">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Auth;