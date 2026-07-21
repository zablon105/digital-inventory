import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_DELIVERIES = [
  { id: '#1203', customer: 'James', address: 'Westlands, Nairobi', courier: 'Fargo Courier', status: 'In Transit' },
  { id: '#1201', customer: 'Alice', address: 'Kilimani, Nairobi', courier: 'G4S Logistics', status: 'Delivered' }
];

const Deliveries = () => {
  const [deliveries] = useState(MOCK_DELIVERIES);
  const [toastMsg, setToastMsg] = useState('');

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Deliveries</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Track courier dispatches, street coordinates, and delivery statuses.</p>
      </div>

      <div className="space-y-3">
        {deliveries.map((d) => (
          <div key={d.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Order {d.id} - {d.customer}</h4>
                <p className="text-xs text-slate-500 font-medium">{d.address} • Courier: {d.courier}</p>
              </div>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-xl w-fit ${
              d.status === 'Delivered' ? 'bg-emerald-50 text-[#10B981]' : 'bg-blue-50 text-blue-600'
            }`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
