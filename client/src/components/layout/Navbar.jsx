import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, User, LogOut, LayoutDashboard, Database } from 'lucide-react';
import CartDrawer from '../cart/CartDrawer';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [searchVal, setSearchVal] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleCategoryNav = (cat) => {
    navigate(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 selection:bg-gold selection:text-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl md:text-2xl font-bold font-serif text-dark-bg tracking-wide">
                LuxeStep & Linen
              </Link>
              
              {/* Category Links */}
              <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500 font-display">
                <Link to="/" className="hover:text-gold transition-colors">All Collections</Link>
                <button onClick={() => handleCategoryNav('Shoes')} className="hover:text-gold transition-colors cursor-pointer">Shoes</button>
                <button onClick={() => handleCategoryNav('Bedding')} className="hover:text-gold transition-colors cursor-pointer">Bedding</button>
              </div>
            </div>

            {/* Right-side Utilities */}
            <div className="flex items-center gap-4">
              {/* Search form */}
              <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search premium collections..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-xs text-dark-bg rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-gold w-56 md:w-64 transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-bg cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Admin Portal Shortcut Link */}
              <Link
                to="/admin/dashboard"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-[#00C885]/10 text-[#00C885] hover:bg-[#00C885]/20 px-3 py-1.5 rounded-full transition-all"
                title="Admin Dashboard Portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>

              {/* User Session */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    {user.name} ({user.role})
                  </span>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-brand-red cursor-pointer rounded-full hover:bg-gray-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-gray-500 hover:text-gold rounded-full hover:bg-gray-50 transition-colors"
                  title="Sign In"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Shopping Bag Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 text-gray-500 hover:text-gold rounded-full hover:bg-gray-50 transition-colors relative cursor-pointer"
                title="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slideout shopping bag drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
