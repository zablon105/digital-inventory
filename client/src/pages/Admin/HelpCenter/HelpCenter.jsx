import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageCircle, Send } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const HelpCenter = () => {
  const [msg, setMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg) return;
    setToastMsg('Support request submitted successfully!');
    setMsg('');
  };

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Support & Documentation</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Guides on managing store products, orders, and system configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00C885]" />
            Quick Admin Guides
          </h3>
          <ul className="space-y-2 text-xs font-semibold text-slate-700 divide-y divide-slate-100">
            <li className="pt-2 flex justify-between cursor-pointer hover:text-[#00C885]">
              <span>How to upload new shoes or linen items</span>
              <span>→</span>
            </li>
            <li className="pt-2 flex justify-between cursor-pointer hover:text-[#00C885]">
              <span>Managing order statuses and fulfillments</span>
              <span>→</span>
            </li>
            <li className="pt-2 flex justify-between cursor-pointer hover:text-[#00C885]">
              <span>Setting up Ksh promo codes & discounts</span>
              <span>→</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSend} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#00C885]" />
            Contact Developer Support
          </h3>
          <textarea
            rows="3"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Describe any technical issue or feature request..."
            className="w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#00C885]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#00C885] hover:bg-[#00B074] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-[#00C885]/20"
          >
            <Send className="w-4 h-4" />
            Send Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
