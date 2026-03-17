import React, { useState } from 'react';
import { Goal, BudgetLimit, EXPENSE_CATEGORIES } from '../types';
import { formatCurrency, cn } from '../utils';
import { Target, ShieldAlert, Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'motion/react';

interface GoalsProps {
  goals: Goal[];
  limits: BudgetLimit[];
  onAddGoal: (goal: any) => void;
  onDeleteGoal: (id: string) => void;
  onSetLimit: (limit: any) => void;
  onDeleteLimit: (category: string) => void;
}

export function Goals({ goals, limits, onAddGoal, onDeleteGoal, onSetLimit, onDeleteLimit }: GoalsProps) {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showLimitForm, setShowLimitForm] = useState(false);

  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalCurrent, setGoalCurrent] = useState('');

  const [limitCategory, setLimitCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal({
      name: goalName,
      targetAmount: parseFloat(goalTarget),
      currentAmount: parseFloat(goalCurrent) || 0,
    });
    setGoalName(''); setGoalTarget(''); setGoalCurrent('');
    setShowGoalForm(false);
  };

  const handleSetLimit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetLimit({
      category: limitCategory,
      limitAmount: parseFloat(limitAmount),
    });
    setLimitCategory(''); setLimitAmount('');
    setShowLimitForm(false);
  };

  return (
    <div className="space-y-8 pb-6">
      {/* Savings Goals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
            <Target size={16} className="text-[#1a8a5c]" />
            Tasarruf Hedefleri
          </h2>
          <button 
            onClick={() => setShowGoalForm(!showGoalForm)}
            className="text-[#1a8a5c] p-1 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {showGoalForm && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            onSubmit={handleAddGoal} 
            className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 space-y-4 overflow-hidden"
          >
            <input
              placeholder="Hedef Adı (örn: Yeni Araba)"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c]"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Hedef Tutar"
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c]"
                required
              />
              <input
                type="number"
                placeholder="Mevcut Birikim"
                value={goalCurrent}
                onChange={(e) => setGoalCurrent(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c]"
              />
            </div>
            <button type="submit" className="w-full bg-[#1a8a5c] text-white py-3 rounded-2xl font-bold text-sm">Hedef Ekle</button>
          </motion.form>
        )}

        <div className="space-y-3">
          {goals.map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            return (
              <div key={goal.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{goal.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <button onClick={() => onDeleteGoal(goal.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#1a8a5c] rounded-full"
                  />
                </div>
                <p className="text-right text-[10px] font-black text-[#1a8a5c] mt-2">%{progress.toFixed(1)}</p>
              </div>
            );
          })}
          {goals.length === 0 && !showGoalForm && (
            <div className="text-center py-8 text-gray-400 text-sm italic">Henüz hedef eklenmedi</div>
          )}
        </div>
      </section>

      {/* Budget Limits */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#e74c3c]" />
            Bütçe Limitleri
          </h2>
          <button 
            onClick={() => setShowLimitForm(!showLimitForm)}
            className="text-[#e74c3c] p-1 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {showLimitForm && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            onSubmit={handleSetLimit} 
            className="bg-white p-6 rounded-3xl shadow-sm border border-red-100 space-y-4 overflow-hidden"
          >
            <select
              value={limitCategory}
              onChange={(e) => setLimitCategory(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#e74c3c]"
              required
            >
              <option value="">Kategori Seçin</option>
              {EXPENSE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Aylık Limit Tutarı"
              value={limitAmount}
              onChange={(e) => setLimitAmount(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#e74c3c]"
              required
            />
            <button type="submit" className="w-full bg-[#e74c3c] text-white py-3 rounded-2xl font-bold text-sm">Limit Belirle</button>
          </motion.form>
        )}

        <div className="space-y-3">
          {limits.map((limit, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-800">{limit.category}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Aylık Limit: {formatCurrency(limit.limitAmount)}</p>
              </div>
              <button onClick={() => onDeleteLimit(limit.category)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {limits.length === 0 && !showLimitForm && (
            <div className="text-center py-8 text-gray-400 text-sm italic">Henüz limit belirlenmedi</div>
          )}
        </div>
      </section>
    </div>
  );
}
