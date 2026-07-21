import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Minus, ArrowLeft, ShieldCheck, Truck, ShoppingBag, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Toast from '../../components/common/Toast';

// Same mock fallback database for mapping mock route detail pages
const MOCK_PRODUCTS = [
  {
    _id: 'mock-1',
    name: 'Velocity Phantom Runner',
    category: 'Shoes',
    description: 'High-performance engineering meets luxury style in this lightweight runner. Engineered with ultra-responsive mesh panels and structured support pillars to cushion impact, while calfskin leather overlays ensure an elevated, modern finish. Perfect for daily transit and active tracks.',
    retailPrice: 185.00,
    sku: 'LS-SH-001',
    currentStock: 45,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509'
    ],
    status: 'Published',
  },
  {
    _id: 'mock-2',
    name: 'Cloud-Touch Sateen Set',
    category: 'Bedding',
    description: 'Woven from long-staple organic cotton for a premium buttery-soft texture. Pre-washed for maximum breathability and tailored with a clean double-stitch border. Includes one flat sheet, one fitted sheet, and two oxford pillowcases.',
    retailPrice: 240.00,
    sku: 'LS-BD-001',
    currentStock: 12,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2'
    ],
    status: 'Published',
  },
  {
    _id: 'mock-3',
    name: 'Hand-Stitched Heirloom Loafer',
    category: 'Shoes',
    description: 'Classic penny loafer profile hand-stitched by Italian artisans from top-grain calfskin leather. Featuring a stacked leather heel, soft leather lining for barefoot comfort, and a durable rubber insert sole.',
    retailPrice: 425.00,
    sku: 'LS-SH-002',
    currentStock: 8,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
    ],
    status: 'Published',
  },
  {
    _id: 'mock-4',
    name: 'Elements Linen Pillow Trio',
    category: 'Bedding',
    description: 'Breathable Belgian flax linen pillows in earthy organic tones. Hypoallergenic micro-fill cushion wrapped in woven flax cases with elegant wood toggle enclosures.',
    retailPrice: 125.00,
    sku: 'LS-BD-002',
    currentStock: 30,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    ],
    status: 'Published',
  },
  {
    _id: 'mock-5',
    name: 'Apex Trail Pro',
    category: 'Shoes',
    description: 'Waterproof multi-terrain hybrid hiking trainers for athletic stability. Rugged lug outer sole, speed-lacing hooks, and moisture-wicking linings.',
    retailPrice: 185.00,
    sku: 'LS-SH-003',
    currentStock: 15,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
    ],
    status: 'Published',
  },
  {
    _id: 'mock-6',
    name: 'Midnight Silk Duvet',
    category: 'Bedding',
    description: 'Pure Mulberry silk filled duvet naturally temperature-regulating and hypoallergenic. Encased in a 400 thread-count cotton shell with corner loops.',
    retailPrice: 565.00,
    sku: 'LS-BD-003',
    currentStock: 0,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    ],
    status: 'Published',
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [qty, setQty] = useState(1);
  const [toastMsg, setToastMsg] = useState('');

  // Sizing and Color selections
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const sizes = product?.category === 'Shoes'
    ? ['US 8.0', 'US 9.0', 'US 10.0', 'US 11.0', 'US 12.0']
    : ['Queen', 'King', 'Cal King'];

  const colors = product?.category === 'Shoes'
    ? ['Midnight Black', 'Slate Grey', 'Pearl White']
    : ['Alabaster', 'Stone Linen', 'Oatmeal'];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (id.startsWith('mock-')) {
          const mock = MOCK_PRODUCTS.find((p) => p._id === id);
          if (mock) {
            setProduct(mock);
            setActiveImage(mock.images[0]);
            setSelectedSize(mock.category === 'Shoes' ? 'US 9.0' : 'King');
            setSelectedColor(mock.category === 'Shoes' ? 'Midnight Black' : 'Alabaster');
          } else {
            navigate('/');
          }
        } else {
          const { data } = await api.get(`/products/${id}`);
          setProduct(data);
          setActiveImage(data.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff');
          setSelectedSize(data.category === 'Shoes' ? 'US 9.0' : 'King');
          setSelectedColor(data.category === 'Shoes' ? 'Midnight Black' : 'Alabaster');
        }
      } catch (err) {
        console.error('Failed to load product', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleQtyChange = (val) => {
    const newQty = qty + val;
    if (newQty >= 1 && newQty <= (product.currentStock || 99)) {
      setQty(newQty);
    }
  };

  const handleAddToBag = () => {
    if (product.currentStock <= 0) return;

    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.retailPrice,
      image: product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      qty,
      size: selectedSize,
      color: selectedColor,
      category: product.category,
      currentStock: product.currentStock
    }));

    setToastMsg(`Added ${qty} item(s) to your shopping bag.`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen text-dark-bg selection:bg-gold selection:text-dark-bg font-display py-8">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Go Back button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-dark-bg transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to collections
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Visual Images Column */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.currentStock <= 0 && (
                <span className="absolute top-4 left-4 bg-dark-bg text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Sold Out
                </span>
              )}
            </div>

            {/* Thumbnails row */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer shrink-0 transition-all ${
                      activeImage === img ? 'border-gold shadow-sm ring-1 ring-gold/20' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-gold uppercase flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {product.category} / PREMIUM
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-dark-bg">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
            </div>

            {/* Prices */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-dark-bg">
                Ksh {(product.retailPrice * (product.retailPrice < 1000 ? 100 : 1)).toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="text-sm text-gray-400 line-through">
                  Ksh {(product.salePrice * (product.salePrice < 1000 ? 100 : 1)).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed pt-2 border-t border-gray-50">
              {product.description}
            </p>

            {/* Sizing selection */}
            <div className="space-y-3 pt-4 border-t border-gray-50">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Select Size</span>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-4 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                      selectedSize === sz
                        ? 'bg-gold border-gold text-dark-bg'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Select Color</span>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`py-2 px-4 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                      selectedColor === c
                        ? 'bg-gold border-gold text-dark-bg'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls and Add to Bag */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
              <div className="flex items-center border border-gray-200 rounded-lg py-2.5 px-3 bg-gray-50/50">
                <button
                  onClick={() => handleQtyChange(-1)}
                  disabled={qty <= 1}
                  className="p-1 text-gray-500 hover:text-dark-bg cursor-pointer disabled:opacity-30"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold text-sm w-10 text-center select-none">{qty}</span>
                <button
                  onClick={() => handleQtyChange(1)}
                  disabled={qty >= (product.currentStock || 99)}
                  className="p-1 text-gray-500 hover:text-dark-bg cursor-pointer disabled:opacity-30"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                disabled={product.currentStock <= 0}
                className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3.5 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-40"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {product.currentStock <= 0 ? 'Sold Out' : 'Add to Shopping Bag'}
              </button>
            </div>

            {/* Inventory Alerts indicator */}
            {product.currentStock > 0 && product.currentStock <= (product.lowStockThreshold || 10) && (
              <p className="text-xs text-brand-red font-semibold animate-pulse">
                ⚠️ Low stock alert: Only {product.currentStock} units remaining!
              </p>
            )}

            {/* Benefits cards */}
            <div className="grid grid-cols-2 gap-4 pt-8 text-[11px] text-gray-500">
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <Truck className="w-4 h-4 text-gold" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Bespoke Authenticity</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
