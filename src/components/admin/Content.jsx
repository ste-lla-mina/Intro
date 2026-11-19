import { useState } from "react";
import { Star, GraduationCap, CalendarDays, Users, Eye, EyeOff, Archive, ArchiveRestore, Sparkles } from "lucide-react";
import { useAdmin, FIELDS } from "./adminStore";
import CrudPanel from "./CrudPanel";
import { PageHeader, Badge, statusTone, fmtDate } from "./adminUi";

const TABS = [{ id: "stories", label: "Success stories", icon: Star }, { id: "courses", label: "Courses", icon: GraduationCap }, { id: "events", label: "Events", icon: CalendarDays }, { id: "groups", label: "Community groups", icon: Users }];
const pub = (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>;

export default function Content({ initialQuery = "" }) {
  const { crud, stories, courses, events, groups, toast } = useAdmin();
  const [tab, setTab] = useState("stories");
  const counts = { stories: stories.length, courses: courses.length, events: events.length, groups: groups.length };

  const toggleStatus = (c, r, on, off, verbOn, verbOff) => ({ label: r.status === on ? "Unpublish" : "Publish", icon: r.status === on ? EyeOff : Eye, onClick: () => { c.patch([r.id], { status: r.status === on ? off : on }, r.status === on ? verbOff : verbOn); toast("Status updated"); } });

  const panels = {
    stories: () => { const c = crud("stories", "story"); return (
      <CrudPanel key="stories" title="Stories" noun="story" initialQuery={initialQuery} {...c} searchKeys={["name", "title", "field", "quote"]}
        columns={[
          { key: "name", label: "Person", sort: true, render: (r) => <span><span className="block font-medium text-slate-800">{r.name}</span><span className="text-xs text-slate-500">{r.title}</span></span> },
          { key: "field", label: "Field", sort: true },
          { key: "featured", label: "Featured", csv: (r) => (r.featured ? "Yes" : "No"), render: (r) => (r.featured ? <Badge icon={Sparkles}>Story of the week</Badge> : <span className="text-slate-400">-</span>) },
          { key: "status", label: "Status", sort: true, render: pub },
        ]}
        fields={[{ key: "name", label: "Name", required: true }, { key: "title", label: "Job title", required: true }, { key: "field", label: "Field", type: "select", options: FIELDS }, { key: "status", label: "Status", type: "select", options: ["Published", "Draft"] }, { key: "quote", label: "Quote", type: "textarea", required: true }, { key: "story", label: "Full story", type: "textarea", required: true }, { key: "featured", label: "Show as story of the week", type: "toggle" }]}
        blank={{ field: "Tech", status: "Draft", featured: false }}
        filters={[{ key: "field", label: "Fields", options: FIELDS }, { key: "status", label: "Statuses", options: ["Published", "Draft"] }]}
        bulk={[{ label: "Publish", icon: Eye, run: (ids) => c.patch(ids, { status: "Published" }, "Published"), done: "Stories published" }, { label: "Unpublish", icon: EyeOff, run: (ids) => c.patch(ids, { status: "Draft" }, "Unpublished"), done: "Stories unpublished" }]}
        rowMenu={(r) => [toggleStatus(c, r, "Published", "Draft", "Published", "Unpublished"), { label: "Make story of the week", icon: Sparkles, hidden: r.featured, onClick: () => { c.patch(stories.map((s) => s.id), { featured: false }, "Cleared featured on"); c.patch([r.id], { featured: true }, "Featured"); toast("Story of the week updated"); } }]} />
    ); },
    courses: () => { const c = crud("courses", "course"); return (
      <CrudPanel key="courses" title="Courses" noun="course" initialQuery={initialQuery} {...c} searchKeys={["title", "field", "level"]}
        columns={[{ key: "title", label: "Course", sort: true, render: (r) => <span className="font-medium text-slate-800">{r.title}</span> }, { key: "field", label: "Field", sort: true }, { key: "duration", label: "Duration" }, { key: "level", label: "Level", sort: true }, { key: "lessons", label: "Lessons", sort: true }, { key: "enrolled", label: "Enrolled", sort: true }, { key: "status", label: "Status", sort: true, render: pub }]}
        fields={[{ key: "title", label: "Title", required: true, span: 2 }, { key: "field", label: "Field", type: "select", options: FIELDS }, { key: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] }, { key: "duration", label: "Duration", required: true, placeholder: "e.g. 4 weeks" }, { key: "lessons", label: "Number of lessons", type: "number", min: 1 }, { key: "status", label: "Status", type: "select", options: ["Published", "Draft"] }]}
        blank={{ field: "Tech", level: "Beginner", status: "Draft", lessons: 4, enrolled: 0 }}
        filters={[{ key: "field", label: "Fields", options: FIELDS }, { key: "status", label: "Statuses", options: ["Published", "Draft"] }]}
        bulk={[{ label: "Publish", icon: Eye, run: (ids) => c.patch(ids, { status: "Published" }, "Published"), done: "Courses published" }]}
        rowMenu={(r) => [toggleStatus(c, r, "Published", "Draft", "Published", "Unpublished")]} />
    ); },
    events: () => { const c = crud("events", "event"); return (
      <CrudPanel key="events" title="Events" noun="event" initialQuery={initialQuery} {...c} searchKeys={["title", "place", "type"]}
        columns={[{ key: "title", label: "Event", sort: true, render: (r) => <span className="font-medium text-slate-800">{r.title}</span> }, { key: "date", label: "Date", sort: true, csv: (r) => r.date, render: (r) => `${fmtDate(r.date)} · ${r.time}` }, { key: "place", label: "Place" }, { key: "type", label: "Type", render: (r) => <Badge tone="slate">{r.type}</Badge> }, { key: "status", label: "Status", sort: true, render: pub }]}
        fields={[{ key: "title", label: "Title", required: true, span: 2 }, { key: "date", label: "Date", type: "date", required: true }, { key: "time", label: "Time", type: "time", required: true }, { key: "place", label: "Place", required: true }, { key: "type", label: "Type", type: "select", options: ["Online", "In person"] }, { key: "status", label: "Status", type: "select", options: ["Published", "Draft"] }]}
        blank={{ type: "Online", status: "Draft", time: "10:00" }}
        filters={[{ key: "type", label: "Types", options: ["Online", "In person"] }, { key: "status", label: "Statuses", options: ["Published", "Draft"] }]}
        rowMenu={(r) => [toggleStatus(c, r, "Published", "Draft", "Published", "Unpublished")]} />
    ); },
    groups: () => { const c = crud("groups", "group"); return (
      <CrudPanel key="groups" title="Groups" noun="group" initialQuery={initialQuery} {...c} searchKeys={["name", "description"]}
        columns={[{ key: "name", label: "Group", sort: true, render: (r) => <span><span className="block font-medium text-slate-800">{r.name}</span><span className="text-xs text-slate-500">{r.description}</span></span> }, { key: "members", label: "Members", sort: true }, { key: "privacy", label: "Privacy", render: (r) => <Badge tone="slate">{r.privacy}</Badge> }, { key: "status", label: "Status", sort: true, render: pub }]}
        fields={[{ key: "name", label: "Group name", required: true }, { key: "privacy", label: "Privacy", type: "select", options: ["Public", "Private"] }, { key: "description", label: "Description", type: "textarea", required: true }, { key: "status", label: "Status", type: "select", options: ["Active", "Archived"] }]}
        blank={{ privacy: "Public", status: "Active", members: 0 }}
        filters={[{ key: "privacy", label: "Privacy", options: ["Public", "Private"] }, { key: "status", label: "Statuses", options: ["Active", "Archived"] }]}
        bulk={[{ label: "Archive", icon: Archive, run: (ids) => c.patch(ids, { status: "Archived" }, "Archived"), done: "Groups archived" }]}
        rowMenu={(r) => [{ label: r.status === "Active" ? "Archive" : "Restore", icon: r.status === "Active" ? Archive : ArchiveRestore, onClick: () => { c.patch([r.id], { status: r.status === "Active" ? "Archived" : "Active" }, r.status === "Active" ? "Archived" : "Restored"); toast("Group updated"); } }]} />
    ); },
  };

  return (
    <div>
      <PageHeader title="Content" text="Manage what members read, learn and join." />
      <div className="mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#115D98]/10 bg-white/90 p-1 shadow-sm [scrollbar-width:none]" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === id ? "bg-[#115D98] text-white shadow" : "text-slate-500 hover:text-[#115D98]"}`}>
            <Icon size={16} /> {label} <span className={`rounded-full px-1.5 text-xs ${tab === id ? "bg-white/20" : "bg-[#115D98]/10 text-[#115D98]"}`}>{counts[id]}</span>
          </button>
        ))}
      </div>
      <div key={tab} className="ad-rise">{panels[tab]()}</div>
    </div>
  );
}
