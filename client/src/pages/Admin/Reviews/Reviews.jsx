import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Trash2 } from 'lucide-react';
import Toast from '../../../components/common/Toast';

const MOCK_REVIEWS = [
  { id: '1', user: 'Sarah J.', item: 'Velocity Phantom Runner', rating: 5, comment: 'Extremely comfortable running shoes! Highly recommended.', date: 'Jul 15, 2026' },
  { id: '2', user: 'David O.', item: 'Cloud-Touch Sateen Set', rating: 5, comment: 'Softest bedding I have ever purchased in Kenya.', date: 'Jul 12, 2026' }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [toastMsg, setToastMsg] = useState('');

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
    setToastMsg('Review deleted.');
  };

  return (
    <div className="space-y-6 font-sans">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Reviews</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Manage ratings and customer feedback for your store products.</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <span className="text-xs font-bold text-slate-900">{r.user}</span>
                <span className="text-[10px] text-slate-400">({r.date})</span>
              </div>
              <h4 className="text-xs font-bold text-slate-700">Product: {r.item}</h4>
              <p className="text-xs text-slate-600 font-medium">{r.comment}</p>
            </div>

            <button
              onClick={() => handleDelete(r.id)}
              className="p-2 hover:bg-rose-50 text-rose-500 rounded-xl cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
