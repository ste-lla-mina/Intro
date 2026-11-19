import { Users, UserPlus, Globe2, ShieldCheck, Plus, Megaphone, Download, ArrowRight, Clock, Check } from "lucide-react";
import { useAdmin, FIELDS } from "./adminStore";
import { StatCard, Card, PageHeader, AreaChart, Donut, BarList, Avatar, ago, DAY, fmtDate, btnPrimary, btnSoft, btnGhost, downloadCSV, Badge } from "./adminUi";

export default function Overview({ go }) {
  const { users, opps, reviews, audit, resolveReview, toast, admin } = useAdmin();
  const now = Date.now();
  const weekly = Array.from({ length: 12 }, (_, i) => {
    const end = now - (11 - i) * 7 * DAY, start = end - 7 * DAY;
    return { label: new Date(end).toLocaleDateString("en-GB", { day: "numeric", month: "short" }), value: users.filter((u) => { const t = new Date(u.joined).getTime(); return t > start && t <= end; }).length };
  });
  const newWeek = weekly[11].value, prevWeek = weekly[10].value;
  const delta = prevWeek ? Math.round(((newWeek - prevWeek) / prevWeek) * 100) : 0;
  const pending = reviews.filter((r) => r.status === "pending");
  const published = opps.filter((o) => o.status === "Published");
  const byField = FIELDS.map((f) => ({ label: f, value: users.filter((u) => u.field === f).length })).filter((d) => d.value).sort((a, b) => b.value - a.value);
  const donut = [...byField.slice(0, 5), { label: "Other", value: byField.slice(5).reduce((s, d) => s + d.value, 0) }].filter((d) => d.value);
  const appsByType = ["Internship", "Scholarship", "Job", "Mentorship"].map((t) => ({ label: t, value: opps.filter((o) => o.type === t).reduce((s, o) => s + o.applicants, 0) }));
  const closing = published.map((o) => ({ ...o, left: Math.ceil((new Date(o.deadline) - now) / DAY) })).filter((o) => o.left >= 0 && o.left <= 14).sort((a, b) => a.left - b.left).slice(0, 4);
  const hour = new Date().getHours();

  return (
    <div>
      <PageHeader title={`${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}, ${admin.name.split(" ")[0]}`} text="Here is how HerIngress is doing today.">
        <button className={btnSoft} onClick={() => { downloadCSV("members", users, [{ label: "Name", value: (u) => u.name }, { label: "Email", value: (u) => u.email }, { label: "Field", value: (u) => u.field }, { label: "Status", value: (u) => u.status }, { label: "Joined", value: (u) => u.joined }]); toast("Members exported"); }}><Download size={16} /> Export members</button>
        <button className={btnPrimary} onClick={() => go("opportunities")}><Plus size={16} /> New opportunity</button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total members" value={users.length} spark={weekly.map((w) => w.value)} onClick={() => go("users")} />
        <StatCard icon={UserPlus} label="New this week" value={newWeek} delta={delta} note="vs last week" onClick={() => go("users")} />
        <StatCard icon={Globe2} label="Published opportunities" value={published.length} note={`${opps.filter((o) => !o.verified).length} unverified`} onClick={() => go("opportunities")} />
        <StatCard icon={ShieldCheck} label="Pending reviews" value={pending.length} note={pending.length ? "Needs your attention" : "All caught up"} onClick={() => go("moderation")} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card title="New members per week" className="lg:col-span-2" action={<Badge>Last 12 weeks</Badge>}><AreaChart data={weekly} /></Card>
        <Card title="Members by field"><Donut data={donut} label="Members" /></Card>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card title="Review queue" action={<button onClick={() => go("moderation")} className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98] hover:underline">Open <ArrowRight size={14} /></button>}>
          <ul className="space-y-3">
            {pending.slice(0, 4).map((r) => (
              <li key={r.id} className="flex items-center gap-3 rounded-2xl bg-[#f8faff] p-3">
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-800">{r.title}</p><p className="text-xs text-slate-500">{r.type} · {ago(r.ts)}</p></div>
                <button aria-label="Approve" title="Approve" onClick={() => { resolveReview(r.id, "approved"); toast("Approved"); }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#115D98] text-white transition-transform hover:scale-105"><Check size={16} /></button>
              </li>
            ))}
            {pending.length === 0 && <li className="py-6 text-center text-sm text-slate-500">Nothing is waiting for review.</li>}
          </ul>
        </Card>
        <Card title="Closing soon" action={<button onClick={() => go("opportunities")} className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98] hover:underline">Manage <ArrowRight size={14} /></button>}>
          <ul className="space-y-3">
            {closing.map((o) => (
              <li key={o.id}><button onClick={() => go("opportunities", o.title)} className="flex w-full items-center gap-3 rounded-2xl bg-[#f8faff] p-3 text-left transition-colors hover:bg-[#115D98]/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#115D98] shadow-sm"><Clock size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-slate-800">{o.title}</span><span className="text-xs text-slate-500">{fmtDate(o.deadline)}</span></span>
                <Badge tone={o.left <= 3 ? "red" : "slate"}>{o.left === 0 ? "Today" : `${o.left}d left`}</Badge>
              </button></li>
            ))}
            {closing.length === 0 && <li className="py-6 text-center text-sm text-slate-500">No deadlines in the next 14 days.</li>}
          </ul>
        </Card>
        <Card title="Applications by type"><BarList data={appsByType} /></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Recent activity" className="lg:col-span-2" action={<button onClick={() => go("settings", "audit")} className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98] hover:underline">Full log <ArrowRight size={14} /></button>}>
          <ul className="divide-y divide-slate-100">
            {audit.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3"><Avatar name={a.actor} size="h-8 w-8" /><p className="min-w-0 flex-1 truncate text-sm text-slate-600"><span className="font-medium text-slate-800">{a.actor}</span> {a.action.toLowerCase()} {a.target && <span className="text-[#115D98]">{a.target}</span>}</p><span className="shrink-0 text-xs text-slate-400">{ago(a.ts)}</span></li>
            ))}
          </ul>
        </Card>
        <Card title="Quick actions">
          <div className="grid gap-2">
            <button className={btnGhost} onClick={() => go("announcements")}><Megaphone size={16} /> Send an announcement</button>
            <button className={btnGhost} onClick={() => go("content")}><Plus size={16} /> Add a success story</button>
            <button className={btnGhost} onClick={() => go("users")}><Users size={16} /> Review new members</button>
            <button className={btnGhost} onClick={() => go("analytics")}><ArrowRight size={16} /> Open analytics</button>
          </div>
        </Card>
      </div>
    </div>
  );
}