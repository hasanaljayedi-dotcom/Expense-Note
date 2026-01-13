
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, IncomeSource, Transaction } from '../types';
import { DEFAULT_SOURCES } from '../constants';

interface IncomeEntryProps {
  appState: AppState;
  onAdd: (tx: Transaction) => void;
  t: any;
}

const IncomeEntry: React.FC<IncomeEntryProps> = ({ appState, onAdd, t }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [sourceId, setSourceId] = useState('father');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));

  const allSources = [...DEFAULT_SOURCES, ...appState.customSources].filter(s => !appState.hiddenSourceIds.includes(s.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !sourceId) return alert(t.errorEmpty);

    const tx: Transaction = {
      id: Date.now().toString(),
      type: 'income',
      amount: parseFloat(amount),
      categoryOrSourceId: sourceId,
      date: new Date(date).toISOString(),
      note,
    };
    onAdd(tx);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-smooth animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg border-white/20 active:scale-90"
        >
          ←
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.addIncome}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-panel p-6 bg-emerald-500/5 border-emerald-500/10">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">{t.amount}</label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl font-black text-emerald-500">৳</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full text-5xl font-black bg-transparent pl-8 pr-2 py-4 focus:outline-none placeholder-emerald-500/20 text-emerald-600 tracking-tighter"
              autoFocus
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 ml-2">{t.source}</label>
          <div className="grid grid-cols-3 gap-4">
            {allSources.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSourceId(s.id)}
                className={`flex flex-col items-center p-4 rounded-3xl border transition-all duration-300 active:scale-95 ${sourceId === s.id ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10 scale-105' : 'glass-panel border-white/10 opacity-70 hover:opacity-100'}`}
              >
                <span className="text-3xl mb-2">{s.icon}</span>
                <span className="text-[10px] font-black text-center truncate w-full uppercase tracking-tighter">
                  {appState.language === 'bn' ? s.nameBn : s.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="glass-panel p-5 bg-white/5">
            <label className="block text-[9px] font-black uppercase tracking-widest opacity-40 mb-3">{t.date}</label>
            <input 
              type="datetime-local" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-bold text-sm outline-none border-b border-primary/10 focus:border-primary transition-colors"
            />
          </div>

          <div className="glass-panel p-5 bg-white/5">
            <label className="block text-[9px] font-black uppercase tracking-widest opacity-40 mb-3">{t.note}</label>
            <input 
              type="text" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.note}
              className="w-full bg-transparent font-bold text-sm outline-none border-b border-primary/10 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-emerald-500 text-white py-6 rounded-[2.5rem] font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-[0.97] transition-all uppercase tracking-widest"
          >
            {t.save}
          </button>
        </div>
      </form>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default IncomeEntry;
