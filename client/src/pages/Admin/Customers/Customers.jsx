import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, UserCheck, Plus } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_CUSTOMERS = [
  { id: 'CUST-01', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+254 712 345 678', location: 'Nairobi', orders: 12, totalSpent: 145000, status: 'VIP Member' },
  { id: 'CUST-02', name: 'David Omondi', email: 'david.o@example.com', phone: '+254 722 987 654', location: 'Mombasa', orders: 6, totalSpent: 68000, status: 'Active' },
  { id: 'CUST-03', name: 'Elena Rostova', email: 'elena.r@example.com', phone: '+254 733 456 789', location: 'Nairobi', orders: 4, totalSpent: 42000, status: 'Active' },
  { id: 'CUST-04', name: 'Kipchoge Waweru', email: 'kip.w@example.com', phone: '+254 700 112 233', location: 'Nakuru', orders: 8, totalSpent: 89000, status: 'VIP Member' }
];

const Customers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Store Customers</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">View registered store clients, order metrics, and contact details.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#00C885]"
            />
          </div>

          <button
            onClick={() => setToastMsg('Customer invitation sent!')}
            className="bg-[#00C885] hover:bg-[#00B074] text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#00C885]/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00C885] to-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm">
                {c.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00C885]">
                {c.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{c.email}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs space-y-1 font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.location}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">{c.orders} Orders</span>
              <span className="text-slate-900">Ksh {c.totalSpent.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
