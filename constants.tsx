
import { IncomeSource, ExpenseCategory, ThemeColor } from './types';

export const THEME_COLORS: ThemeColor[] = [
  { id: 'emerald', name: 'Emerald', hex: '#10b981' },
  { id: 'blue', name: 'Blue', hex: '#3b82f6' },
  { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
  { id: 'violet', name: 'Violet', hex: '#8b5cf6' },
  { id: 'purple', name: 'Purple', hex: '#a855f7' },
  { id: 'fuchsia', name: 'Fuchsia', hex: '#d946ef' },
  { id: 'pink', name: 'Pink', hex: '#ec4899' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e' },
  { id: 'orange', name: 'Orange', hex: '#f97316' },
  { id: 'amber', name: 'Amber', hex: '#f59e0b' },
  { id: 'teal', name: 'Teal', hex: '#14b8a6' },
  { id: 'sky', name: 'Sky', hex: '#0ea5e9' },
  { id: 'slate', name: 'Slate', hex: '#64748b' },
  { id: 'red', name: 'Crimson', hex: '#ef4444' },
  { id: 'yellow', name: 'Sunshine', hex: '#eab308' },
  { id: 'lime', name: 'Lime', hex: '#84cc16' },
  { id: 'cyan', name: 'Cyan', hex: '#06b6d4' },
  { id: 'lavender', name: 'Lavender', hex: '#a78bfa' },
  { id: 'gold', name: 'Gold', hex: '#d4af37' },
  { id: 'mint', name: 'Mint', hex: '#2dd4bf' },
  { id: 'ruby', name: 'Ruby', hex: '#e11d48' },
  { id: 'coffee', name: 'Coffee', hex: '#78350f' },
  { id: 'royal', name: 'Royal', hex: '#1e3a8a' },
  { id: 'midnight', name: 'Midnight', hex: '#0f172a' },
  { id: 'forest', name: 'Forest', hex: '#064e3b' },
  { id: 'coral', name: 'Coral', hex: '#ff7f50' },
  { id: 'orchid', name: 'Orchid', hex: '#da70d6' },
  { id: 'steel', name: 'Steel', hex: '#71717a' },
  { id: 'clay', name: 'Clay', hex: '#a8a29e' },
  { id: 'sand', name: 'Sand', hex: '#fde68a' },
  { id: 'deepsea', name: 'Deep Sea', hex: '#0c4a6e' },
  { id: 'plum', name: 'Plum', hex: '#4c1d95' },
  { id: 'bronze', name: 'Bronze', hex: '#92400e' },
  { id: 'sunflower', name: 'Sunflower', hex: '#fbbf24' },
  { id: 'ocean', name: 'Ocean', hex: '#0284c7' },
  { id: 'matcha', name: 'Matcha', hex: '#a3e635' },
  { id: 'terracotta', name: 'Terracotta', hex: '#ea580c' },
  { id: 'charcoal', name: 'Charcoal', hex: '#334155' },
  { id: 'turquoise', name: 'Turquoise', hex: '#2dd4bf' },
  { id: 'burgundy', name: 'Burgundy', hex: '#991b1b' },
  { id: 'softpink', name: 'Sakura', hex: '#f9a8d4' },
  { id: 'electric', name: 'Electric', hex: '#7c3aed' },
  { id: 'graphite', name: 'Graphite', hex: '#18181b' },
];

export const DEFAULT_SOURCES: IncomeSource[] = [
  { id: 'father', nameEn: 'Father', nameBn: 'বাবা', nameAr: 'الأب', icon: '👨‍👦', isCustom: false, isHidden: false },
  { id: 'mother', nameEn: 'Mother', nameBn: 'মা', nameAr: 'الأم', icon: '👩‍👦', isCustom: false, isHidden: false },
  { id: 'brother', nameEn: 'Brother', nameBn: 'ভাই', nameAr: 'الأخ', icon: '👦', isCustom: false, isHidden: false },
  { id: 'sister', nameEn: 'Sister', nameBn: 'বোন', nameAr: 'الأخت', icon: '👧', isCustom: false, isHidden: false },
  { id: 'friend', nameEn: 'Friend', nameBn: 'বন্ধু', nameAr: 'الصديق', icon: '🤝', isCustom: false, isHidden: false },
  { id: 'other', nameEn: 'Other', nameBn: 'অন্যান্য', nameAr: 'آخر', icon: '📦', isCustom: false, isHidden: false },
];

export const DEFAULT_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'transport', nameEn: 'Transportation', nameBn: 'যাতায়াত', nameAr: 'المواصلات', icon: '🚌' },
  { id: 'education', nameEn: 'Stationery & Books', nameBn: 'বই ও খাতা', nameAr: 'القرطاسية والكتب', icon: '📚' },
  { id: 'salary', nameEn: 'Teacher Salary', nameBn: 'শিক্ষকের বেতন', nameAr: 'راتب المعلم', icon: '🎓' },
  { id: 'snacks', nameEn: 'Snacks', nameBn: 'নাস্তা', nameAr: 'وجبات خفيفة', icon: '🍪' },
  { id: 'other_exp', nameEn: 'Other', nameBn: 'অন্যান্য', nameAr: 'أخرى', icon: '💸' },
];

export const APP_STORAGE_KEY = 'expense_note_data_v2';
