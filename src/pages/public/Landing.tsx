import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Logo } from "@/components/shared/Logo"
import { Surface } from "@/components/shared/Surface"
import { OFFICIAL_MODULES } from "@/data/constants"
import { Leaf, PackageCheck, TrendingUp, HandCoins, FileClock, CheckCircle2, ArrowRight, Menu, X, Users, Store, UserRound, Wallet, Globe, Briefcase } from "lucide-react"

export function Landing({ onAction }: { onAction: (mode: "login" | "register") => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "Tentang", id: "tentang" },
    { label: "Modul", id: "modul" },
    { label: "Cara Kerja", id: "cara-kerja" },
    { label: "Pengguna", id: "pengguna" },
    { label: "Kontak", id: "kontak" },
  ]

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      {/* Navbar */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <Logo light={!scrolled && !mobileMenuOpen} />
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-sm font-medium transition-colors hover:text-emerald-600 ${scrolled ? "text-slate-700" : "text-white/90"}`}>
                {link.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Button variant="ghost" className={`rounded-xl font-medium ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10 hover:text-white"}`} onClick={() => onAction("login")}>Masuk</Button>
            <Button className="rounded-xl shadow-md transition-transform active:scale-95" onClick={() => onAction("register")}>Daftar Sekarang</Button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={scrolled ? "text-slate-900" : "text-white"} /> : <Menu className={scrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white px-6 py-20 lg:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-2xl font-display font-semibold text-slate-900">
                {link.label}
              </button>
            ))}
            <hr className="my-4 border-slate-200" />
            <Button size="lg" className="h-14 rounded-2xl text-lg font-semibold" onClick={() => onAction("login")}>Masuk ke Platform</Button>
            <Button size="lg" variant="outline" className="h-14 rounded-2xl text-lg font-semibold" onClick={() => onAction("register")}>Buat Akun</Button>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.24),transparent_28%),linear-gradient(135deg,#022c22,#0f766e,#0f172a)] pb-24 pt-32 sm:pb-32 lg:pb-40 lg:pt-48 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-5xl font-display font-bold tracking-tight sm:text-7xl sm:leading-[1.1]">
                  Platform keputusan <span className="text-emerald-400">koperasi</span> hemat pangan & inflasi
                </h1>
                <p className="mt-8 text-lg leading-8 text-white/80 sm:text-xl">
                  Dayapala membantu Koperasi Merah Putih mengelola pasok pangan, membaca sinyal inflasi, dan memperluas akses pembiayaan petani melalui satu sistem yang operasional, transparan, dan terukur.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" onClick={() => onAction("login")} className="h-14 rounded-full bg-white px-8 text-base font-semibold text-emerald-900 shadow-xl shadow-emerald-950/50 transition-transform hover:bg-slate-50 active:scale-95">Masuk ke Platform</Button>
                  <Button size="lg" variant="secondary" onClick={() => scrollTo("tentang")} className="h-14 rounded-full border border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur transition-transform hover:bg-white/20 active:scale-95">Pelajari Lebih Lanjut</Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 flow-root sm:mt-24">
              <div className="relative rounded-[32px] bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm lg:rounded-[40px]">
                <div className="grid gap-6 md:grid-cols-3">
                  <Surface className="border-none bg-white/10 text-white shadow-none backdrop-blur-xl group">
                    <CardContent className="p-6">
                      <p className="text-sm font-medium text-emerald-300">Kecocokan distribusi tertinggi</p>
                      <p className="mt-3 text-4xl font-display font-semibold">94% Fit</p>
                      <p className="mt-2 text-sm text-white/80">Beras Lamongan → SPPG Surabaya Timur</p>
                      <Progress value={94} className="mt-5 h-2 rounded-full bg-white/20 [&>div]:bg-emerald-400" />
                    </CardContent>
                  </Surface>
                  <Surface className="border-none bg-white/10 text-white shadow-none backdrop-blur-xl">
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Nilai Publik</p>
                      <p className="mt-3 text-base leading-relaxed font-medium">Ketahanan pangan, transparansi pasok MBG, dan pembiayaan inklusif.</p>
                    </CardContent>
                  </Surface>
                  <Surface className="border-none bg-white/10 text-white shadow-none backdrop-blur-xl">
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Nilai Industri</p>
                      <p className="mt-3 text-base leading-relaxed font-medium">Efisiensi rantai pasok, visibilitas data operasional, dan modal SaaS.</p>
                    </CardContent>
                  </Surface>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="tentang" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-emerald-600">Tentang Dayapala</h2>
              <p className="mt-2 text-3xl font-display font-semibold tracking-tight text-slate-900 sm:text-4xl">Mengapa Dayapala Hadir?</p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Pasokan pangan sering kali terhambat oleh rentetan rantai distribusi yang tidak efisien, harga yang asimetris, dan sulitnya petani mendapat dukungan modal. Dayapala bukan sekadar marketplace, Dayapala adalah sistem operasi pengambilan keputusan kolaboratif bagi ekosistem Koperasi Merah Putih.
              </p>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section id="modul" className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900 sm:text-4xl">Modul Utama Sistem</h2>
              <p className="mt-4 text-lg text-slate-600">5 pilar teknologi untuk menghubungkan hulu ke hilir dengan transparan dan terukur.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Input Panen", icon: Leaf, desc: "Pintu masuk data sumber pasokan dari tingkat petani atau gapoktan dengan standar kualitas." },
                { name: "AI Matching Supply-Demand", icon: PackageCheck, desc: "Algoritma pencocokan cerdas mempertemukan penawaran dan permintaan pasok." },
                { name: "Dashboard Inflasi", icon: TrendingUp, desc: "Visualisasi tren harga komoditas untuk deteksi dini risiko inflasi." },
                { name: "Alternative Credit Scoring", icon: HandCoins, desc: "Skoring kelayakan pembiayaan petani berdasarkan riwayat transaksi nyata." },
                { name: "Immutable Audit Log", icon: FileClock, desc: "Pencatatan alur operasional tak terubahkan untuk menjamin transparansi tinggi." },
              ].map((m) => (
                <Surface key={m.name} className="group relative rounded-[32px] border-none bg-white p-8 shadow-sm ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:shadow-emerald-900/5 hover:ring-emerald-200">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-500 group-hover:text-white group-hover:ring-emerald-600">
                    <m.icon className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{m.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.desc}</p>
                </Surface>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="cara-kerja" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900 sm:text-4xl">Cara Kerja Dayapala</h2>
              <p className="mt-4 text-lg text-slate-600">Satu alur mulus dari panen, pencocokan pasar, hingga pembiayaan masa depan.</p>
            </div>
            <div className="mt-16 sm:mt-20">
              <div className="grid gap-8 md:grid-cols-4">
                {[
                  { step: "1", title: "Registrasi Pasok", desc: "Petani menginput ketersediaan panen komoditas." },
                  { step: "2", title: "Kebutuhan Pasar", desc: "Vendor MBG / SPPG menyatakan kebutuhan bahan baku." },
                  { step: "3", title: "AI Matching", desc: "Sistem mencocokkan pasokan dan permintaan secara optimal." },
                  { step: "4", title: "Pembiayaan", desc: "Riwayat kelancaran distribusi menjadi skor kredit untuk modal." },
                ].map((s, i) => (
                  <div key={s.step} className="relative">
                    {i !== 3 && <div className="absolute left-6 top-8 hidden h-0.5 w-full bg-slate-100 md:block" />}
                    <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 ring-8 ring-white">{s.step}</div>
                    <h3 className="mt-6 text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Users Section */}
        <section id="pengguna" className="bg-slate-900 py-24 sm:py-32 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-display font-semibold tracking-tight sm:text-4xl">Kolaborasi 4 Pilar</h2>
              <p className="mt-4 text-lg text-white/70">Didesain khusus untuk peran-peran utama dalam ekosistem Koperasi.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { role: "Koperasi", icon: Store, desc: "Pusat orkestrasi dan keputusan strategis distribusi pasokan.", color: "from-blue-500 to-cyan-500" },
                { role: "Petani", icon: UserRound, desc: "Mendapat akses pasar pasti dan peluang pembiayaan inklusif.", color: "from-emerald-500 to-teal-500" },
                { role: "Vendor", icon: Briefcase, desc: "Memastikan ketersediaan bahan baku untuk program gizi (MBG).", color: "from-amber-400 to-orange-500" },
                { role: "Pembiayaan", icon: Wallet, desc: "Menyalurkan modal kerja dengan mitigate risiko berbasis data aktual.", color: "from-purple-500 to-indigo-500" },
              ].map((u) => (
                <div key={u.role} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:bg-white/10">
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${u.color} p-4 shadow-lg`}>
                    <u.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{u.role}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Surface className="overflow-hidden rounded-[40px] border-none bg-emerald-50">
              <div className="px-6 py-16 sm:px-16 sm:py-24 lg:flex lg:items-center lg:justify-between lg:px-24">
                <div>
                  <h2 className="max-w-2xl text-3xl font-display font-bold tracking-tight text-emerald-950 sm:text-4xl">Siap memulai transformasi manajemen pasok koperasi?</h2>
                  <p className="mt-6 w-full max-w-xl text-lg text-emerald-800">
                    Dayapala terbuka untuk kolaborasi dengan berbagai Koperasi tingkat akar rumput dan institusi pembiayaan.
                  </p>
                  <div className="mt-8 flex items-center gap-4 text-emerald-900">
                    <Globe className="h-5 w-5" />
                    <span className="font-medium">contact@dayapala.id</span>
                  </div>
                </div>
                <div className="mt-10 flex lg:ml-10 lg:mt-0 lg:flex-shrink-0">
                  <Button size="lg" className="h-14 rounded-full bg-emerald-600 px-8 text-base shadow-lg shadow-emerald-600/30 hover:bg-emerald-700" onClick={() => onAction("register")}>Bergabung Sekarang</Button>
                </div>
              </div>
            </Surface>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Logo />
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-slate-600">
            <button onClick={() => scrollTo("tentang")} className="hover:text-emerald-600">Tentang</button>
            <button onClick={() => scrollTo("modul")} className="hover:text-emerald-600">Modul</button>
            <button onClick={() => scrollTo("cara-kerja")} className="hover:text-emerald-600">Cara Kerja</button>
            <button onClick={() => onAction("login")} className="hover:text-emerald-600">Masuk</button>
            <button onClick={() => onAction("register")} className="hover:text-emerald-600">Daftar</button>
          </div>
          <p className="mt-10">&copy; {new Date().getFullYear()} Dayapala - Platform Ekosistem Koperasi Merah Putih. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}
