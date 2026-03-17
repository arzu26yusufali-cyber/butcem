export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

export interface BudgetLimit {
  category: string;
  limitAmount: number;
}

export interface BudgetData {
  initialBalance: number;
  transactions: Transaction[];
  goals: Goal[];
  limits: BudgetLimit[];
}

export const INCOME_CATEGORIES = [
  { id: 'salary', label: '💼 Maaş' },
  { id: 'interest', label: '🏦 Faiz' },
  { id: 'rent_income', label: '🏠 Kira Geliri' },
  { id: 'other_income', label: '💰 Diğer' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'market', label: '🛒 Market' },
  { id: 'rent', label: '🏠 Kira' },
  { id: 'bill', label: '💡 Fatura' },
  { id: 'transport', label: '🚌 Ulaşım' },
  { id: 'credit_card', label: '💳 Kredi Kartı' },
  { id: 'health', label: '🏥 Sağlık' },
  { id: 'education', label: '🎓 Eğitim' },
  { id: 'entertainment', label: '🎬 Eğlence' },
  { id: 'clothing', label: '👔 Giyim' },
  { id: 'other_expense', label: '📦 Diğer' },
];
