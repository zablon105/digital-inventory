import React, { useState } from 'react';
import { CreditCard, DollarSign, Smartphone } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_PAYMENTS = [
  { txn: 'TXN-8821', method: 'M-Pesa STK Push', amount: 'KSh 12,000', status: 'Completed', date: 'Jul 21, 2026' },
  { txn: 'TXN-8822', method: 'Visa Card Simulation', amount: 'KSh 18,500', status: 'Completed', date: 'Jul 20, 2026' }
];

const Payments = () => {
  const [payments] = useState(MOCK_PAYMENTS);
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payments & Financial Gateways</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">View transaction logs from M-Pesa Express and credit card gateways.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-4 px-6">Transaction ID</th>
              <th className="py-4 px-6">Payment Method</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {payments.map(p => (
              <tr key={p.txn} className="hover:bg-slate-50/60">
                <td className="py-4 px-6 font-bold text-slate-900">{p.txn}</td>
                <td className="py-4 px-6 font-bold">{p.method}</td>
                <td className="py-4 px-6 font-bold text-[#10B981]">{p.amount}</td>
                <td className="py-4 px-6 font-bold text-emerald-600">{p.status}</td>
                <td className="py-4 px-6 text-slate-500">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
