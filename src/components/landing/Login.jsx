import React from 'react';

const Login = ({ onSwitchToSignUp }) => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome back !</h1>
        <p className="text-slate-400 font-medium text-sm mt-2">Sign in to your HerIngress account to continue...</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email address</label>
          <input 
            type="email" 
            placeholder="name@domain.com"
            className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#115D98] focus:ring-2 focus:ring-[#115D98]/10 outline-none text-slate-800 text-sm font-medium transition-all bg-slate-50/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#115D98] focus:ring-2 focus:ring-[#115D98]/10 outline-none text-slate-800 text-sm font-medium transition-all bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 py-1">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-4 h-4 rounded text-[#115D98] focus:ring-[#115D98] border-slate-300 accent-[#115D98]" 
          />
          <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer select-none">
            Keep me signed in on this device.
          </label>
        </div>

        <button type="submit" className="w-full bg-[#115D98] hover:bg-[#0d4a7d] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-[#115D98]/10 mt-2">
          SIGN IN
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.41 3.66 1.49 7.54l3.78 2.93c.89-2.67 3.39-4.43 6.73-4.43z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.97h3.91c2.28-2.1 3.54-5.19 3.54-8.69z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.91-2.97c-1.08.72-2.48 1.16-4.05 1.16-3.34 0-5.84-2.25-6.85-5.27l-3.83 2.96C3.33 20.25 7.29 23 12 23z"/>
            <path fill="#FBBC05" d="M5.15 13.01c-.26-.77-.41-1.6-.41-2.46s.15-1.69.41-2.46L1.37 3.16C.49 4.92 0 6.9 0 9s.49 4.08 1.37 5.84l3.78-2.83z"/>
          </svg>
          Google
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600">
          <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064 0 .925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      <p className="text-center text-xs font-bold text-slate-500 mt-8">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp} className="text-[#115D98] hover:underline ml-1 font-extrabold">
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default Login;