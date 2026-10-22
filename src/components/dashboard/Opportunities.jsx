import { useState } from "react";
import { Search, X, ChevronDown, BadgeCheck, Building2, CalendarDays, MapPin, Bookmark, BookmarkCheck, ExternalLink, Check } from "lucide-react";
import Modal from "./ui";

const CATEGORIES = ["Internship", "Scholarship", "Job", "Mentorship"];
// Official site links are placeholders (example.org). Replace with real URLs.
const OPPORTUNITIES = [
  { id: 1, type: "Internship", title: "Software Engineering Intern", org: "Kigali Tech Hub", location: "Kigali", deadline: "2026-11-15", desc: "Three-month paid internship working with senior engineers.", details: "You will build features for live products, join daily stand-ups and present a demo at the end. Open to girls in their final year of study.", requirements: ["Basic JavaScript or Python", "Enrolled in or recently finished school", "A short motivation letter"], url: "https://example.org/kigali-tech-hub/intern" },
  { id: 2, type: "Scholarship", title: "Women in STEM Scholarship", org: "Africa Girls Fund", location: "International", deadline: "2026-11-30", desc: "Covers tuition and a laptop for girls starting a STEM degree.", details: "The scholarship pays full tuition for up to four years, a living stipend and a laptop. Recipients join a mentoring circle.", requirements: ["Admission to a STEM degree", "Strong school results", "Two recommendation letters"], url: "https://example.org/africa-girls-fund/stem" },
  { id: 3, type: "Job", title: "Junior Graphic Designer", org: "Umuhuza Creative", location: "Kigali", deadline: "2026-10-28", desc: "Join a design studio creating campaigns for local businesses.", details: "Design social posts, posters and brand kits with a friendly team. Training is provided.", requirements: ["Portfolio of 3 pieces", "Canva or Figma skills", "Good communication"], url: "https://example.org/umuhuza/designer" },
  { id: 4, type: "Mentorship", title: "Leaders of Tomorrow Mentorship", org: "HerIngress Partners", location: "Remote", deadline: "2026-12-10", desc: "Six months of one-to-one guidance from women leaders.", details: "You are matched with a mentor in your field and meet twice a month online. Includes a final showcase.", requirements: ["Age 16 to 24", "Clear goal for the six months", "Internet access"], url: "https://example.org/heringress/mentorship" },
  { id: 5, type: "Scholarship", title: "Health Sciences Bursary", org: "Eastern Province Education Board", location: "Rwamagana", deadline: "2026-11-05", desc: "Supports girls entering nursing, midwifery and public health.", details: "Covers school fees and uniforms for accepted programmes and includes a clinic placement.", requirements: ["Admission letter", "Proof of residency", "Short essay"], url: "https://example.org/eastern-province/health-bursary" },
  { id: 6, type: "Internship", title: "Marketing and Communications Intern", org: "Bloom Social Enterprise", location: "Musanze", deadline: "2026-11-22", desc: "Help run social media and storytelling for a youth-led enterprise.", details: "Plan content, take photos and write short stories about the women we work with.", requirements: ["Good writing", "Smartphone for content", "Available 3 days a week"], url: "https://example.org/bloom/marketing" },
  { id: 7, type: "Job", title: "Agri-Tech Field Assistant", org: "GreenRoots Cooperative", location: "Huye", deadline: "2026-11-10", desc: "Support farmers with sensors, records and training.", details: "Visit partner farms, set up simple soil sensors and record data on a tablet.", requirements: ["Interest in farming", "Able to travel locally", "Basic phone or tablet use"], url: "https://example.org/greenroots/field-assistant" },
  { id: 8, type: "Internship", title: "Data Analyst Intern", org: "Insight Rwanda", location: "Remote", deadline: "2026-11-30", desc: "Clean and visualise data for social impact projects.", details: "Work with real survey data, build dashboards and present findings to the team.", requirements: ["Spreadsheet skills", "Curiosity about data", "Weekly 15 hours"], url: "https://example.org/insight/data-intern" },
  { id: 9, type: "Mentorship", title: "Girls in Business Circle", org: "Women Entrepreneurs Network", location: "Rubavu", deadline: "2026-12-15", desc: "Monthly meetups with founders and a small seed grant.", details: "Learn pricing, marketing and bookkeeping from founders, then pitch for a seed grant.", requirements: ["A business idea or small business", "Age 18+", "Commit to monthly meetups"], url: "https://example.org/wen/circle" },
  { id: 10, type: "Scholarship", title: "Culinary Arts Scholarship", org: "Hospitality Skills Academy", location: "Kigali", deadline: "2026-11-18", desc: "A full year of professional kitchen training.", details: "Includes uniform, ingredients and a placement at a partner hotel.", requirements: ["Age 17+", "Passion for food", "Short cooking video"], url: "https://example.org/hsa/culinary" },
];
const LOCATIONS = [...new Set(OPPORTUNITIES.map((o) => o.location))].sort();
const fmt = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function Select({ value, onChange, options, all, label }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-full border border-[#115D98]/10 bg-white/90 py-3 pl-5 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-[#115D98]/20">
        <option value="">{all}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0B2A45]" />
    </label>
  );
}

export default function Opportunities({ globalQuery = "" }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [loc, setLoc] = useState("");
  const [open, setOpen] = useState(null);
  const [saved, setSaved] = useState([]);
  const [applyId, setApplyId] = useState(null);
  const [applied, setApplied] = useState([]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "Amina Uwase", email: "", note: "" });
  const has = (o, s) => !s.trim() || `${o.title} ${o.org} ${o.desc} ${o.location}`.toLowerCase().includes(s.trim().toLowerCase());
  const list = OPPORTUNITIES.filter((o) => has(o, q) && has(o, globalQuery) && (!cat || o.type === cat) && (!loc || o.location === loc));
  const sel = OPPORTUNITIES.find((o) => o.id === open);
  const toggleSave = (id) => setSaved((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  const filtered = q || cat || loc;
  const applyTo = OPPORTUNITIES.find((o) => o.id === applyId);
  const startApply = (id) => { setOpen(null); setSent(false); setApplyId(id); };
  const closeApply = () => { setApplyId(null); setSent(false); };
  const submitApply = (e) => { e.preventDefault(); setApplied((l) => [...l, applyId]); setSent(true); };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Opportunities.</h2>
      <p className="mb-5 text-slate-500">Checked by our team, ready for you to apply.</p>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px_200px]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search opportunities" aria-label="Search opportunities"
            className="w-full rounded-full border border-[#115D98]/10 bg-white/90 py-3 pl-11 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
        </div>
        <Select value={cat} onChange={setCat} options={CATEGORIES} all="All categories" label="Category" />
        <Select value={loc} onChange={setLoc} options={LOCATIONS} all="All locations" label="Location" />
      </div>

      {filtered && (
        <div className="-mt-1 mb-4 flex justify-end text-sm">
          <button onClick={() => { setQ(""); setCat(""); setLoc(""); }} className="inline-flex items-center gap-1 font-medium text-[#115D98] hover:underline"><X size={14} /> Clear filters</button>
        </div>
      )}

      <div className="space-y-4">
        {list.map((o) => (
          <article key={o.id} className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm transition-shadow hover:shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-lg font-semibold">{o.title}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]"><BadgeCheck size={14} /> Verified</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Building2 size={14} /> {o.org}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {o.location}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {fmt(o.deadline)}</span>
              <span className="rounded-full bg-[#0B2A45]/5 px-2.5 text-[#0B2A45]">{o.type}</span>
            </div>
            <p className="mt-3 max-w-3xl text-slate-600">{o.desc}</p>
            <div className="mt-4 flex items-center gap-2">
              {applied.includes(o.id) ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-6 py-2 text-sm font-medium text-[#115D98]"><Check size={15} /> Applied</span>
              ) : (
                <button onClick={() => startApply(o.id)} className="rounded-full bg-[#115D98] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]">Apply</button>
              )}
              <button onClick={() => setOpen(o.id)} className="rounded-full bg-[#115D98]/10 px-6 py-2 text-sm font-medium text-[#115D98] transition-colors hover:bg-[#115D98]/20">Read More</button>
              <button onClick={() => toggleSave(o.id)} aria-pressed={saved.includes(o.id)} aria-label="Save" className="ml-auto grid h-10 w-10 place-items-center rounded-full text-[#0B2A45] transition-colors hover:bg-[#115D98]/10">
                {saved.includes(o.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="py-10 text-center text-slate-500">Nothing matches those filters. Try clearing them.</p>}
      </div>

      <Modal open={!!sel} onClose={() => setOpen(null)} title={sel?.title || ""} wide>
        {sel && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8faff] px-3 py-1"><Building2 size={14} /> {sel.org}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8faff] px-3 py-1"><MapPin size={14} /> {sel.location}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8faff] px-3 py-1"><CalendarDays size={14} /> Deadline {fmt(sel.deadline)}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#115D98]/10 px-3 py-1 text-[#115D98]"><BadgeCheck size={14} /> Verified</span>
            </div>
            <div><h4 className="mb-1 font-semibold">About this opportunity</h4><p className="text-slate-600">{sel.details}</p></div>
            <div>
              <h4 className="mb-2 font-semibold">What you need</h4>
              <ul className="space-y-1.5">{sel.requirements.map((r) => <li key={r} className="flex items-start gap-2 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#115D98]" />{r}</li>)}</ul>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {applied.includes(sel.id) ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#115D98]/10 px-6 py-2.5 text-sm font-medium text-[#115D98]"><Check size={16} /> Applied</span>
              ) : (
                <button onClick={() => startApply(sel.id)} className="rounded-full bg-[#0B2A45] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#081f33]">Apply now</button>
              )}
              <a href={sel.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]">Visit official site <ExternalLink size={15} /></a>
              <button onClick={() => toggleSave(sel.id)} className="inline-flex items-center gap-2 rounded-full bg-[#115D98]/10 px-6 py-2.5 text-sm font-medium text-[#115D98] transition-colors hover:bg-[#115D98]/20">
                {saved.includes(sel.id) ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save for later</>}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!applyTo} onClose={closeApply} title={applyTo ? `Apply: ${applyTo.title}` : ""}>
        {applyTo && (sent ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#115D98]/10 text-[#115D98]"><Check size={28} /></span>
            <h4 className="mt-4 text-lg font-semibold">Application sent</h4>
            <p className="mt-1 text-slate-500">Good luck, {form.name.split(" ")[0] || "friend"}! {applyTo.org} will review your application before {fmt(applyTo.deadline)}.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={applyTo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#115D98]/10 px-6 py-2.5 text-sm font-medium text-[#115D98] transition-colors hover:bg-[#115D98]/20">Continue on official site <ExternalLink size={15} /></a>
              <button onClick={closeApply} className="rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]">Done</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submitApply} className="space-y-4">
            <p className="text-sm text-slate-500">{applyTo.org} &middot; {applyTo.location} &middot; Deadline {fmt(applyTo.deadline)}</p>
            <label className="block text-sm font-medium">Full name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
            </label>
            <label className="block text-sm font-medium">Email
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1 w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
            </label>
            <label className="block text-sm font-medium">Why are you a great fit?
              <textarea required rows={4} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Share a few sentences about your interest and experience." className="mt-1 w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
            </label>
            <button className="w-full rounded-full bg-[#115D98] py-2.5 font-medium text-white transition-colors hover:bg-[#0e4c7d]">Submit application</button>
          </form>
        ))}
      </Modal>
    </div>
  );
}