import { Wheat } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-900/20">
        <Wheat className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className={cn("text-xs font-semibold uppercase tracking-[0.25em]", light ? "text-white" : "text-emerald-700")}>Dayapala</p>
        <p className={cn("text-xs", light ? "text-white/70" : "text-slate-500")}>Orkestrasi Pangan Desa</p>
      </div>
    </div>
  )
}
