import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Surface } from "./Surface"
import { NAV_ITEMS, ROLE_META, OFFICIAL_MODULES } from "@/data/constants"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export function Sidebar({ role, page, setPage, isOpen, setIsOpen }: any) {
  const items = NAV_ITEMS[role] || []
  const currentRoleMeta = ROLE_META[role] || ROLE_META['koperasi']

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Content */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out lg:sticky lg:top-28 lg:w-auto lg:translate-x-0 lg:transform-none lg:h-[calc(100vh-140px)]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Surface className="h-full overflow-y-auto rounded-r-3xl lg:rounded-[32px] border-r lg:border border-slate-200/60 shadow-lg lg:shadow-xl scrollbar-hide bg-white/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 mb-2">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">{currentRoleMeta.label}</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-500">Navigasi area kerja</CardDescription>
            </div>
            <button className="lg:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </CardHeader>
          <CardContent className="space-y-1.5 px-4 pt-4">
            {items.map((item: any) => {
              const Icon = item.icon
              const isActive = page === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setPage(item.key)}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-2xl px-3.5 py-3 text-left transition-all duration-200 group",
                    isActive ? "bg-emerald-500/10 text-emerald-950 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-medium"
                  )}
                >
                  <div className={cn(
                    "rounded-xl p-2 ring-1 transition-all duration-200",
                    isActive ? "bg-gradient-to-br from-emerald-500 to-teal-600 ring-emerald-500/20 text-white shadow-md shadow-emerald-500/20" : "bg-white ring-slate-200 text-slate-400 group-hover:text-emerald-600 group-hover:ring-emerald-200 shadow-sm"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </button>
              )
            })}
            <div className="pt-8 pb-4">
              <div className="rounded-[24px] bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-200/50 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Sistem Aktif</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {OFFICIAL_MODULES.map((item) => (
                    <Badge key={item} variant="secondary" className="rounded-xl px-2.5 py-1 bg-white hover:bg-slate-50 ring-1 ring-slate-200/70 text-[10px] text-slate-600 shadow-sm font-medium transition-colors cursor-default">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Surface>
      </aside>
    </>
  )
}
