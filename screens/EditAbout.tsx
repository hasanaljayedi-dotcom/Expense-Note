
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../types';

interface EditAboutProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const EditAbout: React.FC<EditAboutProps> = ({ appState, setAppState, t }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(appState.aboutInfo.name);
  const [desc, setDesc] = useState(appState.aboutInfo.description);

  const handleSave = () => {
    setAppState(prev => ({
      ...prev,
      aboutInfo: { name, description: desc }
    }));
    navigate('/settings');
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/settings')} className="mr-4 text-2xl">←</button>
        <h2 className="text-2xl font-bold">{t.editAbout}</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase opacity-40 ml-1">{t.name}</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase opacity-40 ml-1">{t.description}</label>
          <textarea 
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <button onClick={handleSave} className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-lg shadow-primary/20">
          {t.save}
        </button>
      </div>
    </div>
  );
};

export default EditAbout;
