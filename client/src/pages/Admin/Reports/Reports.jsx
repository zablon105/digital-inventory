import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const Reports = () => {
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales & Revenue Reports</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Export monthly transaction statements and inventory performance audits.</p>
        </div>

        <button
          onClick={() => setToastMsg('Sales report PDF downloaded!')}
          className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-[#10B981]/20"
        >
          <Download className="w-4 h-4" />
          Download PDF Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Gross Revenue</span>
          <h3 className="text-2xl font-bold text-slate-900">KSh 103,090</h3>
          <span className="text-xs font-bold text-[#10B981]">▲ 18% vs last month</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Units Sold</span>
          <h3 className="text-2xl font-bold text-slate-900">256 Units</h3>
          <span className="text-xs font-bold text-[#10B981]">▲ 12% growth</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Order Value</span>
          <h3 className="text-2xl font-bold text-slate-900">KSh 17,182</h3>
          <span className="text-xs font-bold text-[#10B981]">▲ 8% margin</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
