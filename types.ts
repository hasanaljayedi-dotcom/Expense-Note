
export type Language = 'en' | 'bn' | 'ar';
export type VisualEffect = 
  | 'winter' | 'rain' | 'autumn' | 'flowers' | 'fog' | 'glow' | 'sunset' | 'stars'
  | 'confetti' | 'balloons' | 'fireflies' | 'sparks' | 'shootingstars' | 'rainbow' 
  | 'droplets' | 'wind' | 'bubbles' | 'aurora';

export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
}

export interface IncomeSource {
  id: string;
  nameEn: string;
  nameBn: string;
  nameAr: string;
  icon: string;
  isCustom: boolean;
  isHidden: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  categoryOrSourceId: string;
  date: string; // ISO string
  note?: string;
}

export interface ExpenseCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  nameAr: string;
  icon: string;
  isCustom?: boolean;
}

export interface AboutInfo {
  name: string;
  description: string;
}

export interface AppState {
  password?: string;
  language: Language;
  themeColor: string; // Hex code
  isDarkMode: boolean;
  transactions: Transaction[];
  customSources: IncomeSource[];
  hiddenSourceIds: string[];
  expenseCategories: ExpenseCategory[];
  aboutInfo: AboutInfo;
  showEffects: boolean;
  activeEffects: VisualEffect[];
  uiScale: number; // 0 to 100
  lastNotificationDate?: string; // Last Friday notification triggered
  hasUnreadReport: boolean;
}
