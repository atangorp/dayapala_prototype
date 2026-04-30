import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Wheat, HandCoins, CheckCircle2, PackageCheck, ShieldCheck } from "lucide-react"
import { Surface } from "@/components/shared/Surface"
import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import { cn } from "@/lib/utils"

export function PetaniHome({ supplies, scores, setPage }: any) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard Petani & Supplier" 
        description="Pantau progres pasokan, kelola data panen, dan evaluasi skor pembiayaan Anda hari ini." 
        actions={<Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-[1.02]" onClick={() => setPage("tambah")}>+ Tambah Input Panen</Button>} 
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Pasokan Aktif" value={`${supplies.length} Batch`} hint="Sedang diproses koperasi" icon={Wheat} />
        <StatCard title="Skor Pembiayaan" value={`${scores[0]?.score || 0}/100`} hint="Status: Layak Pembiayaan" icon={HandCoins} />
        <StatCard title="Status Terbaru" value="Validasi" hint="Menunggu persetujuan koperasi" icon={CheckCircle2} />
        <StatCard title="Permintaan Cocok" value="2 Modul" hint="Berdasarkan AI Matching Dayapala" icon={PackageCheck} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface className="flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Tracking Pasokan Terbaru</CardTitle>
            <CardDescription>Status real-time dari data panen yang telah disetorkan</CardDescription>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-4">
            {supplies.slice(0, 3).map((row: any) => (
              <div key={row.id} className="group relative overflow-hidden rounded-[24px] bg-white p-5 ring-1 ring-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-emerald-300 hover:-translate-y-0.5 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Wheat className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{row.commodity}</h4>
                    <p className="text-sm text-slate-500">Vol: <span className="font-medium text-slate-700">{row.volume}</span> • {row.village}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <StatusBadge>{row.status}</StatusBadge>
                  <span className="text-xs font-semibold text-slate-700">{row.price}</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 mt-2" onClick={() => setPage("riwayat")}>
              Lihat Seluruh Riwayat Pasokan
            </Button>
          </CardContent>
        </Surface>
        
        <Surface className="flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-cyan-50/50 pb-5 rounded-t-[32px]">
             <div className="flex items-center gap-3">
               <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
                  <ShieldCheck className="h-5 w-5" />
               </div>
               <div>
                  <CardTitle className="text-lg text-slate-800">Skor Pembiayaan Anda</CardTitle>
                  <CardDescription>Evaluasi kredibilitas berbasis data objektif</CardDescription>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-center items-center text-center">
            <div className="relative mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#0891b2" strokeWidth="8" strokeDasharray={`${((scores[0]?.score || 0) / 100) * 289} 289`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold font-display text-slate-900">{scores[0]?.score || 0}</span>
                 <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">/100</span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm mb-6">
               Skor kompetitif. Hal ini mengindikasikan pasokan yang stabil dan kualitas pengiriman tepat waktu yang baik.
            </p>
            
            <Button className="rounded-2xl w-full max-w-xs bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all hover:scale-[1.02]" onClick={() => setPage("skor")}>
              Lihat Detail Penilaian
            </Button>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function PetaniTambahPage({ onSubmitHarvest }: any) {
  const [form, setForm] = useState({ farmer: "Kelompok Tani Sumber Rezeki", commodity: "", volume: "", village: "", price: "" })
  return (
    <div className="space-y-6">
      <PageHeader title="Input Pasokan Panen Baru" description="Lengkapi detail panen Anda agar dapat segera divalidasi dan dicocokkan dengan demand melalui AI Dayapala." actions={<Button variant="outline" className="rounded-2xl border-slate-200">Kembali</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-emerald-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Form Lapor Panen</CardTitle>
            <CardDescription>Pastikan estimasi volume dan target harga telah diperhitungkan matang.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-5">
               <div className="space-y-1.5">
                 <label className="text-sm font-semibold text-slate-700 ml-1">Profil Pengirim</label>
                 <Input value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })} className="h-12 rounded-2xl bg-slate-50 focus:bg-white text-slate-900 font-medium" placeholder="Nama kelompok tani" disabled />
                 <p className="text-xs text-slate-500 ml-1">Terkunci pada profil aktif Anda.</p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-5">
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Jenis Komoditas</label>
                   <Input value={form.commodity} onChange={(e) => setForm({ ...form, commodity: e.target.value })} className="h-12 rounded-2xl" placeholder="Mis. Beras Medium" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Estimasi Volume</label>
                   <Input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className="h-12 rounded-2xl" placeholder="Mis. 10 Ton" />
                 </div>
               </div>
               
               <div className="grid md:grid-cols-2 gap-5">
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Titik Asal / Desa</label>
                   <Input value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="h-12 rounded-2xl" placeholder="Desa, Kecamatan" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Batas Harga Harapan</label>
                   <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-12 rounded-2xl" placeholder="Rp / Kg" />
                 </div>
               </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-slate-100">
              <Button
                className="flex-1 rounded-2xl h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-500/20"
                onClick={() => {
                  if (!form.farmer || !form.commodity || !form.volume || !form.village || !form.price) return
                  onSubmitHarvest(form, true)
                  setForm({ ...form, commodity: "", volume: "", village: "", price: "" })
                }}
              >
                Setor Data ke Koperasi
              </Button>
              <Button variant="outline" className="w-full sm:w-auto px-8 rounded-2xl h-12 border-slate-200 font-medium">Reset</Button>
            </div>
          </CardContent>
        </Surface>

        <Surface className="bg-gradient-to-br from-slate-900 to-slate-800 border-none h-fit text-white">
          <CardHeader className="pb-5 relative z-10 border-b border-white/10">
            <div className="h-12 w-12 rounded-full bg-slate-800 ring-1 ring-slate-700 mb-4 flex items-center justify-center shadow-lg">
               <span className="text-emerald-400"><CheckCircle2 className="h-6 w-6" /></span>
            </div>
            <CardTitle className="text-xl text-white">Alur Distribusi AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10 pt-5">
            <div className="space-y-5">
               <div className="flex gap-4">
                  <div className="mt-1"><div className="h-2.5 w-2.5 rounded-full bg-emerald-400 mt-1 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /></div>
                  <p className="text-sm leading-relaxed text-slate-300"><strong className="text-white block font-medium mb-1">Menunggu Validasi</strong> Data yang disetor ke sistem akan ditinjau keabsahannya oleh pihak koperasi.</p>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1"><div className="h-2.5 w-2.5 rounded-full bg-slate-600 mt-1" /></div>
                  <p className="text-sm leading-relaxed text-slate-400">Proses AI Matching mencari demand vendor SPPG dan MBG terbaik.</p>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1"><div className="h-2.5 w-2.5 rounded-full bg-slate-600 mt-1" /></div>
                  <p className="text-sm leading-relaxed text-slate-400">Distribusi dijalankan jika harga dan persetujuan logistik disepakati.</p>
               </div>
            </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function PetaniRiwayatPage({ supplies, formatDate, onDownload }: any) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Arsip Histori Pasokan" 
        description="Pantau status dan catatan dari setiap batch yang pernah Anda setor ke sistem Dayapala." 
        actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => onDownload("RiwayatPetani", supplies)}>Unduh CSV</Button>} 
      />
      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <CardTitle className="text-lg text-slate-800">Daftar Batch Pasok</CardTitle>
          <CardDescription>Log rekam jejak pengiriman Anda</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {supplies.map((row: any) => (
              <div key={row.id} className="p-5 md:p-6 bg-white transition-colors hover:bg-emerald-50/30 group flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-500 flex items-center justify-center shrink-0 ring-1 ring-slate-200/50 shadow-sm">
                    <Wheat className="h-6 w-6 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{row.commodity}</h5>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">Vol: {row.volume} • {row.village}</p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <StatusBadge>{row.status}</StatusBadge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{formatDate(row.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}

export function PetaniSkorPage({ scores }: any) {
  const score = scores[0] || { score: 0, segment: "N/A" }
  return (
    <div className="space-y-6">
      <PageHeader title="Skor Pembiayaan Kredensial" description="Buka akses ke mitra pembiayaan resmi Dayapala dengan skor operasional yang tinggi." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Surface className="h-fit">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl text-slate-900">Your Credit Status</CardTitle>
            <CardDescription className="text-base font-medium text-cyan-600">Level {score.segment}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8">
            <div className="inline-flex items-center justify-center p-6 bg-cyan-50 rounded-full ring-1 ring-cyan-200 shadow-inner mb-6 relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#cffafe" strokeWidth="6" />
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#0891b2" strokeWidth="6" strokeDasharray={`${(score.score / 100) * 289} 289`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="relative z-10 flex flex-col items-center mt-2">
                 <span className="text-6xl font-bold font-display text-cyan-700">{score.score}</span>
                 <span className="text-[10px] font-bold tracking-widest text-cyan-600/70 uppercase mt-2">Points</span>
              </div>
            </div>
            <StatusBadge>{score.score >= 80 ? "Sangat Layak" : "Perlu Peningkatan"}</StatusBadge>
          </CardContent>
        </Surface>
        
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-200/50 p-2 text-slate-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Faktor Pendukung Kelayakan</CardTitle>
                <CardDescription>Berdasarkan rekam jejak operasional dayapala</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4">
             <div className="flex gap-4 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400" />
                <div className="flex-1 space-y-1 mt-1 ml-2">
                   <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Stabilitas Pasokan</h5>
                   <p className="text-sm text-slate-600 leading-relaxed">Pasokan tercatat relatif stabil dalam beberapa periode batch terakhir.</p>
                </div>
             </div>
             <div className="flex gap-4 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400" />
                <div className="flex-1 space-y-1 mt-1 ml-2">
                   <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Akurasi Rute & ETA</h5>
                   <p className="text-sm text-slate-600 leading-relaxed">Pengiriman logistik menuju titik demand menunjukkan tingkat ketepatan tinggi.</p>
                </div>
             </div>
             <div className="flex gap-4 p-4 rounded-2xl bg-white border border-cyan-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400" />
                <div className="flex-1 space-y-1 mt-1 ml-2">
                   <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Kecukupan Histori</h5>
                   <p className="text-sm text-slate-600 leading-relaxed">Masa keanggotaan dan histori finansial sudah memenuhi syarat modal kerja.</p>
                </div>
             </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function PetaniStatusPage({ setPage }: any) {
  const steps = [
    { title: "Menunggu Validasi Koperasi", desc: "Data sedang dievaluasi dari sisi kualitas dan harga", active: true },
    { title: "Proses AI Matching", desc: "Mencari demand Vendor/SPPG prioritas tinggi", active: false },
    { title: "Konfirmasi & Siap Distribusi", desc: "Persetujuan logistik dari semua pihak", active: false },
    { title: "Dalam Pengiriman Logistik", desc: "Logistik perjalanan ke dapur mitra", active: false },
    { title: "Transaksi Selesai & Terverifikasi", desc: "Pembayaran diproses", active: false }
  ]
  
  return (
    <div className="space-y-6">
      <PageHeader title="Live Tracker Distribusi Pasokan" description="Pantau rekam jejak pasokan aktif Anda secara transparan dari hulu ke hilir." actions={<Button variant="outline" className="rounded-2xl border-slate-200">Tampilkan Semua Detail</Button>} />
      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
         <Surface>
           <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
             <CardTitle className="text-lg text-slate-800">Status Batch Aktif: M-12T</CardTitle>
             <CardDescription>Beras Medium • 10 Ton</CardDescription>
           </CardHeader>
           <CardContent className="p-8 md:p-12">
             <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-slate-200" />
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-6 group">
                      <div className={`relative z-10 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ring-4 ring-white shadow-sm transition-all duration-300
                         ${step.active ? 'bg-emerald-600 text-white scale-110 shadow-emerald-500/20' : 'bg-slate-100 text-slate-400 border border-slate-200/60'}`}>
                         <span className="text-xl font-bold font-display">{index + 1}</span>
                      </div>
                      <div className="pt-2 flex-1">
                        <h4 className={`text-lg font-bold mb-1 ${step.active ? 'text-emerald-700' : 'text-slate-500'}`}>{step.title}</h4>
                        <p className={`text-sm leading-relaxed max-w-sm ${step.active ? 'text-slate-700' : 'text-slate-400'}`}>{step.desc}</p>
                        
                        {step.active && (
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-200 shadow-sm">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Sedang Berjalan</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           </CardContent>
         </Surface>
         
         <Surface className="h-fit">
            <CardHeader className="border-b border-slate-100">
               <CardTitle className="text-base text-slate-800">Detail Pasokan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-100">
                     <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Entitas</span>
                     <span className="font-semibold text-slate-800">Kelompok Tani Sumber Rezeki</span>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                     <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Harga Disetorkan</span>
                     <span className="font-bold text-emerald-600 text-lg">Rp11.000 / Kg</span>
                  </div>
                  <div className="pb-4">
                     <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal Diajukan</span>
                     <span className="font-medium text-slate-700">Hari ini, 09:30 WIB</span>
                  </div>
               </div>
            </CardContent>
         </Surface>
      </div>
    </div>
  )
}
