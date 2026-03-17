import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface StatisticsProps {
  transactions: Transaction[];
}

export function Statistics({ transactions }: StatisticsProps) {
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value: value as number }));
  const COLORS = ['#1a8a5c', '#27ae60', '#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#34495e', '#16a085', '#2980b9', '#8e44ad'];

  // Monthly data (simplified for demo, normally we'd group by month)
  const monthlyData = [
    { name: 'Ocak', gelir: 0, gider: 0 },
    { name: 'Şubat', gelir: 0, gider: 0 },
    { name: 'Mart', gelir: 0, gider: 0 },
  ];

  transactions.forEach(t => {
    const month = new Date(t.date).getMonth();
    if (month === 0) t.type === 'income' ? monthlyData[0].gelir += t.amount : monthlyData[0].gider += t.amount;
    if (month === 1) t.type === 'income' ? monthlyData[1].gelir += t.amount : monthlyData[1].gider += t.amount;
    if (month === 2) t.type === 'income' ? monthlyData[2].gelir += t.amount : monthlyData[2].gider += t.amount;
  });

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">Kategori Bazlı Harcamalar</h3>
        <div className="h-80 w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} (%${(percent * 100).toFixed(0)})`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">Veri bulunamadı</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">Aylık Karşılaştırma</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{fill: '#f9fafb'}} />
              <Legend iconType="circle" wrapperStyle={{paddingTop: 20}} />
              <Bar dataKey="gelir" fill="#27ae60" radius={[4, 4, 0, 0]} name="Gelir" />
              <Bar dataKey="gider" fill="#e74c3c" radius={[4, 4, 0, 0]} name="Gider" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
