import { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { DAY } from "./adminUi";

const Ctx = createContext(null);
export const useAdmin = () => useContext(Ctx);

export const ADMIN = { name: "Stella Muhizi", email: "stella@heringress.org", role: "Super admin" };
export const FIELDS = ["Tech", "Health", "Business", "Culinary Arts", "Agriculture", "Creative Arts", "Trades", "Education", "Law", "Science"];
export const STUDY = ["High school", "Gap year", "Vocational / TVET", "Undergraduate", "Postgraduate", "Other"];
export const OPP_TYPES = ["Internship", "Scholarship", "Job", "Mentorship"];
export const ROLES = ["Member", "Mentor", "Moderator"];
export const TEAM_ROLES = ["Super admin", "Admin", "Moderator", "Editor"];

const now = Date.now();
const past = (d) => new Date(now - d * DAY).toISOString().slice(0, 10);
const future = (d) => new Date(now + d * DAY).toISOString().slice(0, 10);

const FIRST = ["Amina", "Grace", "Aline", "Sandra", "Joyce", "Diane", "Claudine", "Divine", "Esther", "Keza", "Ange", "Irene", "Sonia", "Linda", "Belyse", "Chantal", "Denise", "Eliane", "Francine"];
const LAST = ["Uwase", "Mukamana", "Uwera", "Kamikazi", "Nyirahabimana", "Ingabire", "Mukeshimana", "Uwimana", "Umutoni", "Mugisha", "Iradukunda", "Niyonsenga", "Tuyishime", "Hakizimana"];

const users = Array.from({ length: 32 }, (_, i) => {
  const name = `${FIRST[i % FIRST.length]} ${LAST[(i * 3 + 1) % LAST.length]}`;
  return {
    id: i + 1, name, email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
    role: i % 11 === 0 ? "Mentor" : i % 17 === 5 ? "Moderator" : "Member",
    status: i % 9 === 4 ? "Suspended" : i % 7 === 3 ? "Pending" : "Active",
    field: FIELDS[(i * 3) % FIELDS.length], age: 15 + ((i * 7) % 14), study: STUDY[i % STUDY.length],
    joined: past((i * 5) % 90 + 1), lastActive: now - ((i * 7) % 96) * 3600000,
    applications: (i * 3) % 9, chats: (i * 5) % 14,
  };
});

const opp = (id, type, title, org, location, d, extra = {}) => ({ id, type, title, org, location, deadline: future(d), status: "Published", verified: true, url: `https://example.org/${id}`, desc: `${title} at ${org}.`, requirements: ["CV", "Motivation letter"], views: 200 + id * 37, applicants: 10 + id * 6, ...extra });
const opps = [
  opp(1, "Internship", "Software Engineering Intern", "Kigali Tech Hub", "Kigali", 5),
  opp(2, "Scholarship", "Women in STEM Scholarship", "Africa Girls Fund", "International", 24),
  opp(3, "Job", "Junior Graphic Designer", "Umuhuza Creative", "Kigali", 3),
  opp(4, "Mentorship", "Leaders of Tomorrow Mentorship", "HerIngress Partners", "Remote", 40),
  opp(5, "Scholarship", "Health Sciences Bursary", "Eastern Province Education Board", "Rwamagana", 12),
  opp(6, "Internship", "Marketing and Communications Intern", "Bloom Social Enterprise", "Musanze", 16, { verified: false }),
  opp(7, "Job", "Agri-Tech Field Assistant", "GreenRoots Cooperative", "Huye", 9, { status: "Draft", verified: false }),
  opp(8, "Internship", "Data Analyst Intern", "Insight Rwanda", "Remote", 22),
  opp(9, "Mentorship", "Girls in Business Circle", "Women Entrepreneurs Network", "Rubavu", 30),
  { ...opp(10, "Scholarship", "Culinary Arts Scholarship", "Hospitality Skills Academy", "Kigali", -6), status: "Closed" },
];

const stories = [
  { id: 1, name: "Dr. Claudine Uwase", title: "Paediatrician", field: "Health", status: "Published", featured: true, quote: "I was told science was not for girls. I let my results answer.", story: "Claudine grew up in a village school and now runs a children's clinic." },
  { id: 2, name: "Grace Mukamana", title: "Software Engineer", field: "Tech", status: "Published", featured: false, quote: "My first line of code ran on a borrowed laptop.", story: "Grace taught herself to code and builds payment tools." },
  { id: 3, name: "Diane Ingabire", title: "Founder, Bloom Foods", field: "Business", status: "Published", featured: false, quote: "Start small, start scared, but start.", story: "Diane began by selling dried fruit at the market." },
  { id: 4, name: "Aline Uwera", title: "Civil Engineer", field: "Trades", status: "Draft", featured: false, quote: "Every bridge I build is a path to school.", story: "Aline designs rural footbridges." },
];
const courses = [
  { id: 1, title: "Web Development Basics", field: "Tech", duration: "6 weeks", level: "Beginner", lessons: 4, status: "Published", enrolled: 312 },
  { id: 2, title: "Intro to Python", field: "Tech", duration: "5 weeks", level: "Beginner", lessons: 4, status: "Published", enrolled: 240 },
  { id: 3, title: "First Aid and Community Health", field: "Health", duration: "3 weeks", level: "Beginner", lessons: 4, status: "Published", enrolled: 168 },
  { id: 4, title: "Starting a Small Business", field: "Business", duration: "4 weeks", level: "Beginner", lessons: 4, status: "Published", enrolled: 205 },
  { id: 5, title: "Baking and Pastry Foundations", field: "Culinary Arts", duration: "4 weeks", level: "Intermediate", lessons: 4, status: "Draft", enrolled: 0 },
];
const events = [
  { id: 1, title: "CV Clinic with HR Experts", date: future(4), time: "10:00", place: "Online", type: "Online", status: "Published" },
  { id: 2, title: "Girls in Tech Meetup", date: future(10), time: "14:00", place: "Kigali Innovation City", type: "In person", status: "Published" },
  { id: 3, title: "Scholarship Info Session", date: future(16), time: "16:30", place: "Online", type: "Online", status: "Published" },
  { id: 4, title: "Public Speaking Workshop", date: future(24), time: "09:00", place: "Huye Youth Centre", type: "In person", status: "Draft" },
];
const groups = [
  { id: 1, name: "Tech Girls", description: "Code, projects and hackathons", members: 142, privacy: "Public", status: "Active" },
  { id: 2, name: "Scholarship Hunters", description: "Share deadlines and tips", members: 96, privacy: "Public", status: "Active" },
  { id: 3, name: "General Chat", description: "Say hello and ask anything", members: 310, privacy: "Public", status: "Active" },
  { id: 4, name: "Future Healers", description: "Health career community", members: 58, privacy: "Public", status: "Active" },
  { id: 5, name: "Mentors Lounge", description: "For approved mentors only", members: 21, privacy: "Private", status: "Active" },
];

const rev = (id, type, title, by, excerpt, h, status = "pending", reason = "") => ({ id, type, title, by, excerpt, ts: now - h * 3600000, status, reason });
const reviews = [
  rev(1, "Project", "School Garden Club", "Aline Uwera", "We grew vegetables with 30 classmates and donated the harvest to a local clinic.", 2),
  rev(2, "Report", "Reported message in General Chat", "Grace Mukamana", "A member posted a link promoting a fake scholarship that asks for a fee. Reported by 3 members.", 5),
  rev(3, "Opportunity", "Youth Tech Fellowship", "Kigali Code Lab", "A six-month paid fellowship for girls aged 17 to 24 with weekly mentoring.", 9),
  rev(4, "Story", "From village school to pharmacy", "Diane Ingabire", "Diane shares how a bursary helped her become a pharmacist.", 20),
  rev(5, "Project", "Pads for Every Girl", "Joyce Nyirahabimana", "A school club making reusable pads for classmates.", 30),
  rev(6, "Report", "Reported profile bio", "Esther Umutoni", "Profile bio contains personal phone numbers and unrelated advertising.", 40),
  rev(7, "Opportunity", "Culinary Arts Scholarship", "Hospitality Skills Academy", "Full-year kitchen training with a hotel placement.", 70, "approved"),
  rev(8, "Project", "Get Rich Fast Course", "Unknown member", "Promotes a paid course that is not related to the platform.", 90, "rejected", "Promotional content that is not relevant to HerIngress."),
];

const announcements = [
  { id: 1, title: "Women in STEM Scholarship is open", message: "Applications close soon. Check Opportunities for details and requirements.", audience: "All members", channels: ["In-app", "Email"], status: "Sent", ts: now - 2 * DAY, reach: 32 },
  { id: 2, title: "New course: Intro to Python", message: "A free five-week Python course is now live in Learn.", audience: "Tech", channels: ["In-app"], status: "Sent", ts: now - 6 * DAY, reach: 4 },
  { id: 3, title: "Girls in Tech Meetup next week", message: "Join us at Kigali Innovation City. Reserve your seat from Home.", audience: "All members", channels: ["In-app", "Email"], status: "Scheduled", ts: now + 3 * DAY, reach: 32 },
];
const team = [
  { id: 1, name: ADMIN.name, email: ADMIN.email, role: "Super admin", status: "Active", last: now - 600000 },
  { id: 2, name: "Eric Ndayisaba", email: "eric@heringress.org", role: "Admin", status: "Active", last: now - 5 * 3600000 },
  { id: 3, name: "Marie Claire Uwizeye", email: "marie@heringress.org", role: "Moderator", status: "Active", last: now - DAY },
  { id: 4, name: "Patrick Habimana", email: "patrick@heringress.org", role: "Editor", status: "Invited", last: 0 },
];
const audit = [
  { id: 1, ts: now - 3600000, actor: ADMIN.name, action: "Approved Opportunity", target: "Culinary Arts Scholarship" },
  { id: 2, ts: now - 5 * 3600000, actor: "Eric Ndayisaba", action: "Suspended user", target: "Ange Niyonsenga" },
  { id: 3, ts: now - 9 * 3600000, actor: "Marie Claire Uwizeye", action: "Rejected Project", target: "Get Rich Fast Course" },
  { id: 4, ts: now - DAY, actor: ADMIN.name, action: "Updated opportunity", target: "Women in STEM Scholarship" },
  { id: 5, ts: now - 2 * DAY, actor: ADMIN.name, action: "Sent announcement", target: "Women in STEM Scholarship is open" },
  { id: 6, ts: now - 3 * DAY, actor: "Eric Ndayisaba", action: "Created course", target: "Intro to Python" },
];
const settings = {
  general: { platformName: "HerIngress", supportEmail: "support@heringress.org", defaultLang: "English", maintenance: false, openRegistration: true, requireVerification: true, moderateProjects: true, aiAssistant: true },
  taxonomy: { categories: [...OPP_TYPES], fields: [...FIELDS], stages: [...STUDY] },
};

const SEED = { users, opps, stories, courses, events, groups, reviews, announcements, team, audit, settings };

function ToastHost({ toast }) {
  if (!toast) return null;
  return createPortal(
    <div key={toast.id} className="fixed bottom-6 left-1/2 z-[95] flex items-center gap-2 rounded-full bg-[#115D98] px-5 py-2.5 text-sm font-medium text-white shadow-xl" style={{ animation: "ad-toast 2.4s ease-out forwards", fontFamily: "'Outfit', sans-serif" }}>
      <Check size={15} /> {toast.msg}
    </div>,
    document.body
  );
}

export function AdminProvider({ children }) {
  const [data, setData] = useState(SEED);
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);

  const say = (msg) => setToast({ id: Date.now(), msg });
  const log = (action, target = "") => setData((d) => ({ ...d, audit: [{ id: Date.now() + Math.random(), ts: Date.now(), actor: ADMIN.name, action, target }, ...d.audit] }));
  const label = (r) => r.title || r.name || r.email || "";
  const plural = (noun, n) => (n === 1 ? noun : `${noun}s`);

  const saveRow = (key, noun, row) => {
    const isNew = !row.id;
    const r = isNew ? { ...row, id: Date.now() } : row;
    setData((d) => ({ ...d, [key]: isNew ? [r, ...d[key]] : d[key].map((x) => (x.id === r.id ? r : x)) }));
    log(isNew ? `Created ${noun}` : `Updated ${noun}`, label(r));
  };
  const removeRows = (key, noun, ids) => {
    setData((d) => ({ ...d, [key]: d[key].filter((x) => !ids.includes(x.id)) }));
    log(`Deleted ${ids.length} ${plural(noun, ids.length)}`);
  };
  const patchRows = (key, noun, ids, patch, verb) => {
    setData((d) => ({ ...d, [key]: d[key].map((x) => (ids.includes(x.id) ? { ...x, ...patch } : x)) }));
    log(`${verb} ${ids.length} ${plural(noun, ids.length)}`);
  };
  const crud = (key, noun) => ({
    rows: data[key],
    onSave: (r) => saveRow(key, noun, r),
    onRemove: (ids) => removeRows(key, noun, ids),
    patch: (ids, patch, verb) => patchRows(key, noun, ids, patch, verb),
  });

  const resolveReview = (id, status, reason = "") => {
    const r = data.reviews.find((x) => x.id === id);
    setData((d) => ({ ...d, reviews: d.reviews.map((x) => (x.id === id ? { ...x, status, reason } : x)) }));
    log(`${{ approved: "Approved", rejected: "Rejected", pending: "Reopened" }[status]} ${r.type}`, r.title);
  };
  const addAnnouncement = (a) => { setData((d) => ({ ...d, announcements: [{ ...a, id: Date.now() }, ...d.announcements] })); log(a.status === "Sent" ? "Sent announcement" : "Scheduled announcement", a.title); };
  const removeAnnouncement = (id) => { const a = data.announcements.find((x) => x.id === id); setData((d) => ({ ...d, announcements: d.announcements.filter((x) => x.id !== id) })); log("Deleted announcement", a?.title); };
  const setGeneral = (patch) => { setData((d) => ({ ...d, settings: { ...d.settings, general: { ...d.settings.general, ...patch } } })); };
  const setTaxonomy = (key, list) => { setData((d) => ({ ...d, settings: { ...d.settings, taxonomy: { ...d.settings.taxonomy, [key]: list } } })); log("Updated taxonomy", key); };

  const value = { ...data, admin: ADMIN, toast: say, log, crud, resolveReview, addAnnouncement, removeAnnouncement, setGeneral, setTaxonomy, saveRow, removeRows, patchRows, pending: data.reviews.filter((r) => r.status === "pending").length };
  return <Ctx.Provider value={value}>{children}<ToastHost toast={toast} /></Ctx.Provider>;
}