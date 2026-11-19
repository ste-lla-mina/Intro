import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Users, Briefcase, ShieldCheck, FileText,
  LogOut, Menu, X, Search, Bell, ChevronDown, Settings,
  UserCircle, Shield,
} from "lucide-react";
import { AdminProvider, ADMIN } from "./adminStore";
import { CSS, avatarUrl } from "./adminUi";
import Overview from "./Overview";
import UsersPage from "./Users";
import Opportunities from "./Opportunities";
import Moderation from "./Moderation";
import Content from "./Content";
import logo from "../../assets/hilight.jpg";

// ─── NAV ──────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "overview",      label: "Overview",      Icon: LayoutDashboard },
  { id: "users",         label: "Users",          Icon: Users },
  { id: "opportunities", label: "Opportunities",  Icon: Briefcase },
  { id: "moderation",    label: "Moderation",     Icon: ShieldCheck },
  { id: "content",       label: "Content",        Icon: FileText },
];

// ─── MOCK NOTIFICATIONS ───────────────────────────────────────────────────────

const NOTIFS = [
  { id: 1, text: "New project submitted for review", time: "2m ago", read: false },
  { id: 2, text: "Grace Mukamana joined the platform", time: "14m ago", read: false },
  { id: 3, text: "Scholarship deadline closing in 3 days", time: "1h ago", read: false },
  { id: 4, text: "Opportunity approved by Eric Ndayisaba", time: "3h ago", read: true },
  { id: 5, text: "New report flagged in General Chat", time: "5h ago", read: true },
];

// ─── DROPDOWN HOOK ────────────────────────────────────────────────────────────

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return { open, setOpen, ref };
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────

function Topbar({ onMenuClick, onLogout }) {
  const [search, setSearch] = useState("");
  const [notifs, setNotifs] = useState(NOTIFS);
  const notifDrop = useDropdown();
  const profileDrop = useDropdown();

  const unread = notifs.filter((n) => !n.read).length;
  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <header className="flex items-center gap-3 border-b border-[#115D98]/10 bg-white px-4 py-3 lg:px-6">

      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-[#115D98]/10 hover:text-[#115D98] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search bar */}
      <div className="relative flex-1 max-w-md">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users, opportunities, content…"
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-9 text-sm text-slate-700 outline-none transition focus:border-[#115D98]/40 focus:bg-white focus:ring-2 focus:ring-[#115D98]/10 placeholder:text-slate-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115D98]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">

        {/* Notifications */}
        <div className="relative" ref={notifDrop.ref}>
          <button
            onClick={() => notifDrop.setOpen((v) => !v)}
            className="relative grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-[#115D98]/10 hover:text-[#115D98] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0B2A45] text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {notifDrop.open && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-slate-100 bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs font-semibold text-[#115D98] hover:underline">
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifs.map((n) => (
                  <li
                    key={n.id}
                    onClick={() => setNotifs((all) => all.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                    className={`flex cursor-pointer gap-3 px-4 py-3 transition-colors hover:bg-slate-50 ${!n.read ? "bg-[#115D98]/10" : ""}`}
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-slate-200" : "bg-[#115D98]"}`} />
                    <div className="min-w-0">
                      <p className={`text-sm leading-snug ${n.read ? "text-slate-500" : "font-medium text-slate-800"}`}>
                        {n.text}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 px-4 py-2.5 text-center">
                <button className="text-xs font-semibold text-[#115D98] hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileDrop.ref}>
          <button
            onClick={() => profileDrop.setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#115D98]/10"
          >
            <img src={avatarUrl(ADMIN.name)} alt="" className="h-8 w-8 rounded-full" />
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{ADMIN.name}</p>
              <p className="text-xs text-slate-400 leading-tight">{ADMIN.role}</p>
            </div>
            <ChevronDown
              size={14}
              className={`hidden lg:block text-slate-400 transition-transform ${profileDrop.open ? "rotate-180" : ""}`}
            />
          </button>

          {profileDrop.open && (
            <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-slate-100 bg-white py-1.5 shadow-xl">
              {/* Identity */}
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{ADMIN.name}</p>
                <p className="text-xs text-slate-400 truncate">{ADMIN.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {[
                  { Icon: UserCircle, label: "My Profile" },
                  { Icon: Shield,     label: "Admin Settings" },
                  { Icon: Settings,   label: "Preferences" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#115D98]/10 hover:text-[#115D98]"
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 py-1">
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── SHELL ────────────────────────────────────────────────────────────────────

function Shell({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "overview":      return <Overview go={setPage} />;
      case "users":         return <UsersPage />;
      case "opportunities": return <Opportunities />;
      case "moderation":    return <Moderation />;
      case "content":       return <Content />;
      default:              return <Overview go={setPage} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fb]" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Sidebar ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-[#0B2A45]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white shadow-xl transition-transform duration-300
        lg:static lg:translate-x-0 lg:shadow-none lg:border-r lg:border-[#115D98]/10
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* Logo area */}
        <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-[#115D98]/10">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="HerIngress"
              className="h-9 w-9 rounded-xl object-cover shadow-sm"
            />
            <div className="leading-tight">
              <p className="text-base font-black text-[#115D98] tracking-tight">HerIngress</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#115D98]">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:text-[#115D98]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setPage(id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors
                ${page === id
                  ? "bg-[#115D98] text-white shadow-md shadow-[#115D98]/20"
                  : "text-slate-600 hover:bg-[#115D98]/10 hover:text-[#115D98]"
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom profile strip */}
        <div className="border-t border-[#115D98]/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <img src={avatarUrl(ADMIN.name)} alt="" className="h-9 w-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{ADMIN.name}</p>
              <p className="truncate text-xs text-slate-400">{ADMIN.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard({ onLogout }) {
  return (
    <>
      <style>{CSS}</style>
      <AdminProvider>
        <Shell onLogout={onLogout} />
      </AdminProvider>
    </>
  );
}
