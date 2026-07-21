import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit3, Trash2 } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_PRODUCTS = [
  { id: '1', emoji: '👟', name: 'Nike Runner', category: 'Shoes', stock: 24, price: 12000 },
  { id: '2', emoji: '👞', name: 'Leather Loafer', category: 'Shoes', stock: 12, price: 18500 },
  { id: '3', emoji: '🛏', name: 'Luxury Bedding', category: 'Bedding', stock: 56, price: 25000 },
  { id: '4', emoji: '🛏', name: 'Pillow', category: 'Bedding', stock: 120, price: 4000 }
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setToastMsg('Product deleted successfully');
  };

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Manage all items published to your store.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Product..."
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
            + Add Product
          </button>
        </div>
      </div>

      {/* Wireframe Products Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">IMAGE</th>
                <th className="py-4 px-6">PRODUCT</th>
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">STOCK</th>
                <th className="py-4 px-6">PRICE</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 text-xl">{item.emoji}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{item.name}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">{item.stock}</td>
                  <td className="py-4 px-6 font-bold text-[#10B981]">KSh {item.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button 
                      onClick={() => navigate('/admin/inventory/add')} 
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
