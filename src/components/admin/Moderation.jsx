import { useState } from "react";
import { Check, X, Trophy, BookOpen, Briefcase, Flag, Undo2, CheckCheck, Inbox } from "lucide-react";
import { useAdmin } from "./adminStore";
import { PageHeader, Badge, Card, Modal, Confirm, EmptyState, ago, inputCls, btnPrimary, btnGhost, btnSoft, statusTone } from "./adminUi";

const TYPE_ICON = { Project: Trophy, Story: BookOpen, Opportunity: Briefcase, Report: Flag };
const TYPES = ["Project", "Story", "Opportunity", "Report"];
const STATUSES = [{ id: "pending", label: "Pending" }, { id: "approved", label: "Resolved" }, { id: "rejected", label: "Rejected" }];
const REASONS = ["Not relevant to HerIngress", "Inappropriate content", "Missing information", "Duplicate submission"];
const labels = (type) => (type === "Report" ? { yes: "Take action", no: "Dismiss" } : { yes: "Approve", no: "Reject" });

export default function Moderation() {
  const { reviews, resolveReview, toast } = useAdmin();
  const [status, setStatus] = useState("pending");
  const [type, setType] = useState("");
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const [bulk, setBulk] = useState(false);
  const [open, setOpen] = useState(null);

  const counts = Object.fromEntries(STATUSES.map((s) => [s.id, reviews.filter((r) => r.status === s.id).length]));
  const list = reviews.filter((r) => r.status === status && (!type || r.type === type)).sort((a, b) => b.ts - a.ts);

  const approve = (r) => { resolveReview(r.id, "approved"); toast(r.type === "Report" ? "Action taken" : `${r.type} approved`); };
  const reject = () => { resolveReview(rejecting.id, "rejected", reason.trim()); toast(rejecting.type === "Report" ? "Report dismissed" : `${rejecting.type} rejected`); setRejecting(null); setReason(""); };
  const approveAll = () => { list.forEach((r) => resolveReview(r.id, "approved")); setBulk(false); toast(`${list.length} items approved`); };

  return (
    <div>
      <PageHeader title="Moderation" text="Review submissions and reports before they reach the community.">
        {status === "pending" && list.length > 1 && <button className={btnSoft} onClick={() => setBulk(true)}><CheckCheck size={16} /> Approve all {list.length}</button>}
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex gap-1 rounded-full border border-[#115D98]/10 bg-white/90 p-1 shadow-sm" role="tablist">
          {STATUSES.map((s) => (
            <button key={s.id} role="tab" aria-selected={status === s.id} onClick={() => setStatus(s.id)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${status === s.id ? "bg-[#115D98] text-white shadow" : "text-slate-500 hover:text-[#115D98]"}`}>
              {s.label} <span className={`rounded-full px-1.5 text-xs ${status === s.id ? "bg-white/20" : "bg-[#115D98]/10 text-[#115D98]"}`}>{counts[s.id]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["", ...TYPES].map((t) => <button key={t || "all"} onClick={() => setType(t)} aria-pressed={type === t} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${type === t ? "bg-[#115D98]/10 text-[#115D98]" : "border border-[#115D98]/10 bg-white text-slate-500 hover:border-[#115D98]/30"}`}>{t || "All types"}</button>)}
        </div>
      </div>

      <div className="space-y-3">
        {list.map((r) => {
          const Icon = TYPE_ICON[r.type];
          const l = labels(r.type);
          return (
            <Card key={r.id} className="ad-rise">
              <div className="flex flex-wrap items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#115D98]/10 text-[#115D98]"><Icon size={20} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-slate-800">{r.title}</h4><Badge tone="slate">{r.type}</Badge>{r.status !== "pending" && <Badge tone={statusTone(r.status)}>{r.status === "approved" ? (r.type === "Report" ? "Action taken" : "Approved") : (r.type === "Report" ? "Dismissed" : "Rejected")}</Badge>}</div>
                  <p className="text-xs text-slate-500">By {r.by} · {ago(r.ts)}</p>
                  <p className={`mt-2 text-sm text-slate-600 ${open === r.id ? "" : "line-clamp-2"}`}>{r.excerpt}</p>
                  {r.excerpt.length > 90 && <button onClick={() => setOpen(open === r.id ? null : r.id)} className="mt-1 text-xs font-medium text-[#115D98] hover:underline">{open === r.id ? "Show less" : "Read more"}</button>}
                  {r.reason && <p className="mt-2 rounded-xl bg-[#f8faff] px-3 py-2 text-sm text-slate-600"><span className="font-medium text-slate-700">Reason: </span>{r.reason}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  {r.status === "pending" ? (
                    <>
                      <button className={btnPrimary} onClick={() => approve(r)}><Check size={16} /> {l.yes}</button>
                      <button className={btnGhost} onClick={() => { setRejecting(r); setReason(""); }}><X size={16} /> {l.no}</button>
                    </>
                  ) : (
                    <button className={btnGhost} onClick={() => { resolveReview(r.id, "pending"); toast("Moved back to pending"); }}><Undo2 size={16} /> Reopen</button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {list.length === 0 && <Card><EmptyState icon={Inbox} title={status === "pending" ? "All caught up" : "Nothing here yet"} text={status === "pending" ? "There is nothing waiting for review right now." : "Items you handle will appear here."} /></Card>}
      </div>

      <Modal open={!!rejecting} onClose={() => setRejecting(null)} title={rejecting?.type === "Report" ? "Dismiss report" : "Reject submission"}
        footer={<><button className={btnGhost} onClick={() => setRejecting(null)}>Cancel</button><button className={btnPrimary} disabled={reason.trim().length < 5} onClick={reject}>{rejecting?.type === "Report" ? "Dismiss" : "Reject"}</button></>}>
        <p className="mb-3 text-sm text-slate-600">{rejecting?.title}</p>
        <div className="mb-3 flex flex-wrap gap-2">{REASONS.map((x) => <button key={x} onClick={() => setReason(x)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${reason === x ? "bg-[#115D98] text-white" : "bg-[#115D98]/10 text-[#115D98] hover:bg-[#115D98]/20"}`}>{x}</button>)}</div>
        <textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Add a reason. The submitter will see this." className={inputCls} />
      </Modal>
      <Confirm open={bulk} danger={false} title={`Approve ${list.length} items?`} body="Every pending item in this view will be approved or acted on." confirmLabel="Approve all" onConfirm={approveAll} onCancel={() => setBulk(false)} />
    </div>
  );
}