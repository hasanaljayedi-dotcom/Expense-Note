
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { APP_STORAGE_KEY, DEFAULT_SOURCES, THEME_COLORS, DEFAULT_EXPENSE_CATEGORIES } from './constants';
import { AppState, Transaction, Language, ExpenseCategory, AboutInfo, VisualEffect } from './types';
import { translations } from './translations';

// Components
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import SetupPassword from './screens/SetupPassword';
import IncomeEntry from './screens/IncomeEntry';
import ExpenseEntry from './screens/ExpenseEntry';
import History from './screens/History';
import Settings from './screens/Settings';
import SourceManager from './screens/SourceManager';
import CategoryManager from './screens/CategoryManager';
import ChangePassword from './screens/ChangePassword';
import EditAbout from './screens/EditAbout';
import WeeklyReport from './screens/WeeklyReport';

const VisualEffectOverlay: React.FC<{ effects: VisualEffect[]; active: boolean }> = ({ effects, active }) => {
  if (!active || effects.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {effects.map((effect) => (
        <React.Fragment key={effect}>
          {effect === 'winter' && (
            <div className="snow-container">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="snowflake" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${6 + Math.random() * 4}s` }}>❄</div>
              ))}
            </div>
          )}
          {effect === 'rain' && (
            <div className="rain-container">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="raindrop" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${0.5 + Math.random() * 0.5}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'autumn' && (
            <div className="leaf-container">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="leaf" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s`, animationDuration: `${8 + Math.random() * 7}s` }}>🍂</div>
              ))}
            </div>
          )}
          {effect === 'flowers' && (
            <div className="flower-container">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flower" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${7 + Math.random() * 6}s` }}>🌸</div>
              ))}
            </div>
          )}
          {effect === 'fog' && <div className="fog-overlay"></div>}
          {effect === 'glow' && <div className="glow-overlay"></div>}
          {effect === 'sunset' && <div className="sunset-gradient"></div>}
          {effect === 'stars' && (
            <div className="stars-container">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="star" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>✦</div>
              ))}
            </div>
          )}
          {effect === 'confetti' && (
            <div className="confetti-container">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${4 + Math.random() * 2}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'balloons' && (
            <div className="balloon-container">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="balloon" style={{ left: `${Math.random() * 100}%`, backgroundColor: `hsla(${Math.random() * 360}, 70%, 60%, 0.4)`, animationDelay: `${Math.random() * 10}s` }}>🎈</div>
              ))}
            </div>
          )}
          {effect === 'fireflies' && (
            <div className="fireflies-container">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="firefly" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'sparks' && (
            <div className="sparks-container">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="spark" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'shootingstars' && (
            <div className="shooting-stars">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shooting-star" style={{ top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'rainbow' && <div className="rainbow-motion"></div>}
          {effect === 'droplets' && (
            <div className="droplets-container">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="droplet" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }}>💧</div>
              ))}
            </div>
          )}
          {effect === 'wind' && (
            <div className="wind-container">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="wind-leaf" style={{ top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 6}s` }}>🍃</div>
              ))}
            </div>
          )}
          {effect === 'bubbles' && (
            <div className="bubbles-container">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bubble" style={{ left: `${Math.random() * 100}%`, width: `${10 + Math.random() * 25}px`, height: `${10 + Math.random() * 25}px`, animationDelay: `${Math.random() * 5}s` }}></div>
              ))}
            </div>
          )}
          {effect === 'aurora' && <div className="aurora-sky"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const AppContent: React.FC<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  totals: any;
  t: any;
}> = ({ appState, setAppState, isAuthenticated, setIsAuthenticated, totals, t }) => {
  const navigate = useNavigate();

  // Notification Check: Every Friday automatically triggers a report notification
  useEffect(() => {
    if (!isAuthenticated) return;
    const today = new Date();
    const isFriday = today.getDay() === 5; // 5 is Friday
    const dateStr = today.toISOString().split('T')[0];

    if (isFriday && appState.lastNotificationDate !== dateStr) {
      setAppState(prev => ({
        ...prev,
        lastNotificationDate: dateStr,
        hasUnreadReport: true
      }));
    }
  }, [isAuthenticated, appState.lastNotificationDate, setAppState]);

  const handleLogin = (pwd: string) => {
    if (pwd === appState.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleSetPassword = (pwd: string) => {
    setAppState(prev => ({ ...prev, password: pwd }));
    setIsAuthenticated(true);
  };

  if (!appState.password) {
    return <SetupPassword onComplete={handleSetPassword} t={t} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} t={t} />;
  }

  const scaleFactor = 0.8 + (appState.uiScale / 100) * 0.6;

  return (
    <div 
      id="main-content" 
      className={`min-h-screen ${appState.isDarkMode ? 'dark-mode-bg text-white' : 'light-mode-bg text-slate-900'} flex flex-col max-w-md mx-auto relative shadow-2xl overflow-y-auto scroll-smooth transition-colors duration-500`}
      style={{ 
        '--primary': appState.themeColor,
        '--ui-scale': scaleFactor.toString(),
        fontSize: `calc(1rem * var(--ui-scale))`
      } as any}
    >
      <VisualEffectOverlay effects={appState.activeEffects} active={appState.showEffects} />
      <div className="flex-1 flex flex-col relative z-10 transition-transform duration-300">
        <Routes>
          <Route path="/" element={<Dashboard appState={appState} totals={totals} t={t} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/income" element={<IncomeEntry appState={appState} onAdd={(tx) => setAppState(p => ({...p, transactions: [tx, ...p.transactions]}))} t={t} />} />
          <Route path="/expense" element={<ExpenseEntry appState={appState} onAdd={(tx) => setAppState(p => ({...p, transactions: [tx, ...p.transactions]}))} t={t} />} />
          <Route path="/history" element={<History appState={appState} onDelete={(id) => setAppState(p => ({...p, transactions: p.transactions.filter(tx => tx.id !== id)}))} t={t} />} />
          <Route path="/settings" element={<Settings appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="/manage-sources" element={<SourceManager appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="/manage-categories" element={<CategoryManager appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="/change-password" element={<ChangePassword appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="/edit-about" element={<EditAbout appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="/weekly-report" element={<WeeklyReport appState={appState} setAppState={setAppState} t={t} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <style>{`
        :root { 
          --primary: ${appState.themeColor}; 
          --glass-bg: ${appState.isDarkMode ? 'rgba(0,0,0,0.78)' : 'rgba(255,255,255,0.78)'};
          --glass-border: ${appState.isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.35)'};
        }

        .glass-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--glass-border);
          border-radius: calc(32px * var(--ui-scale));
          box-shadow: 0 12px 36px -12px rgba(0,0,0,0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .dark-mode-bg { background: radial-gradient(circle at 50% 0%, #1e293b 0%, #000000 100%); }
        .light-mode-bg { background: radial-gradient(circle at 50% 0%, #ffffff 0%, #cbd5e1 100%); }

        @keyframes snow { 0% { transform: translate3d(0, -10vh, 0); } 100% { transform: translate3d(0, 110vh, 0); } }
        .snowflake { position: absolute; top: -20px; color: white; animation: snow linear infinite; opacity: 0.6; will-change: transform; }

        @keyframes rain { 0% { transform: translate3d(0, -10vh, 0); } 100% { transform: translate3d(0, 110vh, 0); } }
        .raindrop { position: absolute; width: 1px; height: 25px; background: rgba(255,255,255,0.3); animation: rain linear infinite; will-change: transform; }

        @keyframes fall { 0% { transform: translate3d(0, -10vh, 0) rotate(0deg); } 100% { transform: translate3d(0, 110vh, 0) rotate(360deg); } }
        .leaf, .flower, .wind-leaf { position: absolute; top: -30px; animation: fall linear infinite; will-change: transform; }

        .fog-overlay { position: absolute; inset: 0; background: radial-gradient(circle, transparent, rgba(255,255,255,0.06)); filter: blur(70px); opacity: 0.4; }
        .glow-overlay { position: absolute; inset: 0; box-shadow: inset 0 0 130px var(--primary); opacity: 0.15; pointer-events: none; }
        .sunset-gradient { position: absolute; inset: 0; background: linear-gradient(to bottom, #fde68a, #f87171, #4c1d95); opacity: 0.15; }

        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.9) translate3d(0,0,0); } 50% { opacity: 1; transform: scale(1.1) translate3d(0,0,0); } }
        .star { position: absolute; color: white; font-size: 8px; animation: twinkle 3s infinite ease-in-out; will-change: transform, opacity; }

        @keyframes conf { 0% { transform: translate3d(0, -10vh, 0) rotate(0); } 100% { transform: translate3d(0, 110vh, 0) rotate(720deg); } }
        .confetti-piece { position: absolute; width: 9px; height: 9px; border-radius: 2px; animation: conf linear infinite; will-change: transform; }

        @keyframes ball { 0% { transform: translate3d(0, 110vh, 0) scale(1); } 100% { transform: translate3d(0, -20vh, 0) scale(1.1); } }
        .balloon { position: absolute; font-size: 32px; animation: ball linear infinite; will-change: transform; }

        @keyframes fire { 0%, 100% { opacity: 0; transform: translate3d(0, 0, 0); } 50% { opacity: 1; transform: translate3d(25px, -25px, 0); } }
        .firefly { position: absolute; width: 4px; height: 4px; background: #fbbf24; border-radius: 50%; filter: blur(1px); animation: fire 4.5s infinite alternate; will-change: transform, opacity; }

        @keyframes bubble { 0% { transform: translate3d(0, 110vh, 0); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translate3d(0, -10vh, 0); opacity: 0; } }
        .bubble { position: absolute; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 50%; animation: bubble linear infinite; will-change: transform, opacity; }

        @keyframes aurora { 0% { transform: scale(1) translate3d(0,0,0); } 100% { transform: scale(1.2) translate3d(15px, 15px, 0); } }
        .aurora-sky { position: absolute; inset: 0; background: radial-gradient(circle at 50% -30%, #2dd4bf, #a855f7, transparent); opacity: 0.12; filter: blur(60px); animation: aurora 9s infinite alternate; will-change: transform; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    const initial = saved ? JSON.parse(saved) : {
      language: 'bn',
      themeColor: THEME_COLORS[0].hex,
      isDarkMode: false,
      transactions: [],
      customSources: [],
      hiddenSourceIds: [],
      expenseCategories: DEFAULT_EXPENSE_CATEGORIES,
      aboutInfo: {
        name: 'Hasan Al Zayedi',
        description: 'Student of Alim Department at Ullapara Kamil Madrasa.'
      },
      showEffects: false,
      activeEffects: [],
      uiScale: 50,
      hasUnreadReport: false
    };
    if (!initial.expenseCategories) initial.expenseCategories = DEFAULT_EXPENSE_CATEGORIES;
    if (initial.activeEffects === undefined) initial.activeEffects = [];
    if (initial.uiScale === undefined) initial.uiScale = 50;
    if (initial.hasUnreadReport === undefined) initial.hasUnreadReport = false;
    return initial;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appState));
    if (appState.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [appState]);

  const t = translations[appState.language];

  const totals = useMemo(() => {
    const income = appState.transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expense = appState.transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
    return { income, expense, balance: income - expense };
  }, [appState.transactions]);

  return (
    <HashRouter>
      <AppContent 
        appState={appState} 
        setAppState={setAppState} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
        totals={totals}
        t={t}
      />
    </HashRouter>
  );
};

export default App;
