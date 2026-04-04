import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/shared/Logo"
import { ROLE_META } from "@/data/constants"
import { cn } from "@/lib/utils"

export function LoginPanel({ role, setRole, onLogin, initialMode = "login", onBack }: { role: string; setRole: (r: string) => void; onLogin: () => void; initialMode?: "login" | "register"; onBack?: () => void }) {
  const [mode, setMode] = useState<"login" | "register">(initialMode)

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center py-6">
      <div className="flex w-full max-w-[1000px] flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200/60 lg:flex-row">
        
        {/* Left Side: Form */}
        <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-14 lg:py-16">
          <div className="mb-8">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900">
              {mode === "login" ? "Masuk ke Dayapala" : "Daftar ke Dayapala"}
            </h2>
            <p className="mt-2 text-slate-500">
              {mode === "login" ? "Pilih peran Anda untuk mengakses halaman dan fitur sesuai kebutuhan operasional." : "Buat akun untuk mengakses ekosistem Dayapala sesuai peran Anda."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Nama Lengkap / Organisasi</label>
                  <Input className="h-12 rounded-2xl bg-slate-50 focus:bg-white focus:ring-emerald-500" placeholder="Koperasi Merah Putih" />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email atau Nomor Anggota</label>
                <Input className="h-12 rounded-2xl bg-slate-50 focus:bg-white focus:ring-emerald-500" placeholder="nama@email.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
                <Input className="h-12 rounded-2xl bg-slate-50 focus:bg-white focus:ring-emerald-500" placeholder="••••••••" type="password" />
              </div>
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Konfirmasi Kata Sandi</label>
                  <Input className="h-12 rounded-2xl bg-slate-50 focus:bg-white focus:ring-emerald-500" placeholder="••••••••" type="password" />
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Pilih Peran Anda</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(ROLE_META).map(([key, meta]) => {
                  const Icon = meta.icon
                  return (
                    <button
                      key={key}
                      onClick={() => setRole(key)}
                      className={cn(
                        "group flex items-start gap-4 rounded-[20px] border p-4 text-left transition-all",
                        role === key ? "border-emerald-500 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500" : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50 hover:shadow-sm"
                      )}
                    >
                      <div className={cn(
                        "rounded-xl p-2 ring-1 transition-colors",
                        role === key ? "bg-emerald-600 text-white ring-emerald-600" : "bg-slate-100 text-slate-500 ring-slate-200 group-hover:bg-emerald-100 group-hover:text-emerald-700 group-hover:ring-emerald-200"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={cn("text-sm font-semibold transition-colors", role === key ? "text-emerald-950" : "text-slate-700 group-hover:text-emerald-900")}>{meta.label}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <Button onClick={onLogin} className="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-base font-medium text-white shadow-lg shadow-emerald-900/20 transition-transform active:scale-95 hover:from-emerald-700 hover:to-teal-700">
              {mode === "login" ? "Masuk" : "Daftar Akun"}
            </Button>

            <div className="text-center pt-2">
              <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700">
                {mode === "login" ? "Belum punya akun? Daftar sekarang" : "Sudah punya akun? Masuk"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden w-full lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.2),transparent_40%),linear-gradient(135deg,#022c22,#0f766e,#0f172a)] p-12 text-white">
          <Logo light />
          <div className="my-auto">
            <h3 className="text-3xl font-display font-semibold leading-tight">Membangun ekosistem yang terhubung dan transparan.</h3>
            <p className="mt-4 text-emerald-100 text-lg">Dari pengelolaan panen, pemenuhan pasok, hingga akses pembiayaan yang inklusif.</p>
            <div className="mt-8 space-y-4">
              {[
                "Keputusan berbasis data terpusat",
                "Alur terverifikasi dengan Immutable Audit Log",
                "Standar SaaS operasional Koperasi"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/20 p-1 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
