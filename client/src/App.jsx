import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './context/AuthContext';
import store from './redux/store';

// Layout Elements
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Consumer Pages
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';

// Admin Wireframe Pages
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Products from './pages/Admin/Products/Products';
import Inventory from './pages/Admin/Inventory/Inventory';
import AddProduct from './pages/Admin/Inventory/AddProduct';
import Orders from './pages/Admin/Orders/Orders';
import Customers from './pages/Admin/Customers/Customers';
import Categories from './pages/Admin/Categories/Categories';
import Deliveries from './pages/Admin/Deliveries/Deliveries';
import Payments from './pages/Admin/Payments/Payments';
import Coupons from './pages/Admin/Coupons/Coupons';
import Reports from './pages/Admin/Reports/Reports';
import Reviews from './pages/Admin/Reviews/Reviews';
import Marketing from './pages/Admin/Marketing/Marketing';
import Settings from './pages/Admin/Settings/Settings';
import HelpCenter from './pages/Admin/HelpCenter/HelpCenter';

// Consumer Layout Wrapper
const ConsumerLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-white">
        {children}
      </div>
      <Footer />
    </div>
  );
};

// Admin Guard Middleware (with preview & credentials access)
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981]"></div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Consumer Pages */}
            <Route
              path="/"
              element={
                <ConsumerLayout>
                  <Shop />
                </ConsumerLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ConsumerLayout>
                  <ProductDetail />
                </ConsumerLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <ConsumerLayout>
                  <Cart />
                </ConsumerLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <ConsumerLayout>
                  <Checkout />
                </ConsumerLayout>
              }
            />

            {/* Auth Screens */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Wireframe Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><Dashboard /></AdminLayout></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminLayout><Products /></AdminLayout></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminLayout><Orders /></AdminLayout></AdminRoute>} />
            <Route path="/admin/customers" element={<AdminRoute><AdminLayout><Customers /></AdminLayout></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><AdminLayout><Categories /></AdminLayout></AdminRoute>} />
            <Route path="/admin/inventory" element={<AdminRoute><AdminLayout><Inventory /></AdminLayout></AdminRoute>} />
            <Route path="/admin/inventory/add" element={<AdminRoute><AdminLayout><AddProduct /></AdminLayout></AdminRoute>} />
            <Route path="/admin/upload" element={<AdminRoute><AdminLayout><AddProduct /></AdminLayout></AdminRoute>} />
            <Route path="/admin/inventory/edit/:id" element={<AdminRoute><AdminLayout><AddProduct /></AdminLayout></AdminRoute>} />
            <Route path="/admin/deliveries" element={<AdminRoute><AdminLayout><Deliveries /></AdminLayout></AdminRoute>} />
            <Route path="/admin/payments" element={<AdminRoute><AdminLayout><Payments /></AdminLayout></AdminRoute>} />
            <Route path="/admin/coupons" element={<AdminRoute><AdminLayout><Coupons /></AdminLayout></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><AdminLayout><Reports /></AdminLayout></AdminRoute>} />
            <Route path="/admin/reviews" element={<AdminRoute><AdminLayout><Reviews /></AdminLayout></AdminRoute>} />
            <Route path="/admin/marketing" element={<AdminRoute><AdminLayout><Marketing /></AdminLayout></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminLayout><Settings /></AdminLayout></AdminRoute>} />
            <Route path="/admin/help" element={<AdminRoute><AdminLayout><HelpCenter /></AdminLayout></AdminRoute>} />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
