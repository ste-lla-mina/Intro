import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Palette, Briefcase, Microscope, Wheat, UserPlus, FileText, Zap } from 'lucide-react';
import heroImage from '../assets/cap.jpg'; 

const Hero = () => {
  const fields = [
    { title: "STEM & Tech", icon: <Code size={18} />, color: "text-blue-800", position: "-top-4 left-0", delay: "animate-super-float" },
    { title: "Arts & Design", icon: <Palette size={18} />, color: "text-purple-600", position: "top-1/4 -left-20", delay: "animate-magnetic" },
    { title: "Business", icon: <Briefcase size={18} />, color: "text-blue-700", position: "top-12 -right-16", delay: "animate-super-float" },
    { title: "Health & Medicine", icon: <Microscope size={18} />, color: "text-orange-600", position: "bottom-20 -right-8", delay: "animate-magnetic" },
    { title: "Agriculture", icon: <Wheat size={18} />, color: "text-green-600", position: "bottom-12 -left-12", delay: "animate-super-float" },
  ];

  const impactSteps = [
    { title: "Create Profile.", desc: "Set up your digital identity. Tell us about your background, interests, and dreams.", icon: <UserPlus size={28} />, bgColor: "bg-blue-50", iconColor: "text-blue-700" },
    { title: "Skill Test.", desc: "Take interactive, offline-ready assessments to identify your strengths and growth areas.", icon: <FileText size={28} />, bgColor: "bg-red-50", iconColor: "text-red-600" },
    { title: "Smart Match.", desc: "Our AI matches you with the best-fit programs, scholarships, and mentors.", icon: <Zap size={28} />, bgColor: "bg-amber-50", iconColor: "text-amber-600" }
  ];

  const counterStats = [
    { value: "10+", label: "Career Fields." },
    { value: "100+", label: "Opportunities." },
    { value: "150+", label: "Colleges&Universities." },
    { value: "1", label: "AI Assistant: Asha", highlight: true }
  ];

  const fullText = "Discover Your Potential with ";
  const [typedText, setTypedText] = useState("");
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 8 + 4 + "px",
      };
      setSparkles((prev) => [...prev.slice(-15), newSparkle]);
    }, 400);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      <section className="relative w-full pt-12 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-700 leading-tight mb-6 min-h-[120px] sm:min-h-[150px] lg:min-h-[auto]">
              <span className="inline border-r-2 border-slate-400 pr-1">{typedText}</span> <br />
              <span className="text-[#115D98] inline-block relative px-2">
                HerIngress.
                {sparkles.map((sparkle) => (
                  <span
                    key={sparkle.id}
                    className="absolute bg-[#115D98] rounded-full animate-ping pointer-events-none opacity-70"
                    style={{
                      top: sparkle.top,
                      left: sparkle.left,
                      width: sparkle.size,
                      height: sparkle.size,
                    }}
                  />
                ))}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto lg:mx-0 mb-8 sm:mb-10 font-medium leading-relaxed">
              Providing girls with career guidance,inspirations and advices needed to build a bright future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-[#115D98] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0d4a7d] transition-all shadow-lg active:scale-95 group">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto border-2 border-[#115D98] text-[#115D98] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all">
                Sign In
              </button>
            </div>
          </div>
          <div className="hidden lg:flex relative justify-center">
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative z-10 transition-transform duration-700 hover:scale-102">
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover scale-110" />
              </div>

              {fields.map((field, i) => (
                <div key={i} className={`absolute flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-50 z-20 hover:scale-105 transition-transform ${field.position} ${field.delay}`}>
                  <div className={`p-1.5 rounded-lg bg-slate-50 ${field.color}`}>{field.icon}</div>
                  <span className="font-bold text-[#115D98] text-xs whitespace-nowrap">{field.title}</span>
                </div>
              ))}
              
              <div className="absolute inset-0 bg-purple-100 rounded-full blur-[80px] -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 sm:text-center sm:mb-16">
            <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">Impact</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-700 mt-4 leading-tight">Everything you need to Succeed.</h2>
            <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-xl mx-auto">Powerful tools designed to help you navigate your future with confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {impactSteps.map((step, i) => (
              <div key={i} className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className={`${step.bgColor} ${step.iconColor} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-600 mb-4">{step.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       <section className="w-full bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {counterStats.map((stat, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col items-center justify-center text-center group hover:translate-y-[-4px] transition-all duration-300">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#115D98] mb-3 tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </span>
                <span className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${stat.highlight ? 'text-slate-500 italic' : 'text-slate-500'}`}>
                  {stat.highlight ? (
                    <>
                      AI Assistant: <span className="text-[#115D98] font-extrabold not-italic">Asha</span>
                    </>
                  ) : (
                    stat.label
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8faff] py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-700 mb-4 tracking-tight">
            Curious about what your future holds?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-normal mb-10 max-w-xl mx-auto leading-relaxed">
            Uncover tailored hidden opportunities, connect with standard remote mentors, and decode your ultimate skills strategy today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <button className="w-full sm:w-auto bg-[#115D98] text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-[#0d4a7d] transition-all active:scale-95 whitespace-nowrap">
              Join Us
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all whitespace-nowrap">
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;