import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles, CalendarClock, MessageCircle, Quote, Send, X, MapPin, Clock, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Check, BellRing, ArrowRight, Lightbulb } from "lucide-react";

const USER_NAME = "Amina";
const GREET = { en: "Welcome back", rw: "Murakaza neza" };

const QUOTE_INTERVAL = 8000;
const QUOTES = [
  { text: "A girl with a plan and a door to knock on is already halfway through it.", author: "Aim to Grow." },
  { text: "Your story is still being written, and you hold the pen.", author: "Aim to Grow." },
  { text: "Small steps taken every day still reach big places.", author: "Aim to Grow." },
  { text: "Ask for the opportunity. The best answer could change everything.", author: "Aim to Grow." },
  { text: "You do not have to be ready. You only have to begin.", author: "Aim to Grow." },
  { text: "Learn loudly, fail bravely, and lift another girl as you climb.", author: "Aim to Grow." },
  { text: "Your dreams are valid, and your voice belongs in every room.", author: "Aim to Grow." },
];

const SUMMARY = [
  { id: "opps", label: "New Opportunities", value: 12, note: "added this week", icon: Sparkles, tab: "opportunities" },
  { id: "deadlines", label: "Upcoming Deadlines", value: 5, note: "closing this month", icon: CalendarClock, tab: "opportunities" },
  { id: "community", label: "New in Community", value: 28, note: "unread messages", icon: MessageCircle, tab: "community" },
];

const TIP ={
  title: "Daily tip: Lead your CV with impact.",
  body: "Start each bullet with action verb and result. \"Organised a coding club of 25 girls\" says far more than \"Member of a coding club.\".",
};

const EVENTS = [
  { id: 1, title: "CV Clinic with HR Experts", date: "Oct 23", time: "10:00", place: "Online" },
  { id: 2, title: "Girls in Tech Meetup", date: "Oct 29", time: "14:00", place: "Kigali Innovation City" },
  { id: 3, title: "Scholarship Info Session", date: "Nov 4", time: "16:30", place: "Online" },
  { id: 4, title: "Public Speaking Workshop", date: "Nov 12", time: "09:00", place: "Huye Youth Centre" },
];

const DEADLINES = [
  { date: "2026-10-23", title: "Junior Graphic Designer closes" },
  { date: "2026-10-28", title: "Software Engineering Intern closes" },
  { date: "2026-11-05", title: "Health Sciences Bursary closes" },
  { date: "2026-11-15", title: "Women in STEM Scholarship closes" },
  { date: "2026-11-30", title: "Data Analyst Intern closes" },
];

const LATEST = [
  { id: 1, type: "Internship", title: "Software Engineering Intern", org: "Kigali Tech Hub", deadline: "Nov 15, 2026" },
  { id: 2, type: "Scholarship", title: "Women in STEM Scholarship", org: "Africa Girls Fund", deadline: "Nov 30, 2026" },
  { id: 3, type: "Mentorship", title: "Leaders of Tomorrow Mentorship", org: "HerIngress Partners", deadline: "Dec 10, 2026" },
];

const REPLIES = [
  { key: /cv|resume/i, text: "For your CV, start every bullet with an action verb and a result. You can find templates in Create > CV Templates." },
  { key: /scholar/i, text: "Scholarships are listed under Opportunities. Use the Category filter to see only scholarships, and check the deadlines." },
  { key: /interview/i, text: "Practise out loud, research the organisation, and prepare two questions to ask. Create > Interview Prep has videos too." },
  { key: /.*/, text: "Great question! I am still learning, but try Explore for career roadmaps or Learn for free courses." },
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function QuoteCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Advance to the next quote; restarts whenever the quote changes or hover pauses/resumes.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % QUOTES.length), QUOTE_INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused]);

  const q = QUOTES[index];
  return (
    <div
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      className="relative overflow-hidden rounded-3xl bg-[#115D98] p-6 text-white shadow-xl shadow-[#115D98]/20 md:p-8"
    >
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-[#0B2A45]/30" />
      <Quote className="relative mb-3 text-white/40" size={28} />
      <div className="relative min-h-[8rem] md:min-h-[6.5rem]">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <p className="max-w-2xl text-xl font-medium leading-snug md:text-2xl">{q.text}</p>
            <p className="mt-3 text-sm text-white/70">{q.author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative mt-2 flex items-center">
        {QUOTES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Show quote ${i + 1}`} aria-current={i === index} className="px-1 py-2">
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Calendar() {
  const [view, setView] = useState({ y: 2026, m: 9 });
  const [selected, setSelected] = useState("2026-10-28");
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const iso = (d) => `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const today = new Date().toISOString().slice(0, 10);
  const marked = new Set(DEADLINES.map((d) => d.date));
  const shift = (n) => setView((v) => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const title = new Date(view.y, view.m, 1).toLocaleString("en", { month: "long", year: "numeric" });
  const picked = DEADLINES.filter((d) => d.date === selected);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-1">
          <button onClick={() => shift(-1)} aria-label="Previous month" className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#115D98]/10"><ChevronLeft size={18} /></button>
          <button onClick={() => shift(1)} aria-label="Next month" className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#115D98]/10"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {DAY_NAMES.map((d) => <span key={d} className="py-1 font-medium text-slate-400">{d}</span>)}
        {Array.from({ length: first }).map((_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const key = iso(d);
          const isMarked = marked.has(key);
          const isSel = selected === key;
          return (
            <button key={d} onClick={() => setSelected(key)}
              className={`relative aspect-square rounded-xl text-sm transition-colors ${isSel ? "bg-[#115D98] font-semibold text-white" : isMarked ? "bg-[#115D98]/10 font-semibold text-[#115D98] hover:bg-[#115D98]/20" : "text-slate-600 hover:bg-[#f8faff]"} ${key === today && !isSel ? "ring-1 ring-[#0B2A45]" : ""}`}>
              {d}
              {isMarked && !isSel && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0B2A45]" />}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-[#f8faff] p-3 text-sm">
        {picked.length ? picked.map((p) => <p key={p.title} className="flex items-center gap-2 font-medium text-[#0B2A45]"><CalendarClock size={16} /> {p.title}</p>) : <p className="text-slate-500">No deadlines on this day. Marked dates have one.</p>}
      </div>
    </div>
  );
}

export default function Home({ onNavigate = () => {}, lang = "en" }) {
  const [reminders, setReminders] = useState([]);
  const [saved, setSaved] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([{ id: 0, from: "asha", text: `Hi ${USER_NAME}, I am Asha. Ask me about scholarships, CVs or interview prep.` }]);
  const endRef = useRef(null);
  const chatOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const toggle = (setter, id) => setter((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat, chatOpen]);
  useEffect(() => { chatOpenRef.current = chatOpen; if (chatOpen) setUnread(0); }, [chatOpen]);

  const send = (e) => {
    e.preventDefault();
    const text = msg.trim();
    if (!text) return;
    setChat((c) => [...c, { id: Date.now(), from: "me", text }]);
    setMsg("");
    setTimeout(() => {
      setChat((c) => [...c, { id: Date.now() + 1, from: "asha", text: REPLIES.find((r) => r.key.test(text)).text }]);
      if (!chatOpenRef.current) setUnread((u) => u + 1);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold md:text-4xl">{GREET[lang]}, {USER_NAME}!</h2>
        <p className="mt-1 text-slate-500">Here is what is new for you today.</p>
      </div>

      <QuoteCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUMMARY.map(({ id, label, value, note, icon: Icon, tab }) => (
          <button key={id} onClick={() => onNavigate(tab)} className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45]"><Icon size={22} /></span>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            <p className="font-medium text-slate-700">{label}</p>
            <p className="text-sm text-slate-400">{note}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Upcoming Events</h3>
          <ul className="space-y-3">
            {EVENTS.map((ev) => {
              const on = reminders.includes(ev.id);
              return (
                <li key={ev.id} className="flex items-center gap-3 rounded-2xl bg-[#f8faff] p-3">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-center shadow-sm">
                    <span className="text-xs font-medium text-[#115D98]">{ev.date.split(" ")[0]}</span>
                    <span className="-mt-3 text-lg font-semibold text-[#0B2A45]">{ev.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{ev.title}</p>
                    <p className="flex flex-wrap gap-x-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><Clock size={12} /> {ev.time}</span><span className="inline-flex items-center gap-1"><MapPin size={12} /> {ev.place}</span></p>
                  </div>
                  <button onClick={() => toggle(setReminders, ev.id)} aria-pressed={on} aria-label={on ? "Remove reminder" : "Remind me"}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-[#115D98] text-white" : "bg-white text-[#0B2A45] hover:bg-[#115D98]/10"}`}>
                    {on ? <Check size={16} /> : <BellRing size={16} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Deadline Calendar</h3>
          <Calendar />
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Latest Opportunities.</h3>
          <button onClick={() => onNavigate("opportunities")} className="inline-flex items-center gap-1 rounded-full bg-[#115D98] px-5 py-2 text-sm font-medium text-white shadow-md shadow-[#115D98]/20 transition-colors hover:bg-[#0e4c7d]">
            Show More <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {LATEST.map((o) => (
            <article key={o.id} className="flex flex-col rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm transition-shadow hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]">{o.type}</span>
                <button onClick={() => toggle(setSaved, o.id)} aria-label="Save" aria-pressed={saved.includes(o.id)} className="text-[#0B2A45] hover:text-[#115D98]">
                  {saved.includes(o.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
              </div>
              <h4 className="mt-3 font-semibold">{o.title}</h4>
              <p className="text-sm text-slate-500">{o.org}</p>
              <p className="mt-auto pt-3 text-sm text-slate-400">Deadline: {o.deadline}</p>
            </article>
          ))}
        </div>
         <div className="flex gap-4 mt-10 rounded-3xl bg-gradient-to-r from-[#115D98]/5 to-[#115D98]/10 p-5 border border-white">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-[#0B2A45] shadow-sm"><Lightbulb size={22} /></span>
        <div>
          <h3 className="font-semibold text-slate-800">{TIP.title}</h3>
          <p className="text-slate-600 mt-1 max-w-2xl">{TIP.body}</p>
        </div>
      </div>

      </section>

      {/* Asha */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-4 md:bottom-8 md:right-8">
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.18 }}
              style={{ transformOrigin: "bottom right" }}
              className="w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[#115D98]/10 bg-white shadow-2xl sm:w-80">
              <div className="flex items-center justify-between bg-[#115D98] px-4 py-3 text-white">
                <div className="flex items-center gap-2 font-medium"><MessageCircle size={18} /> Asha</div>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/15"><X size={18} /></button>
              </div>
              <div className="h-64 space-y-2 overflow-y-auto bg-[#f8faff] p-4 text-sm">
                {chat.map((m) => (
                  <div key={m.id} className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${m.from === "me" ? "ml-auto rounded-br-sm bg-[#115D98] text-white" : "rounded-tl-sm bg-white text-slate-700"}`}>{m.text}</div>
                ))}
                <div ref={endRef} />
              </div>
              <form onSubmit={send} className="flex gap-2 border-t border-slate-100 p-3">
                <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask Asha anything" className="flex-1 rounded-full bg-[#f8faff] px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/30" />
                <button aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-[#115D98] text-white transition-colors hover:bg-[#0e4c7d]"><Send size={16} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="group relative">
          {/* Soft pulsing halo, only while the chat is closed */}
          {!chatOpen && !reduceMotion && [0, 1].map((i) => (
            <motion.span key={i} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[#115D98]/30"
              initial={{ scale: 1, opacity: 0.45 }} animate={{ scale: 1.55, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }} />
          ))}

          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0B2A45] px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Chat with Asha
          </span>

          <motion.button
            onClick={() => setChatOpen((o) => !o)}
            aria-label={chatOpen ? "Close chat with Asha" : "Open chat with Asha"} aria-expanded={chatOpen}
            whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="relative grid h-16 w-16 place-items-center rounded-[1.5rem] bg-gradient-to-br from-[#1672b5] to-[#115D98] text-white shadow-[0_14px_34px_-8px_rgba(17,93,152,0.7)] ring-1 ring-white/20"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={chatOpen ? "close" : "chat"} initial={{ opacity: 0, rotate: -80, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 80, scale: 0.6 }} transition={{ duration: 0.18 }} className="grid place-items-center">
                {chatOpen ? <X size={26} strokeWidth={2.2} /> : <MessageCircle size={28} strokeWidth={2.2} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {unread > 0 && !chatOpen && (
              <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="pointer-events-none absolute -right-1.5 -top-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-[#0B2A45] px-1.5 text-xs font-semibold text-white ring-2 ring-white">
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}