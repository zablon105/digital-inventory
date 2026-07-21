import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingBag, 
  Users, 
  Package, 
  Star, 
  PlusCircle, 
  FolderPlus, 
  Ticket, 
  Boxes, 
  BarChart3,
  UserPlus,
  ShoppingCart
} from 'lucide-react';
import Toast from '../../../components/common/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  // Revenue chart data matching wireframe curve
  const revenueChartData = [
    { day: 'Mon', revenue: 200 },
    { day: 'Tue', revenue: 350 },
    { day: 'Wed', revenue: 500 },
    { day: 'Thu', revenue: 650 },
    { day: 'Fri', revenue: 780 },
    { day: 'Sat', revenue: 850 },
    { day: 'Sun', revenue: 980 },
  ];

  // Donut chart category data matching wireframe (Shoes 45%, Bedding 30%, Outdoor 15%, Casual 10%)
  const categoryData = [
    { name: 'Shoes', value: 45, color: '#10B981' },
    { name: 'Bedding', value: 30, color: '#3B82F6' },
    { name: 'Outdoor', value: 15, color: '#F59E0B' },
    { name: 'Casual', value: 10, color: '#6366F1' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      {/* 1. Welcome Banner Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, Admin 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Here's what's happening in your store today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200/60">
            Tuesday, 21 July 2026
          </span>

          <button
            onClick={() => navigate('/admin/inventory/add')}
            className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#10B981]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            + Product
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Stat Cards (Matching Wireframe) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Revenue */}
        <div 
          onClick={() => navigate('/admin/reports')}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-400 uppercase block">Revenue</span>
          <div className="text-lg font-bold text-slate-900 mt-1">KSh 103,090</div>
          <span className="text-[11px] font-bold text-[#10B981] mt-1 inline-block">▲18%</span>
        </div>

        {/* Orders */}
        <div 
          onClick={() => navigate('/admin/orders')}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-400 uppercase block">Orders</span>
          <div className="text-lg font-bold text-slate-900 mt-1">256</div>
          <span className="text-[11px] font-bold text-[#10B981] mt-1 inline-block">▲12%</span>
        </div>

        {/* Customers */}
        <div 
          onClick={() => navigate('/admin/customers')}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-400 uppercase block">Customers</span>
          <div className="text-lg font-bold text-slate-900 mt-1">1,245</div>
          <span className="text-[11px] font-bold text-[#10B981] mt-1 inline-block">▲8%</span>
        </div>

        {/* Products */}
        <div 
          onClick={() => navigate('/admin/products')}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-400 uppercase block">Products</span>
          <div className="text-lg font-bold text-slate-900 mt-1">186</div>
          <span className="text-[11px] font-bold text-[#10B981] mt-1 inline-block">+5</span>
        </div>

        {/* Low Stock */}
        <div 
          onClick={() => navigate('/admin/inventory')}
          className="bg-white border border-rose-200/80 bg-rose-50/20 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-xs font-bold text-rose-500 uppercase block">Low Stock</span>
          <div className="text-lg font-bold text-rose-600 mt-1">12</div>
          <span className="text-[11px] font-bold text-rose-500 mt-1 inline-block">Needs attention</span>
        </div>

      </div>

      {/* 3. Revenue Analytics & Sales by Category Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Analytics Chart (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Revenue Analytics</h3>
          <div className="h-64 w-full text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  formatter={(val) => [`KSh ${(val * 160).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Donut Chart (Right 1 col) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-base text-slate-900">Sales by Category</h3>
          
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-slate-700">{cat.name}</span>
                </div>
                <span className="font-bold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Top Selling Products & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Selling Products */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Top Selling Products</h3>
          <div className="divide-y divide-slate-100 text-xs font-medium space-y-3">
            {[
              { icon: '👟', name: 'Nike Runner', sales: '245 Sold' },
              { icon: '👞', name: 'Leather Loafer', sales: '178 Sold' },
              { icon: '🛏', name: 'Linen Set', sales: '150 Sold' }
            ].map((p, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <span className="font-bold text-slate-900">{p.name}</span>
                </div>
                <span className="font-bold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {p.sales}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Recent Orders</h3>
          <div className="divide-y divide-slate-100 text-xs font-medium space-y-3">
            {[
              { id: '#1203', customer: 'James', status: 'Paid', statusBg: 'bg-emerald-50 text-[#10B981]', amount: 'KSh 12,000' },
              { id: '#1202', customer: 'Brian', status: 'Pending', statusBg: 'bg-amber-50 text-amber-600', amount: 'KSh 18,500' },
              { id: '#1201', customer: 'Alice', status: 'Delivered', statusBg: 'bg-blue-50 text-blue-600', amount: 'KSh 22,000' }
            ].map((ord) => (
              <div key={ord.id} className="pt-3 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{ord.id}</span>
                  <span className="text-slate-600">{ord.customer}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ord.statusBg}`}>
                    {ord.status}
                  </span>
                  <span className="font-bold text-slate-900">{ord.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Inventory Alerts & Customer Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Inventory Alerts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Inventory Alerts</h3>
          <div className="divide-y divide-slate-100 text-xs font-medium space-y-3">
            {[
              { dot: '🔴', name: 'Running Shoes', alert: 'Only 2 Left' },
              { dot: '🟠', name: 'Luxury Pillow', alert: 'Only 5 Left' },
              { dot: '🔴', name: 'Queen Mattress', alert: 'Out of Stock' }
            ].map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{item.dot}</span>
                  <span className="font-bold text-slate-900">{item.name}</span>
                </div>
                <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  {item.alert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Activity */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Customer Activity</h3>
          <div className="divide-y divide-slate-100 text-xs font-medium space-y-3">
            {[
              { icon: '👤', text: 'David registered today' },
              { icon: '⭐', text: 'Mary left a review' },
              { icon: '🛒', text: 'Peter placed an order' }
            ].map((act, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                <span className="text-base">{act.icon}</span>
                <span className="font-semibold text-slate-700">{act.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. Latest Reviews & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Latest Reviews */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Latest Reviews</h3>
          <div className="divide-y divide-slate-100 text-xs font-medium space-y-3">
            {[
              { stars: '⭐⭐⭐⭐⭐', text: 'Amazing shoes!' },
              { stars: '⭐⭐⭐⭐', text: 'Nice bedding' },
              { stars: '⭐⭐⭐⭐⭐', text: 'Fast delivery' }
            ].map((rev, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                <span>{rev.stars}</span>
                <span className="font-semibold text-slate-800">{rev.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/admin/inventory/add')}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#10B981] hover:text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#10B981]" />
              ➕ Add Product
            </button>
            <button
              onClick={() => navigate('/admin/categories')}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#10B981] hover:text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-blue-500" />
              📂 Add Category
            </button>
            <button
              onClick={() => navigate('/admin/coupons')}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#10B981] hover:text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-amber-500" />
              🎟 Create Coupon
            </button>
            <button
              onClick={() => navigate('/admin/inventory')}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#10B981] hover:text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Boxes className="w-4 h-4 text-purple-500" />
              📦 View Inventory
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800 hover:bg-[#10B981] hover:text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              📊 Sales Report
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
