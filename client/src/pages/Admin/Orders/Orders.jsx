import React, { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_ORDERS = [
  { id: '#1203', customer: 'James', payment: 'Paid', status: 'Delivered', amount: 'KSh 12,000' },
  { id: '#1202', customer: 'Brian', payment: 'Pending', status: 'Processing', amount: 'KSh 18,500' },
  { id: '#1201', customer: 'Alice', payment: 'Paid', status: 'Delivered', amount: 'KSh 22,000' }
];

const Orders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const filtered = orders.filter(o => o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Track customer orders, payments, and delivery fulfillments.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <button
            onClick={() => setToastMsg('Filter options opened')}
            className="bg-white border border-slate-200 text-slate-700 font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer hover:bg-slate-50"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Wireframe Orders List Cards */}
      <div className="space-y-3">
        {filtered.map((ord) => (
          <div key={ord.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900 text-base">{ord.id}</span>
              <span className="font-bold text-slate-700 text-sm">{ord.customer}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                ord.payment === 'Paid' ? 'bg-emerald-50 text-[#10B981]' : 'bg-amber-50 text-amber-600'
              }`}>
                {ord.payment}
              </span>

              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700">
                {ord.status}
              </span>

              <span className="font-bold text-slate-900 text-sm">{ord.amount}</span>

              <button
                onClick={() => setToastMsg(`Viewing details for order ${ord.id}`)}
                className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-1.5 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
