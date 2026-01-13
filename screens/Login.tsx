
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (pwd: string) => boolean;
  t: any;
}

const Login: React.FC<LoginProps> = ({ onLogin, t }) => {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(pwd)) {
      // success
    } else {
      setError(true);
      setPwd('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="glass-panel w-full max-w-sm p-10 flex flex-col items-center bg-white/10 border-white/5">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl mb-6 shadow-2xl border-4 border-white/20 animate-pulse">🔑</div>
        <h2 className="text-2xl font-black mb-1 text-white tracking-tight">{t.appName}</h2>
        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-10">{t.enterPassword}</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <input 
              type={showPwd ? "text" : "password"}
              autoFocus
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setError(false);
              }}
              className={`w-full p-6 bg-white/5 rounded-3xl border-none outline-none focus:ring-2 focus:ring-primary text-center font-black text-3xl tracking-widest text-white placeholder-white/10 ${error ? 'animate-shake' : ''}`}
            />
            <button 
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-xl opacity-30 hover:opacity-100 transition-opacity"
            >
              {showPwd ? '👁️' : '🙈'}
            </button>
          </div>
          {error && <p className="text-rose-500 text-xs font-black text-center uppercase tracking-widest">Incorrect Access Pin</p>}
          
          <button 
            type="submit"
            className="w-full bg-primary text-white py-6 rounded-3xl font-black text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform uppercase tracking-widest"
          >
            {t.unlock}
          </button>
        </form>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .animate-shake { animation: shake 0.15s ease-in-out 0s 2; }
        `}</style>
      </div>
    </div>
  );
};

export default Login;
