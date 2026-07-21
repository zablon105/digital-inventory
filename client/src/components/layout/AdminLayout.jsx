import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderTree, 
  Boxes, 
  Truck, 
  CreditCard, 
  Percent, 
  BarChart3, 
  Star, 
  Megaphone, 
  Settings, 
  LogOut,
  Search,
  Bell,
  PlusCircle,
  X,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Exact 14 Sidebar Navigation Items from Wireframe
  const sidebarItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart, badge: 3 },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Deliveries', path: '/admin/deliveries', icon: Truck },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Coupons', path: '/admin/coupons', icon: Percent },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Marketing', path: '/admin/marketing', icon: Megaphone },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/admin/products?search=${encodeURIComponent(searchVal)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 antialiased selection:bg-[#10B981] selection:text-white">
      
      {/* Navy Sidebar (#0F172A) */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 shrink-0 flex flex-col justify-between p-4 min-h-screen border-r border-slate-800 shadow-xl">
        <div className="space-y-5">
          
          {/* Logo Branding */}
          <div 
            onClick={() => navigate('/admin/dashboard')}
            className="px-2 pt-2 pb-3 flex items-center gap-3 border-b border-slate-800/80 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-slate-950 font-bold flex items-center justify-center text-lg shadow-lg shadow-[#10B981]/25 shrink-0">
              🏪
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white tracking-tight truncate">
                LuxeStep & Linen
              </h1>
              <p className="text-[10px] text-[#10B981] tracking-wider font-semibold uppercase">
                Admin Console
              </p>
            </div>
          </div>

          {/* Quick Product Add */}
          <button
            onClick={() => navigate('/admin/inventory/add')}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-[#10B981]/20 transition-all cursor-pointer transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            + Product
          </button>

          {/* Sidebar Navigation */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] no-scrollbar pr-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.name === 'Inventory' && location.pathname.startsWith('/admin/inventory')) ||
                (item.name === 'Products' && location.pathname === '/admin/products');
              
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#10B981] text-slate-950 font-bold shadow-md shadow-[#10B981]/20 translate-x-1'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-[#10B981] text-slate-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🚪 Logout Button */}
        <div className="pt-3 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl font-bold text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>🚪 Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between shadow-xs z-20">
          
          {/* Logo & Search */}
          <div className="flex items-center gap-6 flex-1 max-w-lg">
            <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">LOGO</span>
            
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-slate-100/80 border border-slate-200/80 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </form>
          </div>

          {/* Right Header Controls: Notifications 🔔, Settings ⚙️, Admin profile 👤 */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell 🔔 */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                title="Notifications 🔔"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h4 className="font-bold text-slate-900">Notifications 🔔</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-emerald-50 rounded-xl">
                      <p className="font-bold text-slate-900">New Order #1203</p>
                      <p className="text-[10px] text-slate-500">James paid KSh 12,000</p>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-xl">
                      <p className="font-bold text-slate-900">Low Stock Warning</p>
                      <p className="text-[10px] text-slate-500">Running Shoes (Only 2 Left)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings ⚙️ */}
            <button
              onClick={() => navigate('/admin/settings')}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              title="Settings ⚙️"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* Profile 👤 Admin */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200/80 cursor-pointer transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 font-bold flex items-center justify-center text-xs">
                  👤
                </div>
                <span className="text-xs font-bold text-slate-900">Admin</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 text-xs space-y-2">
                  <div className="px-2 py-1 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{user?.name || 'Admin'}</p>
                    <p className="text-[10px] text-slate-400">{user?.email || 'admin@sewiyjnr.com'}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/admin/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    ⚙️ Store Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
