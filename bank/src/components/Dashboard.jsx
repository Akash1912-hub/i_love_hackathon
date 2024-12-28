import React, { useState } from 'react';
import { Shield, Banknote, Users, Landmark, HeadphonesIcon, Wallet, Coins, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TransactionList from './Transaction';

function Dashboard() {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleBalanceClick = () => {
    setIsPinModalOpen(true);
  };

  const verifyPin = () => {
    const correctPin = '2006'; // Mock PIN
    if (pin === correctPin) {
      setIsPinModalOpen(false);
      navigate('/balance');
    } else {
      alert('Incorrect PIN');
    }
  };

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, John</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/insurance" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Shield className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Insurance</span>
        </Link>
        <Link to="/loan" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Banknote className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Loan</span>
        </Link>
        <Link to="/peer" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Users className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Peer</span>
        </Link>
        <Link to="/payment" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Landmark className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Payment</span>
        </Link>
        <Link to="/support" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <HeadphonesIcon className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Support</span>
        </Link>
     <Link to="/wallet" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Wallet className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Wallet</span>
       </Link> 
        <Link to="/transaction" className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <Coins className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Transaction</span>
        </Link>
        <div
          onClick={handleBalanceClick}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
        >
          <DollarSign className="h-8 w-8 text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Balance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionList />
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Bills</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Electricity Bill</p>
                <p className="text-sm text-gray-500">Due in 5 days</p>
              </div>
              <span className="font-medium text-red-600">$124.50</span>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Internet Bill</p>
                <p className="text-sm text-gray-500">Due in 12 days</p>
              </div>
              <span className="font-medium text-red-600">$79.99</span>
            </div>
          </div>
        </div>
      </div>

      {isPinModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter PIN</h2>
            <input
              type="password"
              className="border rounded-lg w-full p-2 mb-4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setIsPinModalOpen(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" onClick={verifyPin}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
