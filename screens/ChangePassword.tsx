
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../types';

interface ChangePasswordProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ appState, setAppState, t }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = () => {
    if (current !== appState.password) return setError(t.incorrectPassword);
    if (newPwd.length < 4) return setError('Min 4 chars');
    if (newPwd !== confirm) return setError(t.passwordMismatch);

    setAppState(prev => ({ ...prev, password: newPwd }));
    alert(t.passwordChanged);
    navigate('/settings');
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/settings')} className="mr-4 text-2xl">←</button>
        <h2 className="text-2xl font-bold">{t.changePassword}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase opacity-40 ml-1">{t.currentPassword}</label>
          <input 
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase opacity-40 ml-1">{t.newPassword}</label>
          <input 
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase opacity-40 ml-1">{t.confirmPassword}</label>
          <input 
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {error && <p className="text-rose-500 text-xs text-center font-bold">{error}</p>}
        <button onClick={handleUpdate} className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-lg shadow-primary/20 mt-4">
          {t.save}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
