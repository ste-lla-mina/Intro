import { useState } from "react";
import { Users as UsersIcon, UserCheck, Clock, Ban, ShieldCheck, Mail, UserX, MessageSquare, BadgeCheck, Trash2 } from "lucide-react";
import { useAdmin, FIELDS, STUDY, ROLES } from "./adminStore";
import CrudPanel from "./CrudPanel";
import { PageHeader, Avatar, Badge, statusTone, fmtDate, ago, Drawer, Modal, Confirm, StatCard, inputCls, btnPrimary, btnGhost, btnSoft } from "./adminUi";

const roleTone = { Moderator: "solid", Mentor: "blue", Member: "slate" };
const emailOk = (v) => (/^\S+@\S+\.\S+$/.test(String(v || "")) ? "" : "Enter a valid email address.");

export default function Users({ initialQuery = "" }) {
  const { users, crud, toast, log, opps } = useAdmin();
  const c = crud("users", "user");
  const [viewId, setViewId] = useState(null);
  const [msgFor, setMsgFor] = useState(null);
  const [msg, setMsg] = useState("");
  const [delId, setDelId] = useState(null);
  const view = users.find((u) => u.id === viewId);

  const counts = { all: users.length, Active: 0, Pending: 0, Suspended: 0 };
  users.forEach((u) => { counts[u.status] += 1; });
  const setStatus = (ids, status, verb) => { c.patch(ids, { status }, verb); };

  const columns = [
    { key: "name", label: "Member", sort: true, csv: (r) => r.name, render: (r) => <span className="flex items-center gap-3"><Avatar name={r.name} /><span><span className="block font-medium text-slate-800">{r.name}</span><span className="block text-xs text-slate-500">{r.email}</span></span></span> },
    { key: "role", label: "Role", sort: true, render: (r) => <Badge tone={roleTone[r.role]}>{r.role}</Badge> },
    { key: "field", label: "Field", sort: true },
    { key: "status", label: "Status", sort: true, render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: "joined", label: "Joined", sort: true, render: (r) => fmtDate(r.joined), csv: (r) => r.joined },
    { key: "lastActive", label: "Last active", sort: true, render: (r) => ago(r.lastActive), csv: (r) => new Date(r.lastActive).toISOString() },
  ];
  const fields = [
    { key: "name", label: "Full name", required: true },
    { key: "email", label: "Email", type: "email", required: true, validate: emailOk },
    { key: "role", label: "Role", type: "select", options: ROLES },
    { key: "status", label: "Status", type: "select", options: ["Active", "Pending", "Suspended"] },
    { key: "field", label: "Field of interest", type: "select", options: FIELDS },
    { key: "study", label: "Year of study", type: "select", options: STUDY },
    { key: "age", label: "Age", type: "number", min: 10, max: 35, validate: (v) => (Number(v) >= 10 && Number(v) <= 35 ? "" : "Age must be between 10 and 35.") },
  ];
  const sendMessage = () => { toast(`Message sent to ${msgFor.name}`); log("Sent message to user", msgFor.name); setMsgFor(null); setMsg(""); };

  return (
    <div>
      <PageHeader title="Members" text="Manage accounts, roles and access." />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={UsersIcon} label="Total members" value={counts.all} />
        <StatCard icon={UserCheck} label="Active" value={counts.Active} />
        <StatCard icon={Clock} label="Pending verification" value={counts.Pending} />
        <StatCard icon={Ban} label="Suspended" value={counts.Suspended} />
      </div>

      <CrudPanel title="Members" noun="member" exportName="members" initialQuery={initialQuery} {...c} columns={columns} fields={fields}
        searchKeys={["name", "email", "field", "role"]} onView={(r) => setViewId(r.id)}
        blank={{ role: "Member", status: "Pending", field: "Tech", study: "High school", age: 16, joined: new Date().toISOString().slice(0, 10), lastActive: Date.now(), applications: 0, chats: 0 }}
        filters={[{ key: "role", label: "Roles", options: ROLES }, { key: "status", label: "Statuses", options: ["Active", "Pending", "Suspended"] }, { key: "field", label: "Fields", options: FIELDS }]}
        bulk={[
          { label: "Activate", icon: UserCheck, run: (ids) => setStatus(ids, "Active", "Activated"), done: "Members activated" },
          { label: "Suspend", icon: Ban, run: (ids) => setStatus(ids, "Suspended", "Suspended"), done: "Members suspended" },
          { label: "Verify email", icon: BadgeCheck, run: (ids) => setStatus(ids, "Active", "Verified"), done: "Members verified" },
        ]}
        rowMenu={(r) => [
          { label: r.status === "Suspended" ? "Activate" : "Suspend", icon: r.status === "Suspended" ? UserCheck : UserX, onClick: () => { setStatus([r.id], r.status === "Suspended" ? "Active" : "Suspended", r.status === "Suspended" ? "Activated" : "Suspended"); toast(r.status === "Suspended" ? "Member activated" : "Member suspended"); } },
          { label: "Verify email", icon: BadgeCheck, hidden: r.status !== "Pending", onClick: () => { setStatus([r.id], "Active", "Verified"); toast("Email verified"); } },
          { label: r.role === "Moderator" ? "Remove moderator" : "Make moderator", icon: ShieldCheck, onClick: () => { c.patch([r.id], { role: r.role === "Moderator" ? "Member" : "Moderator" }, "Changed role of"); toast("Role updated"); } },
          { label: "Send message", icon: Mail, onClick: () => setMsgFor(r) },
        ]} />

      <Drawer open={!!view} onClose={() => setViewId(null)} title="Member profile">
        {view && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(view.name)}&background=115D98&color=fff&bold=true&size=160`} alt="" className="h-20 w-20 rounded-3xl" />
              <div><p className="text-xl font-semibold text-slate-800">{view.name}</p><p className="text-sm text-slate-500">{view.email}</p><div className="mt-2 flex gap-2"><Badge tone={statusTone(view.status)}>{view.status}</Badge><Badge tone={roleTone[view.role]}>{view.role}</Badge></div></div>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[["Field", view.field], ["Age", view.age], ["Stage", view.study], ["Joined", fmtDate(view.joined)], ["Last active", ago(view.lastActive)], ["ID", `#${view.id}`]].map(([k, v]) => <div key={k} className="rounded-2xl bg-[#f8faff] p-3"><dt className="text-xs text-slate-500">{k}</dt><dd className="font-medium text-slate-800">{v}</dd></div>)}
            </dl>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#115D98]/10 p-4"><p className="text-2xl font-semibold text-[#115D98]">{view.applications}</p><p className="text-sm text-slate-500">Applications</p></div>
              <div className="rounded-2xl border border-[#115D98]/10 p-4"><p className="text-2xl font-semibold text-[#115D98]">{view.chats}</p><p className="text-sm text-slate-500">Asha chats</p></div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-700">Recent activity</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {[`Applied to ${opps[view.id % opps.length].title}`, `Opened the ${view.field} roadmap`, "Joined the Tech Girls group", "Updated profile interests"].map((t, i) => <li key={t} className="flex items-center gap-3 rounded-xl bg-[#f8faff] px-3 py-2"><span className="h-2 w-2 rounded-full bg-[#115D98]" />{t}<span className="ml-auto text-xs text-slate-400">{i + 1}d ago</span></li>)}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={btnPrimary} onClick={() => { const s = view.status === "Suspended" ? "Active" : "Suspended"; setStatus([view.id], s, s === "Active" ? "Activated" : "Suspended"); toast(`Member ${s === "Active" ? "activated" : "suspended"}`); }}>{view.status === "Suspended" ? <><UserCheck size={16} /> Activate</> : <><Ban size={16} /> Suspend</>}</button>
              <button className={btnSoft} onClick={() => setMsgFor(view)}><MessageSquare size={16} /> Message</button>
              <button className={btnGhost} onClick={() => setDelId(view.id)}><Trash2 size={16} /> Delete</button>
            </div>
          </div>
        )}
      </Drawer>

      <Modal open={!!msgFor} onClose={() => setMsgFor(null)} title={`Message ${msgFor?.name || ""}`} footer={<><button className={btnGhost} onClick={() => setMsgFor(null)}>Cancel</button><button className={btnPrimary} disabled={!msg.trim()} onClick={sendMessage}>Send message</button></>}>
        <textarea rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Write a short message. It will appear in the member's notifications." className={inputCls} />
      </Modal>
      <Confirm open={!!delId} title="Delete this member?" body="Their account and saved data will be removed permanently." confirmLabel="Delete member" onCancel={() => setDelId(null)} onConfirm={() => { c.onRemove([delId]); setDelId(null); setViewId(null); toast("Member deleted"); }} />
    </div>
  );
}