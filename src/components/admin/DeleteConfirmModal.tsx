import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName?: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete Item?",
  itemName,
  description = "This action cannot be undone. This item will be permanently removed from MongoDB.",
  confirmText = "Delete Permanently",
  isLoading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-md rounded-2xl bg-slate-950 border border-red-500/30 p-6 shadow-2xl shadow-red-500/10 text-white z-10"
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              {itemName && (
                <div className="mt-1 px-2.5 py-1 rounded-md bg-red-950/50 border border-red-800/40 text-red-300 font-mono text-xs font-semibold truncate max-w-[280px]">
                  {itemName}
                </div>
              )}
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isLoading}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-red-600/30"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isLoading ? "Deleting..." : confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
