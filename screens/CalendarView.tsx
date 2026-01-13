
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../types';

interface CalendarViewProps {
  appState: AppState;
  t: any;
}

type ViewMode = 'overview' | 'full_english' | 'full_bangla' | 'full_hijri';

const CalendarView: React.FC<CalendarViewProps> = ({ appState, t }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const today = new Date();
  const isBN = appState.language === 'bn';

  const toLocaleNum = (num: number | string) => {
    if (!isBN) return num.toString();
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bnNums[parseInt(d)]);
  };

  // --- Calendar Logic ---

  // English/Gregorian parts
  const gregParts = useMemo(() => {
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    const weekday = today.getDay();
    
    const monthName = new Intl.DateTimeFormat(isBN ? 'bn-BD' : 'en-US', { month: 'long' }).format(today);
    const dayName = t.weekdays[weekday];

    return { day, monthName, year, dayName };
  }, [today, isBN, t]);

  // Hijri calculation using Intl
  const hijriParts = useMemo(() => {
    const locale = isBN ? 'bn-u-ca-islamic-uma-nu-beng' : 'en-u-ca-islamic-uma';
    const formatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: 'numeric' });
    const parts = formatter.formatToParts(today);
    const day = parts.find(p => p.type === 'day')?.value || '';
    const monthIdx = parseInt(parts.find(p => p.type === 'month')?.value || '1') - 1;
    const year = parts.find(p => p.type === 'year')?.value || '';
    const monthName = t.hijriMonths[monthIdx];

    return { day: isBN ? day : day, monthName, year: isBN ? year : year };
  }, [today, isBN, t]);

  // Bangla logic (Bangladesh Revised Calendar)
  const banglaParts = useMemo(() => {
    // A simplified conversion for the Bangladesh Revised Calendar
    // Note: Accurate solar conversion is complex, this uses a robust reference point approach.
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    let bDay, bMonthIdx, bYear;

    // Bangla year starts around April 14
    bYear = year - 593;
    if (month < 4 || (month === 4 && date < 14)) {
      bYear -= 1;
    }

    // Simplified month calculation for demonstration 
    // (In a production app, a specialized library like 'bangla-calendar' would be used)
    const monthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]; 
    // April 14 is Baisakh 1
    const diffTime = Math.abs(today.getTime() - new Date(year, 3, 14).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // This is a rough estimation; for accurate Madrasa/Madrasah calendar use:
    const locale = isBN ? 'bn-BD' : 'en-US';
    const formatter = new Intl.DateTimeFormat(locale + '-u-ca-beng', { day: 'numeric', month: 'long', year: 'numeric' });
    const bFormatted = formatter.format(today);
    
    return { full: bFormatted };
  }, [today, isBN]);

  // --- Renderers ---

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-8 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-primary/20 text-primary rounded-[2rem] flex items-center justify-center text-4xl mb-4 shadow-inner">🕰️</div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 mb-1">{t.todayOverview}</h3>
        <p className="text-2xl font-black text-primary">{gregParts.dayName}</p>
      </div>

      {/* English Card */}
      <div onClick={() => setViewMode('full_english')} className="glass-panel p-6 flex items-center gap-6 cursor-pointer active:scale-95 transition-all group">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-blue-500/20">📅</div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.gregorian}</p>
          <p className="text-xl font-bold tracking-tight">
            {toLocaleNum(gregParts.day)} {gregParts.monthName} {toLocaleNum(gregParts.year)}
          </p>
          <p className="text-[10px] text-primary font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">👆 {t.clickToSeeFull}</p>
        </div>
      </div>

      {/* Bangla Card */}
      <div onClick={() => setViewMode('full_bangla')} className="glass-panel p-6 flex items-center gap-6 cursor-pointer active:scale-95 transition-all group">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-emerald-500/20">🇧🇩</div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.bengali}</p>
          <p className="text-xl font-bold tracking-tight">{banglaParts.full}</p>
          <p className="text-[10px] text-primary font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">👆 {t.clickToSeeFull}</p>
        </div>
      </div>

      {/* Hijri Card */}
      <div onClick={() => setViewMode('full_hijri')} className="glass-panel p-6 flex items-center gap-6 cursor-pointer active:scale-95 transition-all group">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-amber-500/20">🌙</div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.hijri}</p>
          <p className="text-xl font-bold tracking-tight">
            {hijriParts.day} {hijriParts.monthName} {hijriParts.year}
          </p>
          <p className="text-[10px] text-primary font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">👆 {t.clickToSeeFull}</p>
        </div>
      </div>
    </div>
  );

  const renderFullCalendar = (type: 'en' | 'bn' | 'hj') => {
    const months = type === 'en' ? 
      [0,1,2,3,4,5,6,7,8,9,10,11].map(m => new Intl.DateTimeFormat(isBN ? 'bn-BD' : 'en-US', { month: 'long' }).format(new Date(2024, m, 1))) : 
      (type === 'bn' ? t.banglaMonths : t.hijriMonths);

    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => setViewMode('overview')} className="w-10 h-10 glass-panel flex items-center justify-center text-lg">←</button>
          <h3 className="text-xl font-black">{type === 'en' ? t.gregorian : (type === 'bn' ? t.bengali : t.hijri)}</h3>
        </div>
        
        <div className="space-y-8">
          {months.map((m: string, idx: number) => (
            <div key={idx} className="glass-panel p-6">
              <h4 className="text-primary font-black text-center mb-4 uppercase tracking-widest">{m}</h4>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-[9px] font-black opacity-30 pb-2">{d}</div>)}
                {/* Simplified grid placeholder for 12 months view */}
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i} className={`p-2 text-xs font-bold rounded-lg ${(idx === today.getMonth() && i + 1 === today.getDate() && type === 'en') ? 'bg-primary text-white shadow-lg' : 'opacity-60'}`}>
                    {toLocaleNum(i + 1)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
      {viewMode === 'overview' && (
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate('/')} className="w-12 h-12 glass-panel flex items-center justify-center text-xl">←</button>
          <h2 className="text-2xl font-black tracking-tight">{t.calendar}</h2>
        </div>
      )}

      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'full_english' && renderFullCalendar('en')}
      {viewMode === 'full_bangla' && renderFullCalendar('bn')}
      {viewMode === 'full_hijri' && renderFullCalendar('hj')}

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default CalendarView;
