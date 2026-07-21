import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce flex items-center gap-3 bg-white text-dark-bg border border-gray-200 px-5 py-4 rounded-xl shadow-xl max-w-sm">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-brand-red shrink-0" />
      )}
      <p className="text-sm font-medium pr-4">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-dark-bg transition-colors shrink-0 cursor-pointer ml-auto"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
