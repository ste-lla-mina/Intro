import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, ExternalLink, ChevronRight, Clock, Wallet, Zap, Award, Check } from "lucide-react";
import { FIELDS } from "./exploreData";

const card = "rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm";

function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
          {it.onClick ? (
            <button onClick={it.onClick} className="font-medium text-slate-500 transition-colors hover:text-[#115D98]">{it.label}</button>
          ) : (
            <span className="font-semibold text-[#0B2A45]">{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

function Banner({ icon: Icon, title, text, children }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#115D98] to-[#0B2A45] p-6 text-white shadow-xl shadow-[#115D98]/20 md:p-8">
      <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 right-28 h-44 w-44 rounded-full bg-[#4D8FBF]/20" />
      <div className="relative flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Icon size={28} /></span>
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
          <p className="mt-1 max-w-2xl text-white/80">{text}</p>
        </div>
      </div>
      {children && <div className="relative mt-5">{children}</div>}
    </div>
  );
}

function StepCard({ step, index, last, open, done, onToggleOpen, onToggleDone }) {
  return (
    <li className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <button onClick={onToggleDone} aria-pressed={done} aria-label={done ? `Mark step ${index + 1} not done` : `Mark step ${index + 1} done`}
          className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white ring-4 ring-[#f8faff] transition-all hover:scale-110 ${done ? "bg-[#0B2A45]" : "bg-[#115D98]"}`}>
          {done ? <Check size={16} strokeWidth={3.2} /> : index + 1}
        </button>
        {!last && <span className="mt-1 w-0.5 flex-1 bg-[#115D98]/15" />}
      </div>

      <div className={`mb-4 min-w-0 flex-1 overflow-hidden transition-shadow hover:shadow-md ${card} ${done ? "border-[#115D98]/25" : ""}`}>
        <button onClick={onToggleOpen} aria-expanded={open} className="flex w-full items-center justify-between gap-2 p-4 text-left">
          <span className={`font-semibold ${done ? "text-slate-400 line-through" : "text-[#0B2A45]"}`}>{step.title}</span>
          <ChevronRight size={16} className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
              <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-3.5 py-1.5 text-xs font-semibold text-[#115D98] transition-colors hover:bg-[#115D98] hover:text-white">
                      {l.label} <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

function RoadmapView({ field, sub, doneSteps, onToggleDone, goFields, goField }) {
  const [openStep, setOpenStep] = useState(0);
  const total = sub.steps.length;
  const count = doneSteps.length;

  return (
    <div className="mx-auto max-w-3xl">
      <Crumbs items={[{ label: "Explore", onClick: goFields }, { label: field.name, onClick: goField }, { label: sub.name }]} />

      <Banner icon={sub.icon} title={`${sub.name} roadmap`} text={sub.overview}>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Clock size={12} /> {sub.time}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Wallet size={12} /> {sub.cost}</span>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs font-medium text-white/80"><span>Your progress</span><span>{count} of {total} steps</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${(count / total) * 100}%` }} /></div>
        </div>
      </Banner>

      <section className="mb-7">
        <h3 className="mb-3 text-sm font-semibold text-[#0B2A45]">Skills you will build</h3>
        <div className="flex flex-wrap gap-2">
          {sub.skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-3 py-1.5 text-xs font-semibold text-[#115D98]"><Zap size={11} /> {s}</span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-end justify-between">
          <h3 className="text-sm font-semibold text-[#0B2A45]">Your step-by-step roadmap</h3>
          <p className="text-xs text-slate-400">Tap a number to mark it done</p>
        </div>
        <ol>
          {sub.steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} last={i === total - 1}
              open={openStep === i} done={doneSteps.includes(i)}
              onToggleOpen={() => setOpenStep(openStep === i ? null : i)} onToggleDone={() => onToggleDone(i)} />
          ))}
        </ol>
      </section>

      <section className={`${card} p-5`}>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B2A45]"><Award size={16} className="text-[#115D98]" /> Scholarships and opportunities</h3>
        <div className="space-y-2">
          {sub.opportunities.map((o) => (
            <div key={o.name} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f8faff] p-3">
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#0B2A45]">{o.name}</p><p className="text-xs text-slate-500">{o.org}</p></div>
              <a href={o.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#115D98] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0e4c7d]">View <ExternalLink size={11} /></a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FieldView({ field, doneMap, goFields, onSelect }) {
  return (
    <div>
      <Crumbs items={[{ label: "Explore", onClick: goFields }, { label: field.name }]} />
      <Banner icon={field.icon} title={field.name} text={field.blurb} />
      <p className="mb-4 text-sm text-slate-500">Choose a career path to see your roadmap.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {field.subcategories.map((sub) => {
          const Icon = sub.icon;
          const n = (doneMap[sub.id] || []).length;
          return (
            <button key={sub.id} onClick={() => onSelect(sub)} className={`group flex flex-col p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg ${card}`}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45] transition-colors group-hover:bg-[#115D98] group-hover:text-white"><Icon size={22} /></span>
              <h3 className="mt-4 font-semibold text-[#0B2A45]">{sub.name}</h3>
              <p className="mt-1 line-clamp-3 text-sm text-slate-500">{sub.overview}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-500">
                <span className="rounded-full bg-[#f8faff] px-2.5 py-1">{sub.time.split(" (")[0]}</span>
                <span className="rounded-full bg-[#f8faff] px-2.5 py-1">{sub.steps.length} steps</span>
              </div>
              <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-[#115D98]">
                {n > 0 ? `${n} of ${sub.steps.length} done` : "View roadmap"} <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Explore({ globalQuery = "" }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState(null);
  const [sub, setSub] = useState(null);
  const [done, setDone] = useState({});

  const top = () => window.scrollTo?.({ top: 0, behavior: "smooth" });
  const goFields = () => { setField(null); setSub(null); top(); };
  const goField = () => { setSub(null); top(); };
  const pickField = (f) => { setField(f); setSub(null); top(); };
  const pickSub = (s) => { setSub(s); top(); };
  const toggleDone = (id, i) => setDone((d) => { const cur = d[id] || []; return { ...d, [id]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] }; });

  const q = `${query} ${globalQuery}`.trim().toLowerCase();
  const list = FIELDS.filter((f) => !q || [f.name, f.blurb, ...f.subcategories.map((s) => `${s.name} ${s.overview}`)].join(" ").toLowerCase().includes(q));

  const viewKey = sub ? `r-${sub.id}` : field ? `f-${field.id}` : "grid";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={viewKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {sub && field ? (
          <RoadmapView field={field} sub={sub} doneSteps={done[sub.id] || []} onToggleDone={(i) => toggleDone(sub.id, i)} goFields={goFields} goField={goField} />
        ) : field ? (
          <FieldView field={field} doneMap={done} goFields={goFields} onSelect={pickSub} />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-[#0B2A45]">Explore careers.</h2>
            <p className="mb-5 text-slate-500">Pick a field to see a step-by-step roadmap made for you.</p>

            <div className="relative mb-7 max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search careers, e.g. design, nursing, farming" aria-label="Search career fields"
                className="w-full rounded-full border border-[#115D98]/10 bg-white/90 py-3 pl-11 pr-10 shadow-sm outline-none focus:ring-2 focus:ring-[#115D98]/20" />
              {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115D98]"><X size={16} /></button>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((f) => {
                const Icon = f.icon;
                return (
                  <button key={f.id} onClick={() => pickField(f)} className={`group flex flex-col p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg ${card}`}>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45] transition-colors group-hover:bg-[#115D98] group-hover:text-white"><Icon size={22} /></span>
                    <h3 className="mt-4 text-lg font-semibold text-[#0B2A45]">{f.name}</h3>
                    <p className="text-sm text-slate-500">{f.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.subcategories.map((s) => <span key={s.id} className="rounded-full bg-[#f8faff] px-2.5 py-1 text-[11px] font-medium text-slate-500">{s.name}</span>)}
                    </div>
                    <p className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-[#115D98]">
                      {f.subcategories.length} career paths <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </button>
                );
              })}
            </div>
            {list.length === 0 && <p className="mt-8 text-slate-500">No fields match your search. Try a different word.</p>}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}