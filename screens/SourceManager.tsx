
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, IncomeSource } from '../types';
import { DEFAULT_SOURCES } from '../constants';

interface SourceManagerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const SourceManager: React.FC<SourceManagerProps> = ({ 
  appState, setAppState, t 
}) => {
  const navigate = useNavigate();
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceIcon, setNewSourceIcon] = useState('💰');
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    if (!newSourceName) return;
    // Fix: Add missing required property 'nameAr' for IncomeSource
    const source: IncomeSource = {
      id: 'custom_' + Date.now(),
      nameEn: newSourceName,
      nameBn: newSourceName,
      nameAr: newSourceName,
      icon: newSourceIcon,
      isCustom: true,
      isHidden: false
    };
    setAppState(prev => ({
      ...prev,
      customSources: [...prev.customSources, source]
    }));
    setNewSourceName('');
    setShowAdd(false);
  };

  const toggleSourceVisibility = (id: string) => {
    setAppState(prev => {
      const isHidden = prev.hiddenSourceIds.includes(id);
      return {
        ...prev,
        hiddenSourceIds: isHidden 
          ? prev.hiddenSourceIds.filter(hid => hid !== id)
          : [...prev.hiddenSourceIds, id]
      };
    });
  };

  const deleteCustomSource = (id: string) => {
    setAppState(prev => ({
      ...prev,
      customSources: prev.customSources.filter(s => s.id !== id)
    }));
  };

  const icons = ['💰', '💼', '💳', '🎁', '🏦', '💹', '🛠️', '👨‍👩‍👧‍👦'];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg border-white/20 active:scale-90"
        >
          ←
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.manageSources}</h2>
      </div>

      <div className="space-y-6">
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="w-full glass-panel bg-primary text-white py-4 rounded-[2rem] font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>{showAdd ? '×' : '+'}</span>
          {t.addCustomSource}
        </button>

        {showAdd && (
          <div className="glass-panel p-6 shadow-xl space-y-4 border-primary/20 animate-in slide-in-from-top-4">
            <input 
              type="text"
              placeholder={t.sourceName}
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              className="w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary dark:text-white font-bold"
            />
            <div className="flex flex-wrap gap-3 justify-center">
              {icons.map(icon => (
                <button 
                  key={icon}
                  onClick={() => setNewSourceIcon(icon)}
                  className={`text-2xl p-3 rounded-2xl transition-all ${newSourceIcon === icon ? 'bg-primary/20 border-2 border-primary scale-110 shadow-lg' : 'bg-white/5 border border-white/10'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <button 
              onClick={handleAdd}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black active:scale-95 transition-transform shadow-lg shadow-primary/20"
            >
              {t.save}
            </button>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">Active Sources</p>
          {[...DEFAULT_SOURCES, ...appState.customSources].map(s => {
            const isHidden = appState.hiddenSourceIds.includes(s.id);
            return (
              <div key={s.id} className={`glass-panel p-4 flex items-center justify-between ${isHidden ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-3xl shrink-0">{s.icon}</span>
                  <div className="overflow-hidden">
                    <p className="font-black text-sm tracking-tight truncate">{appState.language === 'bn' ? s.nameBn : s.nameEn}</p>
                    <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">{s.isCustom ? 'Custom' : 'System'}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => toggleSourceVisibility(s.id)}
                    className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest transition-colors ${isHidden ? 'bg-primary text-white' : 'bg-white/10 text-slate-500'}`}
                  >
                    {isHidden ? t.show : t.hide}
                  </button>
                  {s.isCustom && (
                    <button 
                      onClick={() => deleteCustomSource(s.id)}
                      className="text-[9px] px-3 py-1 bg-rose-500/10 text-rose-500 rounded-full font-black uppercase tracking-widest"
                    >
                      {t.delete}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SourceManager;
