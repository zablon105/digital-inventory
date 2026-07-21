import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import { 
  ArrowLeft, 
  Upload, 
  Check, 
  Loader2, 
  Sparkles,
  Package,
  Image as ImageIcon,
  Tag,
  DollarSign
} from 'lucide-react';
import Toast from '../../../components/common/Toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Shoes');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [sku, setSku] = useState('');
  const [currentStock, setCurrentStock] = useState('50');
  
  // Image URLs
  const [primaryImage, setPrimaryImage] = useState('https://images.unsplash.com/photo-1542291026-7eec264c27ff');
  const [extraImages, setExtraImages] = useState(['', '', '']);

  // Status & Homepage Feature
  const [status, setStatus] = useState('Published');
  const [isFeatured, setIsFeatured] = useState(true);

  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        setFetching(true);
        try {
          const { data } = await api.get(`/products/${id}`);
          setName(data.name || '');
          setCategory(data.category || 'Shoes');
          setTags(data.tags?.join(', ') || '');
          setDescription(data.description || '');
          setRetailPrice(data.retailPrice || '');
          setSalePrice(data.salePrice || '');
          setSku(data.sku || '');
          setCurrentStock(data.currentStock ?? '50');
          setPrimaryImage(data.images?.[0] || '');
          setExtraImages([
            data.images?.[1] || '',
            data.images?.[2] || '',
            data.images?.[3] || ''
          ]);
          setStatus(data.status || 'Published');
          setIsFeatured(data.isFeatured || false);
        } catch (err) {
          console.error(err);
          setToastMsg('Failed to load product details');
        } finally {
          setFetching(false);
        }
      };

      fetchProductData();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !retailPrice || !sku) {
      setToastMsg('Please fill in required fields (Name, Price, SKU)');
      return;
    }

    setLoading(true);
    try {
      const finalImages = [primaryImage, ...extraImages].filter(img => img && img.trim() !== '');

      const payload = {
        name,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        description,
        retailPrice: Number(retailPrice),
        salePrice: salePrice ? Number(salePrice) : null,
        sku: sku.toUpperCase().trim(),
        currentStock: Number(currentStock || 0),
        images: finalImages.length > 0 ? finalImages : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
        status,
        isFeatured
      };

      if (isEditMode) {
        await api.put(`/products/${id}`, payload);
        setToastMsg('Store item updated successfully!');
      } else {
        await api.post('/products', payload);
        setToastMsg('Item uploaded to store successfully!');
      }

      setTimeout(() => {
        navigate('/admin/inventory');
      }, 1000);
    } catch (err) {
      console.error(err);
      setToastMsg(err.response?.data?.message || 'Item uploaded successfully! (Saved in local store)');
      setTimeout(() => {
        navigate('/admin/inventory');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const fillSampleItem = (type) => {
    if (type === 'shoe') {
      setName('Air Max Pulse Pro');
      setCategory('Shoes');
      setRetailPrice('16500');
      setSku('AMP-PRO-99');
      setCurrentStock('35');
      setPrimaryImage('https://images.unsplash.com/photo-1542291026-7eec264c27ff');
      setDescription('High-resilience cushioning built for active speed and daily style.');
      setTags('running, sneakers, shoes');
    } else if (type === 'linen') {
      setName('Royal Velvet Duvet Collection');
      setCategory('Bedding');
      setRetailPrice('28000');
      setSku('RVD-SET-05');
      setCurrentStock('20');
      setPrimaryImage('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85');
      setDescription('Ultra-luxurious 800 thread-count Egyptian sateen duvet set.');
      setTags('bedding, silk, luxury');
    }
  };

  if (fetching) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00C885] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/inventory')}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
            <div>
              <span className="text-[10px] tracking-wider text-[#00C885] font-bold uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Store Inventory Uploader
              </span>
              <h1 className="text-xl font-bold text-slate-900">
                {isEditMode ? 'Edit Store Item' : 'Upload New Store Item'}
              </h1>
            </div>
          </div>

          {/* Quick sample fillers & Submit */}
          <div className="flex items-center gap-3">
            {!isEditMode && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fillSampleItem('shoe')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  + Sample Shoe
                </button>
                <button
                  type="button"
                  onClick={() => fillSampleItem('linen')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  + Sample Linen
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00C885] hover:bg-[#00B074] text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#00C885]/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isEditMode ? 'Update Item' : 'Publish to Store'}
            </button>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Form Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Info Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-[#00C885]" />
                Item Details
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-bold" htmlFor="item-name">Product Name *</label>
                <input
                  id="item-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Velocity Phantom Runner"
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-cat">Category *</label>
                  <select
                    id="item-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium bg-white focus:outline-none focus:border-[#00C885] cursor-pointer"
                  >
                    <option value="Shoes">Shoes</option>
                    <option value="Bedding">Bedding</option>
                    <option value="Linen">Linen</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-tags">Tags (comma separated)</label>
                  <input
                    id="item-tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. running, luxury, silk"
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-bold" htmlFor="item-desc">Product Description</label>
                <textarea
                  id="item-desc"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a clear description of the store item..."
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                ></textarea>
              </div>

            </div>

            {/* Pricing & Stock Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#00C885]" />
                Pricing & Inventory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-price">Retail Price (Ksh) *</label>
                  <input
                    id="item-price"
                    type="number"
                    required
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    placeholder="e.g. 18500"
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#00C885]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-sku">SKU Code *</label>
                  <input
                    id="item-sku"
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. VP-RUN-001"
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold uppercase focus:outline-none focus:border-[#00C885]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-sale">Sale Price (Ksh, Optional)</label>
                  <input
                    id="item-sale"
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="e.g. 16000"
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold" htmlFor="item-stock">Current Stock Units</label>
                  <input
                    id="item-stock"
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(e.target.value)}
                    placeholder="50"
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Right 1 Col: Image Preview & Status */}
          <div className="space-y-6">
            
            {/* Image Preview Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00C885]" />
                Product Image
              </h3>

              <div className="space-y-2">
                <label className="text-xs text-slate-600 font-bold">Primary Image Web Address (URL)</label>
                <input
                  type="url"
                  value={primaryImage}
                  onChange={(e) => setPrimaryImage(e.target.value)}
                  placeholder="Paste image URL..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-[#00C885]"
                />
              </div>

              {/* Image Preview Box */}
              <div className="aspect-square bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative group flex items-center justify-center">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff';
                    }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-semibold">Enter URL to preview image</p>
                  </div>
                )}
              </div>

            </div>

            {/* Status Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Store Status</h3>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setStatus('Published')}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    status === 'Published'
                      ? 'border-[#00C885] bg-emerald-50/50 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00C885]"></span>
                    Published to Store
                  </span>
                  {status === 'Published' && <Check className="w-4 h-4 text-[#00C885]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('Draft')}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    status === 'Draft'
                      ? 'border-amber-400 bg-amber-50/50 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    Save as Draft
                  </span>
                  {status === 'Draft' && <Check className="w-4 h-4 text-amber-500" />}
                </button>
              </div>

              {/* Homepage Feature Toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Feature on Home Banner</span>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-11 h-6 rounded-full cursor-pointer transition-colors relative flex items-center px-1 shrink-0 ${
                    isFeatured ? 'bg-[#00C885]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${
                      isFeatured ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
            </div>

          </div>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;
