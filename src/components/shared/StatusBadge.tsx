import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function StatusBadge({ children }: { children: string }) {
  const map: Record<string, string> = {
    "Normal": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Waspada": "bg-amber-500 text-white hover:bg-amber-500",
    "Tinggi": "bg-rose-600 text-white hover:bg-rose-600",
    "Layak Pembiayaan": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Perlu Pendampingan": "bg-amber-500 text-white hover:bg-amber-500",
    "Prioritas Pembiayaan": "bg-cyan-600 text-white hover:bg-cyan-600",
    "Siap divalidasi": "bg-slate-900 text-white hover:bg-slate-900",
    "Butuh penjemputan": "bg-amber-500 text-white hover:bg-amber-500",
    "Siap kirim": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Menunggu validasi koperasi": "bg-slate-900 text-white hover:bg-slate-900",
    "Dalam distribusi": "bg-cyan-600 text-white hover:bg-cyan-600",
    "Selesai": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Layak": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Cukup layak": "bg-amber-500 text-white hover:bg-amber-500",
    "Tinggi-priority": "bg-rose-600 text-white hover:bg-rose-600",
    "Sedang": "bg-amber-500 text-white hover:bg-amber-500",
    "Approved": "bg-emerald-600 text-white hover:bg-emerald-600",
    "Review Manual": "bg-amber-500 text-white hover:bg-amber-500",
  }
  return <Badge className={cn("rounded-full", map[children] || "bg-slate-900 text-white hover:bg-slate-900")}>{children}</Badge>
}
