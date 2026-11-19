import { BadgeCheck, CheckCircle2, FileEdit, Clock, ShieldAlert, Copy, Lock, Globe2 } from "lucide-react";
import { useAdmin, OPP_TYPES } from "./adminStore";
import CrudPanel from "./CrudPanel";
import { PageHeader, Badge, StatCard, statusTone, fmtDate, DAY } from "./adminUi";

const daysLeft = (iso) => Math.ceil((new Date(iso) - Date.now()) / DAY);

export default function Opportunities({ initialQuery = "" }) {
  const { opps, crud, toast, settings } = useAdmin();
  const c = crud("opps", "opportunity");
  const closing = opps.filter((o) => o.status === "Published" && daysLeft(o.deadline) >= 0 && daysLeft(o.deadline) <= 7).length;
  const types = settings.taxonomy.categories;

  const columns = [
    { key: "title", label: "Opportunity", sort: true, render: (r) => <span><span className="block font-medium text-slate-800">{r.title}</span><span className="block text-xs text-slate-500">{r.org} · {r.location}</span></span> },
    { key: "type", label: "Type", sort: true, render: (r) => <Badge tone="slate">{r.type}</Badge> },
    { key: "deadline", label: "Deadline", sort: true, csv: (r) => r.deadline, render: (r) => { const d = daysLeft(r.deadline); return <span>{fmtDate(r.deadline)}{r.status === "Published" && d >= 0 && d <= 7 && <span className="ml-2 text-xs font-medium text-red-600">{d === 0 ? "today" : `${d}d left`}</span>}</span>; } },
    { key: "status", label: "Status", sort: true, render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "verified", label: "Verified", sort: true, csv: (r) => (r.verified ? "Yes" : "No"), render: (r) => (r.verified ? <Badge icon={BadgeCheck}>Verified</Badge> : <Badge tone="slate" icon={ShieldAlert}>Unverified</Badge>) },
    { key: "applicants", label: "Applicants", sort: true },
    { key: "views", label: "Views", sort: true },
  ];
  const urlOk = (v) => (/^https?:\/\/\S+\.\S+/.test(String(v || "")) ? "" : "Enter a full link starting with https://");
  const fields = [
    { key: "title", label: "Title", required: true, span: 2 },
    { key: "org", label: "Organisation", required: true },
    { key: "type", label: "Type", type: "select", options: types },
    { key: "location", label: "Location", required: true },
    { key: "deadline", label: "Deadline", type: "date", required: true },
    { key: "status", label: "Status", type: "select", options: ["Published", "Draft", "Closed"] },
    { key: "url", label: "Official site", type: "url", required: true, validate: urlOk, span: 2, placeholder: "https://" },
    { key: "desc", label: "Description", type: "textarea", required: true },
    { key: "requirements", label: "Requirements", type: "tags", span: 2 },
    { key: "verified", label: "Verified by the HerIngress team", type: "toggle" },
  ];

  return (
    <div>
      <PageHeader title="Opportunities" text="Publish, verify and close listings that girls see on the platform." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Globe2} label="Published" value={opps.filter((o) => o.status === "Published").length} />
        <StatCard icon={FileEdit} label="Drafts" value={opps.filter((o) => o.status === "Draft").length} />
        <StatCard icon={Clock} label="Closing in 7 days" value={closing} />
        <StatCard icon={ShieldAlert} label="Unverified" value={opps.filter((o) => !o.verified).length} />
      </div>
      <CrudPanel title="Opportunities" noun="opportunity" exportName="opportunities" initialQuery={initialQuery} {...c} columns={columns} fields={fields}
        searchKeys={["title", "org", "location", "type"]}
        blank={{ type: types[0], status: "Draft", verified: false, requirements: [], views: 0, applicants: 0, url: "" }}
        filters={[{ key: "type", label: "Types", options: types }, { key: "status", label: "Statuses", options: ["Published", "Draft", "Closed"] }, { key: "verified", label: "Verification", options: [{ value: "true", label: "Verified" }, { value: "false", label: "Unverified" }], get: (r) => String(r.verified) }]}
        bulk={[
          { label: "Verify", icon: BadgeCheck, run: (ids) => c.patch(ids, { verified: true }, "Verified"), done: "Opportunities verified" },
          { label: "Publish", icon: CheckCircle2, run: (ids) => c.patch(ids, { status: "Published" }, "Published"), done: "Opportunities published" },
          { label: "Close", icon: Lock, run: (ids) => c.patch(ids, { status: "Closed" }, "Closed"), done: "Opportunities closed" },
        ]}
        rowMenu={(r) => [
          { label: r.verified ? "Remove verification" : "Verify", icon: BadgeCheck, onClick: () => { c.patch([r.id], { verified: !r.verified }, r.verified ? "Unverified" : "Verified"); toast(r.verified ? "Verification removed" : "Opportunity verified"); } },
          { label: r.status === "Published" ? "Close listing" : "Publish", icon: r.status === "Published" ? Lock : CheckCircle2, onClick: () => { c.patch([r.id], { status: r.status === "Published" ? "Closed" : "Published" }, r.status === "Published" ? "Closed" : "Published"); toast("Status updated"); } },
          { label: "Duplicate", icon: Copy, onClick: () => { c.onSave({ ...r, id: undefined, title: `${r.title} (copy)`, status: "Draft", verified: false, views: 0, applicants: 0 }); toast("Duplicate created as draft"); } },
        ]} />
    </div>
  );
}