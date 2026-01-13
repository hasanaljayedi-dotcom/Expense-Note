
import React, { useState } from 'react';

interface SetupPasswordProps {
  onComplete: (pwd: string) => void;
  t: any;
}

const SetupPassword: React.FC<SetupPasswordProps> = ({ onComplete, t }) => {
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSave = () => {
    if (pwd.length < 4) return setError('Minimum 4 characters required');
    if (pwd !== confirm) return setError(t.passwordMismatch);
    onComplete(pwd);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="glass-panel w-full max-w-sm p-10 flex flex-col items-center bg-white/10 border-white/5">
        <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-4xl mb-6 border border-white/10">🛡️</div>
        <h2 className="text-2xl font-black mb-2 text-white tracking-tight">{t.setupPassword}</h2>
        <p className="text-white/40 text-[10px] mb-10 text-center leading-relaxed uppercase tracking-widest">Protect your financial privacy with a secure pin.</p>

        <div className="w-full space-y-4">
          <div className="relative">
            <input 
              type={showPwd ? "text" : "password"}
              placeholder={t.enterPassword}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full p-5 bg-white/5 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary text-center font-black text-xl tracking-widest text-white"
            />
            <button 
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xl opacity-30"
            >
              {showPwd ? '👁️' : '🙈'}
            </button>
          </div>
          <input 
            type={showPwd ? "text" : "password"}
            placeholder={t.confirmPassword}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-5 bg-white/5 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary text-center font-black text-xl tracking-widest text-white"
          />
          {error && <p className="text-rose-500 text-[10px] font-black text-center uppercase tracking-widest">{error}</p>}
          
          <button 
            onClick={handleSave}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform mt-6 uppercase tracking-widest"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPassword;
