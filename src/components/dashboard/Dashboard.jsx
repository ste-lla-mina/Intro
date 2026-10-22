import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home as HomeIcon, Compass, Briefcase, GraduationCap, PenSquare, Star, Users,
  Bell, Search, Globe, LogOut, User, X, MoreHorizontal, Check,
} from "lucide-react";
import Home from "./Home";
import Explore from "./Explore";
import Opportunities from "./Opportunities";
import Learn from "./Learn";
import Create from "./Create";
import RoleModels from "./RoleModels";
import Community from "./Community";
import Profile from "./Profile";
import logo from '../../assets/hilight.jpg'; 

const NAV = [
  { id: "home", icon: HomeIcon, label: { en: "Home", rw: "Ahabanza" } },
  { id: "explore", icon: Compass, label: { en: "Explore", rw: "Shakisha" } },
  { id: "opportunities", icon: Briefcase, label: { en: "Opportunities", rw: "Amahirwe" }, short: { en: "Apply", rw: "Saba" } },
  { id: "learn", icon: GraduationCap, label: { en: "Learn", rw: "Iga" } },
  { id: "create", icon: PenSquare, label: { en: "Create", rw: "Kora" } },
  { id: "rolemodels", icon: Star, label: { en: "Role Models", rw: "Intangarugero" } },
  { id: "community", icon: Users, label: { en: "Community", rw: "Umuryango" } },
];
const MOBILE_MAIN = ["home", "explore", "opportunities", "learn", "create"];
const MOBILE_MORE = ["rolemodels", "community"];

const SECTIONS = { home: Home, explore: Explore, opportunities: Opportunities, learn: Learn, create: Create, rolemodels: RoleModels, community: Community, profile: Profile };
const SEARCHABLE = ["explore", "opportunities", "learn", "community"];

const T = {
  profile: { en: "Profile", rw: "Umwirondoro" },
  logout: { en: "Logout", rw: "Sohoka" },
  more: { en: "More", rw: "Ibindi" },
  search: { en: "Search opportunities, courses, people...", rw: "Shakisha amahirwe, amasomo, abantu..." },
  quote: { en: "Every door you open makes the next one easier for another girl.", rw: "Buri rugi ufunguye rworohereza undi mukobwa ugukurikiye." },
};
const LANGS = [{ code: "en", name: "English" }, { code: "rw", name: "Kinyarwanda" }];

const NOTIFS = [
  { id: 1, text: "New scholarship: Women in STEM Scholarship", time: "2h ago", tab: "opportunities" },
  { id: 2, text: "Grace replied in Tech Girls", time: "4h ago", tab: "community" },
  { id: 3, text: "Deadline tomorrow: Junior Graphic Designer", time: "1d ago", tab: "opportunities" },
];

function useOutside(ref, cb) {
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && cb();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

function Dropdown({ renderTrigger, children, width = "w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      {renderTrigger(open, () => setOpen((o) => !o))}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
            className={`absolute right-0 z-50 mt-2 ${width} overflow-hidden rounded-2xl border border-[#115D98]/10 bg-white shadow-xl`}
          >
            {children(() => setOpen(false))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const iconBtn = "relative grid h-10 w-10 place-items-center rounded-full border border-[#115D98]/10 bg-white text-[#0B2A45] transition-colors hover:bg-[#115D98]/10";
const avatar = "https://ui-avatars.com/api/?name=Amina+Uwase&background=115D98&color=fff&bold=true";

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState("en");
  const [query, setQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFS.map((n) => ({ ...n, read: false })));

  const Section = SECTIONS[activeTab];
  const unread = notifs.filter((n) => !n.read).length;
  const changeTab = (id) => { setActiveTab(id); setQuery(""); setMoreOpen(false); setMobileSearch(false); window.scrollTo?.(0, 0); };
  const submitSearch = (e) => { e.preventDefault(); if (!SEARCHABLE.includes(activeTab)) setActiveTab("opportunities"); };
  const logout = () => onLogout?.();

  return (
    <div className="flex min-h-screen bg-[#f8faff] text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-[#115D98]/10 bg-white/90 p-5 md:flex">
        <div className="mb-5 flex items-center gap-3 px-2">
          <div className="grid h-8 w-8 place-items-center rounded-2xl bg-whiteshadow-md shadow-[#115D98]/30">
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </div>
          <span className=" mt-3 text-xl font-bold text-[#115D98]">HerIngress</span>
        </div>
        <nav className="flex flex-col gap-1 mt-6">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => changeTab(id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left font-medium transition-all duration-200 ${
                activeTab === id ? "bg-[#115D98] text-white shadow-lg shadow-[#115D98]/25" : "text-slate-500 hover:bg-[#115D98]/5 hover:text-[#115D98]"}`}>
              <Icon size={20} /> {label[lang]}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-2 pt-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#115D98]/5 to-[#115D98]/10 p-4 text-sm text-slate-600">{T.quote[lang]}</div>
          <button onClick={() => changeTab("profile")}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 font-medium transition-colors ${activeTab === "profile" ? "bg-[#115D98] text-white" : "text-slate-500 hover:bg-[#115D98]/5 hover:text-[#115D98]"}`}>
            <User size={20} /> {T.profile[lang]}
          </button>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 font-medium text-[#0B2A45] transition-colors hover:bg-[#0B2A45]/10">
            <LogOut size={20} /> {T.logout[lang]}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (desktop + mobile) */}
        <header className="sticky top-0 z-30 border-b border-[#115D98]/10 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8">
            <div className="flex items-center gap-2 md:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-semibold text-white">
                <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
              </div>
              <span className="font-bold text-[#115D98] mt-4">HerIngress</span>
            </div>

            <form onSubmit={submitSearch} className="relative hidden max-w-xl flex-1 md:block">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={T.search[lang]} aria-label="Search"
                className="w-full rounded-full border border-[#115D98]/10 bg-[#f8faff] py-2.5 pl-11 pr-10 text-sm outline-none transition focus:border-[#115D98]/40 focus:ring-2 focus:ring-[#115D98]/20" />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115D98]"><X size={16} /></button>}
            </form>

            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setMobileSearch((s) => !s)} aria-label="Search" className={`${iconBtn} md:hidden`}>
                {mobileSearch ? <X size={18} /> : <Search size={18} />}
              </button>

              <Dropdown width="w-48" renderTrigger={(open, toggle) => (
                <button onClick={toggle} aria-label="Change language" aria-expanded={open} className={iconBtn}><Globe size={18} /></button>
              )}>
                {(close) => LANGS.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); close(); }}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[#115D98]/5">
                    {l.name} {lang === l.code && <Check size={16} className="text-[#115D98]" />}
                  </button>
                ))}
              </Dropdown>

              <Dropdown width="w-80" renderTrigger={(open, toggle) => (
                <button onClick={toggle} aria-label="Notifications" aria-expanded={open} className={iconBtn}>
                  <Bell size={18} />
                  {unread > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#0B2A45] text-[10px] font-semibold text-white">{unread}</span>}
                </button>
              )}>
                {(close) => (
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <span className="font-semibold">Notifications</span>
                      <button onClick={() => setNotifs((n) => n.map((x) => ({ ...x, read: true })))} className="text-xs font-medium text-[#115D98] hover:underline">Mark all read</button>
                    </div>
                    {notifs.map((n) => (
                      <button key={n.id} onClick={() => { setNotifs((all) => all.map((x) => x.id === n.id ? { ...x, read: true } : x)); changeTab(n.tab); close(); }}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#115D98]/5">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-slate-200" : "bg-[#115D98]"}`} />
                        <span><span className={`block text-sm ${n.read ? "text-slate-500" : "font-medium text-slate-800"}`}>{n.text}</span><span className="text-xs text-slate-400">{n.time}</span></span>
                      </button>
                    ))}
                  </div>
                )}
              </Dropdown>

              <Dropdown width="w-48" renderTrigger={(open, toggle) => (
                <button onClick={toggle} aria-label="Profile menu" aria-expanded={open} className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white shadow">
                  <img src={avatar} alt="Amina" className="h-full w-full object-cover" />
                </button>
              )}>
                {(close) => (
                  <div className="py-1">
                    <button onClick={() => { changeTab("profile"); close(); }} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[#115D98]/5"><User size={16} /> {T.profile[lang]}</button>
                    <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[#115D98]/5"><LogOut size={16} /> {T.logout[lang]}</button>
                  </div>
                )}
              </Dropdown>
            </div>
          </div>

          <AnimatePresence>
            {mobileSearch && (
              <motion.form onSubmit={submitSearch} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 md:hidden">
                <div className="relative pb-3">
                  <Search size={18} className="absolute left-4 top-[calc(50%-6px)] -translate-y-1/2 text-slate-400" />
                  <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={T.search[lang]} aria-label="Search"
                    className="w-full rounded-full border border-[#115D98]/10 bg-[#f8faff] py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 md:px-8 md:pb-10">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Section onNavigate={changeTab} lang={lang} globalQuery={query} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-[#115D98]/10 bg-white/90 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {NAV.filter((n) => MOBILE_MAIN.includes(n.id)).map(({ id, icon: Icon, label, short }) => (
          <button key={id} onClick={() => changeTab(id)} className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${activeTab === id ? "text-[#115D98]" : "text-slate-400"}`}>
            <span className={`grid h-8 w-10 place-items-center rounded-full transition-colors ${activeTab === id ? "bg-[#115D98]/10" : ""}`}><Icon size={20} /></span>
            <span className="max-w-full truncate">{(short || label)[lang]}</span>
          </button>
        ))}
        <button onClick={() => setMoreOpen(true)} className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${["rolemodels", "community", "profile"].includes(activeTab) ? "text-[#115D98]" : "text-slate-400"}`}>
          <span className="grid h-8 w-10 place-items-center"><MoreHorizontal size={20} /></span>{T.more[lang]}
        </button>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <motion.div className="fixed inset-0 z-50 bg-[#0B2A45]/40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMoreOpen(false)}>
            <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 space-y-1 rounded-t-3xl bg-white p-4 pb-8 shadow-2xl">
              {NAV.filter((n) => MOBILE_MORE.includes(n.id)).map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => changeTab(id)} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-[#115D98]/5"><Icon size={20} className="text-[#0B2A45]" /> {label[lang]}</button>
              ))}
              <button onClick={() => changeTab("profile")} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-[#115D98]/5"><User size={20} className="text-[#0B2A45]" /> {T.profile[lang]}</button>
              <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-[#115D98]/5"><LogOut size={20} className="text-[#0B2A45]" /> {T.logout[lang]}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}