import React, { useEffect, useRef, useState } from 'react';
import { UserCheck, Calendar, BarChart3, Users, Goal, Award, Briefcase, FileCode, GraduationCap, ArrowRight } from 'lucide-react';
const useReveal = (threshold = 0.25) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// Headline split so each word can animate in
const CTA_WORDS = ['Ready', 'to', 'Start', 'Your'];
const CTA_HIGHLIGHT = 'Journey?';

const WhyUs = ({ onLoginClick, onJoinClick }) => {
  const [ctaRef, ctaVisible] = useReveal(0.3);

  // Cursor spotlight for the CTA
  const ctaBoxRef = useRef(null);
  const handleMove = (e) => {
    const el = ctaBoxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot', '1');
  };
  const handleLeave = () => ctaBoxRef.current?.style.setProperty('--spot', '0');

  return (
    <div className="w-full bg-[#f8faff] font-sans overflow-x-hidden py-12 md:py-20 lg:py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&display=swap');

        .font-outfit { font-family: 'Outfit', ui-sans-serif, system-ui, sans-serif; }

        /* ---------- CTA ---------- */
        .cta-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(22px);
          filter: blur(4px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1), filter .7s ease;
          transition-delay: var(--delay, 0s);
        }
        .cta-in .cta-word { opacity: 1; transform: none; filter: none; }

        /* Marker highlight sweeping behind "Journey?" */
        .cta-mark {
          background-image: linear-gradient(rgba(17,93,152,.16), rgba(17,93,152,.16));
          background-repeat: no-repeat;
          background-position: 0 92%;
          background-size: 0% 36%;
          transition: background-size 1s cubic-bezier(.2,.7,.2,1) .9s;
          padding: 0 .12em;
        }
        .cta-in .cta-mark { background-size: 100% 36%; }

        /* Rotating ring + drifting dots */
        @keyframes ctaSpin { to { transform: rotate(360deg); } }
        .cta-spin { animation: ctaSpin 50s linear infinite; }
        @keyframes ctaDrift {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(14px,-20px,0); }
        }
        .cta-drift   { animation: ctaDrift 9s ease-in-out infinite; }
        .cta-drift-2 { animation: ctaDrift 12s ease-in-out infinite reverse; }

        /* Cursor-following spotlight */
        .cta-spotlight {
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(17,93,152,.10), transparent 65%);
          opacity: var(--spot, 0);
          transition: opacity .4s ease;
        }

        /* Primary button: soft pulse ring + sliding arrow */
        @keyframes ctaPulse {
          0%   { transform: scale(1);    opacity: .45; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .cta-pulse { animation: ctaPulse 2.4s cubic-bezier(0,0,.2,1) infinite; }
        .cta-primary:hover .cta-arrow { transform: translateX(5px); }
        .cta-arrow { transition: transform .3s ease; }

        /* Secondary button: blue fill sweeps in from the left on hover */
        .cta-ghost { position: relative; overflow: hidden; z-index: 0; transition: color .35s ease; }
        .cta-ghost::before {
          content: '';
          position: absolute; inset: 0; z-index: -1;
          background: #115D98;
          transform: translateX(-101%);
          transition: transform .45s cubic-bezier(.2,.7,.2,1);
        }
        .cta-ghost:hover { color: #fff; }
        .cta-ghost:hover::before { transform: translateX(0); }

        @media (prefers-reduced-motion: reduce) {
          .cta-word { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .cta-mark { background-size: 100% 36% !important; transition: none !important; }
          .cta-spin, .cta-drift, .cta-drift-2, .cta-pulse { animation: none !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-block border border-[#115D98] text-[#115D98] px-5 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold bg-white shadow-sm">
            Why HerIngress
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mt-6 leading-tight">
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
              <h3 className="font-outfit text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
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
                    <h4 className="font-outfit font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
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
                    <h4 className="font-outfit font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-xs mt-0.5 sm:mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 text-center lg:text-left order-1 lg:order-2">
              <span className="text-[#115D98] font-black tracking-widest uppercase text-xs">
                Community Power.
              </span>
              <h3 className="font-outfit text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
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
              <h3 className="font-outfit text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
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
                    <h4 className="font-outfit font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{item.title}</h4>
                    <p className="text-slate-400 font-medium text-xs mt-0.5 sm:mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ============================ CTA ============================ */}
        <div
          ref={ctaBoxRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative mt-20 md:mt-28 lg:mt-32 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#115D98]/15 px-6 sm:px-12 md:px-16 py-16 sm:py-20 md:py-24 text-center"
        >
          {/* cursor spotlight */}
          <div className="cta-spotlight pointer-events-none absolute inset-0" />

          {/* decorative rings + drifting dots (brand blue only) */}
          <div className="cta-spin pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] sm:w-[42rem] sm:h-[42rem] rounded-full border border-dashed border-[#115D98]/20" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] rounded-full border border-[#115D98]/10" />
          <div className="cta-drift pointer-events-none absolute top-10 left-[8%] w-4 h-4 rounded-full bg-[#115D98]/25" />
          <div className="cta-drift-2 pointer-events-none absolute top-1/3 right-[9%] w-6 h-6 rounded-full bg-[#115D98]/15" />
          <div className="cta-drift pointer-events-none absolute bottom-12 left-[13%] w-8 h-8 rounded-full border-2 border-[#115D98]/25" />
          <div className="cta-drift-2 pointer-events-none absolute bottom-10 right-[15%] w-3 h-3 rounded-full bg-[#115D98]/30" />

          <div ref={ctaRef} className={`${ctaVisible ? 'cta-in' : ''} relative z-10 max-w-2xl mx-auto`}>
            <h3 className="font-outfit text-3xl sm:text-4xl md:text-6xl font-semibold text-slate-800 mb-10 sm:mb-12 tracking-[-0.025em] leading-[1.15]">
              {CTA_WORDS.map((w, i) => (
                <span key={w} className="cta-word" style={{ '--delay': `${0.15 + i * 0.08}s` }}>
                  {w}&nbsp;
                </span>
              ))}
              <span className="cta-mark text-[#115D98]">
                <span className="cta-word" style={{ '--delay': `${0.15 + CTA_WORDS.length * 0.08}s` }}>
                  {CTA_HIGHLIGHT}
                </span>
              </span>
            </h3>

            <div
              className="cta-word flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center items-center"
              style={{ '--delay': '1s' }}
            >
              <div className="relative w-full sm:w-auto">
                <span className="cta-pulse pointer-events-none absolute inset-0 rounded-xl bg-[#115D98]" />
                <button onClick={onJoinClick} className="cta-primary relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#115D98] text-white font-outfit font-semibold px-9 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-[#115D98]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#115D98]/40 active:scale-95 transition-all text-sm sm:text-base">
                  Start Today.
                  <ArrowRight size={18} className="cta-arrow" />
                </button>
              </div>
              <button onClick={onLoginClick} className="cta-ghost w-full sm:w-auto border-2 border-[#115D98] text-[#115D98] font-outfit font-semibold px-9 py-3 sm:py-3.5 rounded-xl active:scale-95 text-sm sm:text-base">
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