import React from 'react';
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

  return (
    <div className="w-full bg-white font-sans">
      <section className="relative w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="z-10 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-700 leading-tight mb-6">
              Discover Your Potential with <br />
              <span className="text-[#115D98]">HerIngress.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
              Providing girls with career guidance and advices from mentors needed to build a bright future.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-[#115D98] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0d4a7d] transition-all shadow-lg active:scale-95">
                Get Started <ArrowRight size={20} />
              </button>
              <button className="border-2 border-[#115D98] text-[#115D98] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all">
                Sign In
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative z-10">
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover scale-110" />
              </div>

              {fields.map((field, i) => (
                <div key={i} className={`absolute hidden lg:flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-50 z-20 hover:scale-105 transition-transform ${field.position} ${field.delay}`}>
                  <div className={`p-1.5 rounded-lg bg-slate-50 ${field.color}`}>{field.icon}</div>
                  <span className="font-bold text-[#115D98] text-xs whitespace-nowrap">{field.title}</span>
                </div>
              ))}
              
              <div className="absolute inset-0 bg-purple-100 rounded-full blur-[80px] -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-100 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">Impact</span>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-700 mt-4">Everything you need to Succeed.</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Powerful tools designed to help you navigate your future with confidence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactSteps.map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                <div className={`${step.bgColor} ${step.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-slate-600 mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

    </div>
  );
};

export default Hero;