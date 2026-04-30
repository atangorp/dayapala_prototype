import React from "react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle2, ShieldCheck, Wallet, FileClock } from "lucide-react"
import { Surface } from "@/components/shared/Surface"
import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"

export function FinanceOverviewPage({ scores, setPage, onDownload }: any) {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard Mitra Pembiayaan" 
        description="Akses daftar kandidat prioritas yang telah diverifikasi kelayakannya oleh algoritma Alternative Credit Scoring Dayapala." 
        actions={<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-sm transition-all hover:scale-[1.02]" onClick={() => onDownload("ReportKredit", scores)}>Unduh Credit Report Berstandar Bank</Button>} 
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Entitas Aktif" value={`${scores.length}`} hint="Dalam ekosistem Dayapala" icon={Users} />
        <StatCard title="Layak Pembiayaan" value={scores.filter((row: any) => row.score >= 80).length.toString()} hint="Skor A dan B" icon={CheckCircle2} />
        <StatCard title="Perlu Tinjauan" value={scores.filter((row: any) => row.score < 80).length.toString()} hint="Skor Borderline" icon={ShieldCheck} />
        <StatCard title="Top Priority" value={scores.filter((row: any) => row.score >= 90).length.toString()} hint="Credit Risk Sangat Rendah" icon={Wallet} />
      </div>
      
      <Surface className="flex flex-col">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <CardTitle className="text-lg text-slate-800">Daftar Indeks Kelayakan</CardTitle>
          <CardDescription>Kandidat secara otomatis diurutkan berdasarkan skor tertinggi minim risiko.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {scores.map((row: any) => (
              <div key={row.id} className="p-5 md:p-6 bg-white transition-colors hover:bg-slate-50/50 group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center shrink-0 ring-1 ring-blue-100/50">
                    <ShieldCheck className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">{row.name}</h4>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">Klasifikasi Risiko: <span className="text-slate-700">{row.segment}</span></p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-6 mt-2 md:mt-0">
                   <div className="flex items-center justify-between md:justify-center w-full md:w-auto gap-3">
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block md:hidden">Skor Algoritma</span>
                     <Badge className="rounded-2xl h-10 px-4 bg-slate-900 border-none text-white shadow-md font-bold text-sm tracking-wide gap-1">
                       <span className="text-blue-400">Score:</span> {row.score}
                     </Badge>
                   </div>
                   <Button className="w-full md:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 px-6 h-10" onClick={() => setPage("risk")}>
                     Credit Assessment
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

export function FinanceRiskPage({ selectedScore, onRecommendFinance }: any) {
  const score = selectedScore
  if (!score) {
    return <EmptyState title="Belum Pilih Kandidat" description="Pilih kandidat dari Daftar Indeks Kelayakan" />
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Executive Risk Summary" description="Evaluasi komprehensif profil debitur potensial menggunakan data immutable dari platform Dayapala." actions={<Button variant="outline" className="rounded-2xl border-slate-200">Kembali</Button>} />
      
      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <Surface className="h-fit">
          <CardHeader className="text-center pb-2 border-b border-slate-100 bg-slate-50/50 rounded-t-[32px]">
            <CardTitle className="text-xl text-slate-900">{score.name}</CardTitle>
            <CardDescription className="text-base font-medium text-blue-600 pb-2">{score.segment}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8 bg-gradient-to-b from-white to-slate-50 hover:bg-slate-50 transition-colors">
            <div className="inline-flex items-center justify-center p-6 bg-white rounded-full ring-1 ring-slate-200 shadow-sm mb-6 relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                 <circle cx="50" cy="50" r="46" fill="transparent" stroke="#2563eb" strokeWidth="6" strokeDasharray={`${(score.score / 100) * 289} 289`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="relative z-10 flex flex-col items-center mt-2">
                 <span className="text-6xl font-bold font-display text-slate-900">{score.score}</span>
                 <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-2">Point/100</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-left w-full pt-4 border-t border-slate-100">
               <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Rekomendasi Dayapala</span>
                  <StatusBadge>{score.score >= 80 ? "Layak Pembiayaan" : "Manual Review"}</StatusBadge>
               </div>
               <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Data Availability</span>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><span className="text-sm font-semibold text-slate-700">Tersedia</span></div>
               </div>
            </div>
          </CardContent>
        </Surface>
        
        <Surface className="h-fit flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-blue-50/50 pb-5 rounded-t-[32px]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                <FileClock className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Explainable Matrix (XAI)</CardTitle>
                <CardDescription>Argumen algoritma dengan bukti pasokan riil</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">
             <div className="space-y-4">
               <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="w-1.5 rounded-full bg-emerald-500" />
                  <div className="flex-1 space-y-1 ml-2">
                     <h5 className="text-sm font-bold text-slate-900">Stabilitas Cashflow Pasokan</h5>
                     <p className="text-sm text-slate-600 leading-relaxed">Volume pasok yang dicatat oleh koperasi konstan berada di atas rata-rata supplier sejenis di regional.</p>
                  </div>
               </div>
               <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="w-1.5 rounded-full bg-blue-500" />
                  <div className="flex-1 space-y-1 ml-2">
                     <h5 className="text-sm font-bold text-slate-900">Kinerja Pengiriman Logistik</h5>
                     <p className="text-sm text-slate-600 leading-relaxed">Tingkat ketepatan waktu (ETA) yang terekam pada audit log Dayapala memenuhi standar batas aman keterlambatan.</p>
                  </div>
               </div>
               <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="w-1.5 rounded-full bg-indigo-500" />
                  <div className="flex-1 space-y-1 ml-2">
                     <h5 className="text-sm font-bold text-slate-900">Histori Validasi Koperasi</h5>
                     <p className="text-sm text-slate-600 leading-relaxed">Seluruh invoice dan tanda terima pengiriman dikonfirmasi langsung oleh Koperasi dan Vendor yang bersangkutan secara transparan (Zero Dispute).</p>
                  </div>
               </div>
             </div>
             
             <div className="pt-6 mt-auto flex flex-col sm:flex-row gap-3 border-t border-slate-100">
                <Button className="flex-1 rounded-2xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20" onClick={() => onRecommendFinance(score)}>
                  Approve Pencairan
                </Button>
                <Button variant="outline" className="flex-1 rounded-2xl h-12 border-slate-200 font-medium bg-white hover:bg-slate-50">
                  Hold for Manual Review
                </Button>
                <Button variant="outline" className="flex-none rounded-2xl h-12 border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 font-medium px-6 hidden md:block">
                  Reject
                </Button>
             </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}

export function FinanceHistoryPage({ onDownload }: any) {
  const historyData = [
    { name: "Kelompok Tani Sumber Rezeki", status: "Approved", time: "Hari ini", amount: "Rp 150.000.000" },
    { name: "Gapoktan Mina Sejahtera", status: "Review Manual", time: "Kemarin", amount: "Rp 85.000.000" },
    { name: "KWT Mekar Pangan", status: "Approved", time: "2 hari lalu", amount: "Rp 210.000.000" },
  ]
  
  return (
    <div className="space-y-6">
      <PageHeader title="Arsip Evaluasi Keputusan" description="Manajemen portofolio dan penelusuran status pencairan modal kerja." actions={<Button variant="outline" className="rounded-2xl border-slate-200" onClick={() => onDownload("HistoryPembiayaan", historyData)}>Unduh CSV Laporan</Button>} />
      <Surface>
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5 rounded-t-[32px]">
          <CardTitle className="text-lg text-slate-800">Riwayat Pengajuan Terkini</CardTitle>
          <CardDescription>Terekam immutable dengan stempel waktu</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100/80">
            {historyData.map((item, index) => (
              <div key={index} className="p-5 md:p-6 bg-white transition-colors hover:bg-slate-50/50 group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-500 flex items-center justify-center shrink-0 ring-1 ring-slate-200/50 shadow-sm">
                    <Wallet className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{item.name}</h5>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">Pengajuan: {item.amount}</p>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                  <StatusBadge>{item.status}</StatusBadge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Surface>
    </div>
  )
}
