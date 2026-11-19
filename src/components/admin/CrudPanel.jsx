import { useState, useMemo, useEffect } from "react";
import { Plus, Download, ArrowUpDown, Pencil, Trash2, Eye, X } from "lucide-react";
import { useAdmin } from "./adminStore";
import { Modal, Confirm, RowMenu, SearchBox, Select, Pagination, EmptyState, Toggle, downloadCSV, inputCls, btnPrimary, btnSoft, btnGhost } from "./adminUi";

/**
 * Generic list + search + filter + sort + paginate + select + bulk + add/edit modal + delete confirm + CSV export.
 * Used for Users, Opportunities and every Content tab.
 */
export default function CrudPanel({
  title, noun, rows, columns, fields, filters = [], searchKeys = [], onSave, onRemove, bulk = [], rowMenu, onView,
  blank = {}, pageSize = 8, initialQuery = "", exportName, canAdd = true, canDelete = true, toolbarExtra,
}) {
  const { toast } = useAdmin();
  const [q, setQ] = useState(initialQuery);
  const [fv, setFv] = useState({});
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState([]);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [del, setDel] = useState(null);

  useEffect(() => { setQ(initialQuery); setPage(1); }, [initialQuery]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let r = rows.filter((row) =>
      (!needle || searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(needle))) &&
      filters.every((f) => !fv[f.key] || String(f.get ? f.get(row) : row[f.key]) === fv[f.key]));
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      const val = (row) => (col?.sortValue ? col.sortValue(row) : row[sort.key]);
      r = [...r].sort((a, b) => { const x = val(a), y = val(b); const c = typeof x === "number" && typeof y === "number" ? x - y : String(x ?? "").localeCompare(String(y ?? "")); return sort.dir === "asc" ? c : -c; });
    }
    return r;
  }, [rows, q, fv, sort, searchKeys, filters, columns]);

  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  useEffect(() => { if (page > pages) setPage(pages); }, [pages, page]);
  const pageRows = list.slice((page - 1) * pageSize, page * pageSize);
  const allOnPage = pageRows.length > 0 && pageRows.every((r) => sel.includes(r.id));
  const filtered = q || Object.values(fv).some(Boolean);

  const toggleSort = (key) => setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  const toggleSel = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const openForm = (row) => {
    const draft = { ...blank, ...row };
    fields.forEach((f) => { if (f.type === "tags") draft[f.key] = (draft[f.key] || []).join(", "); });
    setErrors({}); setForm(draft);
  };
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    fields.forEach((f) => {
      const v = form[f.key];
      if (f.required && (v === undefined || v === null || String(v).trim() === "")) er[f.key] = `${f.label} is required.`;
      else if (f.validate) { const m = f.validate(v, form); if (m) er[f.key] = m; }
    });
    setErrors(er);
    if (Object.keys(er).length) return;
    const out = { ...form };
    fields.forEach((f) => {
      if (f.type === "tags") out[f.key] = String(out[f.key] || "").split(",").map((t) => t.trim()).filter(Boolean);
      if (f.type === "number") out[f.key] = Number(out[f.key]) || 0;
    });
    onSave(out); setForm(null); toast(`${noun[0].toUpperCase()}${noun.slice(1)} saved`);
  };
  const confirmDelete = () => { onRemove(del); setSel((s) => s.filter((x) => !del.includes(x))); setDel(null); toast(`${del.length} ${noun}${del.length > 1 ? "s" : ""} deleted`); };
  const exportCsv = () => {
    downloadCSV(exportName || title.toLowerCase(), list, columns.map((c) => ({ label: c.label, value: c.csv || ((r) => r[c.key]) })));
    toast(`Exported ${list.length} rows`);
  };

  const rowItems = (row) => [
    ...(onView ? [{ label: "View details", icon: Eye, onClick: () => onView(row) }] : []),
    { label: "Edit", icon: Pencil, onClick: () => openForm(row) },
    ...(rowMenu ? rowMenu(row) : []),
    ...(canDelete ? [{ label: "Delete", icon: Trash2, danger: true, onClick: () => setDel([row.id]) }] : []),
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder={`Search ${title.toLowerCase()}`} className="min-w-[200px] flex-1 sm:max-w-xs" />
        {filters.map((f) => <Select key={f.key} value={fv[f.key] || ""} onChange={(v) => { setFv({ ...fv, [f.key]: v }); setPage(1); }} options={f.options} all={`All ${f.label.toLowerCase()}`} label={f.label} className="w-40" />)}
        {filtered && <button onClick={() => { setQ(""); setFv({}); }} className="inline-flex items-center gap-1 text-sm font-medium text-[#115D98] hover:underline"><X size={14} /> Clear</button>}
        <div className="ml-auto flex items-center gap-2">
          {toolbarExtra}
          <button onClick={exportCsv} className={btnGhost}><Download size={16} /> Export</button>
          {canAdd && <button onClick={() => openForm(null)} className={btnPrimary}><Plus size={16} /> Add {noun}</button>}
        </div>
      </div>

      {sel.length > 0 && (
        <div className="ad-rise mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-[#115D98] px-4 py-2.5 text-sm text-white">
          <span className="font-medium">{sel.length} selected</span>
          <span className="mx-1 h-4 w-px bg-white/30" />
          {bulk.map((b) => <button key={b.label} onClick={() => { b.run(sel); setSel([]); toast(b.done || `${b.label} done`); }} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium hover:bg-white/25">{b.icon && <b.icon size={14} />} {b.label}</button>)}
          {canDelete && <button onClick={() => setDel(sel)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-medium text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>}
          <button onClick={() => setSel([])} className="ml-auto text-white/80 hover:text-white">Clear selection</button>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-[#115D98]/5 bg-white/90 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-[#f8faff] text-xs font-semibold text-slate-500">
                <th className="w-10 px-4 py-3"><input type="checkbox" aria-label="Select all" checked={allOnPage} onChange={() => setSel(allOnPage ? sel.filter((id) => !pageRows.some((r) => r.id === id)) : [...new Set([...sel, ...pageRows.map((r) => r.id)])])} className="h-4 w-4 accent-[#115D98]" /></th>
                {columns.map((c) => (
                  <th key={c.key} className="px-3 py-3">
                    {c.sort ? <button onClick={() => toggleSort(c.key)} className={`inline-flex items-center gap-1 hover:text-[#115D98] ${sort?.key === c.key ? "text-[#115D98]" : ""}`}>{c.label}<ArrowUpDown size={12} /></button> : c.label}
                  </th>
                ))}
                <th className="w-12 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className={`border-b border-slate-50 transition-colors last:border-0 hover:bg-[#115D98]/[0.03] ${sel.includes(row.id) ? "bg-[#115D98]/[0.06]" : ""}`}>
                  <td className="px-4 py-3"><input type="checkbox" aria-label="Select row" checked={sel.includes(row.id)} onChange={() => toggleSel(row.id)} className="h-4 w-4 accent-[#115D98]" /></td>
                  {columns.map((c, i) => (
                    <td key={c.key} className="px-3 py-3 text-slate-600">
                      {i === 0 && onView ? <button onClick={() => onView(row)} className="text-left hover:text-[#115D98]">{c.render ? c.render(row) : row[c.key]}</button> : c.render ? c.render(row) : String(row[c.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-right"><RowMenu items={rowItems(row)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <EmptyState title={filtered ? "Nothing matches your filters" : `No ${noun}s yet`} text={filtered ? "Try a different search or clear the filters." : `Add your first ${noun} to get started.`} action={filtered ? <button className={btnSoft} onClick={() => { setQ(""); setFv({}); }}>Clear filters</button> : canAdd && <button className={btnPrimary} onClick={() => openForm(null)}><Plus size={16} /> Add {noun}</button>} />}
      </div>
      <Pagination page={page} pages={pages} total={list.length} pageSize={pageSize} onPage={setPage} />

      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? `Edit ${noun}` : `Add ${noun}`} size="lg"
        footer={<><button type="button" onClick={() => setForm(null)} className={btnGhost}>Cancel</button><button form="crud-form" className={btnPrimary}>Save {noun}</button></>}>
        {form && (
          <form id="crud-form" onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.span === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
                {f.type === "toggle" ? (
                  <div className="flex items-center justify-between rounded-xl border border-[#115D98]/10 bg-[#f8faff] px-3.5 py-2.5"><span className="text-sm font-medium text-slate-700">{f.label}</span><Toggle on={!!form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} label={f.label} /></div>
                ) : (
                  <label className="block text-sm font-medium text-slate-700">{f.label}{f.required && <span className="text-red-500"> *</span>}
                    {f.type === "textarea" ? <textarea rows={4} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className={`${inputCls} mt-1`} />
                      : f.type === "select" ? <select value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={`${inputCls} mt-1`}>{!form[f.key] && <option value="">Select...</option>}{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                      : <input type={f.type === "tags" ? "text" : f.type || "text"} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.type === "tags" ? "Separate with commas" : f.placeholder} min={f.min} max={f.max} className={`${inputCls} mt-1`} />}
                  </label>
                )}
                {errors[f.key] && <p className="mt-1 text-xs font-medium text-red-500">{errors[f.key]}</p>}
              </div>
            ))}
          </form>
        )}
      </Modal>

      <Confirm open={!!del} title={`Delete ${del?.length > 1 ? `${del.length} ${noun}s` : noun}?`} body="This removes the item permanently and cannot be undone." confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDel(null)} />
    </div>
  );
}