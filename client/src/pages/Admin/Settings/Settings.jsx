import React, { useState } from 'react';
import { Save, Store, Phone, Mail, MapPin, DollarSign, Moon, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const Settings = () => {
  const [storeName, setStoreName] = useState('LuxeStep & Linen');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1542291026-7eec264c27ff');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [email, setEmail] = useState('admin@sewiyjnr.com');
  const [address, setAddress] = useState('Westlands Commercial Center, Nairobi');
  const [currency, setCurrency] = useState('KES');
  const [taxRate, setTaxRate] = useState('16');
  const [darkMode, setDarkMode] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToastMsg('Store settings saved successfully!');
  };

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Manage store information, logos, tax, currency, and theme preferences.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6 max-w-4xl">
        
        {/* Store Information */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Store className="w-4 h-4 text-[#10B981]" />
            Store Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Store Logo URL</label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Store Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-600 font-bold">Physical Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        {/* Currency & Tax Settings */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <DollarSign className="w-4 h-4 text-[#10B981]" />
            Currency & Tax Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium bg-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="KES">KSh - Kenyan Shilling</option>
                <option value="USD">$ - US Dollar</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-bold">Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Moon className="w-4 h-4 text-[#10B981]" />
            Theme Preferences
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Dark Mode</h4>
              <p className="text-[10px] text-slate-400">Switch admin dashboard background to deep dark slate</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDarkMode(!darkMode);
                setToastMsg(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${
                darkMode ? 'bg-[#10B981]' : 'bg-slate-200'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#10B981]/20"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default Settings;
