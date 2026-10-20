import React ,{useEffect,useRef,useState} from 'react';
import { Globe, Users, Target, Quote } from 'lucide-react';
import teamImg1 from '../../assets/she.jpg'; 
import teamImg2 from '../../assets/download.jpg';
const QUOTE_LINE_1 = ['If', 'your', 'dreams', 'do', 'not', 'scare', 'you,'];
const QUOTE_LINE_2A = ['they', 'are'];
const QUOTE_LINE_2B = ['not', 'big', 'enough.'];

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
  const useReveal = (threshold = 0.15) => {
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
  const [quoteRef, quoteVisible] = useReveal(0.25);
  const quoteSectionRef = useRef(null);
  const handleQuoteMove = (e) => {
    const el = quoteSectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot', '1');
  };
  const handleQuoteLeave = () => {
    quoteSectionRef.current?.style.setProperty('--spot', '0');
  };

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&display=swap');

        .font-outfit { font-family: 'Outfit', ui-sans-serif, system-ui, sans-serif; }

        /* ---------- Quote section ---------- */
        .q-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          filter: blur(4px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1), filter .7s ease;
          transition-delay: var(--delay, 0s);
        }
        .words-in .q-word { opacity: 1; transform: none; filter: none; }

        /* Icon pops in with a little overshoot */
        .q-pop {
          opacity: 0;
          transform: scale(.4) rotate(-20deg);
          transition: opacity .6s ease, transform .8s cubic-bezier(.3,1.6,.5,1);
        }
        .words-in .q-pop { opacity: 1; transform: none; }

        /* Rings pulsing outward from the icon */
        @keyframes qRing {
          0%   { transform: scale(1);   opacity: .45; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .q-ring { animation: qRing 3.2s cubic-bezier(0,0,.2,1) infinite; }

        /* Marker highlight sweeping behind "not big enough." */
        .q-mark {
          background-image: linear-gradient(rgba(17,93,152,.16), rgba(17,93,152,.16));
          background-repeat: no-repeat;
          background-position: 0 92%;
          background-size: 0% 36%;
          transition: background-size 1s cubic-bezier(.2,.7,.2,1) 1.5s;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 0 .12em;
        }
        .words-in .q-mark { background-size: 100% 36%; }

        /* Slowly spinning dashed ring + drifting dots */
        @keyframes qSpin { to { transform: rotate(360deg); } }
        .q-spin { animation: qSpin 50s linear infinite; }
        @keyframes qDrift {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(14px,-22px,0); }
        }
        .q-drift   { animation: qDrift 9s ease-in-out infinite; }
        .q-drift-2 { animation: qDrift 12s ease-in-out infinite reverse; }

        /* Cursor-following spotlight */
        .q-spotlight {
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(17,93,152,.10), transparent 65%);
          opacity: var(--spot, 0);
          transition: opacity .4s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .q-word, .q-pop { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; }
          .q-mark { background-size: 100% 36% !important; transition: none !important; }
          .q-ring, .q-spin, .q-drift, .q-drift-2 { animation: none !important; }
        }
      `}</style>
      <section className="w-full pt-16 pb-12 text-center px-6 max-w-3xl mx-auto mb-20">
        <span className="border border-[#115D98] text-[#115D98] px-4 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold bg-blue-50/50">
          About HerIngress.
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-outfit text-slate-800 mt-12 leading-tight">
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
            <h3 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
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
            <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mt-4">
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
                <h4 className="font-outfit text-xl font-bold text-slate-800 mb-3">
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
      <section
        ref={quoteSectionRef}
        onMouseMove={handleQuoteMove}
        onMouseLeave={handleQuoteLeave}
        className="relative w-full py-20 lg:py-32 bg-[#fbfbfe] overflow-hidden"
      >
        <div className="q-spotlight pointer-events-none absolute inset-0" />
        <div className="q-spin pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] sm:w-[44rem] sm:h-[44rem] rounded-full border border-dashed border-[#115D98]/20" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] rounded-full border border-[#115D98]/10" />
        <div className="q-drift pointer-events-none absolute top-16 left-[8%] w-4 h-4 rounded-full bg-[#115D98]/25" />
        <div className="q-drift-2 pointer-events-none absolute top-1/3 right-[10%] w-6 h-6 rounded-full bg-[#115D98]/15" />
        <div className="q-drift pointer-events-none absolute bottom-20 left-[14%] w-8 h-8 rounded-full border-2 border-[#115D98]/25" />
        <div className="q-drift-2 pointer-events-none absolute bottom-16 right-[16%] w-3 h-3 rounded-full bg-[#115D98]/30" />

        <figure
          ref={quoteRef}
          className={`${quoteVisible ? 'words-in' : ''} relative max-w-4xl mx-auto px-6 text-center`}
        >
          <div className="relative mx-auto mb-10 w-20 h-20">
            <span className="q-ring absolute inset-0 rounded-full border-2 border-[#115D98]/40" />
            <span className="q-ring absolute inset-0 rounded-full border-2 border-[#115D98]/40" style={{ animationDelay: '1.6s' }} />
            <div className="q-pop relative w-20 h-20 rounded-full bg-[#115D98] text-white flex items-center justify-center shadow-xl shadow-[#115D98]/30">
              <Quote size={34} />
            </div>
          </div>

          <blockquote className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-[-0.025em]">
            <span className="block text-slate-800">
              {QUOTE_LINE_1.map((w, i) => (
                <span key={i} className="q-word" style={{ '--delay': `${0.3 + i * 0.07}s` }}>
                  {w}&nbsp;
                </span>
              ))}
            </span>
            <span className="block text-slate-800 mt-1 sm:mt-2">
              {QUOTE_LINE_2A.map((w, i) => (
                <span key={i} className="q-word" style={{ '--delay': `${0.8 + i * 0.07}s` }}>
                  {w}&nbsp;
                </span>
              ))}
              <span className="q-mark text-[#115D98]">
                {QUOTE_LINE_2B.map((w, i) => (
                  <span key={i} className="q-word" style={{ '--delay': `${1 + i * 0.07}s` }}>
                    {w}{i < QUOTE_LINE_2B.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </span>
            </span>
          </blockquote>

          <figcaption
            className="q-word mt-12 inline-flex items-center gap-4"
            style={{ '--delay': '1.8s' }}
          >
            <span className="h-[2px] w-10 bg-[#115D98]/40 rounded-full" />
            <span className="font-outfit text-lg sm:text-xl font-semibold text-slate-400 tracking-[-0.01em]">
              Ellen Johnson Sirleaf
            </span>
            <span className="h-[2px] w-10 bg-[#115D98]/40 rounded-full" />
          </figcaption>
        </figure>
      </section>
    </div>
  );
};

export default About;