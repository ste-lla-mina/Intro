import React from 'react';
import { UserCheck, Calendar, BarChart3, Users, Goal, Award, Briefcase, FileCode, GraduationCap } from 'lucide-react';

const WhyUs = () => {
  return (
    <div className="w-full bg-[#f8faff] font-sans overflow-x-hidden py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-block border border-[#115D98] text-[#115D98] px-5 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold bg-white shadow-sm">
            Why HerIngress
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mt-6 leading-tight">
            A Platform Designed, <br />
            <span className="text-[#115D98]">Around You.</span>
          </h2>
          <p className="text-slate-500 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Everything we build starts with one question: <span className="italic text-gray-400">"What do girls actually need to succeed?"</span>Here's how we answer it.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4 text-center lg:text-left order-1">
              <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
                Mentorship That Fits.
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
                Matched with Someone Who's Walked Your Path!
              </h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-2 sm:mb-4">
                We don't do random assignments. Our matching connects you with a mentor who shares your field, background, and goals — so every conversation moves you forward.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start">
                <span className="bg-blue-50 text-[#115D98] font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-blue-700 font-black">200+</span> Active Mentors
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">1-on-1</span> Sessions
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  All Fields
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#f1f3f9] p-4 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col gap-4 shadow-inner order-2">
              {[
                { title: "Smart Mentor Matching", desc: "Paired based on your career goals, location & interests", icon: <UserCheck size={22} /> },
                { title: "Flexible Scheduling", desc: "Book sessions that work around school, work & life", icon: <Calendar size={22} /> },
                { title: "Progress Tracking", desc: "Your mentor sees your milestones and guides next steps", icon: <BarChart3 size={22} /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 sm:gap-5 border border-slate-100/50 transition-all hover:translate-x-1 hover:shadow-md">
                  <div className="w-12 h-12 bg-[#115D98] text-white rounded-xl shrink-0 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-xs mt-0.5 sm:mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 bg-[#f1f3f9] p-4 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col gap-4 shadow-inner order-2 lg:order-1">
              {[
                { title: "Curated Peer Groups", desc: "Matched circles of girls in the same field & stage", icon: <Users size={22} /> },
                { title: "Accountability Challenges", desc: "Weekly goals you set and achieve together", icon: <Goal size={22} /> },
                { title: "Recognition & Badges", desc: "Celebrate milestones with credentials partners trust", icon: <Award size={22} /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 sm:gap-5 border border-slate-100/50 transition-all hover:-translate-x-1 hover:shadow-md">
                  <div className="w-12 h-12 bg-[#115D98] text-white rounded-xl shrink-0 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-xs mt-0.5 sm:mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 text-center lg:text-left order-1 lg:order-2">
              <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
                Community Power.
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
                You're Never Building Alone!
              </h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-2 sm:mb-4">
                Peer circles, group challenges, and community events connect you with girls who share your ambitions. Together you hold each other accountable and celebrate every win.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start">
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">5,000+</span> Members
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">30+</span> Peer circles
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  Weekly Events
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4 text-center lg:text-left order-1">
              <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
                Real Opportunities.
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
                Guidance That Opens Actual Doors!
              </h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-2 sm:mb-4">
                From resume tools to exclusive job listings from our 200+ partner companies and NGOs — HerIngress doesn't just prepare you, it connects you to what's next.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start">
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">50+</span> Partners
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">30+</span> Jobs Found
                </span>
                <span className="bg-blue-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-full border border-blue-100/60 whitespace-nowrap">
                  <span className="text-[#115D98] font-black">98%</span> Success Rate
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#f1f3f9] p-4 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col gap-4 shadow-inner order-2">
              {[
                { title: "Partner Job Board", desc: "Exclusive listings from companies who want to hire you", icon: <Briefcase size={22} /> },
                { title: "Career Tools", desc: "Resume builder, interview prep & career roadmaps", icon: <FileCode size={22} /> },
                { title: "Scholarship Access", desc: "Links to funding opportunities matched to your profile", icon: <GraduationCap size={22} /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 sm:gap-5 border border-slate-100/50 transition-all hover:translate-x-1 hover:shadow-md">
                  <div className="w-12 h-12 bg-[#115D98]  text-white rounded-xl shrink-0 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-xs mt-0.5 sm:mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-20 md:mt-28 lg:mt-32 bg-[#115D98]  text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight leading-tight">
              Ready to Start Your <span className="text-blue-300">Journey?</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-white text-[#115D98]  font-bold px-8 py-3.5 sm:py-4 rounded-xl shadow-lg hover:bg-slate-50 active:scale-98 transition-all text-sm sm:text-base">
                Start Today.
              </button>
              <button className="w-full sm:w-auto border-2 border-white/80 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 active:scale-98 transition-all text-sm sm:text-base">
                Already In.
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyUs;