import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border w-[90%] max-w-md ${
        type === 'success'
          ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
          : 'bg-rose-50 border-rose-100 text-rose-800'
      }`}
      id="custom-toast-alert"
    >
      <div className="shrink-0">
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-rose-600" />
        )}
      </div>
      
      <p className="text-xs sm:text-sm font-medium flex-1 leading-relaxed">
        {message}
      </p>

      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Yopish"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
