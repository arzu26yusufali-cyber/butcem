import { useState, useEffect, useMemo } from 'react';
import { BudgetData, Transaction, Goal, BudgetLimit } from '../types';
import { BudgetModel } from '../models/BudgetModel';

export function useBudget() {
  const [data, setData] = useState<BudgetData>(BudgetModel.getInitialData());

  useEffect(() => {
    BudgetModel.saveData(data);
  }, [data]);

  const totals = useMemo(() => {
    const income = data.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = data.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = data.initialBalance + income - expense;
    const netFlow = income - expense;
    
    // Daily budget calculation (remaining days in month)
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const remainingDays = lastDayOfMonth - today.getDate() + 1;
    const dailyBudget = balance > 0 ? balance / remainingDays : 0;

    return { income, expense, balance, netFlow, dailyBudget };
  }, [data]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setData(prev => ({ ...prev, transactions: [newTransaction, ...prev.transactions] }));
  };

  const deleteTransaction = (id: string) => {
    setData(prev => ({ ...prev, transactions: prev.transactions.filter(t => t.id !== id) }));
  };

  const addGoal = (g: Omit<Goal, 'id'>) => {
    const newGoal = { ...g, id: crypto.randomUUID() };
    setData(prev => ({ ...prev, goals: [...prev.goals, newGoal] }));
  };

  const deleteGoal = (id: string) => {
    setData(prev => ({ ...prev, goals: prev.goals.filter(g => g.id !== id) }));
  };

  const updateGoalProgress = (id: string, amount: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g)
    }));
  };

  const setLimit = (limit: BudgetLimit) => {
    setData(prev => {
      const existing = prev.limits.findIndex(l => l.category === limit.category);
      const newLimits = [...prev.limits];
      if (existing >= 0) {
        newLimits[existing] = limit;
      } else {
        newLimits.push(limit);
      }
      return { ...prev, limits: newLimits };
    });
  };

  const deleteLimit = (category: string) => {
    setData(prev => ({ ...prev, limits: prev.limits.filter(l => l.category !== category) }));
  };

  const loadDemoData = () => {
    setData(BudgetModel.getDemoData());
  };

  const clearAllData = () => {
    const empty = { initialBalance: 0, transactions: [], goals: [], limits: [] };
    setData(empty);
  };

  const setInitialBalance = (amount: number) => {
    setData(prev => ({ ...prev, initialBalance: amount }));
  };

  return {
    data,
    totals,
    addTransaction,
    deleteTransaction,
    addGoal,
    deleteGoal,
    updateGoalProgress,
    setLimit,
    deleteLimit,
    loadDemoData,
    clearAllData,
    setInitialBalance,
  };
}
