import React, { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, TransactionType } from '../types';
import { cn } from '../utils';
import { Plus, Minus, Save } from 'lucide-react';

interface AddTransactionProps {
  onAdd: (transaction: any) => void;
  onSuccess: () => void;
}

export function AddTransaction({ onAdd, onSuccess }: AddTransactionProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      note,
      date: new Date(date).toISOString(),
    });
    onSuccess();
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex p-1 bg-gray-100 rounded-2xl">
        <button
          onClick={() => { setType('income'); setCategory(''); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all",
            type === 'income' ? "bg-white text-[#27ae60] shadow-sm" : "text-gray-500"
          )}
        >
          <Plus size={18} />
          Gelir
        </button>
        <button
          onClick={() => { setType('expense'); setCategory(''); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all",
            type === 'expense' ? "bg-white text-[#e74c3c] shadow-sm" : "text-gray-500"
          )}
        >
          <Minus size={18} />
          Gider
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Tutar (TL)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-[#1a8a5c] transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c] transition-all appearance-none"
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.label}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c] transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">Not (Opsiyonel)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bir şeyler yazın..."
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold focus:ring-2 focus:ring-[#1a8a5c] transition-all h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a8a5c] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#1a8a5c]/20 hover:bg-[#15734d] transition-all active:scale-95"
        >
          <Save size={20} />
          Kaydet
        </button>
      </form>
    </div>
  );
}
