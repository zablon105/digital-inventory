import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_INVENTORY = [
  { id: '1', product: 'Nike Runner', currentStock: 2, minimum: 10, status: '🔴 Low' },
  { id: '2', product: 'Luxury Bedding', currentStock: 65, minimum: 20, status: '🟢 Good' },
  { id: '3', product: 'Leather Shoes', currentStock: 0, minimum: 15, status: '🔴 Out of Stock' }
];

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const filtered = inventory.filter(i => i.product.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Monitor stock thresholds and reorder warnings.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <button
            onClick={() => navigate('/admin/inventory/add')}
            className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#10B981]/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            + Product
          </button>
        </div>
      </div>

      {/* Wireframe Inventory Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Current Stock</th>
                <th className="py-4 px-6">Minimum</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{item.product}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{item.currentStock}</td>
                  <td className="py-4 px-6 text-slate-500 font-semibold">{item.minimum}</td>
                  <td className="py-4 px-6 font-bold">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
