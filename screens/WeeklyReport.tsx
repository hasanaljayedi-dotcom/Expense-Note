
import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, Transaction } from '../types';
import { DEFAULT_SOURCES } from '../constants';

interface WeeklyReportProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ appState, setAppState, t }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mark as read when opening
    setAppState(prev => ({ ...prev, hasUnreadReport: false }));
  }, [setAppState]);

  const reportData = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyTransactions = appState.transactions.filter(tx => new Date(tx.date) >= sevenDaysAgo);
    
    const expenses = weeklyTransactions.filter(tx => tx.type === 'expense');
    const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

    const incomes = weeklyTransactions.filter(tx => tx.type === 'income');
    const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);

    // Group by category
    const catTotals: Record<string, number> = {};
    expenses.forEach(tx => {
      catTotals[tx.categoryOrSourceId] = (catTotals[tx.categoryOrSourceId] || 0) + tx.amount;
    });

    // Group by source (Who gave money)
    const sourceTotals: Record<string, number> = {};
    incomes.forEach(tx => {
      sourceTotals[tx.categoryOrSourceId] = (sourceTotals[tx.categoryOrSourceId] || 0) + tx.amount;
    });

    return { totalExpense, totalIncome, catTotals, sourceTotals };
  }, [appState.transactions]);

  const toLocaleNum = (num: number | string) => {
    if (appState.language === 'en') return num.toString();
    const targetNums = appState.language === 'bn' 
      ? ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      : ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, (d) => targetNums[parseInt(d)]);
  };

  const getLocalizedName = (item: any) => {
    if (appState.language === 'ar') return item.nameAr || item.nameEn;
    if (appState.language === 'bn') return item.nameBn;
    return item.nameEn;
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 pb-28 animate-fade-in" dir={appState.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => navigate('/')} 
          className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg border-white/20 active:scale-90 transition-all hover:bg-white/10"
        >
          {appState.language === 'ar' ? '→' : '←'}
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.weeklyReport}</h2>
      </div>

      <div className="glass-panel p-8 text-center bg-primary/5 border-primary/20 shadow-xl">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">{t.last7Days}</h3>
        <div className="text-4xl font-black text-rose-500 tracking-tighter mb-4 drop-shadow-md">
          - ৳{toLocaleNum(reportData.totalExpense.toLocaleString())}
        </div>
        <div className="text-sm font-bold opacity-60">
          {t.totalIncome}: <span className="text-emerald-500">৳{toLocaleNum(reportData.totalIncome.toLocaleString())}</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Who Gave Money Section */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 px-2 flex items-center gap-2">
            <span>💰</span> {t.incomeBreakdown}
          </h4>
          <div className="space-y-3">
            {Object.keys(reportData.sourceTotals).length === 0 ? (
              <p className="text-center opacity-30 italic text-sm py-4">{t.noTransactions}</p>
            ) : (
              Object.entries(reportData.sourceTotals).map(([id, amount]) => {
                const source = [...DEFAULT_SOURCES, ...appState.customSources].find(s => s.id === id);
                return (
                  <div key={id} className="glass-panel p-4 flex justify-between items-center hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform">{source?.icon || '💰'}</span>
                      <span className="font-bold">{source ? getLocalizedName(source) : '???'}</span>
                    </div>
                    <span className="font-black text-emerald-500 text-lg">৳{toLocaleNum(amount.toLocaleString())}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Expense Breakdown Section */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 px-2 flex items-center gap-2">
            <span>💸</span> {t.expenseBreakdown}
          </h4>
          <div className="space-y-3">
            {Object.keys(reportData.catTotals).length === 0 ? (
              <p className="text-center opacity-30 italic text-sm py-4">{t.noTransactions}</p>
            ) : (
              Object.entries(reportData.catTotals).map(([id, amount]) => {
                const cat = appState.expenseCategories.find(c => c.id === id);
                return (
                  <div key={id} className="glass-panel p-4 flex justify-between items-center hover:bg-rose-500/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform">{cat?.icon || '💸'}</span>
                      <span className="font-bold">{cat ? getLocalizedName(cat) : '???'}</span>
                    </div>
                    <span className="font-black text-rose-500 text-lg">৳{toLocaleNum(amount.toLocaleString())}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="w-full glass-panel py-5 rounded-[2.5rem] bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 hover:brightness-110 transition-all mt-4"
      >
        {t.close}
      </button>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default WeeklyReport;
