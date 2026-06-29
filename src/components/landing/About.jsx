import React from 'react';
import { Globe, Users, Target } from 'lucide-react';
import teamImg1 from '../../assets/she.jpg'; 
import teamImg2 from '../../assets/download.jpg';

const About = () => {
  const coreValues = [
    {
      title: "Inclusive Access",
      desc: "We design every feature with accessibility and offline-first principles so all girls can participate regardless of connectivity.",
      icon: <Globe size={24} />,
      bgColor: "bg-[#115D98]/10",
      iconColor: "text-[#115D98]"
    },
    {
      title: "Community First",
      desc: "Growth happens together. Our peer networks and mentor circles create lasting bonds that accelerate careers.",
      icon: <Users size={24} />,
      bgColor: "bg-[#115D98]/10",
      iconColor: "text-[#115D98]"
    },
    {
      title: "Bold Ambition",
      desc: "We encourage every girl to dream without limits and provide the tools and confidence to pursue those dreams relentlessly.",
      icon: <Target size={24} />,
      bgColor: "bg-[#115D98]/10",
      iconColor: "text-[#115D98]"
    }
  ];

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      <section className="w-full pt-16 pb-12 text-center px-6 max-w-3xl mx-auto mb-20">
        <span className="border border-[#115D98] text-[#115D98] px-4 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold bg-blue-50/50">
          About HerIngress.
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mt-12 leading-tight">
          Built by Girls , <br className="sm:hidden" />
          <span className="text-[#115D98]">For Girls!</span>
        </h2>
        <p className="text-slate-500 mt-10 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          We started with a simple belief: <span className='italic text-gray-400'>"Every girl deserves access to mentorship, career tools, and a community that believes in her potential."</span>
        </p>
      </section>
      <section className="w-full py-12 lg:py-20 bg-[#fbfbfe]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left">
            <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
              Closing the Gap Between <br className="hidden sm:inline" /> Ambition and Opportunity.
            </h3>
            <div className="flex flex-col gap-4 text-slate-500 font-medium text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                HerIngress was founded to break down the systemic barriers that prevent girls and young women from entering professional spaces. We provide mentorship, career resources, and a network that actively opens doors.
              </p>
              <p>
                From rural communities to urban centers, we believe geography and background should never limit potential. Our platform works offline-first, ensuring no girl is left behind.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="absolute top-0 right-4 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-transform hover:scale-102 z-10">
              <img src={teamImg1} alt="Team collaborative work session" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-4 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105 z-20">
              <img src={teamImg2} alt="Group presentation details" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
              What Drove Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-4">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-10">
            {coreValues.map((value, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center md:items-start text-center md:text-left bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className={`${value.bgColor} ${value.iconColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;