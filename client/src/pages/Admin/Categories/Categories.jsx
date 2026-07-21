import React, { useState } from 'react';
import { FolderPlus, Tag, Trash2 } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Shoes', itemCount: 120, status: 'Active' },
  { id: '2', name: 'Bedding', itemCount: 65, status: 'Active' },
  { id: '3', name: 'Outdoor', itemCount: 30, status: 'Active' },
  { id: '4', name: 'Casual', itemCount: 25, status: 'Active' }
];

const Categories = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    setCategories([...categories, { id: Date.now().toString(), name: newCatName, itemCount: 0, status: 'Active' }]);
    setToastMsg(`Category "${newCatName}" created!`);
    setNewCatName('');
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    setToastMsg('Category deleted.');
  };

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Categories</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Organize store items into structured categories.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="Category name (e.g. Footwear Accessories)..."
          className="flex-1 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
        />
        <button
          type="submit"
          className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#10B981]/20"
        >
          <FolderPlus className="w-4 h-4" />
          📂 Add Category
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#10B981]" />
                <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{cat.itemCount} items listed</p>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
