import React, { useState } from 'react';
import { Megaphone, Plus, Tag } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const Marketing = () => {
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Marketing Campaigns</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Create promotional banners, email newsletters, and flash sales.</p>
        </div>

        <button
          onClick={() => setToastMsg('Campaign created!')}
          className="bg-[#00C885] hover:bg-[#00B074] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-[#00C885]/20"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-[#00C885] uppercase">Active</span>
            <Megaphone className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Summer Footwear Sale 2026</h3>
          <p className="text-xs text-slate-500 font-medium">20% off all high-performance footwear items.</p>
          <div className="pt-2 text-xs font-bold text-slate-700">Conversion Revenue: Ksh 142,000</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 uppercase">Scheduled</span>
            <Tag className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Luxury Linen Bedding Promo</h3>
          <p className="text-xs text-slate-500 font-medium">Buy 1 Egyptian Sateen Set, get 15% off silk accessories.</p>
          <div className="pt-2 text-xs font-bold text-slate-700">Starts: Aug 1, 2026</div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
