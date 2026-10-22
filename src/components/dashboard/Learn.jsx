import { useState } from "react";
import { Search, Clock, PlayCircle, ExternalLink, CheckCircle2, Circle, BarChart3 } from "lucide-react";
import Modal, { VideoEmbed } from "./ui";

const PLACEHOLDER_VIDEO = "M7lc1UVf-VE"; // swap for real YouTube IDs per course
const FIELDS = ["Tech", "Health", "Business", "Culinary Arts", "Agriculture", "Creative Arts", "Career Skills"];
const COURSES = [
  { id: 1, field: "Tech", title: "Web Development Basics", duration: "6 weeks", level: "Beginner", seed: "webdev", url: "https://www.freecodecamp.org/learn", video: PLACEHOLDER_VIDEO, lessons: ["How the web works", "HTML structure", "Styling with CSS", "Your first webpage"] },
  { id: 2, field: "Tech", title: "Intro to Python", duration: "5 weeks", level: "Beginner", seed: "python", url: "https://www.coursera.org", video: PLACEHOLDER_VIDEO, lessons: ["Variables and types", "Loops and conditions", "Functions", "A small project"] },
  { id: 3, field: "Health", title: "First Aid and Community Health", duration: "3 weeks", level: "Beginner", seed: "firstaid", url: "https://openwho.org", video: PLACEHOLDER_VIDEO, lessons: ["Checking an emergency", "Bleeding and burns", "Hygiene and prevention", "Helping your community"] },
  { id: 4, field: "Business", title: "Starting a Small Business", duration: "4 weeks", level: "Beginner", seed: "startup", url: "https://alison.com", video: PLACEHOLDER_VIDEO, lessons: ["Finding an idea", "Know your customer", "Pricing and profit", "Your first sale"] },
  { id: 5, field: "Business", title: "Financial Literacy for Girls", duration: "2 weeks", level: "Beginner", seed: "finance", url: "https://www.khanacademy.org/economics-finance-domain", video: PLACEHOLDER_VIDEO, lessons: ["Saving and budgeting", "Mobile money safety", "Understanding loans"] },
  { id: 6, field: "Culinary Arts", title: "Baking and Pastry Foundations", duration: "4 weeks", level: "Intermediate", seed: "baking", url: "https://alison.com", video: PLACEHOLDER_VIDEO, lessons: ["Kitchen safety", "Doughs and batters", "Cakes and icing", "Selling your bakes"] },
  { id: 7, field: "Agriculture", title: "Modern Farming Techniques", duration: "5 weeks", level: "Intermediate", seed: "farming", url: "https://elearning.fao.org", video: PLACEHOLDER_VIDEO, lessons: ["Soil health", "Water saving", "Pests and diseases", "Selling at market"] },
  { id: 8, field: "Creative Arts", title: "Digital Design with Canva", duration: "2 weeks", level: "Beginner", seed: "design", url: "https://www.canva.com/designschool/", video: PLACEHOLDER_VIDEO, lessons: ["Layout and colour", "Typography", "Make a poster"] },
  { id: 9, field: "Career Skills", title: "Public Speaking Confidence", duration: "2 weeks", level: "Beginner", seed: "speaking", url: "https://www.coursera.org", video: PLACEHOLDER_VIDEO, lessons: ["Calming nerves", "Structuring your talk", "Voice and body language"] },
];

export default function Learn({ globalQuery = "" }) {
  const [q, setQ] = useState("");
  const [field, setField] = useState("All");
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState([]);
  const has = (c, s) => !s.trim() || `${c.title} ${c.field}`.toLowerCase().includes(s.trim().toLowerCase());
  const list = COURSES.filter((c) => has(c, q) && has(c, globalQuery) && (field === "All" || c.field === field));
  const course = COURSES.find((c) => c.id === open);
  const key = (cid, i) => `${cid}:${i}`;
  const progress = (c) => Math.round((c.lessons.filter((_, i) => done.includes(key(c.id, i))).length / c.lessons.length) * 100);
  const toggle = (k) => setDone((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]));

  return (
    <div>
      <h2 className="text-2xl font-semibold">Learn.</h2>
      <p className="mb-5 text-slate-500">Free and low-cost courses you can start today.</p>

      <div className="relative mb-4 max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses" aria-label="Search courses"
          className="w-full rounded-full border border-[#115D98]/10 bg-white/90 py-3 pl-11 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
      </div>

      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0 [scrollbar-width:none]">
        {["All", ...FIELDS].map((f) => (
          <button key={f} onClick={() => setField(f)} aria-pressed={field === f}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${field === f ? "bg-[#115D98] text-white shadow-md shadow-[#115D98]/25" : "border border-[#115D98]/10 bg-white/90 text-slate-600 hover:border-[#115D98]/40"}`}>{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img src={`https://picsum.photos/seed/${c.seed}/600/340`} alt="" className="h-40 w-full object-cover" />
            <div className="p-5">
              <span className="rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]">{c.field}</span>
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <div className="mt-1 flex gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {c.duration}</span>
                <span className="inline-flex items-center gap-1.5"><BarChart3 size={14} /> {c.level}</span>
              </div>
              {progress(c) > 0 && <div className="mt-3 h-1.5 rounded-full bg-[#115D98]/10"><div className="h-full rounded-full bg-[#115D98] transition-all" style={{ width: `${progress(c)}%` }} /></div>}
              <button onClick={() => setOpen(c.id)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#115D98] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]"><PlayCircle size={16} /> View Lessons</button>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="py-10 text-center text-slate-500">No courses found. Try another field or search.</p>}

      <Modal open={!!course} onClose={() => setOpen(null)} title={course?.title || ""} wide>
        {course && (
          <div className="space-y-5">
            <VideoEmbed id={course.video} title={`${course.title} demo`} />
            <div>
              <div className="mb-2 flex items-center justify-between"><h4 className="font-semibold">Lessons</h4><span className="text-sm text-slate-500">{progress(course)}% complete</span></div>
              <div className="mb-4 h-2 rounded-full bg-[#115D98]/10"><div className="h-full rounded-full bg-[#115D98] transition-all" style={{ width: `${progress(course)}%` }} /></div>
              <ul className="space-y-2">
                {course.lessons.map((l, i) => {
                  const k = key(course.id, i);
                  const on = done.includes(k);
                  return (
                    <li key={l} className="flex items-center gap-3 rounded-2xl bg-[#f8faff] p-3">
                      <button onClick={() => toggle(k)} aria-label={on ? "Mark incomplete" : "Mark complete"} className="text-[#115D98]">{on ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-slate-300" />}</button>
                      <span className={`flex-1 text-sm font-medium ${on ? "text-slate-400 line-through" : ""}`}>Lesson {i + 1}: {l}</span>
                      <a href={course.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98] hover:underline">Open <ExternalLink size={13} /></a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}