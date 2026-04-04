import { CardContent } from "@/components/ui/card"
import { Surface } from "./Surface"

export function StatCard({ title, value, hint, icon: Icon }: { title: string; value: string; hint: string; icon: React.ElementType }) {
  return (
    <Surface className="group overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-5 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 group-hover:text-emerald-700 transition-colors uppercase tracking-wider">{title}</p>
            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-slate-900 group-hover:text-emerald-950 transition-colors">{value}</p>
            <p className="mt-1.5 text-xs font-medium text-slate-400 group-hover:text-emerald-600/80 transition-colors">{hint}</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 p-3 ring-1 ring-emerald-100/50 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md transition-all duration-300">
            <Icon className="h-5 w-5 text-emerald-600 drop-shadow-sm" />
          </div>
        </div>
      </CardContent>
    </Surface>
  )
}
