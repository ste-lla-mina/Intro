import { useState, useRef, useEffect } from "react";
import { Search, Plus, Send, ArrowLeft, Users, MessageSquare } from "lucide-react";
import Modal from "./ui";

const ME = "Amina Uwase";
const av = (n, bg = "115D98") => `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=${bg}&color=fff&bold=true`;

const INITIAL_CONVOS = [
  { id: "g1", kind: "group", name: "Tech Girls", sub: "142 members", unread: 2 },
  { id: "g2", kind: "group", name: "Scholarship Hunters", sub: "96 members", unread: 0 },
  { id: "g3", kind: "group", name: "General Chat", sub: "310 members", unread: 5 },
  { id: "g4", kind: "group", name: "Future Healers", sub: "58 members", unread: 0 },
  { id: "d1", kind: "dm", name: "Grace Mukamana", sub: "Software Engineer", unread: 1 },
  { id: "d2", kind: "dm", name: "Aline Uwera", sub: "Civil Engineer", unread: 0 },
  { id: "d3", kind: "dm", name: "Diane Ingabire", sub: "Mentor", unread: 0 },
];

const INITIAL_MESSAGES = {
  g1: [
    { id: 1, user: "Grace Mukamana", time: "09:12", text: "Has anyone tried the Python course on the Learn page?" },
    { id: 2, user: "Aline Uwera", time: "09:20", text: "Yes! I am on week 2. Happy to study together this weekend." },
    { id: 3, user: "Sandra Kamikazi", time: "09:31", text: "Count me in. I can share my notes too." },
  ],
  g2: [
    { id: 1, user: "Joyce Nyirahabimana", time: "08:05", text: "The Women in STEM scholarship closes Nov 30. Who is applying?" },
    { id: 2, user: "Diane Ingabire", time: "08:40", text: "Me! Can someone read my personal statement?" },
  ],
  g3: [
    { id: 1, user: "Sandra Kamikazi", time: "10:02", text: "Good morning everyone! What are you working on today?" },
    { id: 2, user: "Grace Mukamana", time: "10:10", text: "Preparing for my first interview tomorrow." },
    { id: 3, user: "Aline Uwera", time: "10:14", text: "You will do great. Remember to breathe and smile." },
  ],
  g4: [{ id: 1, user: "Claudine Uwase", time: "07:45", text: "Welcome to Future Healers! Share your favourite health career resources here." }],
  d1: [{ id: 1, user: "Grace Mukamana", time: "11:30", text: "Hi Amina! Want to review each other's CVs tonight?" }],
  d2: [{ id: 1, user: "Aline Uwera", time: "Yesterday", text: "Thanks for the scholarship tip!" }],
  d3: [{ id: 1, user: "Diane Ingabire", time: "Mon", text: "How is your business plan coming along?" }],
};

const AUTO = ["That sounds great!", "Thanks for sharing, I will check it out.", "Let us talk more about it tomorrow.", "Good idea, count me in."];
const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Community({ globalQuery = "" }) {
  const [convos, setConvos] = useState(INITIAL_CONVOS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [tab, setTab] = useState("group");
  const [activeId, setActiveId] = useState("g3");
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [newKind, setNewKind] = useState("group");
  const [newName, setNewName] = useState("");
  const box = useRef(null);

  const active = convos.find((c) => c.id === activeId);
  const list = convos.filter((c) => c.kind === tab && c.name.toLowerCase().includes(q.toLowerCase()) && c.name.toLowerCase().includes(globalQuery.toLowerCase()));
  const thread = messages[activeId] || [];

  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [thread.length, activeId]);

  const open = (id) => { setActiveId(id); setShowChat(true); setConvos((l) => l.map((c) => (c.id === id ? { ...c, unread: 0 } : c))); };
  const changeTab = (t) => { setTab(t); const first = convos.find((c) => c.kind === t); if (first) setActiveId(first.id); setShowChat(false); };

  const send = (e) => {
    e.preventDefault();
    if (!text.trim() || !active) return;
    const id = active.id;
    setMessages((m) => ({ ...m, [id]: [...(m[id] || []), { id: Date.now(), user: ME, time: nowTime(), text: text.trim(), mine: true }] }));
    setText("");
    if (active.kind === "dm") {
      setTimeout(() => setMessages((m) => ({ ...m, [id]: [...(m[id] || []), { id: Date.now() + 1, user: active.name, time: nowTime(), text: AUTO[Math.floor(Math.random() * AUTO.length)] }] })), 1200);
    }
  };

  const createChat = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const id = `n${Date.now()}`;
    setConvos((l) => [...l, { id, kind: newKind, name: newName.trim(), sub: newKind === "group" ? "1 member" : "New contact", unread: 0 }]);
    setMessages((m) => ({ ...m, [id]: [] }));
    setTab(newKind); setActiveId(id); setShowChat(true); setNewOpen(false); setNewName(""); setQ("");
  };

  return (
    <div className="grid h-[calc(100vh-12rem)] min-h-[30rem] gap-4 md:h-[calc(100vh-9rem)] md:grid-cols-[320px_1fr]">
      {/* List */}
      <aside className={`${showChat ? "hidden" : "flex"} min-h-0 flex-col rounded-3xl border border-[#115D98]/5 bg-white/90 p-4 shadow-sm md:flex`}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button onClick={() => { setNewKind(tab); setNewOpen(true); }} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]"><Plus size={16} /> </button>
        </div>
        <div className="mb-3 grid grid-cols-2 rounded-full bg-[#f8faff] p-1 text-sm font-medium" role="tablist">
          {[["group", "Group Chats", Users], ["dm", "Direct Messages", MessageSquare]].map(([id, label, Icon]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => changeTab(id)} className={`flex items-center justify-center gap-1.5 rounded-full py-2 transition-all ${tab === id ? "bg-[#115D98] text-white shadow" : "text-slate-500 hover:text-[#115D98]"}`}>
              <Icon size={14} /> <span className="truncate">{id === "group" ? "Groups" : "DMs"}</span>
            </button>
          ))}
        </div>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tab === "group" ? "Find a group" : "Find a person"} aria-label="Search chats"
            className="w-full rounded-full border border-[#115D98]/10 bg-[#f8faff] py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
        </div>
        <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto">
          {list.map((c) => (
            <li key={c.id}>
              <button onClick={() => open(c.id)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors ${activeId === c.id ? "bg-[#115D98]/10" : "hover:bg-[#f8faff]"}`}>
                <img src={av(c.name, c.kind === "group" ? "0B2A45" : "115D98")} alt="" className="h-11 w-11 rounded-full" />
                <span className="min-w-0 flex-1"><span className="block truncate font-medium">{c.name}</span><span className="block truncate text-xs text-slate-500">{c.sub}</span></span>
                {c.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#115D98] px-1.5 text-[11px] font-semibold text-white">{c.unread}</span>}
              </button>
            </li>
          ))}
          {list.length === 0 && <p className="p-3 text-sm text-slate-400">No results. Try New Chat to start one.</p>}
        </ul>
      </aside>

      {/* Chat */}
      <section className={`${showChat ? "flex" : "hidden"} min-h-0 flex-col overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm md:flex`}>
        {active ? (
          <>
            <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <button onClick={() => setShowChat(false)} aria-label="Back to list" className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#115D98]/10 md:hidden"><ArrowLeft size={18} /></button>
              <img src={av(active.name, active.kind === "group" ? "0B2A45" : "115D98")} alt="" className="h-10 w-10 rounded-full" />
              <div><h3 className="font-semibold leading-tight">{active.name}</h3><p className="text-xs text-slate-500">{active.sub}</p></div>
            </header>
            <div ref={box} className="flex-1 space-y-4 overflow-y-auto bg-[#f8faff] p-4 md:p-5">
              {thread.length === 0 && <p className="pt-10 text-center text-sm text-slate-400">No messages yet. Say hello!</p>}
              {thread.map((m) => (
                <div key={m.id} className={`flex items-end gap-3 ${m.mine ? "flex-row-reverse" : ""}`}>
                  <img src={av(m.user, m.mine ? "0B2A45" : "4D8FBF")} alt={m.user} className="h-9 w-9 rounded-full" />
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${m.mine ? "rounded-br-sm bg-[#115D98] text-white" : "rounded-bl-sm bg-white"}`}>
                    <p className={`mb-0.5 text-xs ${m.mine ? "text-white/70" : "text-slate-400"}`}><span className="font-medium">{m.mine ? "You" : m.user.split(" ")[0]}</span> &middot; {m.time}</p>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-slate-100 p-3">
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message ${active.name}`} aria-label="Message" className="flex-1 rounded-full bg-[#f8faff] px-5 py-2.5 outline-none focus:ring-2 focus:ring-[#115D98]/30" />
              <button aria-label="Send message" className="grid h-11 w-11 place-items-center rounded-full bg-[#115D98] text-white transition-colors hover:bg-[#0e4c7d]"><Send size={18} /></button>
            </form>
          </>
        ) : <div className="grid flex-1 place-items-center text-slate-500">Select a chat to start talking.</div>}
      </section>

      <Modal open={newOpen} onClose={() => setNewOpen(false)} title="Start a new chat">
        <form onSubmit={createChat} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-[#f8faff] p-1 text-sm font-medium">
            {[["group", "Group chat"], ["dm", "Direct message"]].map(([id, label]) => (
              <button type="button" key={id} onClick={() => setNewKind(id)} aria-pressed={newKind === id} className={`rounded-full py-2 transition-all ${newKind === id ? "bg-[#115D98] text-white shadow" : "text-slate-500"}`}>{label}</button>
            ))}
          </div>
          <label className="block text-sm font-medium">{newKind === "group" ? "Group name" : "Person's name"}
            <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={newKind === "group" ? "e.g. Young Farmers" : "e.g. Marie Claire"}
              className="mt-1 w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
          </label>
          <button disabled={!newName.trim()} className="w-full rounded-full bg-[#115D98] py-2.5 font-medium text-white transition-colors hover:bg-[#0e4c7d] disabled:opacity-40">Create chat</button>
        </form>
      </Modal>
    </div>
  );
}