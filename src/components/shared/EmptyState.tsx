import { CheckCircle2 } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Surface } from "./Surface"

export function EmptyState({ title, description, cta }: { title: string; description: string; cta?: React.ReactNode }) {
  return (
    <Surface className="border-dashed bg-white/70">
      <CardContent className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-5 ring-1 ring-emerald-100 shadow-inner">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-display font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
        {cta ? <div className="mt-6 transition-transform hover:scale-105 active:scale-95">{cta}</div> : null}
      </CardContent>
    </Surface>
  )
}
