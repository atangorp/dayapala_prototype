import { CheckCircle2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Banner({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mb-6 flex items-center justify-between gap-3 rounded-[24px] border border-emerald-200/60 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-900 shadow-md shadow-emerald-900/5 ring-1 ring-emerald-500/10"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <span>{message}</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-emerald-600 transition-colors hover:bg-emerald-100/50">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
