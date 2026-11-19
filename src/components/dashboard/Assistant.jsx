import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Send, Trash2, Pencil, Pin, PinOff, ArrowLeft, ArrowRight, FileText, Briefcase, Mic, Compass,
  Bot, MessageCircle, ChevronsLeft, ChevronsRight, MoreHorizontal, PenSquare, SlidersHorizontal, ArrowUpDown, Eye, ChevronRight, ChevronLeft,
  Copy, Check, ThumbsUp, ThumbsDown, Square, Loader2,
} from "lucide-react";

const AshaIcon = Bot;

const STORAGE_KEY = "heringress_asha_chats_v1";
const VIEW_KEY = "heringress_asha_view_v1";
const SORTS = [{ id: "recent", label: "Most recent" }, { id: "oldest", label: "Oldest first" }, { id: "title", label: "Title A to Z" }];
const SHOWS = [{ id: "all", label: "All chats" }, { id: "pinned", label: "Pinned only" }, { id: "week", label: "Last 7 days" }];
const DEFAULT_VIEW = { sort: "recent", show: "all" };
const loadView = () => {
  try { const v = JSON.parse(localStorage.getItem(VIEW_KEY)); if (v) return { ...DEFAULT_VIEW, ...v }; } catch { /* ignore */ }
  return DEFAULT_VIEW;
};
const DAY = 86400000;

const PROMPTS = [
  { icon: FileText, title: "Write a CV summary", text: "Help me write a strong CV summary" },
  { icon: Briefcase, title: "Find scholarships", text: "How do I find scholarships for girls?" },
  { icon: Mic, title: "Prepare for interviews", text: "Give me interview tips for my first interview" },
  { icon: Compass, title: "Choose a career", text: "Which careers are good for someone who loves tech?" },
];
const THINK_STEPS = ["Understanding your question", "Looking through HerIngress resources", "Writing your answer"];
const DEFAULT_FOLLOW = ["Help me write a strong CV summary", "How do I find scholarships for girls?"];

const REPLIES = [
  { test: /^(hi|hello|hey|muraho)\b/i, text: "Hello! I am Asha. I can help with CVs, scholarships, interviews and choosing a career. What would you like to work on?", follow: DEFAULT_FOLLOW },
  { test: /cv|resume|summary/i, text: "A strong CV summary is two or three lines: who you are, what you are good at and what you want next. For example: \"Final-year student and coding club leader who builds small web apps and wants to grow as a software engineer.\" Start each bullet with an action verb and a result.", action: { label: "Open CV templates", tab: "create" }, follow: ["Give me interview tips for my first interview", "How do I find scholarships for girls?"] },
  { test: /scholar|bursary|funding/i, text: "Start by listing the scholarships you qualify for, then note each deadline. Prepare your results, a short personal statement and two recommendation letters early. You can filter by Scholarship in Opportunities.", action: { label: "Browse scholarships", tab: "opportunities" }, follow: ["Help me write a strong CV summary", "Which careers are good for someone who loves tech?"] },
  { test: /interview/i, text: "Research the organisation, practise answering out loud, and prepare two questions to ask. Use the STAR method (Situation, Task, Action, Result) for examples, and arrive 10 to 15 minutes early.", action: { label: "Open Interview Prep", tab: "create" }, follow: ["Help me write a strong CV summary", "Show me role models"] },
  { test: /tech|code|coding|software|career|field|roadmap/i, text: "Tech is a great choice if you enjoy solving problems. You could start with Software Engineering, Data Science or UI/UX Design. Each has a step-by-step roadmap with free courses.", action: { label: "Explore roadmaps", tab: "explore" }, follow: ["Which courses should I start with?", "Show me role models"] },
  { test: /course|learn|study|lesson/i, text: "Pick one field and finish one short course before starting another. Tick off lessons as you go so you can see your progress.", action: { label: "Go to Learn", tab: "learn" }, follow: ["Which careers are good for someone who loves tech?", "Give me interview tips for my first interview"] },
  { test: /deadline|calendar|remind/i, text: "Your Home page has a calendar that marks upcoming deadlines. Click a marked date to see which opportunity closes that day.", action: { label: "Open Home", tab: "home" }, follow: DEFAULT_FOLLOW },
  { test: /mentor|role model|inspir/i, text: "Reading how other women started can help a lot. Role Models has stories and projects by girls like you.", action: { label: "See Role Models", tab: "rolemodels" }, follow: DEFAULT_FOLLOW },
  { test: /community|friend|group|chat/i, text: "You can join groups like Tech Girls or Scholarship Hunters, or message someone directly.", action: { label: "Open Community", tab: "community" }, follow: DEFAULT_FOLLOW },
  { test: /thank/i, text: "You are welcome! Come back any time you need a hand.", follow: DEFAULT_FOLLOW },
  { test: /.*/, text: "Thanks for asking! I am still learning, but I can help with CVs, scholarships, interviews and career roadmaps. Try asking about one of those.", follow: DEFAULT_FOLLOW },
];
const reply = (t) => REPLIES.find((r) => r.test.test(t));

const seedChats = () => {
  const now = Date.now();
  const m = (id, from, text, ts, extra = {}) => ({ id, from, text, ts, ...extra });
  return [
    { id: "seed1", title: "How do I write a CV summary?", updated: now - 2 * 3600000, messages: [m(1, "me", "How do I write a CV summary?", now - 2 * 3600000), m(2, "asha", REPLIES[1].text, now - 2 * 3600000 + 4000, { action: REPLIES[1].action })] },
    { id: "seed2", title: "Scholarships for health students", pinned: true, updated: now - DAY - 3600000, messages: [m(1, "me", "Scholarships for health students", now - DAY - 3600000), m(2, "asha", REPLIES[2].text, now - DAY - 3600000 + 4000, { action: REPLIES[2].action })] },
    { id: "seed3", title: "Interview tips", updated: now - 4 * DAY, messages: [m(1, "me", "Interview tips", now - 4 * DAY), m(2, "asha", REPLIES[3].text, now - 4 * DAY + 4000, { action: REPLIES[3].action })] },
  ];
};
const load = () => {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const p = JSON.parse(raw); if (Array.isArray(p)) return p; } } catch { /* ignore */ }
  return seedChats();
};

const clock = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const ago = (ts) => {
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)}d ago`;
  return new Date(ts).toLocaleDateString([], { day: "numeric", month: "short" });
};

const CSS = `
@keyframes asha-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes asha-slide { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
@keyframes asha-pop { from { opacity: 0; transform: scale(.94) translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes asha-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes asha-ring { 0% { transform: scale(1); opacity: .45; } 100% { transform: scale(1.8); opacity: 0; } }
@keyframes asha-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes asha-wave { 0%, 60%, 100% { transform: rotate(0); } 10%, 30% { transform: rotate(14deg); } 20%, 40% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
@keyframes asha-toast { 0% { opacity: 0; transform: translate(-50%, 12px); } 12%, 85% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, 8px); } }
@media (prefers-reduced-motion: reduce) { .asha-anim { animation: none !important; } }
`;

function AshaAvatar({ size = "h-9 w-9", icon = 18, glow = false }) {
  return (
    <span className={`relative grid ${size} shrink-0 place-items-center`}>
      {glow && <span className="asha-anim absolute inset-0 rounded-xl bg-[#115D98]/40" style={{ animation: "asha-ring 1.6s ease-out infinite" }} />}
      <span className="relative grid h-full w-full place-items-center rounded-xl bg-gradient-to-br from-[#115D98] to-[#0B2A45] text-white shadow-sm"><AshaIcon size={icon} /></span>
    </span>
  );
}

function RenameInput({ initial, onCommit, onCancel, className = "" }) {
  const [v, setV] = useState(initial);
  const done = useRef(false);
  const finish = (save) => { if (done.current) return; done.current = true; if (save && v.trim()) onCommit(v.trim()); else onCancel(); };
  return (
    <input autoFocus value={v} maxLength={60} aria-label="Rename chat" onChange={(e) => setV(e.target.value)} onFocus={(e) => e.target.select()}
      onKeyDown={(e) => { if (e.key === "Enter") finish(true); if (e.key === "Escape") finish(false); }} onBlur={() => finish(true)}
      className={`rounded-lg border border-[#115D98]/40 bg-white px-2 py-1 text-sm font-semibold text-[#0B2A45] outline-none ring-2 ring-[#115D98]/15 ${className}`} />
  );
}

function MenuPopup({ chat, rect, onClose, onPin, onRename, onDelete }) {
  const ref = useRef(null);
  useEffect(() => {
    const down = (e) => { if (ref.current && !ref.current.contains(e.target) && !e.target.closest?.("[data-menu-trigger]")) onClose(); };
    const key = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    window.addEventListener("resize", onClose);
    window.addEventListener("scroll", onClose, true);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", onClose);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [onClose]);
  const W = 176, H = 132;
  const left = Math.min(Math.max(8, rect.right - W), window.innerWidth - W - 8);
  const top = rect.bottom + 6 + H > window.innerHeight ? Math.max(8, rect.top - H - 6) : rect.bottom + 6;
  const item = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-[#115D98]/5 hover:text-[#115D98]";
  return createPortal(
    <div ref={ref} role="menu" className="asha-anim fixed z-[85] overflow-hidden rounded-2xl border border-[#115D98]/10 bg-white py-1 shadow-xl" style={{ top, left, width: W, animation: "asha-pop .15s ease-out", fontFamily: "'Outfit', sans-serif" }}>
      <button role="menuitem" onClick={onPin} className={item}>{chat.pinned ? <PinOff size={16} /> : <Pin size={16} />} {chat.pinned ? "Unpin" : "Pin"}</button>
      <button role="menuitem" onClick={onRename} className={item}><Pencil size={16} /> Rename</button>
      <div className="mx-3 my-1 h-px bg-slate-100" />
      <button role="menuitem" onClick={onDelete} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-[#0B2A45] transition-colors hover:bg-[#0B2A45]/5"><Trash2 size={16} /> Delete</button>
    </div>,
    document.body
  );
}

function ViewMenu({ rect, sort, show, onSort, onShow, onClose }) {
  const [page, setPage] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const down = (e) => { if (ref.current && !ref.current.contains(e.target) && !e.target.closest?.("[data-view-trigger]")) onClose(); };
    const key = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    window.addEventListener("resize", onClose);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); window.removeEventListener("resize", onClose); };
  }, [onClose]);
  const W = 232;
  const left = Math.min(Math.max(8, rect.right - W), window.innerWidth - W - 8);
  const rows = [
    { id: "sort", icon: ArrowUpDown, label: "Sort by", options: SORTS, current: sort, set: onSort },
    { id: "show", icon: Eye, label: "Show", options: SHOWS, current: show, set: onShow },
  ];
  const cur = rows.find((r) => r.id === page);
  const item = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-[#115D98]/5 hover:text-[#115D98]";
  return createPortal(
    <div ref={ref} role="menu" className="asha-anim fixed z-[85] overflow-hidden rounded-2xl border border-[#115D98]/10 bg-white py-1 shadow-xl" style={{ top: rect.bottom + 6, left, width: W, animation: "asha-pop .15s ease-out", fontFamily: "'Outfit', sans-serif" }}>
      {!cur ? (
        <div key="main" className="asha-anim" style={{ animation: "asha-in .2s ease-out" }}>
          {rows.map((r) => (
            <button key={r.id} role="menuitem" onClick={() => setPage(r.id)} className={item}>
              <r.icon size={17} /> <span className="flex-1">{r.label}</span>
              <span className="text-xs font-normal text-slate-400">{r.options.find((o) => o.id === r.current)?.label}</span>
              <ChevronRight size={15} className="text-slate-400" />
            </button>
          ))}
        </div>
      ) : (
        <div key={cur.id} className="asha-anim" style={{ animation: "asha-in .2s ease-out" }}>
          <button onClick={() => setPage(null)} className="flex w-full items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-sm font-semibold text-[#0B2A45] transition-colors hover:bg-[#115D98]/5"><ChevronLeft size={16} /> {cur.label}</button>
          {cur.options.map((o) => (
            <button key={o.id} role="menuitemradio" aria-checked={cur.current === o.id} onClick={() => { cur.set(o.id); onClose(); }} className={item}>
              <span className="flex-1">{o.label}</span>{cur.current === o.id && <Check size={16} className="text-[#115D98]" />}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function ConfirmModal({ title, body, confirmLabel, onConfirm, onCancel }) {
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onCancel]);
  return createPortal(
    <div className="asha-anim fixed inset-0 z-[80] grid place-items-center bg-[#0B2A45]/50 p-4 backdrop-blur-sm" style={{ animation: "asha-fade .2s ease-out", fontFamily: "'Outfit', sans-serif" }} onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="asha-anim w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl" style={{ animation: "asha-pop .25s ease-out" }}>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0B2A45]/10 text-[#0B2A45]"><Trash2 size={26} /></span>
        <h3 className="mt-4 text-lg font-semibold text-[#0B2A45]">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{body}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button autoFocus onClick={onCancel} className="rounded-full bg-[#f8faff] py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#115D98]/10">Keep it</button>
          <button onClick={onConfirm} className="rounded-full bg-[#0B2A45] py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0B2A45]/20 transition-colors hover:bg-[#081f33]">{confirmLabel}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Toast({ text }) {
  return createPortal(
    <div key={text.id} className="asha-anim fixed bottom-24 left-1/2 z-[90] flex items-center gap-2 rounded-full bg-[#0B2A45] px-5 py-2.5 text-sm font-medium text-white shadow-xl md:bottom-8" style={{ animation: "asha-toast 2.2s ease-out forwards", fontFamily: "'Outfit', sans-serif" }}>
      <Check size={15} /> {text.msg}
    </div>,
    document.body
  );
}

function StreamText({ text, animate, onDone, onTick }) {
  const [n, setN] = useState(animate ? 0 : text.length);
  const doneRef = useRef(onDone); doneRef.current = onDone;
  const tickRef = useRef(onTick); tickRef.current = onTick;
  useEffect(() => {
    if (!animate) { setN(text.length); return; }
    let i = 0;
    const t = setInterval(() => {
      i = Math.min(i + 3, text.length);
      setN(i); tickRef.current?.();
      if (i >= text.length) { clearInterval(t); doneRef.current?.(); }
    }, 18);
    return () => clearInterval(t);
  }, [animate, text]);
  return <p className="whitespace-pre-wrap leading-relaxed">{text.slice(0, n)}{animate && n < text.length && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-[#115D98]" />}</p>;
}

export default function Assistant({ onNavigate = () => {}, globalQuery = "" }) {
  const [chats, setChats] = useState(load);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(null); 
  const [thinkStep, setThinkStep] = useState(0);
  const [streamId, setStreamId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [renaming, setRenaming] = useState(null); 
  const [menu, setMenu] = useState(null); 
  const [view, setView] = useState(loadView);
  const [viewMenu, setViewMenu] = useState(null); 
  const [confirm, setConfirm] = useState(null); 
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(null);
  const box = useRef(null);
  const area = useRef(null);
  const timers = useRef([]);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)); } catch {  } }, [chats]);
  useEffect(() => { try { localStorage.setItem(VIEW_KEY, JSON.stringify(view)); } catch {  } }, [view]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { if (area.current) { area.current.style.height = "auto"; area.current.style.height = `${Math.min(area.current.scrollHeight, 150)}px`; } }, [input]);

  const active = chats.find((c) => c.id === activeId);
  const messages = active?.messages || [];
  const scrollDown = () => { if (box.current) box.current.scrollTop = box.current.scrollHeight; };
  useEffect(scrollDown, [messages.length, busy, thinkStep, activeId]);
  const say = (msg) => setToast({ id: Date.now(), msg });
  const update = (id, patch) => setChats((l) => l.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const needle = globalQuery.trim().toLowerCase();
  const filtered = chats
    .filter((c) => !needle || c.title.toLowerCase().includes(needle) || c.messages.some((m) => m.text.toLowerCase().includes(needle)))
    .filter((c) => view.show === "all" || (view.show === "pinned" ? c.pinned : c.updated >= Date.now() - 7 * DAY))
    .sort((a, b) => (view.sort === "oldest" ? a.updated - b.updated : view.sort === "title" ? a.title.localeCompare(b.title) : b.updated - a.updated));
  const pinned = filtered.filter((c) => c.pinned);
  const others = filtered.filter((c) => !c.pinned);

  const newChat = () => { setActiveId(null); setShowChat(true); setInput(""); setStreamId(null); setRenaming(null); setMenu(null); };
  const openChat = (id) => { setActiveId(id); setShowChat(true); setStreamId(null); };
  const togglePin = (c) => { update(c.id, { pinned: !c.pinned }); say(c.pinned ? "Chat unpinned" : "Pinned to the top"); };
  const doDelete = () => {
    const { id } = confirm;
    setChats((l) => l.filter((c) => c.id !== id));
    if (activeId === id) { setActiveId(null); setShowChat(false); }
    setConfirm(null); say("Chat deleted");
  };
  const openMenu = (e, c, where) => {
    const r = e.currentTarget.getBoundingClientRect();
    setViewMenu(null);
    setMenu((m) => (m && m.id === c.id && m.where === where ? null : { id: c.id, where, rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right } }));
  };
  const dots = (c, where, cls = "") => {
    const open = menu?.id === c.id && menu.where === where;
    return (
      <button data-menu-trigger onClick={(e) => openMenu(e, c, where)} aria-label="Chat options" aria-haspopup="menu" aria-expanded={open}
        className={`grid h-8 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-[#115D98]/10 hover:text-[#115D98] ${open ? "bg-[#115D98]/10 text-[#115D98]" : ""} ${cls}`}><MoreHorizontal size={18} /></button>
    );
  };

  const send = (text) => {
    const t = text.trim();
    if (!t || busy) return;
    const now = Date.now();
    const userMsg = { id: now, from: "me", text: t, ts: now };
    let id = activeId;
    if (!id) {
      id = `c${now}`;
      setChats((l) => [{ id, title: t.length > 34 ? `${t.slice(0, 34)}...` : t, updated: now, messages: [userMsg] }, ...l]);
      setActiveId(id);
    } else {
      update(id, { updated: now, messages: [...(chats.find((c) => c.id === id)?.messages || []), userMsg] });
    }
    setInput("");
    setBusy({ id, phase: "thinking" });
    setThinkStep(0);
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setThinkStep(1), 600),
      setTimeout(() => setThinkStep(2), 1200),
      setTimeout(() => {
        const r = reply(t);
        const ts = Date.now();
        setChats((l) => l.map((c) => (c.id === id ? { ...c, updated: ts, messages: [...c.messages, { id: ts, from: "asha", text: r.text, ts, action: r.action, follow: r.follow }] } : c)));
        setStreamId(ts);
        setBusy({ id, phase: "streaming" });
      }, 1900),
    ];
  };
  const stop = () => { timers.current.forEach(clearTimeout); setStreamId(null); setBusy(null); };
  const finishStream = () => { setStreamId(null); setBusy(null); };

  const copy = (m) => {
    navigator.clipboard?.writeText(m.text);
    setCopied(m.id); say("Copied to clipboard");
    setTimeout(() => setCopied(null), 1500);
  };
  const rate = (m, v) => update(active.id, { messages: active.messages.map((x) => (x.id === m.id ? { ...x, rating: x.rating === v ? null : v } : x)) });

  const btn = "grid h-7 w-7 place-items-center rounded-full text-slate-400 transition-colors hover:bg-[#115D98]/10 hover:text-[#115D98]";
  const chatRow = (c, i) => {
    const menuOpen = menu?.id === c.id && menu.where === "list";
    return (
      <li key={c.id} className="asha-anim" style={{ animation: `asha-slide .3s ease-out ${Math.min(i, 6) * 0.04}s both` }}>
        <div className={`group relative flex items-center rounded-2xl transition-colors ${activeId === c.id || menuOpen ? "bg-[#115D98]/10" : "hover:bg-[#115D98]/5"}`}>
          {renaming?.id === c.id && renaming.where === "list" ? (
            <div className="min-w-0 flex-1 p-2.5"><RenameInput initial={c.title} className="w-full" onCommit={(v) => { update(c.id, { title: v }); setRenaming(null); say("Chat renamed"); }} onCancel={() => setRenaming(null)} /></div>
          ) : (
            <>
              <button onClick={() => openChat(c.id)} className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left">
                {c.pinned && <Pin size={12} className="shrink-0 fill-[#115D98] text-[#115D98]" />}
                <span className="min-w-0 flex-1 truncate text-sm text-slate-800">{c.title}</span>
              </button>
              <span className="relative mr-1.5 h-8 w-14 shrink-0">
                <span className={`absolute inset-0 hidden place-items-center text-xs text-slate-400 transition-opacity md:grid ${menuOpen ? "opacity-0" : "md:group-hover:opacity-0"}`}>{ago(c.updated)}</span>
                {dots(c, "list", `absolute inset-0 m-auto transition-opacity ${menuOpen ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100"}`)}
              </span>
            </>
          )}
        </div>
      </li>
    );
  };

  const railBtn = "grid h-11 w-11 place-items-center rounded-2xl text-[#0B2A45] transition-colors hover:bg-[#115D98]/5";
  const bubbleAsha = "rounded-bl-sm border border-[#115D98]/10 bg-[#f8faff] text-slate-700";
  const isThinking = busy?.phase === "thinking" && busy.id === activeId;
  const lastAsha = [...messages].reverse().find((m) => m.from === "asha");

  return (
    <div className={`grid h-[calc(100vh-12rem)] min-h-[32rem] gap-4 transition-[grid-template-columns] duration-300 md:h-[calc(100vh-9rem)] ${collapsed ? "md:grid-cols-[76px_1fr]" : "md:grid-cols-[300px_1fr]"}`}>
      <style>{CSS}</style>

      <aside className={`${showChat ? "hidden" : "flex"} min-h-0 flex-col overflow-hidden rounded-3xl border border-[#115D98]/10 bg-white shadow-sm md:flex`}>
      
        <div className={`flex min-h-0 flex-1 flex-col p-4 ${collapsed ? "md:hidden" : ""}`}>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#115D98] to-[#0B2A45] text-white shadow-md shadow-[#115D98]/25"><AshaIcon size={22} /></span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-2xl font-bold tracking-tight text-[#0B2A45]">Asha</p>
              <p className="text-xs text-slate-500">Your AI Assistant</p>
            </div>
            <button onClick={() => setCollapsed(true)} aria-label="Collapse sidebar" title="Collapse" className="hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#0B2A45] transition-colors hover:bg-[#115D98]/5 md:grid"><ChevronsLeft size={18} /></button>
          </div>

          <button onClick={newChat} className="mb-4 flex w-full items-center gap-3 rounded-xl bg-[#115D98]/5 px-3 py-2.5 text-left font-medium text-[#0B2A45] transition-colors hover:bg-[#115D98]/10">
            <PenSquare size={20} className="text-[#115D98]" /> New chat
          </button>

          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-sm font-medium text-slate-500">Recents</span>
            <button data-view-trigger onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu(null); setViewMenu((v) => (v ? null : { top: r.top, bottom: r.bottom, left: r.left, right: r.right })); }}
              aria-label="Sort and filter chats" title="Sort and filter" aria-haspopup="menu" aria-expanded={!!viewMenu}
              className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors hover:bg-[#115D98]/10 hover:text-[#115D98] ${viewMenu ? "bg-[#115D98]/10 text-[#115D98]" : "text-[#0B2A45]"}`}>
              <SlidersHorizontal size={18} />
              {(view.sort !== DEFAULT_VIEW.sort || view.show !== DEFAULT_VIEW.show) && <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[#115D98] ring-2 ring-white" />}
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <div className="h-full space-y-3 overflow-y-auto pr-0.5">
              {pinned.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 px-2 text-xs text-slate-400"><Pin size={11} /> Pinned</p>
                  <ul className="space-y-0.5">{pinned.map(chatRow)}</ul>
                </div>
              )}
              {others.length > 0 && <ul className="space-y-0.5">{others.map(chatRow)}</ul>}
              {filtered.length === 0 && <p className="p-3 text-sm text-slate-400">{chats.length ? "No chats match your filters." : "No chats yet. Start one with Asha!"}</p>}
            </div>
          </div>
        </div>

        <div className={`hidden min-h-0 flex-1 flex-col items-center gap-2 py-4 ${collapsed ? "md:flex" : ""}`}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#115D98] to-[#0B2A45] text-white shadow-md shadow-[#115D98]/25"><AshaIcon size={22} /></span>
          <button onClick={() => setCollapsed(false)} aria-label="Expand sidebar" title="Expand" className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#0B2A45] transition-colors hover:bg-[#115D98]/5"><ChevronsRight size={18} /></button>
          <button onClick={newChat} aria-label="New chat" title="New chat" className="mt-2 grid h-11 w-11 place-items-center rounded-2xl bg-[#115D98]/5 text-[#115D98] transition-colors hover:bg-[#115D98]/10"><PenSquare size={20} /></button>
          <button data-view-trigger onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu(null); setViewMenu((v) => (v ? null : { top: r.top, bottom: r.bottom, left: r.left, right: r.right + 180 })); }}
            aria-label="Sort and filter chats" title="Sort and filter" className={`${railBtn} ${viewMenu ? "bg-[#115D98]/10 text-[#115D98]" : ""}`}><SlidersHorizontal size={19} /></button>
          <div className="my-1 h-px w-8 bg-slate-100" />
          <div className="flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto">
            {filtered.map((c) => (
              <button key={c.id} onClick={() => openChat(c.id)} title={c.title} aria-label={c.title} className={`${railBtn} relative ${activeId === c.id ? "bg-[#115D98]/10 text-[#115D98]" : ""}`}>
                <MessageCircle size={19} />{c.pinned && <Pin size={9} className="absolute right-1.5 top-1.5 fill-[#115D98] text-[#115D98]" />}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <section className={`${showChat ? "flex" : "hidden"} min-h-0 flex-col overflow-hidden rounded-3xl border border-[#115D98]/10 bg-white shadow-sm md:flex`}>
        <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <button onClick={() => setShowChat(false)} aria-label="Back to chats" className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#115D98]/10 md:hidden"><ArrowLeft size={18} /></button>
          <AshaAvatar size="h-10 w-10" icon={20} glow={!!busy && busy.id === activeId} />
          <div className="min-w-0 flex-1">
            {active && renaming?.id === active.id && renaming.where === "header" ? (
              <RenameInput initial={active.title} className="w-full" onCommit={(v) => { update(active.id, { title: v }); setRenaming(null); say("Chat renamed"); }} onCancel={() => setRenaming(null)} />
            ) : (
              <h3 className="flex items-center gap-1.5 truncate font-semibold leading-tight text-[#0B2A45]">{active?.pinned && <Pin size={13} className="shrink-0 text-[#115D98]" />}<span className="truncate">{active ? active.title : "Asha"}</span></h3>
            )}
            <p className="flex items-center gap-1.5 text-xs text-slate-500"><span className="relative flex h-2 w-2"><span className="asha-anim absolute inline-flex h-full w-full rounded-full bg-[#115D98]/50" style={{ animation: "asha-ring 2s ease-out infinite" }} /><span className="relative h-2 w-2 rounded-full bg-[#115D98]" /></span> Online</p>
          </div>
          {active && dots(active, "header")}
        </header>

        <div ref={box} className="flex-1 overflow-y-auto bg-white p-4 md:p-6">
          {!active ? (
            <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center py-4 text-center">
              <span className="asha-anim relative mb-6 grid h-32 w-32 place-items-center" style={{ animation: "asha-float 4s ease-in-out infinite" }}>
                <span className="asha-anim absolute inset-0 rounded-full bg-[#115D98]/10" style={{ animation: "asha-ring 3s ease-out infinite" }} />
                <span className="absolute inset-3 rounded-full bg-[#115D98]/10" />
                <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#115D98] to-[#0B2A45] text-white shadow-xl shadow-[#115D98]/30"><AshaIcon size={34} strokeWidth={1.8} /></span>
              </span>
              <h3 className="asha-anim text-3xl font-bold tracking-tight text-[#0B2A45] md:text-4xl" style={{ animation: "asha-in .4s ease-out .1s both" }}>
                Hello, I&apos;m Asha! <span className="asha-anim inline-block origin-[70%_70%]" style={{ animation: "asha-wave 2.2s ease-in-out 0.6s 2" }}></span>
              </h3>
              <p className="asha-anim mt-2 text-slate-500" style={{ animation: "asha-in .4s ease-out .18s both" }}>Your intelligent companion for careers, scholarships and learning.</p>

              <div className="asha-anim mt-6 flex w-full items-center gap-3" style={{ animation: "asha-in .4s ease-out .24s both" }}>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#115D98]/30" />
                <span className="rounded-full bg-[#115D98]/10 px-4 py-1.5 text-sm font-medium text-[#115D98]">How can I help you today?</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#115D98]/30" />
              </div>

              <div className="mt-5 grid w-full gap-3 sm:grid-cols-2">
                {PROMPTS.map(({ icon: Icon, title, text }, i) => (
                  <button key={title} onClick={() => send(text)} className="asha-anim group flex items-center gap-3 rounded-full border border-[#115D98]/10 bg-white p-2.5 pr-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#115D98]/30 hover:shadow-md" style={{ animation: `asha-in .4s ease-out ${0.3 + i * 0.07}s both` }}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#115D98]/10 text-[#0B2A45] transition-colors group-hover:bg-[#115D98] group-hover:text-white"><Icon size={19} /></span>
                    <span className="flex-1 text-sm font-semibold text-[#0B2A45]">{title}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#115D98]/10 text-[#115D98] transition-colors group-hover:bg-[#115D98] group-hover:text-white"><ArrowRight size={16} /></span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((m) => {
                const streaming = streamId === m.id;
                return (
                  <div key={m.id} className={`asha-anim flex items-end gap-3 ${m.from === "me" ? "flex-row-reverse" : ""}`} style={{ animation: "asha-in .3s ease-out" }}>
                    {m.from === "asha" ? <AshaAvatar /> : <img src="https://ui-avatars.com/api/?name=You&background=0B2A45&color=fff&bold=true" alt="You" className="h-9 w-9 rounded-xl" />}
                    <div className={`flex max-w-[82%] flex-col gap-2 ${m.from === "me" ? "items-end" : "items-start"}`}>
                      <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${m.from === "me" ? "rounded-br-sm bg-[#115D98] text-white" : bubbleAsha}`}>
                        {m.from === "asha" ? <StreamText text={m.text} animate={streaming} onDone={finishStream} onTick={scrollDown} /> : <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>}
                        <p className={`mt-1 text-[11px] ${m.from === "me" ? "text-white/70" : "text-slate-400"}`}>{clock(m.ts)}</p>
                      </div>
                      {m.from === "asha" && !streaming && (
                        <div className="asha-anim flex flex-wrap items-center gap-1.5" style={{ animation: "asha-in .3s ease-out" }}>
                          {m.action && <button onClick={() => onNavigate(m.action.tab)} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0e4c7d]">{m.action.label} <ArrowRight size={12} /></button>}
                          <button onClick={() => copy(m)} aria-label="Copy answer" title="Copy" className={btn}>{copied === m.id ? <Check size={14} className="text-[#115D98]" /> : <Copy size={14} />}</button>
                          <button onClick={() => rate(m, "up")} aria-label="Good answer" aria-pressed={m.rating === "up"} className={`${btn} ${m.rating === "up" ? "bg-[#115D98]/10 !text-[#115D98]" : ""}`}><ThumbsUp size={14} /></button>
                          <button onClick={() => rate(m, "down")} aria-label="Bad answer" aria-pressed={m.rating === "down"} className={`${btn} ${m.rating === "down" ? "bg-[#115D98]/10 !text-[#115D98]" : ""}`}><ThumbsDown size={14} /></button>
                        </div>
                      )}
                      {m.from === "asha" && m === lastAsha && !busy && m.follow && (
                        <div className="asha-anim flex flex-wrap gap-1.5" style={{ animation: "asha-in .35s ease-out .1s both" }}>
                          {m.follow.map((f) => <button key={f} onClick={() => send(f)} className="rounded-full border border-[#115D98]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#115D98] transition-all hover:-translate-y-0.5 hover:border-[#115D98]/40 hover:shadow-sm">{f}</button>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="asha-anim flex items-end gap-3" style={{ animation: "asha-in .25s ease-out" }}>
                  <AshaAvatar glow />
                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${bubbleAsha}`}>
                    <ul className="space-y-1.5">
                      {THINK_STEPS.map((s, i) => (
                        <li key={s} className={`flex items-center gap-2 text-sm transition-colors ${i <= thinkStep ? "text-slate-700" : "text-slate-300"}`}>
                          {i < thinkStep ? <Check size={14} className="text-[#115D98]" /> : i === thinkStep ? <Loader2 size={14} className="animate-spin text-[#115D98]" /> : <span className="h-3.5 w-3.5 rounded-full border border-slate-200" />}
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 bg-white p-3 md:p-4">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-[#115D98]/15 bg-white p-2 shadow-sm transition-shadow focus-within:border-[#115D98]/40 focus-within:shadow-md focus-within:shadow-[#115D98]/10">
            <textarea ref={area} rows={1} value={input} onChange={(e) => setInput(e.target.value)} aria-label="Message Asha" placeholder="Ask your question..."
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none" />
            {busy ? (
              <button type="button" onClick={stop} aria-label="Stop" title="Stop" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B2A45] text-white transition-transform hover:scale-105"><Square size={14} fill="currentColor" /></button>
            ) : (
              <button disabled={!input.trim()} aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#115D98] to-[#0B2A45] text-white shadow-md shadow-[#115D98]/30 transition-all hover:scale-105 disabled:scale-100 disabled:opacity-40 disabled:shadow-none"><Send size={17} /></button>
            )}
          </form>
          <p className="mt-2 text-center text-[11px] text-slate-400">Enter to send, Shift + Enter for a new line. Asha gives general guidance, so check details with the official source.</p>
        </div>
      </section>

      {viewMenu && (
        <ViewMenu rect={viewMenu} sort={view.sort} show={view.show} onSort={(v) => setView((x) => ({ ...x, sort: v }))} onShow={(v) => setView((x) => ({ ...x, show: v }))} onClose={() => setViewMenu(null)} />
      )}
      {menu && (() => {
        const c = chats.find((x) => x.id === menu.id);
        if (!c) return null;
        return (
          <MenuPopup chat={c} rect={menu.rect} onClose={() => setMenu(null)}
            onPin={() => { togglePin(c); setMenu(null); }}
            onRename={() => { setRenaming({ id: c.id, where: menu.where }); setMenu(null); }}
            onDelete={() => { setConfirm({ id: c.id }); setMenu(null); }} />
        );
      })()}
      {confirm && (
        <ConfirmModal
          title="Delete this chat?"
          body={`"${chats.find((c) => c.id === confirm.id)?.title || "This chat"}" and its messages will be removed for good.`}
          confirmLabel="Delete chat"
          onConfirm={doDelete}
          onCancel={() => setConfirm(null)}
        />
      )}
      {toast && <Toast text={toast} />}
    </div>
  );
}
