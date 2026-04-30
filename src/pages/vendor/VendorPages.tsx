import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PackageCheck, Bell, Route } from "lucide-react"
import { Surface } from "@/components/shared/Surface"
import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { DetailModal } from "@/components/shared/DetailModal"

export function VendorOverviewPage({ demands, setPage, onDownload }: any) {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  return (
    <div className="space-y-6">
      <DetailModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title="Detail Permintaan Pasok"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Komoditas</span>
                <p className="font-semibold text-slate-900">{selectedItem.commodity}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Volume</span>
                <p className="font-semibold text-slate-900">{selectedItem.amount}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ETA</span>
                <p className="font-semibold text-slate-900">{selectedItem.schedule}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prioritas</span>
                <StatusBadge>{selectedItem.priority}</StatusBadge>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
               <Button className="w-full rounded-xl bg-amber-600" onClick={() => { setSelectedItem(null); setPage("candidates"); }}>Cek Kandidat Pemasok</Button>
            </div>
          </div>
        )}
      </DetailModal>
      <PageHeader 
        title="Dashboard Vendor MBG & SPPG" 
        description="Kelola rantai pasok dapur umum Anda secara efisien, tinjau ketersediaan bahan, dan temukan mitra pemasok terbaik." 
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => onDownload("PermintaanVendor", demands)}>Unduh Laporan</Button>
            <Button className="rounded-2xl bg-amber-600 hover:bg-amber-700 shadow-sm transition-all hover:scale-[1.02]" onClick={() => setPage("ajukan")}>Ajukan Permintaan Pasok</Button>
          </div>
        } 
      />
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Kebutuhan Aktif" value={`${demands.length} Permintaan`} hint="Perlu verifikasi kandidat pasok" icon={PackageCheck} />
        <StatCard title="Prioritas Tinggi" value={demands.filter((d: any) => d.priority === "Tinggi").length.toString()} hint="Harus ditindaklanjuti segera" icon={Bell} />
        <StatCard title="Kandidat Tervalidasi" value="AI Driven" hint="Siap untuk dikonfirmasi" icon={Route} />
      </div>
      
      <Surface className="flex flex-col">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <CardTitle className="text-lg text-slate-800">Daftar Kebutuhan Aktif</CardTitle>
          <CardDescription>Pantau status permintaan pasok untuk menjaga kelancaran operasional dapur Anda</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {demands.map((row: any) => (
              <div key={row.id} className="p-5 md:p-6 bg-white transition-colors hover:bg-slate-50/50 group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 flex items-center justify-center shrink-0 ring-1 ring-amber-100/50">
                    <PackageCheck className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">{row.commodity}</h4>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">Vol: <span className="text-slate-700">{row.amount}</span> • ETA: {row.schedule}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4 md:gap-6 mt-2 md:mt-0">
                   <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-4 p-3 md:p-0 rounded-xl md:rounded-none bg-slate-50 md:bg-transparent">
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block md:hidden">Prioritas</span>
                     <StatusBadge>{row.priority}</StatusBadge>
                   </div>
                   
                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                      <Button 
                        className="flex-1 md:flex-none rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-500/20 px-6 h-10" 
                        onClick={() => setPage("candidates")}
                      >
                        Lihat Match
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 md:flex-none rounded-xl border-slate-200 bg-white hover:bg-slate-50 px-4 h-10"
                        onClick={() => setSelectedItem(row)}
                      >
                        Detail
                      </Button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}

export function VendorAjukanPage({ onSubmitDemand }: any) {
  const [form, setForm] = useState({ buyer: "Vendor MBG Surabaya Timur", commodity: "", amount: "", schedule: "", priority: "Tinggi" })
  return (
    <div className="space-y-6">
      <PageHeader title="Ajukan Permintaan Pasok Baru" description="Spesifikasikan kebutuhan logistik bahan pangan agar AI Dayapala dapat mencarikan supplier yang paling kredibel." actions={<Button variant="outline" className="rounded-2xl border-slate-200">Kembali</Button>} />
      
      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-amber-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Form Spesifikasi Kebutuhan</CardTitle>
            <CardDescription>Semakin presisi data Anda, semakin tinggi tingkat akurasi match sistem.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
             <div className="space-y-5">
               <div className="space-y-1.5">
                 <label className="text-sm font-semibold text-slate-700 ml-1">Nama Instansi / Entitas</label>
                 <Input value={form.buyer} onChange={(e) => setForm({ ...form, buyer: e.target.value })} className="h-12 rounded-2xl bg-slate-50 focus:bg-white text-slate-900 font-medium" disabled />
                 <p className="text-xs text-slate-500 ml-1">Terkunci berdasarkan profil login Anda.</p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-5">
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Komoditas yang Dibutuhkan</label>
                   <Input value={form.commodity} onChange={(e) => setForm({ ...form, commodity: e.target.value })} className="h-12 rounded-2xl" placeholder="Contoh: Beras Premium" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Volume Permintaan</label>
                   <Input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="h-12 rounded-2xl" placeholder="Contoh: 5 Ton" />
                 </div>
               </div>
               
               <div className="grid md:grid-cols-2 gap-5">
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Tenggat Waktu Kedatangan (ETA)</label>
                   <Input value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} className="h-12 rounded-2xl" placeholder="Contoh: 15 Agustus 2024" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-sm font-semibold text-slate-700 ml-1">Level Prioritas</label>
                   <select 
                      className="flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                      value={form.priority} 
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                   >
                     <option value="Tinggi">Tinggi - Kritis</option>
                     <option value="Sedang">Sedang - Reguler</option>
                     <option value="Rendah">Rendah - Restock</option>
                   </select>
                 </div>
               </div>
             </div>
             
             <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-slate-100">
                <Button
                  className="flex-1 rounded-2xl h-12 bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md shadow-amber-500/20 text-base"
                  onClick={() => {
                    if (!form.commodity || !form.amount || !form.schedule) return
                    onSubmitDemand(form)
                    setForm({ ...form, commodity: "", amount: "", schedule: "", priority: "Tinggi" })
                  }}
                >
                  Ajukan ke AI Matching
                </Button>
                <Button variant="outline" className="w-full sm:w-auto px-8 rounded-2xl h-12 border-slate-200 font-medium">Simpan Draft</Button>
             </div>
          </CardContent>
        </Surface>

        <Surface className="bg-slate-950 border-none h-fit text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <PackageCheck className="w-32 h-32" />
          </div>
          <CardHeader className="pb-5 relative z-10 border-b border-slate-800">
            <CardTitle className="text-lg text-white">SLA Standar Koperasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10 pt-5">
            <div className="space-y-4">
               <div>
                  <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Lead Time Pencarian</h5>
                  <p className="text-sm leading-relaxed text-slate-300">Algoritma otomatis menyajikan kandidat yang sesuai paling lambat 1x24 jam kalender.</p>
               </div>
               <div>
                  <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Standard Kualitas</h5>
                  <p className="text-sm leading-relaxed text-slate-300">Seluruh entitas kelompok tani dan vendor telah melewati tahap Assessment Credit Scoring Dayapala.</p>
               </div>
               <div>
                  <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Fleksibilitas Batal</h5>
                  <p className="text-sm leading-relaxed text-slate-300">Permintaan dapat dibatalkan jika belum memasuki tahap konfirmasi pengiriman ('Siap Distribusi').</p>
               </div>
            </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function VendorCandidatesPage({ matches, onDownload, setPage }: any) {
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  return (
    <div className="space-y-6">
      <DetailModal 
        isOpen={!!selectedProfile} 
        onClose={() => setSelectedProfile(null)} 
        title="Profil Kelompok Tani"
      >
        {selectedProfile && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
               <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
                  {selectedProfile.source.charAt(0)}
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 text-lg">{selectedProfile.source}</h4>
                  <p className="text-sm text-slate-500">Pemasok Terverifikasi Dayapala</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                 <span className="block text-[10px] font-bold text-slate-400 uppercase">Match Fit</span>
                 <span className="text-lg font-bold text-emerald-600">{selectedProfile.fit}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                 <span className="block text-[10px] font-bold text-slate-400 uppercase">Credit Score</span>
                 <span className="text-lg font-bold text-blue-600">{selectedProfile.credit}</span>
              </div>
            </div>
            <div className="space-y-2">
               <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rekam Jejak Operasional</h5>
               <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-700">✅ 98% Ketepatan ETA Logistik</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">✅ Zero Dispute Quality Control</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">✅ Kapasitas Pasok Stabil {">"} 5 Ton</li>
               </ul>
            </div>
            <Button className="w-full rounded-xl bg-slate-900" onClick={() => setSelectedProfile(null)}>Tutup Profil</Button>
          </div>
        )}
      </DetailModal>
      <PageHeader 
        title="Rekomendasi Pemasok Terbaik" 
        description="Evaluasi kelompok tani yang telah diseleksi oleh AI Engine Dayapala untuk pemenuhan pasokan spesifik Anda." 
        actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => onDownload("KandidatPasok", matches)}>Unduh CSV</Button>} 
      />
      
      <div className="grid gap-6">
        {matches.map((item: any) => (
          <Surface key={item.id} className="group transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-amber-300 overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-amber-400 to-orange-500" />
            <CardContent className="p-6 md:p-8 pl-8 md:pl-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4">
                   <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ring-1 ring-slate-200 mt-1 md:mt-0">
                      <Route className="h-6 w-6 text-slate-500 group-hover:text-amber-600 transition-colors" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{item.source}</h3>
                     <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        <span>{item.commodity}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-amber-700">Estimasi Tiba: {item.eta}</span>
                     </p>
                     
                     <div className="mt-4 flex gap-4">
                        <div>
                           <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status Keamanan</span>
                           <StatusBadge>{item.credit}</StatusBadge>
                        </div>
                        <div>
                           <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Rekam Jejak</span>
                           <span className="text-sm font-semibold text-slate-700">Terverifikasi</span>
                        </div>
                     </div>
                   </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end w-full md:w-auto bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
                  <div className="flex items-center gap-3 mb-4 md:mb-3 w-full md:w-auto justify-between md:justify-end">
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block md:hidden">Kecocokan</span>
                     <Badge className="rounded-2xl h-10 px-4 bg-slate-900 border-none text-white shadow-md font-bold text-sm tracking-wide gap-1">
                       <span className="text-amber-400">Match Fit:</span> {item.fit}%
                     </Badge>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                     <Button 
                        className="flex-1 md:flex-none rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm px-6 h-10 w-full md:w-32"
                        onClick={() => {
                          alert(`✅ Konfirmasi Berhasil!\nPemasok: ${item.source}\nStatus: Siap Distribusi Logistik.`);
                          setPage("overview");
                        }}
                     >
                        Konfirmasi
                     </Button>
                     <Button 
                        variant="outline" 
                        className="flex-1 md:flex-none rounded-xl border-slate-200 px-4 h-10 w-full md:w-32"
                        onClick={() => setSelectedProfile(item)}
                     >
                        Lihat Profil
                     </Button>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Surface>
        ))}
      </div>
    </div>
  )
}
