import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Heart, Trophy, Users, Bookmark, BookmarkCheck, Plus, Check, Quote, Sparkles, Lightbulb, Flag } from "lucide-react";
import Modal from "./ui";

const av = (n, bg = "115D98", size = 200) => `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=${bg}&color=fff&size=${size}&bold=true`;

const STORIES = [
  { id: 1, featured: true, field: "Health", name: "Dr. Claudine Uwase", title: "Paediatrician", img: av("Claudine Uwase", "115D98", 400), quote: "I was told science was not for girls. I let my results answer.", story: "Claudine grew up in a village school with one textbook per class. A scholarship took her to medical school, and today she runs a children's clinic and mentors girls who dream of medicine.", journey: [["2008", "Studied by lamplight in a village school"], ["2014", "Won a scholarship to medical school"], ["2022", "Opened a children's clinic"]], advice: "Find one teacher who believes in you and hold on to them. Then become that teacher for someone else." },
  { id: 2, field: "Tech", name: "Grace Mukamana", title: "Software Engineer", img: av("Grace Mukamana", "0B2A45"), quote: "My first line of code ran on a borrowed laptop. It changed my life.", story: "Grace taught herself to code through free courses, won a hackathon, and now builds payment tools used across East Africa.", journey: [["2017", "Started free online coding courses"], ["2019", "Won her first hackathon"], ["2024", "Joined a fintech team"]], advice: "You do not need the perfect laptop. You need the next small project." },
  { id: 3, field: "Business", name: "Diane Ingabire", title: "Founder, Bloom Foods", img: av("Diane Ingabire", "4D8FBF"), quote: "Start small, start scared, but start.", story: "Diane began by selling dried fruit at her local market. Bloom Foods now employs twenty women from her district.", journey: [["2016", "Sold dried fruit at the market"], ["2020", "Registered Bloom Foods"], ["2025", "Hired twenty women"]], advice: "Sell your first product before you perfect your logo." },
  { id: 4, field: "Engineering", name: "Aline Uwera", title: "Civil Engineer", img: av("Aline Uwera"), quote: "Every bridge I build is a path to school for someone.", story: "Aline studied engineering on a bursary and now designs rural footbridges that connect villages to schools and clinics.", journey: [["2015", "Earned an engineering bursary"], ["2020", "Graduated top of her class"], ["2023", "Designed her first footbridge"]], advice: "Be the only girl in the room once, and the room will change." },
  { id: 5, field: "Culinary Arts", name: "Sandra Kamikazi", title: "Chef and Caterer", img: av("Sandra Kamikazi", "0B2A45"), quote: "My kitchen is where my confidence grew.", story: "After a culinary scholarship, Sandra opened a catering business that trains young women in food safety and service.", journey: [["2018", "Entered culinary school on a scholarship"], ["2021", "Launched her catering business"], ["2025", "Began training young women"]], advice: "Master the basics. Fancy can wait." },
  { id: 6, field: "Agriculture", name: "Joyce Nyirahabimana", title: "Agronomist", img: av("Joyce Nyirahabimana", "4D8FBF"), quote: "Good soil, good plans, good harvest.", story: "Joyce helps cooperatives raise yields with simple, affordable techniques, and trains farmers across the Southern Province.", journey: [["2014", "Grew up on her family's farm"], ["2019", "Earned an agronomy degree"], ["2024", "Trained 300 farmers"]], advice: "Listen to farmers first. They already know their land." },
];

const INITIAL_PROJECTS = [
  { id: 1, category: "Environment", title: "Clean Water Tracker", by: "Aline, 17", img: "https://picsum.photos/seed/water/600/360", desc: "A simple app that maps working water points in Bugesera.", details: "Aline and her classmates visited 60 water points, recorded which ones work, and built a map anyone can open on a phone.", impact: "60 water points mapped", likes: 48 },
  { id: 2, category: "Health", title: "Pads for Every Girl", by: "Joyce, 16", img: "https://picsum.photos/seed/pads/600/360", desc: "A school club making reusable pads for classmates who miss class.", details: "The club sews and washes reusable pads and teaches classmates about hygiene so fewer girls miss school each month.", impact: "120 girls supported", likes: 73 },
  { id: 3, category: "Tech", title: "Code Sisters", by: "Sandra, 18", img: "https://picsum.photos/seed/code/600/360", desc: "Weekend coding lessons for 40 girls in her sector.", details: "Every Saturday Sandra teaches HTML and Scratch in a borrowed classroom, using phones when laptops are not available.", impact: "40 girls learning to code", likes: 61 },
  { id: 4, category: "Arts", title: "Recycled Fashion Show", by: "Diane, 19", img: "https://picsum.photos/seed/fashion/600/360", desc: "Outfits made from recycled materials, sold to fund school fees.", details: "Diane's team turned old sacks and fabric scraps into outfits, hosted a show, and used the sales to pay school fees.", impact: "12 fee scholarships funded", likes: 35 },
  { id: 5, category: "Education", title: "Mind Matters Podcast", by: "Grace, 18", img: "https://picsum.photos/seed/podcast/600/360", desc: "A student-run podcast about stress, exams and friendship.", details: "Grace records short episodes with counsellors and students about handling exam stress and building healthy friendships.", impact: "2,000 listens", likes: 52 },
  { id: 6, category: "Agriculture", title: "Seed Bank Cooperative", by: "Claudine, 17", img: "https://picsum.photos/seed/seeds/600/360", desc: "Saving and sharing local seeds among smallholder farmers.", details: "Claudine's cooperative stores local seed varieties and lends them to farmers who return a share after harvest.", impact: "25 farmers joined", likes: 29 },
];

const TABS = [{ id: "stories", label: "Success Stories", icon: Users }, { id: "projects", label: "Projects & Achievements", icon: Trophy }];
const PROJECT_CATEGORIES = ["Tech", "Health", "Environment", "Education", "Arts", "Agriculture"];
const field = "w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20";

function Pills({ options, value, onChange }) {
  return (
    <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0 [scrollbar-width:none]">
      {["All", ...options].map((o) => (
        <button key={o} onClick={() => onChange(o)} aria-pressed={value === o}
          className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${value === o ? "bg-[#115D98] text-white shadow-md shadow-[#115D98]/25" : "border border-[#115D98]/10 bg-white/90 text-slate-600 hover:border-[#115D98]/40"}`}>{o}</button>
      ))}
    </div>
  );
}

export default function RoleModels() {
  const [tab, setTab] = useState("stories");
  const [storyField, setStoryField] = useState("All");
  const [projectCat, setProjectCat] = useState("All");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [savedStories, setSavedStories] = useState([]);
  const [liked, setLiked] = useState([]);
  const [storyId, setStoryId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Tech", desc: "" });

  const toggle = (setter, id) => setter((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  const featured = STORIES.find((s) => s.featured);
  const others = STORIES.filter((s) => !s.featured);
  const storyFields = [...new Set(others.map((s) => s.field))];
  const storyList = others.filter((s) => storyField === "All" || s.field === storyField);
  const projectList = projects.filter((p) => projectCat === "All" || p.category === projectCat);
  const story = STORIES.find((s) => s.id === storyId);
  const project = projects.find((p) => p.id === projectId);
  const likeCount = (p) => p.likes + (liked.includes(`p${p.id}`) ? 1 : 0);

  const closeShare = () => { setShareOpen(false); setShared(false); };
  const submitShare = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    setProjects((l) => [{ id: Date.now(), category: form.category, title, by: "Amina, 17", img: `https://picsum.photos/seed/${encodeURIComponent(title)}/600/360`, desc: form.desc.trim(), details: form.desc.trim(), impact: "Just shared", likes: 0, pending: true }, ...l]);
    setForm({ title: "", category: "Tech", desc: "" });
    setProjectCat("All"); setTab("projects"); setShared(true);
  };

  const saveBtn = (id, className = "") => (
    <button onClick={() => toggle(setSavedStories, id)} aria-pressed={savedStories.includes(id)} aria-label="Save story" className={`grid h-10 w-10 place-items-center rounded-full text-[#0B2A45] transition-colors hover:bg-[#115D98]/10 ${className}`}>
      {savedStories.includes(id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
    </button>
  );

  return (
    <div>
      {/* Banner */}
      <div className="relative mb-6 overflow-hidden rounded-3xl bg-[#115D98] p-6 text-white shadow-xl shadow-[#115D98]/20 md:p-8">
        <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-28 h-44 w-44 rounded-full bg-[#0B2A45]/30" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Role Models.</h2>
            <p className="mt-1 max-w-md text-white/80">Women and girls who started where you are, and what they built along the way.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1">{STORIES.length} stories</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{projects.length} projects</span>
            </div>
          </div>
          <button onClick={() => setShareOpen(true)} className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#115D98] shadow-lg transition-transform hover:scale-105 md:self-auto">
            <Plus size={16} /> Share your project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#115D98]/10 bg-white/90 p-1 shadow-sm [scrollbar-width:none]" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === id ? "bg-[#115D98] text-white shadow" : "text-slate-500 hover:text-[#115D98]"}`}><Icon size={16} /> {label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === "stories" ? (
            <div>
              {/* Featured story */}
              <article className="mb-8 grid gap-6 overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm md:grid-cols-[220px_1fr] md:p-6">
                <img src={featured.img} alt={featured.name} className="mx-auto h-48 w-48 rounded-3xl object-cover shadow-lg ring-4 ring-[#115D98]/10 md:h-full md:w-full" />
                <div className="flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]"><Sparkles size={13} /> Story of the week</span>
                  <Quote className="mt-4 text-[#115D98]/30" size={26} />
                  <p className="mt-1 text-xl font-medium leading-snug text-[#0B2A45] md:text-2xl">{featured.quote}</p>
                  <p className="mt-3 font-semibold">{featured.name}</p>
                  <p className="text-sm text-[#115D98]">{featured.title}</p>
                  <div className="mt-5 flex items-center gap-2">
                    <button onClick={() => setStoryId(featured.id)} className="inline-flex items-center gap-2 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]"><BookOpen size={16} /> Read full story</button>
                    {saveBtn(featured.id)}
                  </div>
                </div>
              </article>

              <h3 className="mb-3 text-lg font-semibold">More inspiring women.</h3>
              <Pills options={storyFields} value={storyField} onChange={setStoryField} />
              <motion.div key={storyField} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {storyList.map((s) => (
                  <article key={s.id} className="flex flex-col rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <img src={s.img} alt={s.name} className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#115D98]/20" />
                      <div className="min-w-0"><h4 className="truncate font-semibold leading-tight">{s.name}</h4><p className="truncate text-sm text-[#115D98]">{s.title}</p></div>
                    </div>
                    <span className="mt-3 self-start rounded-full bg-[#0B2A45]/5 px-2.5 py-0.5 text-xs font-medium text-[#0B2A45]">{s.field}</span>
                    <p className="mt-3 line-clamp-3 italic text-slate-600">&ldquo;{s.quote}&rdquo;</p>
                    <div className="mt-auto flex items-center pt-4">
                      <button onClick={() => setStoryId(s.id)} className="inline-flex items-center gap-2 rounded-full bg-[#115D98]/10 px-4 py-2 text-sm font-medium text-[#115D98] transition-colors hover:bg-[#115D98]/20"><BookOpen size={15} /> Read Story</button>
                      {saveBtn(s.id, "ml-auto")}
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          ) : (
            <div>
              <Pills options={PROJECT_CATEGORIES} value={projectCat} onChange={setProjectCat} />
              <motion.div key={projectCat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projectList.map((p) => {
                  const on = liked.includes(`p${p.id}`);
                  return (
                    <article key={p.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="relative">
                        <img src={p.img} alt={p.title} className="h-40 w-full object-cover" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0B2A45] shadow-sm">{p.category}</span>
                        {p.pending && <span className="absolute right-3 top-3 rounded-full bg-[#0B2A45] px-3 py-1 text-xs font-medium text-white">Pending review</span>}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-semibold">{p.title}</h4>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#115D98]"><img src={av(p.by.split(",")[0], "4D8FBF", 48)} alt="" className="h-5 w-5 rounded-full" /> {p.by}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.desc}</p>
                        <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[#115D98]/10 px-3 py-1 text-xs font-medium text-[#115D98]"><Flag size={12} /> {p.impact}</p>
                        <div className="mt-auto flex items-center gap-2 pt-4">
                          <button onClick={() => setProjectId(p.id)} className="rounded-full bg-[#115D98]/10 px-4 py-1.5 text-sm font-medium text-[#115D98] transition-colors hover:bg-[#115D98]/20">View project</button>
                          <button onClick={() => toggle(setLiked, `p${p.id}`)} aria-pressed={on} aria-label="Like" className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${on ? "bg-[#115D98] text-white" : "text-[#0B2A45] hover:bg-[#115D98]/10"}`}>
                            <Heart size={15} fill={on ? "currentColor" : "none"} /> {likeCount(p)}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
              {projectList.length === 0 && <p className="py-10 text-center text-slate-500">No projects in this category yet. Be the first to share one!</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Story modal */}
      <Modal open={!!story} onClose={() => setStoryId(null)} title={story?.name || ""} wide>
        {story && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={story.img} alt={story.name} className="h-20 w-20 rounded-3xl object-cover ring-4 ring-[#115D98]/10" />
              <div><p className="text-lg font-semibold">{story.title}</p><span className="mt-1 inline-block rounded-full bg-[#0B2A45]/5 px-2.5 py-0.5 text-xs font-medium text-[#0B2A45]">{story.field}</span></div>
            </div>
            <p className="border-l-4 border-[#115D98] pl-4 text-lg italic text-[#0B2A45]">&ldquo;{story.quote}&rdquo;</p>
            <p className="text-slate-600">{story.story}</p>
            <div>
              <h4 className="mb-3 font-semibold">Her journey</h4>
              <ol className="relative ml-2 border-l-2 border-dashed border-[#115D98]/25">
                {story.journey.map(([year, text]) => (
                  <li key={year} className="relative pb-4 pl-6 last:pb-0">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#115D98] ring-4 ring-white" />
                    <p className="text-sm font-semibold text-[#115D98]">{year}</p><p className="text-slate-600">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex gap-3 rounded-2xl bg-gradient-to-r from-[#115D98]/5 to-[#115D98]/10 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#0B2A45] shadow-sm"><Lightbulb size={20} /></span>
              <div><p className="font-semibold">Her advice to you</p><p className="text-slate-600">{story.advice}</p></div>
            </div>
            <button onClick={() => toggle(setSavedStories, story.id)} className="inline-flex items-center gap-2 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e4c7d]">
              {savedStories.includes(story.id) ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save this story</>}
            </button>
          </div>
        )}
      </Modal>

      {/* Project modal */}
      <Modal open={!!project} onClose={() => setProjectId(null)} title={project?.title || ""} wide>
        {project && (
          <div className="space-y-4">
            <img src={project.img} alt={project.title} className="h-56 w-full rounded-2xl object-cover" />
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-[#0B2A45]/5 px-3 py-1 font-medium text-[#0B2A45]">{project.category}</span>
              <span className="font-medium text-[#115D98]">By {project.by}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-3 py-1 font-medium text-[#115D98]"><Flag size={12} /> {project.impact}</span>
            </div>
            <p className="text-slate-600">{project.details}</p>
            <button onClick={() => toggle(setLiked, `p${project.id}`)} className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${liked.includes(`p${project.id}`) ? "bg-[#115D98] text-white" : "bg-[#115D98]/10 text-[#115D98] hover:bg-[#115D98]/20"}`}>
              <Heart size={16} fill={liked.includes(`p${project.id}`) ? "currentColor" : "none"} /> {likeCount(project)} {liked.includes(`p${project.id}`) ? "Liked" : "Like this project"}
            </button>
          </div>
        )}
      </Modal>

      {/* Share modal */}
      <Modal open={shareOpen} onClose={closeShare} title="Share your project">
        {shared ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#115D98]/10 text-[#115D98]"><Check size={28} /></span>
            <h4 className="mt-4 text-lg font-semibold">Project submitted</h4>
            <p className="mt-1 text-slate-500">Our team will review it soon. It already appears in Projects & Achievements, marked as pending.</p>
            <button onClick={closeShare} className="mt-5 rounded-full bg-[#115D98] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0e4c7d]">Done</button>
          </div>
        ) : (
          <form onSubmit={submitShare} className="space-y-4">
            <label className="block text-sm font-medium">Project title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. School Garden Club" className={`${field} mt-1`} /></label>
            <label className="block text-sm font-medium">Category
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${field} mt-1`}>{PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className="block text-sm font-medium">What did you build or achieve?<textarea required rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Tell us what you made and who it helps." className={`${field} mt-1`} /></label>
            <button className="w-full rounded-full bg-[#115D98] py-2.5 font-medium text-white transition-colors hover:bg-[#0e4c7d]">Submit project</button>
          </form>
        )}
      </Modal>
    </div>
  );
}