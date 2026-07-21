import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Flame,
  Star
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Toast from '../../components/common/Toast';

// Mock catalog fallback items
const MOCK_PRODUCTS = [
  {
    _id: 'mock-1',
    name: 'Velocity Phantom Runner',
    category: 'Shoes',
    description: 'High-performance engineering meets luxury style in this lightweight runner with responsive mesh panels.',
    retailPrice: 18500,
    sku: 'LS-SH-001',
    currentStock: 45,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
    status: 'Published',
    isFeatured: true,
  },
  {
    _id: 'mock-2',
    name: 'Cloud-Touch Sateen Set',
    category: 'Bedding',
    description: 'Woven from long-staple organic cotton for a premium buttery-soft texture and deep restorative sleep.',
    retailPrice: 34000,
    sku: 'LS-BD-001',
    currentStock: 12,
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'],
    status: 'Published',
    isFeatured: true,
  },
  {
    _id: 'mock-3',
    name: 'Hand-Stitched Heirloom Loafer',
    category: 'Shoes',
    description: 'Classic penny loafer profile hand-stitched by Italian artisans from top-grain calfskin leather.',
    retailPrice: 24500,
    sku: 'LS-SH-002',
    currentStock: 8,
    images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509'],
    status: 'Published',
    isFeatured: true,
  },
  {
    _id: 'mock-4',
    name: 'Elements Linen Pillow Trio',
    category: 'Bedding',
    description: 'Breathable Belgian flax linen pillows in earthy organic tones with micro-fill cushion core.',
    retailPrice: 12500,
    sku: 'LS-BD-002',
    currentStock: 30,
    images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2'],
    status: 'Published',
    isFeatured: false,
  },
  {
    _id: 'mock-5',
    name: 'Apex Trail Pro Hybrid',
    category: 'Shoes',
    description: 'Waterproof multi-terrain hybrid hiking trainers engineered for athletic stability and grip.',
    retailPrice: 19500,
    sku: 'LS-SH-003',
    currentStock: 15,
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa'],
    status: 'Published',
    isFeatured: false,
  },
  {
    _id: 'mock-6',
    name: 'Midnight Silk Duvet',
    category: 'Bedding',
    description: 'Pure Mulberry silk filled duvet naturally temperature-regulating and hypoallergenic.',
    retailPrice: 48000,
    sku: 'LS-BD-003',
    currentStock: 5,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'],
    status: 'Published',
    isFeatured: false,
  }
];

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [toastMsg, setToastMsg] = useState('');
  
  // Filters State
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Parse Query Parameters
  const query = new URLSearchParams(location.search);
  const keywordQuery = query.get('keyword') || '';
  const categoryQuery = query.get('category') || '';

  useEffect(() => {
    if (categoryQuery) {
      setCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/products?page=${page}&sortBy=${sortBy}`;
      if (keywordQuery) url += `&keyword=${encodeURIComponent(keywordQuery)}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      
      const { data } = await api.get(url);
      
      if (!data.products || data.products.length === 0) {
        let filteredMock = MOCK_PRODUCTS.filter(p => p.status === 'Published');
        if (keywordQuery) {
          filteredMock = filteredMock.filter(p => p.name.toLowerCase().includes(keywordQuery.toLowerCase()));
        }
        if (category) {
          filteredMock = filteredMock.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        setProducts(filteredMock);
        setPages(1);
      } else {
        setProducts(data.products);
        setPages(data.pages);
      }
    } catch (err) {
      console.error('API fallback to local mock products', err);
      let filteredMock = MOCK_PRODUCTS;
      if (category) {
        filteredMock = filteredMock.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      setProducts(filteredMock);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keywordQuery, category, priceRange, sortBy, page]);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (item.currentStock <= 0) return;
    
    dispatch(addToCart({
      product: item._id,
      name: item.name,
      price: item.retailPrice,
      image: item.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      qty: 1,
      size: item.category === 'Shoes' ? 'US 9.0' : 'King',
      color: item.category === 'Shoes' ? 'Midnight Black' : 'Alabaster',
      category: item.category,
      currentStock: item.currentStock
    }));
    
    setToastMsg(`Successfully added ${item.name} to bag!`);
  };

  const scrollToCatalog = () => {
    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800 font-sans selection:bg-[#00C885] selection:text-white">
      
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      {/* 1. Full-Width High-Impact Hero Banner (Matching Screenshots) */}
      <section className="relative w-full min-h-[580px] bg-slate-950 text-white flex items-center justify-center overflow-hidden">
        {/* Background Overlay Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-[#00C885]/20 border border-[#00C885]/40 text-[#00C885] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            LuxeStep & Linen Collections
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Luxury Living Starts Here
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover bespoke Italian calfskin footwear and 800-thread-count organic sateen bedding crafted for your daily rhythm.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => { setCategory('Shoes'); scrollToCatalog(); }}
              className="bg-[#00C885] hover:bg-[#00B074] text-slate-950 font-bold px-7 py-3.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#00C885]/25 cursor-pointer transform active:scale-95"
            >
              Shop Footwear
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setCategory('Bedding'); scrollToCatalog(); }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold px-7 py-3.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer transform active:scale-95"
            >
              Explore Bedding & Linens
            </button>
          </div>

          {/* Hero 3-Card Visual Showcase Grid (Matching Screenshot 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 max-w-5xl mx-auto text-left">
            <div 
              onClick={() => { setCategory('Bedding'); scrollToCatalog(); }}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" 
                alt="Bedding"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase tracking-wider">Sanctuary</span>
                <h4 className="text-sm font-bold text-white">Sateen Bedroom Suites</h4>
              </div>
            </div>

            <div 
              onClick={() => { setCategory('Shoes'); scrollToCatalog(); }}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1533867617858-e7b97e060509" 
                alt="Shoes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase tracking-wider">Handcrafted</span>
                <h4 className="text-sm font-bold text-white">Italian Calfskin Loafers</h4>
              </div>
            </div>

            <div 
              onClick={() => scrollToCatalog()}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
                alt="Luxe Interior"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase tracking-wider">Atmosphere</span>
                <h4 className="text-sm font-bold text-white">Warm Luxury Interiors</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* 2. Shoes Visual Showcase Grid (Matching Screenshot 2) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-[#00C885] tracking-widest uppercase">Signature Line</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">Handcrafted Footwear Collection</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Engineered for active performance, urban transit, and bespoke formality.</p>
            </div>
            <button
              onClick={() => { setCategory('Shoes'); scrollToCatalog(); }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#00C885] hover:underline cursor-pointer"
            >
              View All Shoes ({MOCK_PRODUCTS.filter(p=>p.category==='Shoes').length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
                alt="Shoe 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Urban Performance</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Velocity Phantom Runner</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 18,500</span>
              </div>
            </div>

            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" 
                alt="Shoe 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Multi-Terrain</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Apex Trail Pro Hybrid</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 19,500</span>
              </div>
            </div>

            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1533867617858-e7b97e060509" 
                alt="Shoe 3" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Artisan Calfskin</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Hand-Stitched Heirloom Loafer</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 24,500</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Bedding Visual Showcase Grid (Matching Screenshot 2) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-[#00C885] tracking-widest uppercase">Pure Rest</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">Sanctuary Bedding & Linens</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">800-thread-count organic sateen and pure Belgian flax linens for deep comfort.</p>
            </div>
            <button
              onClick={() => { setCategory('Bedding'); scrollToCatalog(); }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#00C885] hover:underline cursor-pointer"
            >
              View All Bedding ({MOCK_PRODUCTS.filter(p=>p.category==='Bedding').length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" 
                alt="Bedding 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Organic Sateen</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Cloud-Touch Sateen Set</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 34,000</span>
              </div>
            </div>

            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" 
                alt="Bedding 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Belgian Flax</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Organic Linen Duvet Set</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 48,000</span>
              </div>
            </div>

            <div className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2" 
                alt="Bedding 3" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#00C885] uppercase">Micro-Fill Core</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Elements Linen Pillow Trio</h3>
                <span className="text-xs font-bold text-slate-300 mt-1">Ksh 12,500</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Mixed Inventory Emotional Connection Section (Matching Screenshot 3 & 4) */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#00C885] tracking-widest uppercase">Editorial Lifestyle</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">Bespoke Storefront Experience</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">It creates an emotional connection before people even browse products.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Silk & Sateen Morning Lounge</h4>
              <p className="text-xs text-slate-400">Silky textures designed to elevate restful mornings.</p>
            </div>

            <div className="space-y-3">
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Warm Contemporary Spaces</h4>
              <p className="text-xs text-slate-400">Warm ambient tones that blend shoes and luxury home decor.</p>
            </div>

            <div className="space-y-3">
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src="https://images.unsplash.com/photo-1533867617858-e7b97e060509" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Artisan Leather Craftsmanship</h4>
              <p className="text-xs text-slate-400">Hand-finished details made by master craftsmen.</p>
            </div>
          </div>
        </section>

        {/* 5. Product Catalog with Soft Shadows & Crisp Cards */}
        <section id="catalog-grid" className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Curated Store Catalog</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Browse high-performance footwear and organic bedding items available in store.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {['', 'Shoes', 'Bedding'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === '' ? 'All Items' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid with Soft Shadows */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl h-80"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-500 font-medium text-xs">No items match your selected category filter.</p>
              <button
                onClick={() => setCategory('')}
                className="mt-3 text-xs font-bold text-[#00C885] hover:underline cursor-pointer"
              >
                Reset catalog filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col h-full"
                >
                  {/* Badges */}
                  {item.currentStock <= 0 ? (
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg z-10 uppercase tracking-widest shadow-sm">
                      Out of Stock
                    </span>
                  ) : item.isFeatured ? (
                    <span className="absolute top-3 left-3 bg-[#00C885] text-slate-950 text-[9px] font-bold px-2.5 py-1 rounded-lg z-10 uppercase tracking-widest shadow-sm flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Best Seller
                    </span>
                  ) : null}

                  {/* Image */}
                  <div className="aspect-square bg-slate-50 overflow-hidden relative shrink-0">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] tracking-widest text-[#00C885] font-bold uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 truncate mt-1 group-hover:text-[#00C885] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-slate-400 block font-semibold">Price</span>
                        <span className="text-base font-bold text-slate-900">
                          Ksh {Number(item.retailPrice * (item.retailPrice < 1000 ? 100 : 1)).toLocaleString()}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        disabled={item.currentStock <= 0}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                          item.currentStock <= 0
                            ? 'bg-slate-100 text-slate-300'
                            : 'bg-[#00C885] text-slate-950 hover:bg-[#00B074] shadow-md shadow-[#00C885]/20'
                        }`}
                        title="Add to Shopping Bag"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default Shop;
