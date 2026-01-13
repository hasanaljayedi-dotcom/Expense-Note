
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, ExpenseCategory } from '../types';

interface CategoryManagerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  t: any;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ appState, setAppState, t }) => {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💸');

  const handleAdd = () => {
    if (!name) return;
    // Fix: Add missing required property 'nameAr' for ExpenseCategory
    const cat: ExpenseCategory = {
      id: 'custom_cat_' + Date.now(),
      nameEn: name,
      nameBn: name,
      nameAr: name,
      icon,
      isCustom: true
    };
    setAppState(prev => ({
      ...prev,
      expenseCategories: [...prev.expenseCategories, cat]
    }));
    setName('');
    setShowAdd(false);
  };

  const deleteCategory = (id: string) => {
    setAppState(prev => ({
      ...prev,
      expenseCategories: prev.expenseCategories.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/settings')} 
          className="w-12 h-12 glass-panel flex items-center justify-center text-xl shadow-lg border-white/20 active:scale-90"
        >
          ←
        </button>
        <h2 className="text-2xl font-black tracking-tight">{t.manageCategories}</h2>
      </div>

      <button 
        onClick={() => setShowAdd(!showAdd)} 
        className="w-full glass-panel bg-primary text-white py-4 rounded-[2rem] font-black mb-8 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <span>{showAdd ? '×' : '+'}</span>
        {t.addCustomCategory}
      </button>

      {showAdd && (
        <div className="glass-panel p-6 shadow-xl space-y-4 mb-8 border-primary/20">
          <input 
            type="text" 
            placeholder={t.categoryName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold"
          />
          <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
            {['💸', '🍕', '🚌', '📚', '👕', '🏠', '🎁', '🔌', '💊', '🎓'].map(i => (
              <button key={i} onClick={() => setIcon(i)} className={`text-2xl p-3 shrink-0 rounded-2xl transition-all ${icon === i ? 'bg-primary/20 border-2 border-primary scale-110 shadow-lg' : 'bg-white/5 border border-white/10'}`}>
                {i}
              </button>
            ))}
          </div>
          <button 
            onClick={handleAdd} 
            className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            {t.save}
          </button>
        </div>
      )}

      <div className="space-y-4">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2">Expense Categories</p>
        {appState.expenseCategories.map(cat => (
          <div key={cat.id} className="glass-panel p-4 flex justify-between items-center group">
            <div className="flex items-center gap-4">
              <span className="text-3xl bg-primary/5 p-2 rounded-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div>
                <p className="font-black text-sm tracking-tight">{appState.language === 'bn' ? cat.nameBn : cat.nameEn}</p>
                <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">{cat.isCustom ? 'Custom' : 'System'}</p>
              </div>
            </div>
            {cat.isCustom && (
              <button onClick={() => deleteCategory(cat.id)} className="text-rose-500 text-[9px] font-black uppercase tracking-widest bg-rose-500/10 px-3 py-1.5 rounded-full hover:bg-rose-500/20 transition-colors">
                {t.delete}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
