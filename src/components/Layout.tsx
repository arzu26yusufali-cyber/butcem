import React from 'react';
import { LayoutDashboard, PlusCircle, History, PieChart, Target } from 'lucide-react';
import { cn } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
}

export function Layout({ children, activeTab, setActiveTab, balance }: LayoutProps) {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Panel' },
    { id: 'add', icon: PlusCircle, label: 'Ekle' },
    { id: 'history', icon: History, label: 'Geçmiş' },
    { id: 'stats', icon: PieChart, label: 'İstatistik' },
    { id: 'goals', icon: Target, label: 'Hedefler' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <header className="bg-[#1a8a5c] text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">BütçeM</h1>
          <div className="text-center">
            <p className="text-white/80 text-sm uppercase tracking-wider">Toplam Bakiye</p>
            <p className={cn(
              "text-4xl font-black mt-1",
              balance < 0 ? "text-red-200" : "text-white"
            )}>
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(balance)}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 -mt-6">
        {children}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              activeTab === tab.id ? "text-[#1a8a5c] scale-110" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-semibold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
