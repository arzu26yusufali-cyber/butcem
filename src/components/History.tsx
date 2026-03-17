import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate, cn } from '../utils';
import { Search, Trash2, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function History({ transactions, onDelete }: HistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Ara (not veya kategori)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#1a8a5c] transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'income', 'expense'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-all border",
                filterType === type 
                  ? "bg-[#1a8a5c] text-white border-[#1a8a5c]" 
                  : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
              )}
            >
              {type === 'all' ? 'Tümü' : type === 'income' ? 'Gelir' : 'Gider'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                    t.type === 'income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {t.category.split(' ')[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.note || t.category}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">{t.category} • {formatDate(t.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={cn(
                    "font-black text-sm",
                    t.type === 'income' ? "text-[#27ae60]" : "text-[#e74c3c]"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </p>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm italic">Kayıt bulunamadı</div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
