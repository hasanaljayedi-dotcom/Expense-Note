
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../types';
import { DEFAULT_SOURCES } from '../constants';

interface DashboardProps {
  appState: AppState;
  totals: { income: number; expense: number; balance: number };
  t: any;
  setIsAuthenticated: (val: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ appState, totals, t, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toLocaleNum = (num: number | string) => {
    if (appState.language === 'en') return num.toString();
    const targetNums = appState.language === 'bn' 
      ? ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      : ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, (d) => targetNums[parseInt(d)]);
  };

  const getLocalizedDateTime = () => {
    let locale = 'en-US';
    if (appState.language === 'bn') locale = 'bn-BD';
    if (appState.language === 'ar') locale = 'ar-SA';
    
    let fullLocale = locale;
    if (appState.language === 'ar') fullLocale += '-u-ca-islamic-uma';
    if (appState.language === 'bn') fullLocale += '-u-ca-beng';

    const timeStr = new Intl.DateTimeFormat(locale, {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }).format(currentTime);

    const dateStr = new Intl.DateTimeFormat(fullLocale, {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(currentTime);

    const weekdayStr = new Intl.DateTimeFormat(fullLocale, { weekday: 'long' }).format(currentTime);

    return { timeStr, dateStr, weekdayStr };
  };

  const getTxLabel = (tx: any) => {
    if (tx.type === 'income') {
      const allSources = [...DEFAULT_SOURCES, ...appState.customSources];
      const source = allSources.find(s => s.id === tx.categoryOrSourceId);
      return appState.language === 'bn' ? source?.nameBn : source?.nameEn;
    } else {
      const cat = appState.expenseCategories.find(c => c.id === tx.categoryOrSourceId);
      return appState.language === 'bn' ? cat?.nameBn : cat?.nameEn;
    }
  };

  const { timeStr, dateStr, weekdayStr } = getLocalizedDateTime();

  // Scaling Factor from Settings - Applied to all elements now as requested
  const scale = 1 + (appState.uiScale - 50) / 100;

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 pb-36 overflow-x-hidden animate-fade-in" dir={appState.language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. Live Clock & Date - Compact and Scalable */}
      <div className="flex flex-col items-center justify-center py-3 mt-1 space-y-0.5">
        <div 
          className="font-black text-primary tracking-tighter drop-shadow-lg leading-none flex items-center gap-2 transition-all"
          style={{ fontSize: `calc(2.4rem * ${scale})` }}
        >
          <span className="opacity-60" style={{ fontSize: `calc(1.4rem * ${scale})` }}>🕒</span>
          {toLocaleNum(timeStr)}
        </div>
        <div className="flex flex-col items-center opacity-50">
          <p className="font-bold uppercase tracking-widest text-primary" style={{ fontSize: `calc(0.8rem * ${scale})` }}>
            {weekdayStr}
          </p>
          <p className="font-medium" style={{ fontSize: `calc(0.7rem * ${scale})` }}>
            {toLocaleNum(dateStr)}
          </p>
        </div>
      </div>

      {/* 2. Main Balance Card with Metrics and Expandable History */}
      <div className="flex flex-col items-center justify-center relative">
        <div 
          className="absolute inset-0 blur-[60px] opacity-20 pointer-events-none rounded-full scale-125 transition-transform"
          style={{ backgroundColor: appState.themeColor }}
        ></div>
        
        <div className="glass-panel w-full p-6 flex flex-col items-center z-10 border-primary/10">
          <h2 className="font-black uppercase tracking-[0.4em] opacity-40 mb-2" style={{ fontSize: `calc(11px * ${scale})` }}>{t.totalBalance}</h2>
          <div 
            className="font-black text-primary tracking-tighter drop-shadow-2xl text-center leading-tight mb-6"
            style={{ fontSize: `calc(3.5rem * ${scale})` }}
          >
            ৳{toLocaleNum(totals.balance.toLocaleString())}
          </div>
          
          <div className="flex gap-3 w-full mb-4">
            <div className="flex-1 flex flex-col items-center glass-panel px-3 py-4 border-emerald-500/20 bg-emerald-500/5">
              <span className="opacity-50 mb-1 uppercase tracking-tighter font-black" style={{ fontSize: `calc(10px * ${scale})` }}>{t.totalIncome}</span>
              <span className="text-emerald-500 font-black" style={{ fontSize: `calc(1.5rem * ${scale})` }}>
                ৳{toLocaleNum(totals.income.toLocaleString())}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center glass-panel px-3 py-4 border-rose-500/20 bg-rose-500/5">
              <span className="opacity-50 mb-1 uppercase tracking-tighter font-black" style={{ fontSize: `calc(10px * ${scale})` }}>{t.totalExpense}</span>
              <span className="text-rose-500 font-black" style={{ fontSize: `calc(1.5rem * ${scale})` }}>
                ৳{toLocaleNum(totals.expense.toLocaleString())}
              </span>
            </div>
          </div>

          {/* Expandable History Section Toggle */}
          <button 
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="w-full py-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/20 active:scale-95 transition-all group"
          >
            <span className={`transition-transform duration-300 ${isHistoryExpanded ? 'rotate-180' : ''}`} style={{ fontSize: `calc(1.4rem * ${scale})` }}>
              {isHistoryExpanded ? '🔼' : '🔽'}
            </span>
            <span className="font-black uppercase tracking-widest text-primary" style={{ fontSize: `calc(12px * ${scale})` }}>
              {isHistoryExpanded ? t.hide : t.history}
            </span>
          </button>

          {/* Expandable Transaction List */}
          {isHistoryExpanded && (
            <div className="w-full mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1 animate-slide-down">
              {appState.transactions.length === 0 ? (
                <p className="text-center opacity-30 italic py-4" style={{ fontSize: `calc(12px * ${scale})` }}>{t.noTransactions}</p>
              ) : (
                appState.transactions.slice(0, 10).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {tx.type === 'income' ? '↙' : '↗'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold truncate max-w-[100px]" style={{ fontSize: `calc(12px * ${scale})` }}>{getTxLabel(tx)}</span>
                        <span className="text-[8px] opacity-40 font-bold uppercase tracking-tighter">
                          {new Date(tx.date).toLocaleDateString(appState.language === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                    <span className={`font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`} style={{ fontSize: `calc(14px * ${scale})` }}>
                      {tx.type === 'income' ? '+' : '-'}৳{toLocaleNum(tx.amount)}
                    </span>
                  </div>
                ))
              )}
              {appState.transactions.length > 10 && (
                <button onClick={() => navigate('/history')} className="w-full text-center py-2 text-primary font-bold opacity-60 hover:opacity-100" style={{ fontSize: `calc(10px * ${scale})` }}>
                  View All History →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-5 px-1">
        <button onClick={() => navigate('/income')} className="glass-panel p-6 flex flex-col items-center justify-center gap-3 active:scale-95 group hover:border-emerald-500/40 transition-all duration-300 shadow-md">
          <div className="bg-emerald-500/10 text-emerald-500 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-emerald-500/10 group-hover:scale-110 transition-all" 
            style={{ width: `calc(60px * ${scale})`, height: `calc(60px * ${scale})`, fontSize: `calc(2.2rem * ${scale})` }}>
            📥
          </div>
          <span className="font-black uppercase tracking-widest text-emerald-600/80" style={{ fontSize: `calc(0.9rem * ${scale})` }}>{t.addIncome}</span>
        </button>
        <button onClick={() => navigate('/expense')} className="glass-panel p-6 flex flex-col items-center justify-center gap-3 active:scale-95 group hover:border-rose-500/40 transition-all duration-300 shadow-md">
          <div className="bg-rose-500/10 text-rose-500 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-rose-500/10 group-hover:scale-110 transition-all" 
            style={{ width: `calc(60px * ${scale})`, height: `calc(60px * ${scale})`, fontSize: `calc(2.2rem * ${scale})` }}>
            📤
          </div>
          <span className="font-black uppercase tracking-widest text-rose-600/80" style={{ fontSize: `calc(0.9rem * ${scale})` }}>{t.addExpense}</span>
        </button>
      </div>

      {/* Bottom Floating Navigation Bar - Calendar Removed */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass-panel p-2 flex justify-around items-center z-[100] shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-white/20">
        <button className="p-4 text-primary bg-primary/20 rounded-[1.5rem] ring-4 ring-primary/5 transition-all shadow-inner"><span className="text-2xl">🏠</span></button>
        
        {/* Notification Button with Blinking Red Indicator */}
        <button 
          onClick={() => navigate('/weekly-report')} 
          className="p-4 text-slate-400 hover:text-primary transition-all hover:scale-110 rounded-2xl relative"
        >
          <span className="text-2xl">🔔</span>
          {appState.hasUnreadReport && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 border-2 border-white dark:border-black rounded-full animate-blink shadow-[0_0_12px_rgba(244,63,94,1)]"></span>
          )}
        </button>

        <button onClick={() => navigate('/settings')} className="p-4 text-slate-400 hover:text-primary transition-all hover:scale-110 rounded-2xl">
          <span className="text-2xl">⚙️</span>
        </button>
        
        <button onClick={() => setIsAuthenticated(false)} className="p-4 text-slate-400 hover:text-rose-500 transition-all hover:scale-110 rounded-2xl">
          <span className="text-2xl">🔒</span>
        </button>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .animate-blink { animation: blink 0.8s infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
