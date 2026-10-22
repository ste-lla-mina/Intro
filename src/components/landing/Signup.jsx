import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Code2, HeartPulse, LineChart, ChefHat, Sprout, Palette, Wrench, BookOpen, Scale, Microscope,
  School, Compass, HardHat, GraduationCap, Award, Sparkles, Minus, Plus, ArrowLeft, Check, MailCheck, Loader2,
} from 'lucide-react';
import logo from '../../assets/hilight.jpg';

const FONT = "'Outfit', sans-serif";

const FIELDS = [
  { name: 'Tech', icon: Code2 }, { name: 'Health', icon: HeartPulse }, { name: 'Business', icon: LineChart },
  { name: 'Culinary Arts', icon: ChefHat }, { name: 'Agriculture', icon: Sprout }, { name: 'Creative Arts', icon: Palette },
  { name: 'Trades', icon: Wrench }, { name: 'Education', icon: BookOpen }, { name: 'Law', icon: Scale }, { name: 'Science', icon: Microscope },
];
const STUDY = [
  { id: 'highschool', label: 'High school', icon: School },
  { id: 'gap', label: 'Gap year', icon: Compass },
  { id: 'tvet', label: 'Vocational / TVET', icon: HardHat },
  { id: 'undergrad', label: 'Undergraduate', icon: GraduationCap },
  { id: 'postgrad', label: 'Postgraduate', icon: Award },
  { id: 'other', label: 'Other', icon: Sparkles },
];

const inputCls = "w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#115D98] focus:ring-2 focus:ring-[#115D98]/10 outline-none text-slate-800 text-sm font-normal transition-all bg-slate-50/50";
const labelCls = "text-xs font-bold text-slate-700 uppercase tracking-wider";
const errCls = "text-xs font-bold text-red-500";
const primaryBtn = "w-full bg-[#115D98] hover:bg-[#0d4a7d] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-[#115D98]/10 disabled:opacity-70";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
@keyframes hi-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hi-fall { 0% { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; } 8% { opacity: 1; } 100% { transform: translate3d(var(--dx),110vh,0) rotate(720deg); opacity: 1; } }
@keyframes hi-rise { 0% { transform: translateY(0) scale(.9); opacity: 0; } 10% { opacity: .95; } 100% { transform: translateY(-125vh) scale(1.05); opacity: .95; } }
@keyframes hi-ring { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.9); opacity: 0; } }
@keyframes hi-pop { to { transform: scale(1.6); opacity: 0; } }
@keyframes hi-bounce { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .hi-confetti, .hi-bubble, .hi-ring { animation: none !important; } .hi-confetti { display: none; } }
`;

const Celebration = () => {
  const [popped, setPopped] = useState([]);
  const confetti = useMemo(() => Array.from({ length: 44 }, (_, i) => ({
    id: i, left: Math.random() * 100, dx: (Math.random() - 0.5) * 180,
    delay: Math.random() * 4, duration: 4 + Math.random() * 3, size: 6 + Math.random() * 9,
    color: ['#FFFFFF', '#9CC3E3', '#4D8FBF', '#DCEBF7', '#6FA8D6'][i % 5], round: i % 3 === 0,
  })), []);
  const bubbles = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i, left: 2 + Math.random() * 92, size: 40 + Math.random() * 56,
    delay: Math.random() * 6, duration: 9 + Math.random() * 7,
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {confetti.map((c) => (
        <span key={c.id} className="hi-confetti absolute top-0 block"
          style={{ left: `${c.left}%`, width: c.size, height: c.size * (c.round ? 1 : 0.45), background: c.color, borderRadius: c.round ? '9999px' : '2px', '--dx': `${c.dx}px`, animation: `hi-fall ${c.duration}s linear ${c.delay}s infinite` }} />
      ))}
      {bubbles.map((b) => (
        <button key={b.id} type="button" tabIndex={-1} onClick={() => setPopped((p) => [...p, b.id])}
          className="hi-bubble absolute cursor-pointer rounded-full border border-white/50 shadow-inner"
          style={{
            left: `${b.left}%`, bottom: -120, width: b.size, height: b.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.75), rgba(255,255,255,.18) 55%, rgba(255,255,255,.08))',
            animation: popped.includes(b.id) ? 'hi-pop .25s ease-out forwards' : `hi-rise ${b.duration}s ease-in-out ${b.delay}s infinite`,
            pointerEvents: popped.includes(b.id) ? 'none' : 'auto',
          }} />
      ))}
    </div>
  );
};

/* Full-page success screen, rendered in a portal so it covers the whole Auth layout */
const Welcome = ({ firstName, profile, studyLabel, onContinue }) => createPortal(
  <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-6 text-center text-white"
    style={{ fontFamily: FONT, background: 'linear-gradient(135deg, #115D98 0%, #0B2A45 100%)', animation: 'hi-fade .5s ease-out' }}>
    <style>{CSS}</style>
    <div className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#4D8FBF]/30 blur-3xl" />
    <Celebration />

    <div className="relative z-20 flex max-w-xl flex-col items-center">
      <div className="mb-10 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-xl"><img src={logo} alt="" className="h-8 w-auto object-contain" /></span>
        <span className="text-xl font-extrabold tracking-tight">HerIngress.</span>
      </div>

      <div className="relative mb-8 h-24 w-24">
        <span className="hi-ring absolute inset-0 rounded-full bg-white" style={{ animation: 'hi-ring 2s ease-out infinite' }} />
        <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white shadow-2xl" style={{ animation: 'hi-bounce .6s ease-out' }}>
          <Check className="h-12 w-12 text-[#115D98]" strokeWidth={3.2} />
        </span>
      </div>

      <h1 className="text-5xl font-bold tracking-tight md:text-7xl">{`You're in, ${firstName}!`}</h1>
      <p className="mt-4 max-w-md text-base font-light text-white/80 md:text-lg">Your account is ready. Opportunities, roadmaps and a community of girls like you are waiting.</p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {profile.fields.map((f) => <span key={f} className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">{f}</span>)}
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">{studyLabel}</span>
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">{profile.age} years old</span>
      </div>

      <button onClick={onContinue} className="mt-10 rounded-2xl bg-white px-12 py-4 text-sm font-bold tracking-wide text-[#115D98] shadow-xl shadow-black/20 transition-transform hover:scale-105 active:scale-95">
        CONTINUE TO LOGIN
      </button>
      <p className="mt-5 text-xs font-light text-white/60">Tip: tap the bubbles to pop them.</p>
    </div>
  </div>,
  document.body
);

const SignUp = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [code, setCode] = useState(Array(6).fill(''));
  const [codeError, setCodeError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(30);
  const [resent, setResent] = useState(false);
  const [profile, setProfile] = useState({ fields: [], age: 16, study: '' });
  const inputs = useRef([]);
  const timer = useRef(null);

  const go = (n) => { setErrors({}); setStep(n); };
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (step !== 2 || resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendIn]);

  const submitAccount = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email address.';
    if (form.password.length < 8) er.password = 'Use at least 8 characters.';
    if (form.confirm !== form.password || !form.confirm) er.confirm = 'Passwords do not match.';
    if (!form.terms) er.terms = 'Please accept the terms to continue.';
    setErrors(er);
    if (Object.keys(er).length === 0) { setResendIn(30); setResent(false); setCode(Array(6).fill('')); setCodeError(''); go(2); }
  };

  // Mock verification: any complete 6-digit code passes. Replace with a real API call later.
  const verifyWith = (digits) => {
    if (digits.join('').length < 6) { setCodeError('Enter all 6 digits.'); return; }
    setVerifying(true);
    timer.current = setTimeout(() => { setVerifying(false); go(3); }, 800);
  };
  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = [...code]; next[i] = d; setCode(next); setCodeError(''); setResent(false);
    if (d && i < 5) inputs.current[i + 1]?.focus();
    if (next.every(Boolean)) verifyWith(next);
  };
  const onKey = (i, e) => { if (e.key === 'Backspace' && !code[i] && i > 0) inputs.current[i - 1]?.focus(); };
  const onPaste = (e) => {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!t) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => t[i] || '');
    setCode(next); setCodeError('');
    inputs.current[Math.min(t.length, 5)]?.focus();
    if (next.every(Boolean)) verifyWith(next);
  };
  const resend = () => { setCode(Array(6).fill('')); setCodeError(''); setResent(true); setResendIn(30); inputs.current[0]?.focus(); };

  const toggleField = (f) => setProfile((p) => ({
    ...p,
    fields: p.fields.includes(f) ? p.fields.filter((x) => x !== f) : p.fields.length < 3 ? [...p.fields, f] : p.fields,
  }));
  const setAge = (n) => setProfile((p) => ({ ...p, age: Math.min(35, Math.max(10, Number(n) || 10)) }));
  const finish = (e) => {
    e.preventDefault();
    const er = {};
    if (!profile.fields.length) er.fields = 'Pick at least one field.';
    if (!profile.study) er.study = 'Choose where you are in your studies.';
    setErrors(er);
    if (Object.keys(er).length === 0) go(4);
  };

  const firstName = form.name.trim().split(' ')[0] || 'friend';
  const studyLabel = STUDY.find((s) => s.id === profile.study)?.label;

  if (step === 4) return <Welcome firstName={firstName} profile={profile} studyLabel={studyLabel} onContinue={onSwitchToLogin} />;

  return (
    <div className="w-full" style={{ fontFamily: FONT }}>
      <style>{CSS}</style>

      {/* Minimal progress: no labels, just a slim animated line */}
      <div className="mb-8 flex gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className="relative h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
            <span className="absolute inset-y-0 left-0 rounded-full bg-[#115D98] transition-all duration-500 ease-out" style={{ width: n <= step ? '100%' : '0%' }} />
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22, ease: 'easeOut' }}>

          {/* ---------- Step 1: account ---------- */}
          {step === 1 && (
            <div>
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create an Account.</h1>
                <p className="text-slate-400 font-medium text-sm mt-2">Start your journey toward digital excellence.</p>
              </div>

              <form onSubmit={submitAccount} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Name</label>
                  <input type="text" placeholder="Full Name." value={form.name} onChange={update('name')} className={inputCls} />
                  {errors.name && <p className={errCls}>{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Email address</label>
                  <input type="email" placeholder="Email Address." value={form.email} onChange={update('email')} className={inputCls} />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Password</label>
                  <input type="password" placeholder="Create a password." value={form.password} onChange={update('password')} className={inputCls} />
                  {errors.password && <p className={errCls}>{errors.password}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Confirm password</label>
                  <input type="password" placeholder="Confirm your password" value={form.confirm} onChange={update('confirm')} className={inputCls} />
                  {errors.confirm && <p className={errCls}>{errors.confirm}</p>}
                </div>
                <div>
                  <div className="flex items-start gap-3 py-1">
                    <input type="checkbox" id="terms" checked={form.terms} onChange={update('terms')}
                      className="w-4 h-4 mt-0.5 rounded text-[#115D98] focus:ring-[#115D98] border-slate-300 accent-[#115D98]" />
                    <label htmlFor="terms" className="text-xs font-bold text-slate-500 cursor-pointer select-none leading-relaxed">
                      I agree to the <a href="#" className="text-[#115D98] hover:underline">Terms of Service</a> and <a href="#" className="text-[#115D98] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && <p className={`${errCls} mt-1`}>{errors.terms}</p>}
                </div>
                <button type="submit" className="w-full bg-[#115D98] hover:bg-[#0d4a7d] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-[#115D98]/10 mt-1">
                  SIGN UP
                </button>
              </form>

              <div className="flex justify-center mt-6">
                <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer" className="flex w-full max-w-xs items-center justify-center gap-2.5 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.41 3.66 1.49 7.54l3.78 2.93c.89-2.67 3.39-4.43 6.73-4.43z"/>
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.97h3.91c2.28-2.1 3.54-5.19 3.54-8.69z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.91-2.97c-1.08.72-2.48 1.16-4.05 1.16-3.34 0-5.84-2.25-6.85-5.27l-3.83 2.96C3.33 20.25 7.29 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.15 13.01c-.26-.77-.41-1.6-.41-2.46s.15-1.69.41-2.46L1.37 3.16C.49 4.92 0 6.9 0 9s.49 4.08 1.37 5.84l3.78-2.83z"/>
                  </svg>
                  Google
                </a>
              </div>

              <p className="text-center text-xs font-bold text-slate-500 mt-8">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="text-[#115D98] hover:underline ml-1 font-extrabold">Sign in here</button>
              </p>
            </div>
          )}

          {/* ---------- Step 2: verification ---------- */}
          {step === 2 && (
            <div>
              <button type="button" onClick={() => go(1)} className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-[#115D98]"><ArrowLeft size={14} /> Back</button>
              <div className="mb-8 text-center lg:text-left">
                <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#115D98]/10 text-[#115D98] lg:mx-0"><MailCheck size={26} /></span>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Check your inbox.</h1>
                <p className="text-slate-400 font-medium text-sm mt-2">Enter the 6-digit code we sent to <span className="font-bold text-slate-700">{form.email}</span>.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); verifyWith(code); }} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2 sm:gap-3" onPaste={onPaste}>
                    {code.map((d, i) => (
                      <input key={i} ref={(el) => (inputs.current[i] = el)} value={d} inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`}
                        autoFocus={i === 0} disabled={verifying} onChange={(e) => setDigit(i, e.target.value)} onKeyDown={(e) => onKey(i, e)}
                        className={`h-14 w-full min-w-0 rounded-2xl border-2 text-center text-xl font-bold text-slate-800 outline-none transition-all focus:border-[#115D98] focus:ring-4 focus:ring-[#115D98]/10 sm:h-16 ${d ? 'border-[#115D98]/40 bg-[#115D98]/5' : 'border-slate-200 bg-slate-50/50'}`} />
                    ))}
                  </div>
                  {codeError && <p className={errCls}>{codeError}</p>}
                  {resent && !codeError && <p className="text-xs font-bold text-[#115D98]">A new code has been sent.</p>}
                </div>
                <button type="submit" disabled={verifying} className={`${primaryBtn} inline-flex items-center justify-center gap-2`}>
                  {verifying ? <><Loader2 size={16} className="animate-spin" /> VERIFYING</> : 'VERIFY'}
                </button>
              </form>

              <p className="text-center text-xs font-bold text-slate-500 mt-6">
                Did not get a code?{' '}
                {resendIn > 0
                  ? <span className="text-slate-400">Resend in {resendIn}s</span>
                  : <button onClick={resend} className="text-[#115D98] hover:underline font-extrabold">Resend code</button>}
              </p>
            </div>
          )}

          {/* ---------- Step 3: get to know you ---------- */}
          {step === 3 && (
            <div>
              <div className="mb-7 text-center lg:text-left">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{`Let's get to know you.`}</h1>
                <p className="text-slate-400 font-medium text-sm mt-2">A few quick taps so we can show opportunities that fit you.</p>
              </div>

              <form onSubmit={finish} noValidate className="flex flex-col gap-7">
                {/* Fields */}
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-800">What excites you?</h2>
                    <span className="rounded-full bg-[#115D98]/10 px-2.5 py-0.5 text-xs font-bold text-[#115D98]">{profile.fields.length}/3</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {FIELDS.map(({ name, icon: Icon }) => {
                      const on = profile.fields.includes(name);
                      return (
                        <motion.button key={name} type="button" whileTap={{ scale: 0.95 }} onClick={() => toggleField(name)} aria-pressed={on}
                          className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3 text-center transition-colors ${on ? 'border-[#115D98] bg-[#115D98]/5' : 'border-slate-100 bg-slate-50/60 hover:border-[#115D98]/30'}`}>
                          <span className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${on ? 'bg-[#115D98] text-white' : 'bg-white text-[#0B2A45] shadow-sm'}`}><Icon size={18} /></span>
                          <span className={`text-[11px] font-semibold leading-tight ${on ? 'text-[#115D98]' : 'text-slate-600'}`}>{name}</span>
                          {on && <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#115D98] text-white"><Check size={10} strokeWidth={3.5} /></span>}
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.fields && <p className={`${errCls} mt-2`}>{errors.fields}</p>}
                </section>

                {/* Age */}
                <section>
                  <h2 className="mb-3 text-sm font-bold text-slate-800">How old are you?</h2>
                  <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4">
                    <div className="flex items-center justify-between">
                      <button type="button" onClick={() => setAge(profile.age - 1)} aria-label="Decrease age" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0B2A45] shadow-sm transition-transform hover:scale-105 active:scale-95"><Minus size={18} /></button>
                      <div className="text-center"><p className="text-4xl font-bold tabular-nums text-[#115D98]">{profile.age}</p><p className="text-xs font-medium text-slate-400">years old</p></div>
                      <button type="button" onClick={() => setAge(profile.age + 1)} aria-label="Increase age" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0B2A45] shadow-sm transition-transform hover:scale-105 active:scale-95"><Plus size={18} /></button>
                    </div>
                    <input type="range" min="10" max="35" value={profile.age} onChange={(e) => setAge(e.target.value)} aria-label="Age" className="mt-4 w-full accent-[#115D98]" />
                  </div>
                </section>

                {/* Study */}
                <section>
                  <h2 className="mb-3 text-sm font-bold text-slate-800">Where are you in your studies?</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDY.map(({ id, label, icon: Icon }) => {
                      const on = profile.study === id;
                      return (
                        <motion.button key={id} type="button" whileTap={{ scale: 0.97 }} onClick={() => setProfile({ ...profile, study: id })} aria-pressed={on}
                          className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left transition-colors ${on ? 'border-[#115D98] bg-[#115D98]/5' : 'border-slate-100 bg-slate-50/60 hover:border-[#115D98]/30'}`}>
                          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${on ? 'bg-[#115D98] text-white' : 'bg-white text-[#0B2A45] shadow-sm'}`}><Icon size={18} /></span>
                          <span className={`text-xs font-semibold leading-tight ${on ? 'text-[#115D98]' : 'text-slate-600'}`}>{label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.study && <p className={`${errCls} mt-2`}>{errors.study}</p>}
                </section>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => go(2)} aria-label="Back" className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"><ArrowLeft size={18} /></button>
                  <button type="submit" className={primaryBtn}>FINISH</button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignUp;