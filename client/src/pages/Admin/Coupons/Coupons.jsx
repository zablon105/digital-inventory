import React, { useState } from 'react';
import { Percent, Plus, Copy } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const Coupons = () => {
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Coupons & Promo Codes</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Create discount codes for store checkout.</p>
        </div>

        <button
          onClick={() => setToastMsg('Coupon created!')}
          className="bg-[#00C885] hover:bg-[#00B074] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-[#00C885]/20"
        >
          <Plus className="w-4 h-4" />
          Add Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { code: 'LUXE2026', discount: '20% OFF', category: 'All Items', usage: '48 Used' },
          { code: 'SILK15', discount: '15% OFF', category: 'Bedding', usage: '19 Used' },
          { code: 'WELCOME10', discount: 'Ksh 1,000 OFF', category: 'First Order', usage: '104 Used' },
        ].map(c => (
          <div key={c.code} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#00C885] bg-emerald-50 px-3 py-1 rounded-xl">{c.code}</span>
              <button 
                onClick={() => setToastMsg(`Copied ${c.code}!`)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{c.discount}</h3>
            <div className="text-xs text-slate-500 font-medium flex justify-between">
              <span>{c.category}</span>
              <span className="font-bold text-slate-700">{c.usage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
