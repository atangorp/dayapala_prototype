import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function Surface({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Card className={cn("rounded-[32px] border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm xl:shadow-md transition-all duration-300", className)}>{children}</Card>
}
