import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

function TransactionList() {
  const transactions = [
    { id: 1, type: 'deposit', amount: 1200, description: 'Salary deposit', date: '2024-03-15' },
    { id: 2, type: 'withdrawal', amount: 85.50, description: 'Grocery shopping', date: '2024-03-14' },
    { id: 3, type: 'deposit', amount: 500, description: 'Freelance payment', date: '2024-03-13' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              {transaction.type === 'deposit' ? (
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowDownRight className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                </div>
              )}
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <span className={`font-medium ${
              transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;