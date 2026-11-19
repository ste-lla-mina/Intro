import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check, ChevronLeft, ChevronRight, Search, MoreHorizontal, Inbox, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";

export const DAY = 86400000;
export const fmtDate = (v) => (v ? new Date(v).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "-");
export const ago = (ts) => {
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)}d ago`;
  return fmtDate(ts);
};
export const avatarUrl = (name, size = 96) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=115D98&color=fff&bold=true&size=${size}`;
export const inputCls = "w-full rounded-xl border border-[#115D98]/15 bg-[#f8faff] px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#115D98]/50 focus:ring-2 focus:ring-[#115D98]/15 placeholder:text-slate-400";

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
@keyframes ad-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ad-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes ad-pop { from { opacity: 0; transform: scale(.95) translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes ad-slide { from { transform: translateX(100%); } to { transform: none; } }
@keyframes ad-slide-l { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes ad-toast { 0% { opacity: 0; transform: translate(-50%, 12px); } 10%, 88% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, 8px); } }
@keyframes ad-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.ad-fade { animation: ad-fade .2s ease-out both; } .ad-rise { animation: ad-rise .35s ease-out both; } .ad-pop { animation: ad-pop .2s ease-out both; }
.ad-slide { animation: ad-slide .28s cubic-bezier(.2,.8,.2,1) both; } .ad-slide-l { animation: ad-slide-l .28s cubic-bezier(.2,.8,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .ad-fade, .ad-rise, .ad-pop, .ad-slide, .ad-slide-l { animation: none !important; } }
`;

export function Avatar({ name, size = "h-9 w-9" }) {
  return <img src={avatarUrl(name)} alt="" className={`${size} shrink-0 rounded-full object-cover`} />;
}

const TONES = { blue: "bg-[#115D98]/10 text-[#115D98]", solid: "bg-[#115D98] text-white", slate: "bg-slate-100 text-slate-600", red: "bg-red-50 text-red-600" };
export const statusTone = (s) => ({ Active: "blue", Published: "blue", Approved: "blue", Sent: "blue", Verified: "blue", Online: "blue", Suspended: "red", Rejected: "red", Pending: "slate", Draft: "slate", Scheduled: "slate", Closed: "slate", Archived: "slate", Invited: "slate", pending: "slate", approved: "blue", rejected: "red" }[s] || "slate");
export function Badge({ tone = "blue", children, icon: Icon }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]}`}>{Icon && <Icon size={12} />}{children}</span>;
}

export function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#115D98]" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function useEsc(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [open, onClose]);
}

export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  useEsc(open, onClose);
  if (!open) return null;
  const w = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" }[size];
  return createPortal(
    <div className="ad-fade fixed inset-0 z-[80] grid place-items-center bg-[#115D98]/40 p-4 backdrop-blur-sm" style={{ fontFamily: "'Outfit', sans-serif" }} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className={`ad-pop flex max-h-[90vh] w-full ${w} flex-col rounded-3xl bg-white shadow-2xl`}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-[#115D98]">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-[#115D98]/10"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export function Drawer({ open, onClose, title, children }) {
  useEsc(open, onClose);
  if (!open) return null;
  return createPortal(
    <div className="ad-fade fixed inset-0 z-[80] bg-[#115D98]/40 backdrop-blur-sm" style={{ fontFamily: "'Outfit', sans-serif" }} onClick={onClose}>
      <aside role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="ad-slide absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-[#115D98]">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-[#115D98]/10"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>,
    document.body
  );
}

export function Confirm({ open, title, body, confirmLabel = "Confirm", danger = true, onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm"
      footer={<>
        <button onClick={onCancel} className="rounded-full bg-[#f8faff] px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-[#115D98]/10">Cancel</button>
        <button onClick={onConfirm} className={`rounded-full px-5 py-2 text-sm font-semibold text-white ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[#115D98] hover:bg-[#0e4c7d]"}`}>{confirmLabel}</button>
      </>}>
      <p className="text-sm text-slate-600">{body}</p>
    </Modal>
  );
}

export function RowMenu({ items }) {
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!rect) return;
    const close = () => setRect(null);
    const down = (e) => { if (ref.current && !ref.current.contains(e.target) && !e.target.closest?.("[data-rowmenu]")) close(); };
    document.addEventListener("mousedown", down);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => { document.removeEventListener("mousedown", down); window.removeEventListener("scroll", close, true); window.removeEventListener("resize", close); };
  }, [rect]);
  const list = items.filter((i) => !i.hidden);
  const W = 190, H = list.length * 40 + 10;
  return (
    <>
      <button data-rowmenu aria-label="Row actions" aria-haspopup="menu" aria-expanded={!!rect}
        onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setRect((v) => (v ? null : r)); }}
        className={`grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-[#115D98]/10 hover:text-[#115D98] ${rect ? "bg-[#115D98]/10 text-[#115D98]" : ""}`}><MoreHorizontal size={18} /></button>
      {rect && createPortal(
        <div ref={ref} role="menu" className="ad-pop fixed z-[85] overflow-hidden rounded-2xl border border-[#115D98]/10 bg-white py-1 shadow-xl"
          style={{ width: W, left: Math.min(Math.max(8, rect.right - W), window.innerWidth - W - 8), top: rect.bottom + 6 + H > window.innerHeight ? Math.max(8, rect.top - H - 6) : rect.bottom + 6, fontFamily: "'Outfit', sans-serif" }}>
          {list.map((i) => (
            <button key={i.label} role="menuitem" onClick={() => { setRect(null); i.onClick(); }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors ${i.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700 hover:bg-[#115D98]/5 hover:text-[#115D98]"}`}>
              {i.icon && <i.icon size={16} />} {i.label}
            </button>
          ))}
        </div>, document.body)}
    </>
  );
}

export function Sparkline({ values, className = "" }) {
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(" ");
  return <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={`h-8 w-24 ${className}`}><polyline points={pts} fill="none" stroke="#115D98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>;
}

export function StatCard({ icon: Icon, label, value, delta, spark, onClick, note }) {
  const up = delta >= 0;
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick} className={`ad-rise rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 text-left shadow-sm transition-all ${onClick ? "hover:-translate-y-0.5 hover:shadow-lg" : ""}`}>
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#115D98]/10 text-[#115D98]"><Icon size={22} /></span>
        {spark && <Sparkline values={spark} />}
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-800">{value}</p>
      <p className="font-medium text-slate-600">{label}</p>
      {delta !== undefined && <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${up ? "text-[#115D98]" : "text-red-600"}`}>{up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {up ? "+" : ""}{delta}% {note || "vs last period"}</p>}
      {delta === undefined && note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
    </Tag>
  );
}

export function SearchBox({ value, onChange, placeholder = "Search", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className={`${inputCls} rounded-full bg-white pl-10 pr-9`} />
      {value && <button onClick={() => onChange("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115D98]"><X size={15} /></button>}
    </div>
  );
}

export function Select({ value, onChange, options, all, label, className = "" }) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label || all}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-full border border-[#115D98]/15 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#115D98]/15">
        {all !== undefined && <option value="">{all}</option>}
        {options.map((o) => (typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#115D98]" />
    </label>
  );
}

export function Pagination({ page, pages, total, pageSize, onPage }) {
  if (total === 0) return null;
  const from = (page - 1) * pageSize + 1, to = Math.min(page * pageSize, total);
  const b = "grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-[#115D98]/10 disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="flex items-center justify-between gap-3 px-1 pt-4 text-sm text-slate-500">
      <span>{from}-{to} of {total}</span>
      <div className="flex items-center gap-1">
        <button className={b} disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></button>
        <span className="px-2 font-medium text-slate-700">{page} / {pages}</span>
        <button className={b} disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title, text, action }) {
  return (
    <div className="grid place-items-center px-6 py-14 text-center">
      <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-[#115D98]/10 text-[#115D98]"><Icon size={26} /></span>
      <p className="font-semibold text-slate-700">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Card({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-[#115D98]/5 bg-white/90 p-5 shadow-sm ${className}`}>
      {(title || action) && <div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-semibold text-slate-800">{title}</h3>{action}</div>}
      {children}
    </section>
  );
}

export function PageHeader({ title, text, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><h2 className="text-2xl font-semibold text-slate-800">{title}</h2>{text && <p className="text-slate-500">{text}</p>}</div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-[#115D98] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#115D98]/20 transition-colors hover:bg-[#0e4c7d] disabled:opacity-40";
export const btnSoft = "inline-flex items-center justify-center gap-2 rounded-full bg-[#115D98]/10 px-4 py-2.5 text-sm font-semibold text-[#115D98] transition-colors hover:bg-[#115D98]/20 disabled:opacity-40";
export const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-[#115D98]/15 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#115D98]/5 disabled:opacity-40";

/* ---------- Charts (plain SVG, no library needed) ---------- */
export function AreaChart({ data, height = 230, format = (v) => v }) {
  const [hover, setHover] = useState(null);
  const gid = useRef(`g${Math.random().toString(36).slice(2, 8)}`).current;
  const W = 640, H = height, P = { l: 38, r: 14, t: 14, b: 28 };
  const max = Math.max(...data.map((d) => d.value), 1) * 1.12;
  const x = (i) => P.l + (i * (W - P.l - P.r)) / Math.max(data.length - 1, 1);
  const y = (v) => P.t + (1 - v / max) * (H - P.t - P.b);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;
  const step = Math.ceil(data.length / 7);
  const h = hover !== null ? data[hover] : null;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Trend chart" onMouseLeave={() => setHover(null)}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#115D98" stopOpacity=".28" /><stop offset="100%" stopColor="#115D98" stopOpacity="0" /></linearGradient></defs>
      {[0, 1, 2, 3, 4].map((k) => { const v = (max * k) / 4; return <g key={k}><line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="#e2e8f0" strokeDasharray="3 4" /><text x={P.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{format(Math.round(v))}</text></g>; })}
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke="#115D98" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" style={{ animation: "ad-draw 1s ease-out both" }} />
      {data.map((d, i) => i % step === 0 && <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#94a3b8">{d.label}</text>)}
      {data.map((d, i) => <rect key={i} x={x(i) - (W - P.l - P.r) / data.length / 2} y={P.t} width={(W - P.l - P.r) / data.length} height={H - P.t - P.b} fill="transparent" onMouseEnter={() => setHover(i)} />)}
      {h && (
        <g pointerEvents="none">
          <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="#115D98" strokeOpacity=".25" />
          <circle cx={x(hover)} cy={y(h.value)} r="5" fill="#fff" stroke="#115D98" strokeWidth="2.5" />
          <g transform={`translate(${Math.min(Math.max(x(hover) - 45, P.l), W - 100)},${Math.max(y(h.value) - 46, 2)})`}>
            <rect width="90" height="36" rx="8" fill="#115D98" /><text x="45" y="15" textAnchor="middle" fontSize="10" fill="#fff" fillOpacity=".8">{h.label}</text><text x="45" y="29" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">{format(h.value)}</text>
          </g>
        </g>
      )}
    </svg>
  );
}

export const SHADES = ["#115D98", "#2f86cc", "#6FA8D6", "#9CC3E3", "#C4DBEE", "#E1EDF7"];
export function Donut({ data, label = "Total" }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let acc = 0;
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="4" />
          {data.map((d, i) => { const seg = (d.value / total) * 100; const el = <circle key={d.label} cx="18" cy="18" r="15.9155" fill="none" stroke={SHADES[i % SHADES.length]} strokeWidth="4" strokeDasharray={`${seg} ${100 - seg}`} strokeDashoffset={-acc} />; acc += seg; return el; })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-2xl font-semibold text-slate-800">{total}</p><p className="text-xs text-slate-500">{label}</p></div></div>
      </div>
      <ul className="min-w-0 flex-1 space-y-1.5 text-sm">
        {data.map((d, i) => <li key={d.label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SHADES[i % SHADES.length] }} /><span className="flex-1 truncate text-slate-600">{d.label}</span><span className="font-medium text-slate-800">{d.value}</span></li>)}
      </ul>
    </div>
  );
}

export function BarList({ data, format = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="mb-1 flex justify-between text-sm"><span className="truncate pr-2 text-slate-600">{d.label}</span><span className="font-medium text-slate-800">{format(d.value)}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-[#115D98]/10"><div className="h-full rounded-full bg-[#115D98] transition-all duration-700" style={{ width: `${(d.value / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

export function downloadCSV(name, rows, cols) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.map((c) => esc(c.label)).join(","), ...rows.map((r) => cols.map((c) => esc(c.value(r))).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
export { Check };