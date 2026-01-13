
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../types';
import { DEFAULT_SOURCES } from '../constants';

interface HistoryProps {
  appState: AppState;
  onDelete: (id: string) => void;
  t: any;
}

const History: React.FC<HistoryProps> = ({ appState, onDelete, t }) => {
  const navigate = useNavigate();

  const getLabel = (tx: any) => {
    if (tx.type === 'income') {
      const allSources = [...DEFAULT_SOURCES, ...appState.customSources];
      const source = allSources.find(s => s.id === tx.categoryOrSourceId);
      return appState.language === 'bn' ? source?.nameBn : source?.nameEn;
    } else {
      const cat = appState.expenseCategories.find(c => c.id === tx.categoryOrSourceId);
      return appState.language === 'bn' ? cat?.nameBn : cat?.nameEn;
    }
  };

  const toLocaleNum = (num: number | string) => {
    if (appState.language !== 'bn') return num.toString();
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bnNums[parseInt(d)]);
  };

  return (
    <div className="flex-1 flex flex-col p-6 pb-24 overflow-y-auto scroll-smooth animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg border-white/20 active:scale-90"
        >
          ←
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.history}</h2>
      </div>

      <div className="space-y-4">
        {appState.transactions.length === 0 ? (
          <div className="glass-panel p-20 text-center opacity-30 border-dashed">
            <span className="text-4xl block mb-2">🏜️</span>
            <p className="font-bold">{t.noTransactions}</p>
          </div>
        ) : (
          appState.transactions.map(tx => (
            <div key={tx.id} className="glass-panel p-5 flex items-center group active:scale-[0.98] transition-transform">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 text-2xl shadow-inner ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {tx.type === 'income' ? '↙' : '↗'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-black truncate text-sm tracking-tight">{getLabel(tx)}</p>
                <p className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">
                  {new Date(tx.date).toLocaleDateString(appState.language === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {tx.note && <p className="text-[11px] opacity-60 italic mt-1 truncate border-l-2 border-primary/20 pl-2">{tx.note}</p>}
              </div>
              <div className="flex flex-col items-end gap-2 ml-2">
                <span className={`font-black text-lg tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {tx.type === 'income' ? '+' : '-'} ৳{toLocaleNum(tx.amount.toLocaleString())}
                </span>
                <button 
                  onClick={() => {
                    if (confirm('Delete this transaction?')) onDelete(tx.id);
                  }}
                  className="text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default History;
