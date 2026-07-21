import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Eye, ShoppingCart } from 'lucide-react';

const Analytics = () => {
  const [period, setPeriod] = useState('30d');

  const trafficData = [
    { day: 'Week 1', visits: 1200, conversions: 45 },
    { day: 'Week 2', visits: 1900, conversions: 80 },
    { day: 'Week 3', visits: 2400, conversions: 110 },
    { day: 'Week 4', visits: 3100, conversions: 160 }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Insights</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Deep dive into store visitor engagement, conversions, and growth metrics.</p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-[#00C885]"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Store Visits</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">8,600</h3>
            <span className="text-xs text-[#00C885] font-bold mt-1 inline-block">↗ +24% vs last month</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">4.2%</h3>
            <span className="text-xs text-[#00C885] font-bold mt-1 inline-block">↗ +1.8% industry avg</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00C885] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Cart Abandonment</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">18.5%</h3>
            <span className="text-xs text-[#00C885] font-bold mt-1 inline-block">↘ -3.2% lower</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900">Traffic & Conversion Growth</h3>
        <div className="h-72 w-full text-xs font-medium">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ backgroundColor: '#0B1320', borderRadius: '12px', color: '#fff', border: 'none' }} />
              <Bar dataKey="visits" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Store Visits" />
              <Bar dataKey="conversions" fill="#00C885" radius={[6, 6, 0, 0]} name="Orders Placed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
