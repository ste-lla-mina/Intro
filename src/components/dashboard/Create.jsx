import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StickyNote, FileText, Mic, Plus, Trash2, Save, Search, Shirt, Eye, Clock, MessageCircle, ListChecks, ChevronDown, Check } from "lucide-react";
import Modal, { VideoEmbed } from "./ui";

const NOTE_CATEGORIES = ["Application Progress", "Goals", "Ideas", "CV Drafts"];
const INITIAL_NOTES = [
  { id: 1, title: "Women in STEM Scholarship", category: "Application Progress", body: "To do:\n- Ask Ms. Claire for a recommendation letter\n- Finish personal statement\n- Upload school results\n\nDeadline: Nov 15", updated: "Today" },
  { id: 2, title: "My 2027 goals", category: "Goals", body: "1. Finish Python course\n2. Apply to 5 opportunities\n3. Join the Tech Girls group and attend one meetup", updated: "Yesterday" },
  { id: 3, title: "Project idea: study planner app", category: "Ideas", body: "A simple app that helps girls plan revision time and tracks exam dates.", updated: "3 days ago" },
];

const TEMPLATES = [
  { id: 1, name: "Fresh Start", note: "For first-time applicants", accent: "#4D8FBF", sidebar: false },
  { id: 2, name: "Scholar", note: "For scholarship applications", accent: "#0B2A45", sidebar: false },
  { id: 3, name: "Professional", note: "For jobs and internships", accent: "#115D98", sidebar: true },
];

const ETIQUETTE = [
  { id: 1, icon: Shirt, title: "Dress Code", text: "Dress neatly and comfortably, one level smarter than the workplace.", tips: ["Choose clean, ironed clothes", "Keep accessories simple", "Wear shoes you can walk in"] },
  { id: 2, icon: Eye, title: "Body Language", text: "Your posture speaks before you do.", tips: ["Sit upright and relaxed", "Keep friendly eye contact", "Smile and offer a firm handshake"] },
  { id: 3, icon: Clock, title: "Punctuality", text: "Arrive 10 to 15 minutes early to settle your nerves.", tips: ["Plan your route the day before", "Switch your phone to silent", "If delayed, call ahead"] },
  { id: 4, icon: MessageCircle, title: "Answering Questions", text: "Use clear examples, not just claims.", tips: ["Situation, Task, Action, Result", "Take a breath before answering", "It is fine to say you do not know yet"] },
  { id: 5, icon: ListChecks, title: "Prepare and Ask", text: "Research the organisation and prepare questions.", tips: ["Read their website and recent news", "Prepare two questions to ask", "Bring a copy of your CV"] },
];
const PLACEHOLDER_VIDEO = "M7lc1UVf-VE"; // swap for real YouTube IDs
const VIDEOS = [{ id: PLACEHOLDER_VIDEO, title: "Public Speaking" }, { id: PLACEHOLDER_VIDEO, title: "Mock Interviews" }];

const TABS = [{ id: "notes", label: "My Notes", icon: StickyNote }, { id: "cv", label: "CV Templates", icon: FileText }, { id: "interview", label: "Interview Prep", icon: Mic }];
const input = "w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20";

function NotesTab({ notes, setNotes }) {
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? null);
  const [draft, setDraft] = useState(notes[0] ? { title: notes[0].title, category: notes[0].category, body: notes[0].body } : null);
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [flash, setFlash] = useState(false);
  const current = notes.find((n) => n.id === selectedId);
  const dirty = current && draft && (draft.title !== current.title || draft.category !== current.category || draft.body !== current.body);
  const list = notes.filter((n) => (filter === "All" || n.category === filter) && `${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase()));

  const select = (n) => { setSelectedId(n.id); setDraft({ title: n.title, category: n.category, body: n.body }); setFlash(false); };
  const create = () => {
    const n = { id: Date.now(), title: "Untitled note", category: filter === "All" ? "Ideas" : filter, body: "", updated: "Just now" };
    setNotes([n, ...notes]); select(n);
  };
  const save = () => { setNotes(notes.map((n) => (n.id === selectedId ? { ...n, ...draft, updated: "Just now" } : n))); setFlash(true); setTimeout(() => setFlash(false), 1800); };
  const remove = () => {
    const rest = notes.filter((n) => n.id !== selectedId);
    setNotes(rest);
    if (rest[0]) select(rest[0]); else { setSelectedId(null); setDraft(null); }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <aside className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-4 shadow-sm">
        <button onClick={create} className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#115D98] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]"><Plus size={16} /> New Note</button>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes" aria-label="Search notes" className={`${input} pl-9`} />
        </div>
        <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {["All", ...NOTE_CATEGORIES].map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${filter === c ? "bg-[#115D98] text-white" : "bg-[#f8faff] text-slate-600 hover:bg-[#115D98]/10"}`}>{c}</button>
          ))}
        </div>
        <ul className="max-h-72 space-y-1.5 overflow-y-auto md:max-h-[26rem]">
          {list.map((n) => (
            <li key={n.id}>
              <button onClick={() => select(n)} className={`w-full rounded-2xl p-3 text-left transition-colors ${selectedId === n.id ? "bg-[#115D98]/10" : "hover:bg-[#f8faff]"}`}>
                <p className="truncate text-sm font-semibold">{n.title}</p>
                <p className="text-xs text-slate-500">{n.category} &middot; {n.updated}</p>
              </button>
            </li>
          ))}
          {list.length === 0 && <p className="p-3 text-sm text-slate-400">No notes here yet.</p>}
        </ul>
      </aside>

      <section className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm">
        {draft ? (
          <div className="flex h-full flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} aria-label="Note title" className={`${input} text-base font-semibold`} />
              <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} aria-label="Category" className={`${input} sm:w-56`}>
                {NOTE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="Write your note here..." aria-label="Note body" className={`${input} min-h-[16rem] flex-1 resize-y leading-relaxed`} />
            <div className="flex items-center gap-2">
              <button onClick={save} disabled={!dirty} className="inline-flex items-center gap-2 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d] disabled:cursor-not-allowed disabled:opacity-40"><Save size={16} /> Save</button>
              <button onClick={remove} className="inline-flex items-center gap-2 rounded-full bg-[#0B2A45]/5 px-5 py-2.5 text-sm font-medium text-[#0B2A45] transition-colors hover:bg-[#0B2A45]/10"><Trash2 size={16} /> Delete</button>
              {flash && <span className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98]"><Check size={16} /> Saved</span>}
            </div>
          </div>
        ) : (
          <div className="grid h-64 place-items-center text-center text-slate-500"><div><StickyNote className="mx-auto mb-2 text-[#115D98]" /><p>Select a note or create a new one.</p></div></div>
        )}
      </section>
    </div>
  );
}

function CvPreview({ tpl, cv }) {
  const skills = cv.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const header = (
    <div className="mb-3 border-b-2 pb-3" style={{ borderColor: tpl.accent }}>
      <h4 className="text-xl font-bold" style={{ color: tpl.accent }}>{cv.name || "Your Name"}</h4>
      <p className="text-sm text-slate-600">{cv.role || "Your role"} &middot; {cv.email || "email@example.com"}</p>
    </div>
  );
  const summary = <div className="mb-3"><p className="text-xs font-semibold" style={{ color: tpl.accent }}>Summary</p><p className="text-xs text-slate-600">{cv.summary || "Write a short summary about you."}</p></div>;
  const skillList = <div><p className="text-xs font-semibold" style={{ color: tpl.accent }}>Skills</p><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded-full px-2 py-0.5 text-[10px] text-white" style={{ background: tpl.accent }}>{s}</span>)}</div></div>;
  return tpl.sidebar ? (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="w-1/3 p-4 text-white" style={{ background: tpl.accent }}><p className="font-bold">{cv.name || "Your Name"}</p><p className="mb-3 text-xs opacity-80">{cv.role || "Your role"}</p><p className="text-[10px] opacity-80">{cv.email}</p><p className="mb-1 mt-4 text-xs font-semibold">Skills</p>{skills.map((s) => <p key={s} className="text-[11px] opacity-90">{s}</p>)}</div>
      <div className="flex-1 p-4"><p className="text-xs font-semibold" style={{ color: tpl.accent }}>Profile</p><p className="text-xs text-slate-600">{cv.summary || "Write a short summary about you."}</p></div>
    </div>
  ) : <div className="rounded-2xl border border-slate-200 bg-white p-5">{header}{summary}{skillList}</div>;
}

function CvTab({ addNote }) {
  const [tpl, setTpl] = useState(null);
  const [saved, setSaved] = useState(false);
  const [cv, setCv] = useState({ name: "Amina Uwase", role: "Aspiring software engineer", email: "amina@example.com", summary: "Curious final-year student who loves building small apps and leading a coding club of 25 girls.", skills: "HTML, CSS, JavaScript, Teamwork" });
  const set = (k) => (e) => setCv({ ...cv, [k]: e.target.value });
  const saveToNotes = () => {
    addNote({ id: Date.now(), title: `CV draft: ${tpl.name}`, category: "CV Drafts", body: `${cv.name}\n${cv.role}\n${cv.email}\n\nSummary:\n${cv.summary}\n\nSkills: ${cv.skills}`, updated: "Just now" });
    setSaved(true);
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-4 shadow-sm transition-shadow hover:shadow-lg">
            <div className="h-40 rounded-2xl bg-[#f8faff] p-4" aria-hidden="true">
              <div className="flex items-center gap-2"><span className="h-8 w-8 rounded-full" style={{ background: t.accent }} /><span className="space-y-1"><span className="block h-2 w-20 rounded bg-slate-300" /><span className="block h-1.5 w-12 rounded bg-slate-200" /></span></div>
              <div className="mt-4 space-y-1.5">{[100, 90, 95, 60, 85].map((w, i) => <span key={i} style={{ width: `${w}%` }} className="block h-1.5 rounded bg-slate-200" />)}</div>
            </div>
            <h3 className="mt-3 font-semibold">{t.name}</h3>
            <p className="text-sm text-slate-500">{t.note}</p>
            <button onClick={() => { setTpl(t); setSaved(false); }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#115D98] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]"><FileText size={16} /> Use Template</button>
          </div>
        ))}
      </div>

      <Modal open={!!tpl} onClose={() => setTpl(null)} title={tpl ? `${tpl.name} template` : ""} wide>
        {tpl && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              {[["name", "Full name"], ["role", "Role"], ["email", "Email"], ["skills", "Skills (comma separated)"]].map(([k, label]) => (
                <label key={k} className="block text-sm font-medium">{label}<input value={cv[k]} onChange={set(k)} className={`${input} mt-1`} /></label>
              ))}
              <label className="block text-sm font-medium">Summary<textarea value={cv.summary} onChange={set("summary")} rows={4} className={`${input} mt-1`} /></label>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-500">Live preview</p>
              <CvPreview tpl={tpl} cv={cv} />
              <button onClick={saveToNotes} disabled={saved} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d] disabled:opacity-60">
                {saved ? <><Check size={16} /> Saved to My Notes</> : <><Save size={16} /> Save draft to notes</>}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function InterviewTab() {
  const [open, setOpen] = useState(1);
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-lg font-semibold">Interview etiquette</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {ETIQUETTE.map(({ id, icon: Icon, title, text, tips }) => (
            <div key={id} className="rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm">
              <button onClick={() => setOpen(open === id ? null : id)} aria-expanded={open === id} className="flex w-full items-center gap-3 p-4 text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45]"><Icon size={20} /></span>
                <span className="flex-1"><span className="block font-semibold">{title}</span><span className="block text-sm text-slate-500">{text}</span></span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${open === id ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === id && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-4">
                    {tips.map((t) => <li key={t} className="flex items-start gap-2 py-1 text-sm text-slate-600"><Check size={15} className="mt-0.5 shrink-0 text-[#115D98]" />{t}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-lg font-semibold">Watch and practise</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {VIDEOS.map((v) => <div key={v.title}><VideoEmbed id={v.id} title={v.title} /><p className="mt-2 font-medium">{v.title}</p></div>)}
        </div>
      </section>
    </div>
  );
}

export default function Create() {
  const [tab, setTab] = useState("notes");
  const [notes, setNotes] = useState(INITIAL_NOTES);
  return (
    <div>
      <h2 className="text-2xl font-semibold">Create</h2>
      <p className="mb-5 text-slate-500">Your workspace for notes, CVs and interview practice.</p>
      <div className="mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#115D98]/10 bg-white/90 p-1 shadow-sm [scrollbar-width:none]" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === id ? "bg-[#115D98] text-white shadow" : "text-slate-500 hover:text-[#115D98]"}`}><Icon size={16} /> {label}</button>
        ))}
      </div>
      {tab === "notes" && <NotesTab notes={notes} setNotes={setNotes} />}
      {tab === "cv" && <CvTab addNote={(n) => setNotes((l) => [n, ...l])} />}
      {tab === "interview" && <InterviewTab />}
    </div>
  );
}