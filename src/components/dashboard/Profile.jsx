import { useState } from "react";
import { Pencil, Check, X, MapPin, Plus, Bell, Mail, Eye, Settings } from "lucide-react";

const INITIAL_USER = {
  name: "Amina Uwase", age: 17, location: "Kigali, Rwanda",
  bio: "Final-year student who loves building small apps and leading a coding club.",
  interests: ["Technology", "Scholarships", "Public Speaking", "Design"],
};
const SETTINGS = [
  { id: "email", icon: Mail, label: "Email updates", note: "Weekly summary of new opportunities" },
  { id: "alerts", icon: Bell, label: "Deadline alerts", note: "Reminders 3 days before a deadline" },
  { id: "visible", icon: Eye, label: "Visible to community", note: "Let other girls find your profile" },
];

function Toggle({ on, onChange, label }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#115D98]" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
const field = "w-full rounded-2xl border border-[#115D98]/10 bg-[#f8faff] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#115D98]/20";

export default function Profile() {
  const [user, setUser] = useState(INITIAL_USER);
  const [draft, setDraft] = useState(INITIAL_USER);
  const [editing, setEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [prefs, setPrefs] = useState({ email: true, alerts: true, visible: false });
  const [saved, setSaved] = useState(false);

  const start = () => { setDraft(user); setEditing(true); setSaved(false); };
  const cancel = () => setEditing(false);
  const save = () => { setUser({ ...draft, age: Number(draft.age) || user.age }); setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const addInterest = (e) => {
    e.preventDefault();
    const v = newInterest.trim();
    if (v && !draft.interests.includes(v)) setDraft({ ...draft, interests: [...draft.interests, v] });
    setNewInterest("");
  };
  const view = editing ? draft : user;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm">
        <div className="h-28 bg-gradient-to-r from-[#115D98] to-[#0B2A45]" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=115D98&color=fff&size=200&bold=true`} alt={user.name} className="h-24 w-24 rounded-3xl object-cover ring-4 ring-white shadow-lg" />
            {editing ? (
              <div className="flex gap-2">
                <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98] px-5 py-2 text-sm font-medium text-white hover:bg-[#0e4c7d]"><Check size={16} /> Save</button>
                <button onClick={cancel} className="inline-flex items-center gap-1.5 rounded-full bg-[#0B2A45]/5 px-5 py-2 text-sm font-medium text-[#0B2A45] hover:bg-[#0B2A45]/10"><X size={16} /> Cancel</button>
              </div>
            ) : (
              <button onClick={start} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-5 py-2 text-sm font-medium text-[#115D98] hover:bg-[#115D98]/20"><Pencil size={15} /> Edit profile</button>
            )}
          </div>

          {saved && <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#115D98]"><Check size={15} /> Profile updated</p>}

          {editing ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">Name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={`${field} mt-1`} /></label>
              <label className="text-sm font-medium">Age<input type="number" min="10" max="35" value={draft.age} onChange={(e) => setDraft({ ...draft, age: e.target.value })} className={`${field} mt-1`} /></label>
              <label className="text-sm font-medium sm:col-span-2">Location<input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className={`${field} mt-1`} /></label>
              <label className="text-sm font-medium sm:col-span-2">About me<textarea rows={3} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} className={`${field} mt-1`} /></label>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">{view.name}</h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 text-slate-500"><span>{view.age} years old</span><span className="inline-flex items-center gap-1"><MapPin size={14} /> {view.location}</span></p>
              <p className="mt-3 text-slate-600">{view.bio}</p>
            </div>
          )}

          <div className="mt-5">
            <h3 className="mb-2 font-semibold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {view.interests.map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-[#115D98]/10 px-3 py-1 text-sm font-medium text-[#115D98]">
                  {i}
                  {editing && <button onClick={() => setDraft({ ...draft, interests: draft.interests.filter((x) => x !== i) })} aria-label={`Remove ${i}`} className="hover:text-[#0B2A45]"><X size={13} /></button>}
                </span>
              ))}
            </div>
            {editing && (
              <form onSubmit={addInterest} className="mt-3 flex max-w-sm gap-2">
                <input value={newInterest} onChange={(e) => setNewInterest(e.target.value)} placeholder="Add an interest" className={field} />
                <button aria-label="Add interest" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#115D98] text-white hover:bg-[#0e4c7d]"><Plus size={18} /></button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#115D98]/5 bg-white/90 p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Settings size={18} className="text-[#0B2A45]" /> Settings</h3>
        <ul className="divide-y divide-slate-100">
          {SETTINGS.map(({ id, icon: Icon, label, note }) => (
            <li key={id} className="flex items-center gap-3 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#115D98]/10 text-[#0B2A45]"><Icon size={18} /></span>
              <span className="flex-1"><span className="block font-medium">{label}</span><span className="block text-sm text-slate-500">{note}</span></span>
              <Toggle on={prefs[id]} onChange={(v) => setPrefs({ ...prefs, [id]: v })} label={label} />
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-2xl bg-[#f8faff] p-4 text-sm text-slate-500">More settings, such as password and privacy controls, are coming soon.</p>
      </section>
    </div>
  );
}