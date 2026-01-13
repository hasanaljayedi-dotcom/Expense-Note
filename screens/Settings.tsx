
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, ThemeColor, VisualEffect, Language } from '../types';
import { THEME_COLORS } from '../constants';

interface SettingsProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const Settings: React.FC<SettingsProps> = ({ appState, setAppState, t }) => {
  const navigate = useNavigate();

  const setLanguage = (lang: Language) => {
    setAppState(prev => ({ ...prev, language: lang }));
  };

  const toggleDarkMode = () => {
    setAppState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const setTheme = (color: ThemeColor) => {
    setAppState(prev => ({ ...prev, themeColor: color.hex }));
  };

  const toggleEffects = () => {
    setAppState(prev => ({ ...prev, showEffects: !prev.showEffects }));
  };

  const toggleEffect = (effect: VisualEffect) => {
    setAppState(prev => {
      const current = prev.activeEffects || [];
      const exists = current.includes(effect);
      return {
        ...prev,
        activeEffects: exists 
          ? current.filter(e => e !== effect) 
          : [...current, effect]
      };
    });
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppState(prev => ({ ...prev, uiScale: parseInt(e.target.value) }));
  };

  const effectsList: { id: VisualEffect; label: string; icon: string }[] = [
    { id: 'winter', label: t.effectWinter, icon: '❄️' },
    { id: 'rain', label: t.effectRain, icon: '🌧️' },
    { id: 'autumn', label: t.effectAutumn, icon: '🍂' },
    { id: 'flowers', label: t.effectFlowers, icon: '🌸' },
    { id: 'confetti', label: t.effectConfetti, icon: '🎉' },
    { id: 'balloons', label: t.effectBalloons, icon: '🎈' },
    { id: 'fireflies', label: t.effectFireflies, icon: '✨' },
    { id: 'sparks', label: t.effectSparks, icon: '🔥' },
    { id: 'shootingstars', label: t.effectShootingStars, icon: '🌠' },
    { id: 'rainbow', label: t.effectRainbow, icon: '🌈' },
    { id: 'droplets', label: t.effectDroplets, icon: '💧' },
    { id: 'wind', label: t.effectWind, icon: '🍁' },
    { id: 'bubbles', label: t.effectBubbles, icon: '🫧' },
    { id: 'aurora', label: t.effectAurora, icon: '🌌' },
    { id: 'fog', label: t.effectFog, icon: '🌫️' },
    { id: 'glow', label: t.effectGlow, icon: '✨' },
    { id: 'sunset', label: t.effectSunset, icon: '🌅' },
    { id: 'stars', label: t.effectStars, icon: '✦' }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 pb-28 overflow-y-auto scroll-smooth animate-fade-in" dir={appState.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate('/')} className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg active:scale-90 hover:bg-white/10 transition-colors">
          {appState.language === 'ar' ? '→' : '←'}
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.settings}</h2>
      </div>

      <div className="space-y-4 pb-10">
        {/* Language Section */}
        <div className="glass-panel p-6 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 flex items-center gap-2">🌐 {t.language}</p>
            <div className="flex gap-2">
                {['en', 'bn', 'ar'].map((lang) => (
                    <button 
                        key={lang}
                        onClick={() => setLanguage(lang as Language)}
                        className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${appState.language === lang ? 'bg-primary text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-50'}`}
                    >
                        {lang === 'en' ? 'EN' : (lang === 'bn' ? 'BN' : 'AR')}
                    </button>
                ))}
            </div>
        </div>

        {/* Appearance Toggle */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌓</span>
              <p className="font-bold">{appState.isDarkMode ? t.nightMode : t.lightMode}</p>
            </div>
            <button onClick={toggleDarkMode} className={`w-14 h-7 rounded-full relative transition-all shadow-inner ${appState.isDarkMode ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${appState.isDarkMode ? (appState.language === 'ar' ? 'right-8' : 'left-8') : (appState.language === 'ar' ? 'right-1' : 'left-1')}`}></div>
            </button>
          </div>
        </div>

        {/* UI Scaling Slider */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-bold flex items-center gap-2"><span>🔍</span> {t.uiScaling}</p>
            <span className="text-[10px] font-black opacity-40">{appState.uiScale}%</span>
          </div>
          <input type="range" min="30" max="100" value={appState.uiScale} onChange={handleScaleChange} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>

        {/* Visual Effects - Multi Select */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <p className="font-bold">{t.visualEffects}</p>
            </div>
            <button onClick={toggleEffects} className={`w-14 h-7 rounded-full relative transition-all shadow-inner ${appState.showEffects ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${appState.showEffects ? (appState.language === 'ar' ? 'right-8' : 'left-8') : (appState.language === 'ar' ? 'right-1' : 'left-1')}`}></div>
            </button>
          </div>
          
          {appState.showEffects && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {effectsList.map(effect => (
                <button
                  key={effect.id}
                  onClick={() => toggleEffect(effect.id)}
                  className={`p-3 rounded-2xl flex items-center gap-2 border text-[9px] font-black uppercase tracking-widest transition-all ${appState.activeEffects?.includes(effect.id) ? 'bg-primary/20 border-primary text-primary shadow-lg' : 'bg-white/5 border-white/10'}`}
                >
                  <span className="text-sm">{effect.icon}</span>
                  {effect.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Colors Section */}
        <div className="glass-panel p-6">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-5 flex items-center gap-2">🎨 {t.theme}</p>
          <div className="grid grid-cols-6 gap-3">
            {THEME_COLORS.map(color => (
              <button
                key={color.id}
                onClick={() => setTheme(color)}
                className={`w-10 h-10 rounded-[1.2rem] border-2 transition-all active:scale-90 shadow-sm ${appState.themeColor === color.hex ? 'border-white scale-125 z-10 shadow-xl ring-4 ring-primary/10' : 'border-transparent opacity-60'}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Action List */}
        <div className="glass-panel overflow-hidden">
          {[
            { label: t.editAbout, icon: '👤', path: '/edit-about' },
            { label: t.changePassword, icon: '🔐', path: '/change-password' },
            { label: t.manageSources, icon: '🏦', path: '/manage-sources' },
            { label: t.manageCategories, icon: '🏷️', path: '/manage-categories' }
          ].map((item, idx) => (
            <button key={idx} onClick={() => navigate(item.path)} className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 active:bg-white/10 border-b border-white/5 last:border-0 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-xl opacity-60">{item.icon}</span>
                <p className="font-bold text-sm tracking-tight">{item.label}</p>
              </div>
              <span className={`opacity-20 transition-transform ${appState.language === 'ar' ? 'rotate-180' : ''}`}>→</span>
            </button>
          ))}
        </div>

        <button onClick={() => window.location.reload()} className="w-full glass-panel border-rose-500/20 text-rose-500 py-6 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-rose-500/10 active:scale-95 transition-all shadow-lg shadow-rose-500/5">
          🚫 {t.logout}
        </button>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Settings;
