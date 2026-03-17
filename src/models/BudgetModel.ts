import { BudgetData, Transaction, Goal, BudgetLimit } from '../types';

const STORAGE_KEY = 'butcem_data';

export const BudgetModel = {
  getInitialData(): BudgetData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      initialBalance: 0,
      transactions: [],
      goals: [],
      limits: [],
    };
  },

  saveData(data: BudgetData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getDemoData(): BudgetData {
    return {
      initialBalance: 0,
      transactions: [
        { id: '1', type: 'income', amount: 45000, category: '💼 Maaş', note: 'Ali Maaş', date: new Date().toISOString() },
        { id: '2', type: 'income', amount: 35000, category: '💼 Maaş', note: 'Ayşe Maaş', date: new Date().toISOString() },
        { id: '3', type: 'income', amount: 25000, category: '🏦 Faiz', note: 'Faiz Geliri', date: new Date().toISOString() },
        { id: '4', type: 'expense', amount: 12000, category: '🏠 Kira', note: 'Kira', date: new Date().toISOString() },
        { id: '5', type: 'expense', amount: 30000, category: '🛒 Market', note: 'Market Alışverişi', date: new Date().toISOString() },
        { id: '6', type: 'expense', amount: 20000, category: '💳 Kredi Kartı', note: 'Kredi Kartı Ödemesi', date: new Date().toISOString() },
        { id: '7', type: 'expense', amount: 5000, category: '💡 Fatura', note: 'Faturalar', date: new Date().toISOString() },
        { id: '8', type: 'expense', amount: 3000, category: '🚌 Ulaşım', note: 'Ulaşım', date: new Date().toISOString() },
        { id: '9', type: 'expense', amount: 8000, category: '🎓 Eğitim', note: 'Eğitim Gideri', date: new Date().toISOString() },
        { id: '10', type: 'expense', amount: 4000, category: '👔 Giyim', note: 'Giyim', date: new Date().toISOString() },
        { id: '11', type: 'expense', amount: 3000, category: '🎬 Eğlence', note: 'Eğlence', date: new Date().toISOString() },
        { id: '12', type: 'expense', amount: 2000, category: '🏥 Sağlık', note: 'Sağlık', date: new Date().toISOString() },
        { id: '13', type: 'expense', amount: 3000, category: '📦 Diğer', note: 'Diğer Giderler', date: new Date().toISOString() },
      ],
      goals: [
        { id: 'g1', name: 'Acil Durum Fonu', target: 330000, current: 250000 },
        { id: 'g2', name: 'Seyahat', target: 200000, current: 0 },
      ].map(g => ({ id: g.id, name: g.name, targetAmount: g.target, currentAmount: g.current })),
      limits: [
        { category: '🛒 Market', limitAmount: 25000 },
      ],
    };
  },
};
