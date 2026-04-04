import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, Bell, LogOut, User } from "lucide-react"
import { Logo } from "./Logo"
import { ROLE_META } from "@/data/constants"
import { cn } from "@/lib/utils"

export function AppHeader({ role, setRole, onLogout, searchQuery, setSearchQuery, onMenuToggle }: any) {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-2xl lg:hidden text-slate-500 hover:bg-slate-100" onClick={onMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden lg:block lg:w-6 lg:h-6" /> {/* Spacer for alignment if needed, but Logo is there */}
          <Logo />
        </div>
        
        <div className="hidden flex-1 items-center justify-center px-6 lg:flex">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <Input 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="h-10 w-full rounded-full border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm shadow-inner transition-all hover:bg-slate-50 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400" 
              placeholder="Ketik '/' untuk mencari data panen, supplier, komoditas..." 
            />
            {/* Optional: Add a shortcut hint like "⌘K" if desired */}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <Button variant="ghost" size="icon" className="relative rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </Button>
          
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-700 leading-none">
                {ROLE_META[role as keyof typeof ROLE_META]?.label}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Dayapala System
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 ring-2 ring-white shadow-sm overflow-hidden text-emerald-600">
                {(() => {
                  const Icon = ROLE_META[role as keyof typeof ROLE_META]?.icon || User
                  return <Icon className="h-5 w-5" />
                })()}
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-1 transition-colors" title="Keluar" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
