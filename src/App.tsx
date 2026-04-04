import React, { useState } from "react"
import { motion } from "framer-motion"
import { Landing } from "@/pages/public/Landing"
import { LoginPanel } from "@/pages/public/Login"
import { AppHeader } from "@/components/shared/AppHeader"
import { Sidebar } from "@/components/shared/Sidebar"
import { Banner } from "@/components/shared/Banner"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"

import { INITIAL_SUPPLIES, INITIAL_DEMANDS, INITIAL_MATCHES, INITIAL_INFLATION, INITIAL_SCORES, INITIAL_AUDIT } from "@/data/mockData"
import { NAV_ITEMS } from "@/data/constants"

// Role Pages
import {
  KoperasiDashboard,
  InputPanenPage,
  DemandPage,
  MatchingPage,
  MatchDetailPage,
  InflasiPage,
  ScoringPage,
  ScoreDetailPage,
  AuditPage,
  SupplierPage,
  NotificationsPage,
} from "@/pages/koperasi/KoperasiPages"

import {
  PetaniHome,
  PetaniTambahPage,
  PetaniRiwayatPage,
  PetaniSkorPage,
  PetaniStatusPage,
} from "@/pages/petani/PetaniPages"

import {
  VendorOverviewPage,
  VendorAjukanPage,
  VendorCandidatesPage,
} from "@/pages/vendor/VendorPages"

import {
  FinanceOverviewPage,
  FinanceRiskPage,
  FinanceHistoryPage,
} from "@/pages/pembiayaan/PembiayaanPages"

import { SettingsPage } from "@/pages/shared/SettingsPage"

function RenderRolePage({ role, page, state, actions }: any) {
  if (role === "koperasi") {
    if (page === "dashboard") return <KoperasiDashboard supplies={state.supplies} matches={state.matches} inflationRows={state.inflationRows} scores={state.scores} setPage={actions.setPage} openMatchDetail={actions.openMatchDetail} openScoreDetail={actions.openScoreDetail} />
    if (page === "input-panen") return <InputPanenPage supplies={state.supplies} onSubmitHarvest={actions.onSubmitHarvest} />
    if (page === "demand") return <DemandPage demands={state.demands} />
    if (page === "matching") return <MatchingPage matches={state.matches} openMatchDetail={actions.openMatchDetail} onConfirmMatch={actions.onConfirmMatch} />
    if (page === "match-detail") return <MatchDetailPage selectedMatch={state.selectedMatch} onConfirmMatch={actions.onConfirmMatch} setPage={actions.setPage} />
    if (page === "inflasi") return <InflasiPage inflationRows={state.inflationRows} />
    if (page === "scoring") return <ScoringPage scores={state.scores} openScoreDetail={actions.openScoreDetail} onRecommendFinance={actions.onRecommendFinance} setPage={actions.setPage} />
    if (page === "scoring-detail") return <ScoreDetailPage selectedScore={state.selectedScore} onRecommendFinance={actions.onRecommendFinance} showBanner={actions.showBanner} />
    if (page === "audit") return <AuditPage auditRows={state.auditRows} />
    if (page === "supplier") return <SupplierPage scores={state.scores} openScoreDetail={actions.openScoreDetail} setPage={actions.setPage} />
    if (page === "notifikasi") return <NotificationsPage setPage={actions.setPage} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "petani") {
    if (page === "home") return <PetaniHome supplies={state.petaniSupplies} scores={state.scores} setPage={actions.setPage} />
    if (page === "tambah") return <PetaniTambahPage onSubmitHarvest={actions.onSubmitHarvest} />
    if (page === "riwayat") return <PetaniRiwayatPage supplies={state.petaniSupplies} />
    if (page === "skor") return <PetaniSkorPage scores={state.scores} />
    if (page === "status") return <PetaniStatusPage setPage={actions.setPage} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "vendor") {
    if (page === "overview") return <VendorOverviewPage demands={state.demands} setPage={actions.setPage} />
    if (page === "ajukan") return <VendorAjukanPage onSubmitDemand={actions.onSubmitDemand} showBanner={actions.showBanner} />
    if (page === "kandidat") return <VendorCandidatesPage matches={state.matches} setPage={actions.setPage} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "pembiayaan") {
    if (page === "overview") return <FinanceOverviewPage scores={state.scores} setPage={actions.setPage} />
    if (page === "risk") return <FinanceRiskPage selectedScore={state.selectedScore || state.scores[0]} onRecommendFinance={actions.onRecommendFinance} showBanner={actions.showBanner} />
    if (page === "riwayat") return <FinanceHistoryPage setPage={actions.setPage} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  return <EmptyState title="Halaman belum ditemukan" description="Pilih navigasi lain untuk melanjutkan alur Dayapala." cta={<Button className="rounded-2xl" onClick={() => actions.setPage(NAV_ITEMS[role][0].key)}>Kembali ke awal</Button>} />
}

export default function App() {
  const [authMode, setAuthMode] = useState<"none" | "login" | "register">("none")
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("koperasi")
  const [currentPageByRole, setCurrentPageByRole] = useState<any>({ koperasi: "dashboard", petani: "home", vendor: "overview", pembiayaan: "overview" })
  const [supplies, setSupplies] = useState(INITIAL_SUPPLIES)
  const [demands, setDemands] = useState(INITIAL_DEMANDS)
  const [matches, setMatches] = useState(INITIAL_MATCHES)
  const [scores, setScores] = useState(INITIAL_SCORES)
  const [auditRows, setAuditRows] = useState(INITIAL_AUDIT)
  const [selectedMatchId, setSelectedMatchId] = useState(INITIAL_MATCHES[0].id)
  const [selectedScoreId, setSelectedScoreId] = useState(INITIAL_SCORES[0].id)
  const [banner, setBanner] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const setPage = (page: string) => {
    setCurrentPageByRole((prev: any) => ({ ...prev, [role]: page }))
    setIsSidebarOpen(false) // Auto close on mobile
  }

  const addAudit = (title: string, detail: string, tag: string, actor: string) => {
    setAuditRows((prev) => [
      {
        id: Date.now() + Math.random(),
        time: new Date().toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        actor,
        title,
        detail,
        tag,
      },
      ...prev,
    ])
  }

  const onSubmitHarvest = (form: any, fromPetani = false) => {
    const newSupply = {
      id: Date.now(),
      farmer: form.farmer,
      commodity: form.commodity,
      volume: form.volume,
      village: form.village,
      price: form.price.startsWith("Rp") ? form.price : `Rp${form.price}`,
      status: "Menunggu validasi koperasi",
    }
    setSupplies((prev) => [newSupply, ...prev])
    addAudit("Input panen baru", `${form.commodity} dari ${form.farmer} dikirim ke sistem dan menunggu validasi koperasi.`, "Input", fromPetani ? form.farmer : "Koperasi" )
    setBanner("Data panen berhasil disimpan dan menunggu validasi koperasi.")
    if (fromPetani) {
      setCurrentPageByRole((prev: any) => ({ ...prev, petani: "riwayat" }))
    }
  }

  const onSubmitDemand = (form: any) => {
    const newDemand = {
      id: Date.now(),
      buyer: form.buyer,
      commodity: form.commodity,
      amount: form.amount,
      schedule: form.schedule,
      priority: form.priority,
    }
    setDemands((prev) => [newDemand, ...prev])
    addAudit("Permintaan pasok baru", `${form.buyer} mengajukan kebutuhan ${form.commodity} sebesar ${form.amount}.`, "Distribusi", form.buyer)
    setBanner("Permintaan pasok berhasil dibuat. Sistem siap menampilkan kandidat match.")
    setCurrentPageByRole((prev: any) => ({ ...prev, vendor: "kandidat" }))
  }

  const openMatchDetail = (id: number) => {
    setSelectedMatchId(id)
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "match-detail" }))
  }

  const onConfirmMatch = (match: any) => {
    addAudit("Distribusi dikonfirmasi", `${match.commodity} dari ${match.source} dikonfirmasi menuju ${match.target}.`, "Distribusi", "Koperasi")
    setBanner("Distribusi berhasil dikonfirmasi dan dicatat di Immutable Audit Log.")
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "audit" }))
  }

  const openScoreDetail = (id: number) => {
    setSelectedScoreId(id)
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "scoring-detail", pembiayaan: "risk" }))
  }

  const onRecommendFinance = (score: any) => {
    addAudit("Rekomendasi pembiayaan", `${score.name} direkomendasikan untuk pembiayaan dengan skor ${score.score}.`, "Pembiayaan", "Alternative Credit Scoring")
    setBanner("Rekomendasi pembiayaan berhasil dicatat dan siap ditinjau lebih lanjut.")
  }

  const selectedMatch = matches.find((item) => item.id === selectedMatchId) || null
  const selectedScore = scores.find((item) => item.id === selectedScoreId) || null
  const petaniSupplies = supplies.filter((item) => item.farmer.toLowerCase().includes("kelompok tani") || item.farmer.toLowerCase().includes("gapoktan") || item.farmer.toLowerCase().includes("kwt"))

  const filteredState = {
    supplies: searchQuery
      ? supplies.filter((item) => `${item.farmer} ${item.commodity} ${item.village}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : supplies,
    demands,
    matches,
    inflationRows: INITIAL_INFLATION,
    scores: searchQuery ? scores.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : scores,
    auditRows: searchQuery ? auditRows.filter((item) => `${item.actor} ${item.title} ${item.detail}`.toLowerCase().includes(searchQuery.toLowerCase())) : auditRows,
    selectedMatch,
    selectedScore,
    petaniSupplies,
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {!loggedIn ? (
        authMode === "none" ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Landing onAction={(mode) => setAuthMode(mode)} />
          </motion.div>
        ) : (
          <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%),linear-gradient(to_bottom,#f8fafc,#f1f5f9_100%)]">
            <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="flex w-full justify-center">
                <LoginPanel role={role} setRole={setRole} initialMode={authMode} onLogin={() => setLoggedIn(true)} onBack={() => setAuthMode("none")} />
              </motion.div>
            </div>
          </div>
        )
      ) : (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%),linear-gradient(to_bottom,#f8fafc,#f1f5f9_100%)] flex flex-col">
          <AppHeader 
            role={role} 
            setRole={setRole} 
            onLogout={() => { setLoggedIn(false); setAuthMode("none"); }} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          />
          <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <Banner message={banner} onClose={() => setBanner("")} />
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr]">
              <Sidebar role={role} page={currentPageByRole[role]} setPage={setPage} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              <main className="w-full min-w-0 pb-12">
                <motion.div
                  key={`${role}-${currentPageByRole[role]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <RenderRolePage
                    role={role}
                    page={currentPageByRole[role]}
                    state={filteredState}
                    actions={{
                      setPage,
                      onSubmitHarvest,
                      onSubmitDemand,
                      openMatchDetail,
                      onConfirmMatch,
                      openScoreDetail,
                      onRecommendFinance,
                      showBanner: setBanner,
                    }}
                  />
                </motion.div>
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
