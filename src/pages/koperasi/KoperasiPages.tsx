import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Wheat, HandCoins, CheckCircle2, PackageCheck, ShieldCheck, Route, FileClock, Wallet, Search, TrendingUp, Bell, MapPinned, Users, Truck } from "lucide-react"
import { Surface } from "@/components/shared/Surface"
import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import { DetailModal } from "@/components/shared/DetailModal"

export function KoperasiDashboard({ supplies, matches, inflationRows, scores, setPage, openMatchDetail, openScoreDetail, runMatching, onDownload }: any) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Koperasi"
        description="Pusat kendali operasional Dayapala untuk mengelola pasokan, matching, inflasi, dan pembiayaan."
        actions={
          <>
            <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-[1.02]" onClick={() => setPage("input-panen")}>
              Validasi Pasokan
            </Button>
            <Button variant="secondary" className="rounded-2xl border-slate-200 hover:bg-slate-100 transition-all hover:scale-[1.02]" onClick={() => setPage("matching")}>
              Lihat Matching
            </Button>
          </>
        }
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Pasokan aktif" value={`${supplies.length} batch`} hint="Siap divalidasi dan diproses" icon={Wheat} />
        <StatCard title="Demand masuk" value="7 vendor" hint="SPPG dan vendor prioritas aktif" icon={PackageCheck} />
        <StatCard title="Wilayah waspada" value={inflationRows.filter((row: any) => row.status !== "Normal").length.toString()} hint="Perlu intervensi distribusi" icon={TrendingUp} />
        <StatCard title="Layak pembiayaan" value={`${scores.filter((row: any) => row.score >= 80).length} supplier`} hint="Siap ditinjau" icon={Wallet} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Surface className="flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <Route className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">AI Matching Supply-Demand</CardTitle>
                <CardDescription className="text-sm">Rekomendasi distribusi dengan *fit score* tertinggi</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-4">
            {matches.map((item: any) => (
              <div key={item.id} className="group relative overflow-hidden rounded-[24px] bg-white p-5 ring-1 ring-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-emerald-300 hover:-translate-y-0.5">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.commodity}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                      <span className="font-medium text-slate-800">{item.source}</span>
                      <Route className="h-3 w-3 text-slate-400" />
                      <span className="font-medium text-slate-800">{item.target}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge>{item.credit}</StatusBadge>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">ETA: {item.eta}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-500">Fit Score</span>
                    <span className="text-emerald-700">{item.fit}%</span>
                  </div>
                  <Progress value={item.fit} className="h-2 rounded-full bg-slate-200" />
                </div>

                <div className="mt-4 flex gap-3">
                  <Button size="sm" className="w-full rounded-xl bg-slate-900 text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-95" onClick={() => openMatchDetail(item.id)}>
                    Tinjau & Eksekusi
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl border-slate-200 bg-white transition-all hover:bg-slate-50 active:scale-95" onClick={() => setPage("audit")}>
                    <FileClock className="w-4 h-4 text-slate-500" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Surface>

        <Surface className="flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Pemantauan Inflasi</CardTitle>
                <CardDescription className="text-sm">Daerah dengan anomali harga</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-4">
            {inflationRows.map((row: any) => (
              <div key={row.id} className="group rounded-[20px] bg-white p-4 ring-1 ring-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-amber-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-semibold text-slate-900">{row.commodity}</h5>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPinned className="h-3.5 w-3.5" />
                      <span>{row.region}</span>
                    </div>
                  </div>
                  <StatusBadge>{row.status}</StatusBadge>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 divide-x divide-slate-100 pt-3 border-t border-slate-50 text-center">
                  <div className="px-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Pasar</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{row.market}</p>
                  </div>
                  <div className="px-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Acuan</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{row.reference}</p>
                  </div>
                  <div className="px-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-rose-400">Delta</p>
                    <p className="mt-1 text-sm font-bold text-rose-600">{row.delta}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface>
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 rounded-t-[32px]">
            <CardTitle className="text-base text-slate-800">Pasokan terbaru</CardTitle>
            <CardDescription>Menunggu divalidasi</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {supplies.slice(0, 4).map((row: any) => (
              <div key={row.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-100 transition-all hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Wheat className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 leading-none mb-1">{row.farmer}</h5>
                    <p className="text-xs text-slate-500">{row.commodity} • Vol: <span className="font-medium text-slate-700">{row.volume}</span></p>
                  </div>
                </div>
                <StatusBadge>{row.status}</StatusBadge>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => setPage("input-panen")}>
              Lihat Semua Pasokan
            </Button>
          </CardContent>
        </Surface>

        <Surface>
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 rounded-t-[32px]">
            <CardTitle className="text-base text-slate-800">Kandidat pembiayaan</CardTitle>
            <CardDescription>Hasil scoring Alternative Credit</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {scores.slice(0, 3).map((row: any) => (
              <div key={row.id} className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-100 transition-all hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 leading-none mb-1">{row.name}</h5>
                    <p className="text-xs text-slate-500">{row.segment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex h-8 items-center rounded-full bg-emerald-50 px-3 ring-1 ring-emerald-200">
                    <span className="text-xs font-bold text-emerald-700">Skor {row.score}</span>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl shadow-none hover:bg-slate-100" onClick={() => openScoreDetail(row.id)}>Detail</Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => setPage("scoring")}>
              Dashboard Scoring Lengkap
            </Button>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function InputPanenPage({ supplies, onSubmitHarvest, onValidateSupply }: any) {
  const [form, setForm] = useState({ farmer: "", commodity: "", volume: "", village: "", price: "" })
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return supplies.filter((item: any) => item.farmer.toLowerCase().includes(q) || item.commodity.toLowerCase().includes(q) || item.village.toLowerCase().includes(q))
  }, [query, supplies])
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Input & Validasi Panen" 
        description="Kelola data pasokan dari kelompok tani yang masuk ke dalam sistem Dayapala." 
      />
      
      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-emerald-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Tambah Pasokan</CardTitle>
            <CardDescription>Input data pasokan secara manual jika petani tidak menggunakan sistem.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Entitas / Kelompok Tani</label>
                <Input value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })} className="h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white" placeholder="Contoh: Gapoktan Maju Makmur" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Komoditas</label>
                  <Input value={form.commodity} onChange={(e) => setForm({ ...form, commodity: e.target.value })} className="h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white" placeholder="Beras Medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Volume</label>
                  <Input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className="h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white" placeholder="5 Ton" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Lokasi Asal</label>
                <Input value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white" placeholder="Desa / Kecamatan" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Harga Target / Kg</label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white" placeholder="Rp11.000" />
              </div>
            </div>
            
            <Button
              className="h-12 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-500/20 mt-2"
              onClick={() => {
                if (!form.farmer || !form.commodity || !form.volume || !form.village || !form.price) return
                onSubmitHarvest(form)
                setForm({ farmer: "", commodity: "", volume: "", village: "", price: "" })
              }}
            >
              Kirim ke Antrean Validasi
            </Button>
          </CardContent>
        </Surface>

        <Surface className="flex flex-col h-[calc(100vh-200px)] lg:h-auto min-h-[600px]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px] flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg text-slate-800">Daftar Pasokan</CardTitle>
                <CardDescription>Antrean pasokan yang masuk ke sistem koperasi</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 rounded-full bg-white pl-10 ring-1 ring-slate-200/60 shadow-sm" placeholder="Cari data..." />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto bg-slate-50/30">
            {filtered.length === 0 ? (
              <div className="p-8">
                <EmptyState title="Tak ada data ditemukan" description="Kata kunci tidak cocok dengan pasokan mana pun." cta={<Button className="rounded-2xl" onClick={() => setQuery("")}>Hapus pencarian</Button>} />
              </div>
            ) : (
              <div className="divide-y divide-slate-100/80">
                {filtered.map((row: any) => (
                  <div key={row.id} className="p-5 bg-white transition-colors hover:bg-emerald-50/30 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Wheat className="h-6 w-6" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900">{row.farmer}</h5>
                        <p className="text-sm text-slate-500">{row.commodity} • {row.village}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full lg:w-auto mt-2 lg:mt-0">
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1 text-sm text-slate-700 bg-slate-50 lg:bg-transparent p-3 lg:p-0 rounded-xl w-full lg:w-auto">
                        <div><span className="text-slate-400 lg:hidden inline-block w-16">Vol:</span> <span className="font-semibold">{row.volume}</span></div>
                        <div><span className="text-slate-400 lg:hidden inline-block w-16">Harga:</span> {row.price}</div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-2 w-40 shrink-0">
                        <StatusBadge>{row.status}</StatusBadge>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onValidateSupply(row.id)}
                          disabled={row.status === "Tervalidasi"}
                        >
                          {row.status === "Tervalidasi" ? "Selesai" : "Validasi"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="w-full flex justify-between items-center sm:hidden mt-2">
                       <StatusBadge>{row.status}</StatusBadge>
                       <Button size="sm" variant="outline" className="h-8 rounded-full border-emerald-200 text-emerald-700" onClick={() => onValidateSupply(row.id)}>Validasi</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function DemandPage({ demands, setPage }: any) {
  const [selectedDemand, setSelectedDemand] = useState<any>(null)
  return (
    <div className="space-y-6">
      <DetailModal 
        isOpen={!!selectedDemand} 
        onClose={() => setSelectedDemand(null)} 
        title="Detail Kebutuhan Vendor"
      >
        {selectedDemand && (
          <div className="space-y-4">
             <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">{selectedDemand.buyer}</h4>
                <p className="text-sm text-slate-500">Prioritas: {selectedDemand.priority}</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Komoditas</span>
                   <p className="font-semibold text-slate-800">{selectedDemand.commodity}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Volume</span>
                   <p className="font-semibold text-slate-800">{selectedDemand.amount}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Batas ETA</span>
                   <p className="font-semibold text-slate-800">{selectedDemand.schedule}</p>
                </div>
             </div>
             <Button className="w-full rounded-xl bg-emerald-600" onClick={() => { setSelectedDemand(null); setPage("matching"); }}>Cari Kandidat via AI</Button>
          </div>
        )}
      </DetailModal>
      <PageHeader title="Manajemen Demand Vendor" description="Tinjau daftar pesanan dari Dapur Umum Vendor SPPG & MBG yang perlu pemenuhan pasokan segera." actions={<Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-[1.02]">Ajukan Permintaan Baru</Button>} />
      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
           <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                 <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                 <CardTitle className="text-lg text-slate-800">Kebutuhan Aktif</CardTitle>
                 <CardDescription>Antrean demand yang belum terpenuhi oleh pasokan</CardDescription>
              </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {demands.map((row: any) => (
              <div key={row.id} className="p-6 bg-white transition-colors hover:bg-slate-50/50 group flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
                <div className="space-y-1 w-full lg:w-1/3">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge>{row.priority}</StatusBadge>
                  </div>
                  <h4 className="font-semibold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">{row.buyer}</h4>
                  <p className="text-sm text-slate-500">Mencari: <span className="font-medium text-slate-700">{row.commodity}</span></p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full lg:w-1/3 bg-slate-50 p-4 rounded-2xl ring-1 ring-slate-100">
                  <div>
                    <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Kebutuhan</span>
                    <span className="font-semibold text-slate-800">{row.amount}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Batas Waktu</span>
                    <span className="font-medium text-slate-700">{row.schedule}</span>
                  </div>
                </div>

                <div className="flex w-full lg:w-auto lg:justify-end gap-3 shrink-0 mt-2 lg:mt-0">
                  <Button size="sm" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 h-10 px-4 w-full lg:w-auto opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all" onClick={() => setPage("matching")}>Lihat kandidat</Button>
                  <Button size="sm" variant="outline" className="rounded-xl h-10 px-4 border-slate-200 w-full lg:w-auto" onClick={() => setSelectedDemand(row)}>Detail</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}

export function MatchingPage({ matches, openMatchDetail, onConfirmMatch, runMatching }: any) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="AI Matching Supply-Demand" 
        description="Keputusan distribusi didukung AI untuk efisiensi rute, ketepatan volume, dan ketepatan waktu." 
        actions={
          <Button className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all hover:scale-[1.02]" onClick={runMatching}>
            Jalankan AI Matching Baru
          </Button>
        }
      />
      <div className="grid gap-6">
        {matches.map((item: any) => (
          <Surface key={item.id} className="group transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-emerald-200">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-[1fr_300px]">
                <div className="p-6 lg:p-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 ring-1 ring-emerald-200">
                      <Route className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">Rekomendasi Utama</span>
                    </div>
                    <StatusBadge>{item.credit}</StatusBadge>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      {item.commodity} 
                      <span className="text-slate-300 font-light px-1">|</span>
                      <span className="text-lg text-slate-600 font-medium">{item.source} <span className="text-emerald-500 mx-1">→</span> {item.target}</span>
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed max-w-2xl">{item.explanation}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-colors group-hover:bg-white group-hover:ring-emerald-100">
                      <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Status Kredit</p>
                      <p className="mt-1 text-base font-semibold text-slate-800">{item.credit}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-colors group-hover:bg-white group-hover:ring-emerald-100">
                      <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Durasi ETA</p>
                      <p className="mt-1 text-base font-semibold text-slate-800">{item.eta}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/80 p-6 lg:p-8 lg:border-l border-slate-100 flex flex-col justify-center">
                  <div className="mb-6 flex flex-col items-center justify-center p-6 bg-white rounded-3xl ring-1 ring-slate-200/60 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent" />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-600 mb-2 relative z-10">Fit Score</p>
                    <p className="text-5xl font-display font-bold tracking-tighter text-slate-900 relative z-10">{item.fit}<span className="text-2xl text-slate-400 ml-1">%</span></p>
                    <Progress value={item.fit} className="h-2 w-full mt-4 bg-emerald-100" />
                  </div>
                  
                  <div className="space-y-3 w-full">
                    <Button className="w-full rounded-2xl h-12 bg-emerald-600 hover:bg-emerald-700 text-base shadow-md shadow-emerald-500/20" onClick={() => onConfirmMatch(item)}>
                      Konfirmasi Eksekusi
                    </Button>
                    <Button variant="outline" className="w-full rounded-2xl h-12 border-slate-200 bg-white hover:bg-slate-50" onClick={() => openMatchDetail(item.id)}>
                      Analisis Rinci
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

export function MatchDetailPage({ selectedMatch, onConfirmMatch, setPage }: any) {
  if (!selectedMatch) {
    return <EmptyState title="Belum ada match terpilih" description="Pilih rekomendasi dari AI Matching Supply-Demand untuk melihat detailnya." />
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Analisis Rinci Distribusi" description="Tinjau dasar keputusan AI sebelum mengeksekusi perpindahan pasokan." actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => setPage("matching")}>Kembali</Button>} />
      
      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-emerald-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Alasan & Rekomendasi Sistem</CardTitle>
            <CardDescription className="text-sm">Analisis di balik *fit score* {selectedMatch.fit}%</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">{selectedMatch.commodity}</h3>
            <div className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-slate-50 p-4 rounded-2xl ring-1 ring-slate-100 w-fit">
              <span>{selectedMatch.source}</span>
              <Route className="h-5 w-5 text-emerald-500" />
              <span>{selectedMatch.target}</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-slate-600">{selectedMatch.explanation}</p>
              
              <div className="mt-8">
                <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Faktor Penentu Match
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold">1</div>
                    <p className="text-sm text-slate-700 leading-relaxed">Kesesuaian volume antara pasok dan demand tinggi, mengurangi sisa gudang secara signifikan.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold">2</div>
                    <p className="text-sm text-slate-700 leading-relaxed">Lokasi sumber relatif dekat dengan tujuan distribusi, mengoptimalkan waktu (ETA: {selectedMatch.eta}).</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 font-bold">3</div>
                    <p className="text-sm text-slate-700 leading-relaxed">Status kredit ({selectedMatch.credit}) dari kedua belah pihak dijamin aman untuk pembayaran on-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Surface>

        <div className="space-y-6">
          <Surface>
            <CardHeader className="pb-4">
              <CardTitle>Ringkasan Operasional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                <span className="text-sm font-medium text-slate-500">Fit Score System</span>
                <span className="text-2xl font-bold text-emerald-600">{selectedMatch.fit}%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                <span className="text-sm font-medium text-slate-500">Estimasi Tiba</span>
                <span className="font-semibold text-slate-800">{selectedMatch.eta}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                <span className="text-sm font-medium text-slate-500 block mb-1">Rute Disarankan</span>
                <span className="text-sm text-slate-800 leading-relaxed">{selectedMatch.route}</span>
              </div>
            </CardContent>
          </Surface>

          <Surface className="bg-gradient-to-br from-emerald-600 to-teal-700 border-none">
            <CardContent className="p-6 text-center space-y-5">
              <ShieldCheck className="h-10 w-10 text-emerald-200 mx-auto" />
              <div>
                <p className="text-emerald-50 font-medium">Tindakan ini akan dicatat ke dalam</p>
                <p className="text-white font-bold text-lg">Immutable Audit Log</p>
              </div>
              <Button className="w-full h-12 rounded-2xl bg-white text-emerald-700 hover:bg-slate-50 font-bold border-none shadow-lg" onClick={() => onConfirmMatch(selectedMatch)}>
                Konfirmasi Distribusi
              </Button>
            </CardContent>
          </Surface>
        </div>
      </div>
    </div>
  )
}

export function InflasiPage({ inflationRows, onIntervene }: any) {
  return (
    <div className="space-y-6">
      <PageHeader title="Pemantauan Inflasi Wilayah" description="Deteksi dini anomali harga pangan dan lakukan intervensi distribusi tepat sasaran." />
      
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Komoditas Terpantau" value="18" hint="Beras, telur, sayur, cabai, minyak, dll." icon={MapPinned} />
        <StatCard title="Wilayah Waspada" value={inflationRows.filter((row: any) => row.status !== "Normal").length.toString()} hint="Menunjukkan anomali harga" icon={TrendingUp} />
        <StatCard title="Prioritas Intervensi" value="2" hint="Perlu tindakan segera" icon={Bell} />
      </div>

      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <div className="flex items-center gap-3">
             <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <TrendingUp className="h-5 w-5" />
             </div>
             <div>
                <CardTitle className="text-lg text-slate-800">Indikator Harga Pasar vs Acuan</CardTitle>
                <CardDescription>Berdasarkan data real-time, warna merah menunjukkan harga melebihi batas acuan HET.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {inflationRows.map((row: any) => (
              <div key={row.id} className="p-6 bg-white transition-colors hover:bg-slate-50/50 group flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge>{row.status}</StatusBadge>
                  </div>
                  <h4 className="font-semibold text-lg text-slate-900">{row.commodity}</h4>
                  <p className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPinned className="h-3.5 w-3.5" />
                    {row.region}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-8 md:gap-12 text-center md:text-left bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Harga Pasar</span>
                    <span className="font-semibold text-slate-700">{row.market}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Harga Acuan</span>
                    <span className="font-medium text-slate-600">{row.reference}</span>
                  </div>
                  <div className="text-right border-l border-slate-200/60 pl-8 md:pl-12">
                    <span className="block text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1">Selisih (Delta)</span>
                    <span className={`text-lg font-bold ${row.status === 'Waspada' ? 'text-rose-600' : 'text-slate-700'}`}>{row.delta}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 shrink-0">
                  <Button 
                    size="sm" 
                    className="rounded-xl h-10 w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => onIntervene(row)}
                  >
                    Intervensi
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}

export function ScoringPage({ scores, openScoreDetail, onRecommendFinance, onDownload, setPage }: any) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Alternative Credit Scoring" 
        description="Evaluasi kelayakan supplier untuk modal kerja berdasarkan data operasional dan rekam jejak penyaluran." 
        actions={<Button className="rounded-2xl border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100" variant="outline" onClick={() => onDownload("Scoring", scores)}>Unduh Laporan Portofolio</Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Daftar Kandidat Pembiayaan</CardTitle>
            <CardDescription>Diurutkan berdasarkan kelayakan tertinggi</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100/80">
              {scores.map((row: any) => (
                <div key={row.id} className="p-6 bg-white transition-colors hover:bg-slate-50/50 group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-50 text-cyan-600 flex items-center justify-center shrink-0">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-slate-900 group-hover:text-cyan-700 transition-colors">{row.name}</h4>
                        <p className="text-sm font-medium text-slate-500">{row.segment}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center justify-center rounded-2xl bg-cyan-50 px-4 py-2 ring-1 ring-cyan-200 shadow-sm">
                        <span className="text-2xl font-bold text-cyan-800">{row.score}</span>
                        <span className="text-xs text-cyan-500 mt-1 ml-1">/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                       <span className="text-slate-400 uppercase tracking-wider">Credit Confidence</span>
                       <span className="text-cyan-700">{row.score}%</span>
                    </div>
                    <Progress value={row.score} className="h-2 rounded-full bg-slate-100" />
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 mb-5">{row.reason}</p>
                  
                  <div className="flex gap-3">
                    <Button className="rounded-xl h-10 flex-1 bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20" onClick={() => onRecommendFinance(row)}>Ajukan Pembiayaan</Button>
                    <Button variant="outline" className="rounded-xl h-10 flex-1 border-slate-200" onClick={() => openScoreDetail(row.id)}>Detail Penilaian</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Surface>

        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-emerald-50/50 pb-5 rounded-t-[32px]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Explainable AI Insight</CardTitle>
                <CardDescription>Metodologi di balik credit score Dayapala</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
                <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">1</span>
                  Bagaimana skor dihitung?
                </h5>
                <p className="text-sm leading-relaxed text-slate-600 pl-8">Skor dibangun secara objektif berdasarkan histori pasok, konsistensi volume pengiriman, kualitas transaksi, dan ketepatan waktu ETA (performa pengiriman) yang tercatat immutable di sistem Dayapala.</p>
              </div>
              
              <div className="p-5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
                <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">2</span>
                  Mengapa ini krusial?
                </h5>
                <p className="text-sm leading-relaxed text-slate-600 pl-8">Metode *Alternative Credit Scoring* menghilangkan bias, menawarkan mitigasi risiko terukur, dan menghubungkan data operasional supplier secara *traceable* untuk para mitra pembiayaan.</p>
              </div>
            </div>
            
            <Button className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md" onClick={() => onDownload("RiskSummary", scores)}>Lihat Risk Summary Lengkap</Button>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function ScoreDetailPage({ selectedScore, onRecommendFinance, setPage }: any) {
  if (!selectedScore) {
    return <EmptyState title="Belum ada supplier terpilih" description="Pilih kandidat dari Alternative Credit Scoring untuk melihat detailnya." />
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Rating Supplier & Keputusan Pembiayaan" description="Tinjau secara mendalam profil kelayakan kredit dan rekomendasi intervensi pembiayaan." actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => setPage("scoring")}>Kembali</Button>} />
      
      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px] text-center">
             <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                <Users className="h-10 w-10" />
             </div>
             <CardTitle className="text-xl text-slate-900">{selectedScore.name}</CardTitle>
             <CardDescription className="text-base">{selectedScore.segment}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center bg-gradient-to-b from-white to-slate-50/50">
            <div className="inline-flex items-center justify-center p-6 bg-white rounded-full ring-1 ring-slate-200 shadow-sm mb-6 relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#0891b2" strokeWidth="8" strokeDasharray={`${(selectedScore.score / 100) * 289} 289`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="relative z-10 flex flex-col items-center">
                 <span className="text-5xl font-bold font-display text-slate-900">{selectedScore.score}</span>
                 <span className="text-sm font-bold tracking-wider text-slate-400 uppercase mt-1">/100</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-left p-4 rounded-2xl bg-white ring-1 ring-slate-200">
               <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Status Kredit</span>
                  <StatusBadge>Aman</StatusBadge>
               </div>
               <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Tren Output</span>
                  <span className="font-semibold text-emerald-600">+12% / bln</span>
               </div>
            </div>
          </CardContent>
        </Surface>

        <Surface className="h-fit">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
            <CardTitle className="text-lg text-slate-800">Analisis Pendukung & Rekomendasi</CardTitle>
            <CardDescription>Kesimpulan hasil evaluasi algoritma berdasarkan histori pasokan aktual.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900 uppercase mb-4">
                 <FileClock className="h-4 w-4 text-cyan-600" /> Histori & Alasan Utama
              </h4>
              <p className="text-base leading-relaxed text-slate-600 p-5 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                 {selectedScore.detail}
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900 uppercase mb-4">
                 <Route className="h-4 w-4 text-emerald-600" /> Action Plan & Rekomendasi
              </h4>
              <p className="text-base leading-relaxed text-slate-600 p-5 rounded-2xl bg-emerald-50/50 ring-1 ring-emerald-100 border-l-4 border-l-emerald-500">
                 Prioritaskan pencairan fasilitas modal kerja bertahap. Verifikasi dan pantau ketat satu siklus pengiriman terdekat, lalu integrasikan langsung ke daftar prioritas demand koperasi.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
              <Button size="lg" className="rounded-2xl h-14 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-md shadow-cyan-500/20 px-8" onClick={() => onRecommendFinance(selectedScore)}>
                 Teruskan ke Mitra Pembiayaan
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 border-slate-200 font-semibold px-8" onClick={() => alert("Masuk mode ulasan manual.")}>
                 Ulasan Manual
              </Button>
            </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function AuditPage({ auditRows, formatDate }: any) {
  return (
    <div className="space-y-6">
      <PageHeader title="Immutable Audit Log" description="Pusat transparansi dayapala mencatat setiap langkah operasional, dari pasokan hingga distribusi." />
      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <CardTitle className="text-lg text-slate-800">Timeline Aktivitas Operasional</CardTitle>
          <CardDescription>Data yang tercatat tidak dapat diubah (immutable log).</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          <div className="relative max-w-3xl">
             <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200/60 hidden md:block" />
             <div className="space-y-8">
               {auditRows.map((row: any, index: number) => (
                 <div key={row.id} className="relative flex gap-6 md:gap-8 group">
                   <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200/80 shadow-sm transition-transform group-hover:scale-110">
                      <FileClock className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                   </div>
                   <div className="flex-1 rounded-[24px] bg-slate-50/50 p-5 ring-1 ring-slate-100 transition-colors group-hover:bg-white group-hover:shadow-md group-hover:ring-slate-200">
                     <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge variant="secondary" className="rounded-md bg-white border-slate-200 shadow-sm text-xs font-semibold">{row.tag}</Badge>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5"><FileClock className="w-3 h-3"/> {formatDate(row.time)}</span>
                     </div>
                     <h4 className="text-base font-semibold text-slate-900 mb-1">{row.title}</h4>
                     <p className="text-sm font-medium text-emerald-700 mb-3">{row.actor}</p>
                     <p className="text-sm leading-relaxed text-slate-600">{row.detail}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}

export function SupplierPage({ scores, openScoreDetail, setPage, onDownload }: any) {
  const top = scores?.[0] || { id: "1", name: "Kelompok Tani Sumber Rezeki" }
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Profil Master Supplier" 
        description="Tinjauan menyeluruh terhadap entitas kelompok tani atau vendor, termasuk rekam jejak supply dan credit score." 
        actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => onDownload("ProfilSupplier", [top])}>Unduh Profil</Button>} 
      />
      
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Pasokan Aktif" value="3 Batch" hint="Terdata dalam ekosistem" icon={Wheat} />
        <StatCard title="Skor Pembiayaan" value="86/100" hint="Berstatus Layak" icon={HandCoins} />
        <StatCard title="Ketepatan Kirim" value="92%" hint="Sangat Rendah Keterlambatan" icon={Truck} />
      </div>

      <Surface className="overflow-hidden">
        <div className="h-32 bg-emerald-600 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" />
        <div className="px-6 md:px-10 pb-10 relative">
           <div className="h-24 w-24 rounded-3xl bg-white shadow-xl shadow-slate-200/50 p-2 -mt-12 mb-6 ring-1 ring-slate-100 flex items-center justify-center relative z-10">
              <div className="h-full w-full rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                 <Users className="h-10 w-10" />
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Kelompok Tani Sumber Rezeki</h2>
                 <p className="text-lg font-medium text-slate-500 flex items-center gap-2">
                    <MapPinned className="h-5 w-5" /> Kab. Lamongan • Supplier Terdaftar
                 </p>
              </div>
              <div className="flex gap-3 shrink-0">
                 <Button size="lg" className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md font-semibold" onClick={() => openScoreDetail(top.id)}>Dashboard Scoring</Button>
                 <Button size="lg" variant="outline" className="rounded-xl border-slate-200 font-semibold" onClick={() => setPage("audit")}>History Audit Log</Button>
              </div>
           </div>
           
           <div className="mt-10 p-6 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assessment Operasional</h4>
              <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
                 Koperasi ini secara konsisten menyuplai beras medium sesuai dengan *Service Level Agreement* (SLA). Secara historikal menunjukkan tingkat stabilitas pengiriman yang kuat. Data transaksi dan log operasional terverifikasi, memungkinkan integrasi fasilitas modal kerja secara lebih aman.
              </p>
           </div>
        </div>
      </Surface>
    </div>
  )
}

export function NotificationsPage({ notifications, formatDate }: any) {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifikasi & Peringatan Otomatis" description="Pantau peringatan dan event penting secara riil-waktu dari seluruh modul." actions={<Button variant="outline" className="rounded-2xl border-slate-200">Tandai Semua Dibaca</Button>} />
      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <div className="flex items-center gap-3">
             <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Bell className="h-5 w-5" />
             </div>
             <div>
                <CardTitle className="text-lg text-slate-800">Alert Center</CardTitle>
                <CardDescription>Pesan prioritas berdasarkan logika dan threshold Dayapala</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {notifications.map((item: any) => (
              <div key={item.id} className="p-5 md:p-6 bg-white transition-colors hover:bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-amber-100 text-amber-600`}>
                   <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                   <p className="font-semibold text-slate-900 leading-relaxed text-[15px]">{item.title}</p>
                   <p className="text-sm text-slate-600 mt-0.5">{item.message}</p>
                   <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide uppercase">{formatDate(item.created_at)}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl border-slate-200 w-full sm:w-auto mt-2 sm:mt-0 font-medium">Lakukan Tindakan</Button>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="p-12 text-center text-slate-500 font-medium">Tidak ada notifikasi baru.</div>
            )}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}
