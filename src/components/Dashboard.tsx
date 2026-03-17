import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Calendar, AlertCircle, Trash2, Download } from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';

interface DashboardProps {
  totals: {
    income: number;
    expense: number;
    balance: number;
    netFlow: number;
    dailyBudget: number;
  };
  transactions: any[];
  limits: any[];
  onLoadDemo: () => void;
  onClear: () => void;
}

export function Dashboard({ totals, transactions, limits, onLoadDemo, onClear }: DashboardProps) {
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value: value as number }));
  const COLORS = ['#1a8a5c', '#27ae60', '#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#34495e', '#16a085', '#2980b9', '#8e44ad'];

  const barData = [
    { name: 'Gelir', tutar: totals.income, fill: '#27ae60' },
    { name: 'Gider', tutar: totals.expense, fill: '#e74c3c' },
  ];

  const budgetAlerts = limits.map(limit => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === limit.category)
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...limit, spent, exceeded: spent > limit.limitAmount };
  }).filter(a => a.exceeded);

  return (
    <div className="space-y-6 pb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-[#27ae60] mb-1">
            <TrendingUp size={16} />
            <span className="text-[10px] font-bold uppercase">Toplam Gelir</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(totals.income)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-[#e74c3c] mb-1">
            <TrendingDown size={16} />
            <span className="text-[10px] font-bold uppercase">Toplam Gider</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(totals.expense)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className={cn("flex items-center gap-2 mb-1", totals.netFlow >= 0 ? "text-blue-500" : "text-red-500")}>
            <RefreshCw size={16} />
            <span className="text-[10px] font-bold uppercase">Net Akış</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(totals.netFlow)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <Calendar size={16} />
            <span className="text-[10px] font-bold uppercase">Günlük Bütçe</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(totals.dailyBudget)}</p>
        </motion.div>
      </div>

      {/* Budget Alerts */}
      {budgetAlerts.length > 0 && (
        <div className="space-y-2">
          {budgetAlerts.map((alert, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="text-red-500 shrink-0" size={20} />
              <div>
                <p className="text-red-800 font-bold text-sm">Bütçe Aşımı!</p>
                <p className="text-red-600 text-xs mt-0.5">
                  <span className="font-semibold">{alert.category}</span> kategorisinde limitinizi {formatCurrency(alert.spent - alert.limitAmount)} aştınız.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Gider Dağılımı</h3>
        <div className="h-64 w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">Henüz veri yok</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Gelir vs Gider</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{fill: 'transparent'}} />
              <Bar dataKey="tutar" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demo Buttons */}
      <div className="grid grid-cols-1 gap-3 pt-4">
        <button 
          onClick={onLoadDemo}
          className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-4 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors"
        >
          <Download size={18} />
          📥 Ali & Ayşe Demo Verisini Yükle
        </button>
        <button 
          onClick={onClear}
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors"
        >
          <Trash2 size={18} />
          🗑️ Tüm Verileri Temizle
        </button>
      </div>
    </div>
  );
}
