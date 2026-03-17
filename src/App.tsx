import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AddTransaction } from './components/AddTransaction';
import { History } from './components/History';
import { Statistics } from './components/Statistics';
import { Goals } from './components/Goals';
import { useBudget } from './hooks/useBudget';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    data,
    totals,
    addTransaction,
    deleteTransaction,
    addGoal,
    deleteGoal,
    setLimit,
    deleteLimit,
    loadDemoData,
    clearAllData,
  } = useBudget();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            totals={totals} 
            transactions={data.transactions} 
            limits={data.limits}
            onLoadDemo={loadDemoData}
            onClear={clearAllData}
          />
        );
      case 'add':
        return (
          <AddTransaction 
            onAdd={addTransaction} 
            onSuccess={() => setActiveTab('history')} 
          />
        );
      case 'history':
        return (
          <History 
            transactions={data.transactions} 
            onDelete={deleteTransaction} 
          />
        );
      case 'stats':
        return <Statistics transactions={data.transactions} />;
      case 'goals':
        return (
          <Goals 
            goals={data.goals} 
            limits={data.limits}
            onAddGoal={addGoal}
            onDeleteGoal={deleteGoal}
            onSetLimit={setLimit}
            onDeleteLimit={deleteLimit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} balance={totals.balance}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
