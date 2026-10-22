import { useState } from "react";
import { Search, X, ExternalLink, Code2, HeartPulse, LineChart, ChefHat, Sprout, Palette, Wrench, GraduationCap, Scale, Microscope, Check, Plus } from "lucide-react";
import Modal from "./ui";

const FIELDS = [
  { id: "tech", name: "Tech", icon: Code2, blurb: "Build software, apps and data products.", steps: [
    ["Learn the basics", "HTML, CSS and JavaScript fundamentals.", "https://www.freecodecamp.org/learn"],
    ["Build small projects", "A portfolio page, a quiz game, a to-do app.", "https://www.edx.org"],
    ["Learn a framework", "React or Python, plus Git and GitHub.", "https://www.coursera.org"],
    ["Apply for internships", "Share your projects and join a hackathon.", "https://www.freecodecamp.org/news"],
  ]},
  { id: "health", name: "Health", icon: HeartPulse, blurb: "Care for people and communities.", steps: [
    ["Strengthen your sciences", "Biology and chemistry are the foundation.", "https://www.khanacademy.org/science"],
    ["Pick a training path", "Nursing, midwifery, pharmacy or public health.", "https://openwho.org"],
    ["Volunteer at a clinic", "Hands-on exposure before you apply.", "https://www.coursera.org"],
  ]},
  { id: "business", name: "Business", icon: LineChart, blurb: "Start, run and grow ventures.", steps: [
    ["Spot a real problem", "Talk to ten people who face it.", "https://www.khanacademy.org/economics-finance-domain"],
    ["Test a simple version", "Sell to your first customers before building more.", "https://alison.com"],
    ["Find funding and mentors", "Pitch competitions, grants and incubators.", "https://www.coursera.org"],
  ]},
  { id: "culinary", name: "Culinary Arts", icon: ChefHat, blurb: "Cook, bake and run food businesses.", steps: [
    ["Master kitchen basics", "Knife skills, hygiene and core techniques.", "https://alison.com"],
    ["Specialise", "Pastry, local cuisine or catering.", "https://www.futurelearn.com"],
    ["Train in a real kitchen", "Apprenticeships at hotels and restaurants.", "https://alison.com"],
  ]},
  { id: "agri", name: "Agriculture", icon: Sprout, blurb: "Grow food and modern farming systems.", steps: [
    ["Learn soil and crops", "Understand what grows best in your district.", "https://elearning.fao.org"],
    ["Try agri-tech tools", "Irrigation, sensors and farm records.", "https://www.edx.org"],
    ["Join a cooperative", "Share equipment, markets and knowledge.", "https://elearning.fao.org"],
  ]},
  { id: "creative", name: "Creative Arts", icon: Palette, blurb: "Design, music, film and storytelling.", steps: [
    ["Pick your craft", "Illustration, photography, music or writing.", "https://www.canva.com/designschool/"],
    ["Make something every week", "Consistency builds a portfolio.", "https://www.skillshare.com"],
    ["Share and get paid", "Publish online and pitch small clients.", "https://www.behance.net"],
  ]},
  { id: "trades", name: "Trades", icon: Wrench, blurb: "Electrical, plumbing, tailoring and building.", steps: [
    ["Choose a trade", "Visit a TVET school and ask to observe a class.", "https://alison.com"],
    ["Get certified", "Complete a recognised vocational programme.", "https://www.edx.org"],
    ["Start on site", "Apprentice, then open your own workshop.", "https://alison.com"],
  ]},
  { id: "education", name: "Education", icon: GraduationCap, blurb: "Teach, coach and shape young minds.", steps: [
    ["Pick a subject", "Choose what you could explain with joy.", "https://www.khanacademy.org"],
    ["Learn teaching methods", "Lesson planning and classroom care.", "https://www.coursera.org"],
    ["Practise teaching", "Tutor classmates or lead a study club.", "https://www.futurelearn.com"],
  ]},
  { id: "law", name: "Law", icon: Scale, blurb: "Defend rights and advise organisations.", steps: [
    ["Build reading and writing skills", "Debate and read widely.", "https://www.coursera.org"],
    ["Study law", "Compare university programmes and bursaries.", "https://www.edx.org"],
    ["Intern at a legal aid clinic", "See real cases up close.", "https://www.futurelearn.com"],
  ]},
  { id: "science", name: "Science", icon: Microscope, blurb: "Research, lab work and discovery.", steps: [
    ["Love the questions", "Join a science club or fair.", "https://www.khanacademy.org/science"],
    ["Study a science degree", "Biology, chemistry, physics or environment.", "https://www.edx.org"],
    ["Join a research team", "Apply for lab assistant roles.", "https://www.coursera.org"],
  ]},
];

export default function Explore({ globalQuery = "" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [following, setFollowing] = useState([]);
  const match = (f, s) => !s.trim() || `${f.name} ${f.blurb} ${f.steps.map((x) => x[0]).join(" ")}`.toLowerCase().includes(s.trim().toLowerCase());
  const list = FIELDS.filter((f) => match(f, q) && match(f, globalQuery));
  const field = FIELDS.find((f) => f.id === open);
  const isFollowing = field && following.includes(field.id);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Explore careers.</h2>
      <p className="mb-5 text-slate-500">Pick a field to see a step-by-step roadmap.</p>

      <div className="relative mb-6 max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fields, e.g. farming, design, law" aria-label="Search fields"
          className="w-full rounded-full border border-[#115D98]/10 bg-white/90 py-3 pl-11 pr-10 shadow-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
        {q && <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115D98]"><X size={16} /></button>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => {
          const Icon = f.icon;
          return (
            <button key={f.id} onClick={() => setOpen(f.id)} className="group rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45] transition-colors group-hover:bg-[#115D98] group-hover:text-white"><Icon size={22} /></span>
                {following.includes(f.id) && <span className="inline-flex items-center gap-1 rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]"><Check size={12} /> Following</span>}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.name}</h3>
              <p className="text-sm text-slate-500">{f.blurb}</p>
              <p className="mt-3 text-xs font-medium text-[#115D98]">{f.steps.length} steps</p>
            </button>
          );
        })}
      </div>
      {list.length === 0 && <p className="mt-6 text-slate-500">No fields match your search. Try a different word.</p>}

      <Modal open={!!field} onClose={() => setOpen(null)} title={field ? `${field.name} roadmap` : ""} wide>
        {field && (
          <div>
            <p className="mb-6 text-slate-500">{field.blurb}</p>
            <ol className="relative ml-4 border-l-2 border-dashed border-[#115D98]/25">
              {field.steps.map(([title, text, link], i) => (
                <li key={title} className="relative pb-7 pl-8 last:pb-1">
                  <span className="absolute -left-[17px] top-0 grid h-8 w-8 place-items-center rounded-full bg-[#115D98] text-sm font-semibold text-white ring-4 ring-white">{i + 1}</span>
                  <p className="font-semibold">Step {i + 1}: {title}</p>
                  <p className="text-sm text-slate-500">{text}</p>
                  <a href={link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0B2A45] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#081f33]">
                    Access Course <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ol>
            <button onClick={() => setFollowing((l) => (isFollowing ? l.filter((x) => x !== field.id) : [...l, field.id]))}
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${isFollowing ? "bg-[#115D98]/10 text-[#115D98]" : "bg-[#115D98] text-white hover:bg-[#0e4c7d]"}`}>
              {isFollowing ? <><Check size={16} /> Following this path</> : <><Plus size={16} /> Follow this path</>}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}