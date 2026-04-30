import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Landing } from "@/pages/public/Landing"
import { LoginPanel } from "@/pages/public/Login"
import { AppHeader } from "@/components/shared/AppHeader"
import { Sidebar } from "@/components/shared/Sidebar"
import { Banner } from "@/components/shared/Banner"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import axios from "axios"

import { NAV_ITEMS } from "@/data/constants"
import { DUMMY_USERS } from "@/data/mockData"

import { 
  useSupplies, 
  useDemands, 
  useMatches, 
  useScores, 
  useAudit,
  useInflation,
  useNotifications
} from "@/hooks/useApi"

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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api';

function RenderRolePage({ role, page, state, actions }: any) {
  if (role === "koperasi") {
    if (page === "dashboard") return <KoperasiDashboard supplies={state.supplies} matches={state.matches} inflationRows={state.inflationRows} scores={state.scores} setPage={actions.setPage} openMatchDetail={actions.openMatchDetail} openScoreDetail={actions.openScoreDetail} runMatching={actions.runMatching} onDownload={actions.onDownload} />
    if (page === "input-panen") return <InputPanenPage supplies={state.supplies} onSubmitHarvest={actions.onSubmitHarvest} onValidateSupply={actions.onValidateSupply} />
    if (page === "demand") return <DemandPage demands={state.demands} setPage={actions.setPage} />
    if (page === "matching") return <MatchingPage matches={state.matches} openMatchDetail={actions.openMatchDetail} onConfirmMatch={actions.onConfirmMatch} runMatching={actions.runMatching} />
    if (page === "match-detail") return <MatchDetailPage selectedMatch={state.selectedMatch} onConfirmMatch={actions.onConfirmMatch} setPage={actions.setPage} />
    if (page === "inflasi") return <InflasiPage inflationRows={state.inflationRows} onIntervene={actions.onIntervene} />
    if (page === "scoring") return <ScoringPage scores={state.scores} openScoreDetail={actions.openScoreDetail} onRecommendFinance={actions.onRecommendFinance} setPage={actions.setPage} onDownload={actions.onDownload} />
    if (page === "scoring-detail") return <ScoreDetailPage selectedScore={state.selectedScore} onRecommendFinance={actions.onRecommendFinance} showBanner={actions.showBanner} setPage={actions.setPage} />
    if (page === "audit") return <AuditPage auditRows={state.auditRows} formatDate={state.formatDate} />
    if (page === "supplier") return <SupplierPage scores={state.scores} openScoreDetail={actions.openScoreDetail} setPage={actions.setPage} onDownload={actions.onDownload} />
    if (page === "notifikasi") return <NotificationsPage notifications={state.notifications} formatDate={state.formatDate} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "petani") {
    if (page === "home") return <PetaniHome supplies={state.petaniSupplies} scores={state.scores} setPage={actions.setPage} />
    if (page === "tambah") return <PetaniTambahPage onSubmitHarvest={actions.onSubmitHarvest} />
    if (page === "riwayat") return <PetaniRiwayatPage supplies={state.petaniSupplies} formatDate={state.formatDate} onDownload={actions.onDownload} />
    if (page === "skor") return <PetaniSkorPage scores={state.scores} />
    if (page === "status") return <PetaniStatusPage setPage={actions.setPage} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "vendor") {
    if (page === "overview") return <VendorOverviewPage demands={state.demands} setPage={actions.setPage} onDownload={actions.onDownload} />
    if (page === "ajukan") return <VendorAjukanPage onSubmitDemand={actions.onSubmitDemand} showBanner={actions.showBanner} />
    if (page === "kandidat") return <VendorCandidatesPage matches={state.matches} setPage={actions.setPage} onDownload={actions.onDownload} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  if (role === "pembiayaan") {
    if (page === "overview") return <FinanceOverviewPage scores={state.scores} setPage={actions.setPage} onDownload={actions.onDownload} />
    if (page === "risk") return <FinanceRiskPage selectedScore={state.selectedScore || state.scores[0]} onRecommendFinance={actions.onRecommendFinance} showBanner={actions.showBanner} />
    if (page === "riwayat") return <FinanceHistoryPage onDownload={actions.onDownload} />
    if (page === "settings") return <SettingsPage role={role} showBanner={actions.showBanner} />
  }

  return <EmptyState title="Halaman belum ditemukan" description="Pilih navigasi lain untuk melanjutkan alur Dayapala." cta={<Button className="rounded-2xl" onClick={() => actions.setPage(NAV_ITEMS[role][0].key)}>Kembali ke awal</Button>} />
}

export default function App() {
  const [authMode, setAuthMode] = useState<"none" | "login" | "register">("none")
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState("koperasi")
  const [currentPageByRole, setCurrentPageByRole] = useState<any>({ koperasi: "dashboard", petani: "home", vendor: "overview", pembiayaan: "overview" })
  
  // Real API Data
  const { data: supplies, refresh: refreshSupplies } = useSupplies();
  const { data: demands, refresh: refreshDemands } = useDemands();
  const { data: matches } = useMatches();
  const { data: scores } = useScores();
  const { data: auditRows, refresh: refreshAudit } = useAudit();
  const { data: inflationRows, refresh: refreshInflation } = useInflation();
  const { data: notifications, refresh: refreshNotifications } = useNotifications(role);

  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null)
  const [selectedScoreId, setSelectedScoreId] = useState<number | null>(null)
  const [banner, setBanner] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Utility to format DB dates
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Baru saja";
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const setPage = (page: string) => {
    setCurrentPageByRole((prev: any) => ({ ...prev, [role]: page }))
    setIsSidebarOpen(false) 
  }
  (window as any).setPage = setPage;

  const addAudit = async (title: string, detail: string, tag: string, actor: string) => {
    try {
      await axios.post(`${API_BASE_URL}/audit`, { title, detail, tag, actor });
      refreshAudit();
    } catch (err) {
      console.error("Gagal menambah audit log", err);
    }
  }

  const onValidateSupply = async (id: number) => {
    try {
      await axios.post(`${API_BASE_URL}/supplies/${id}/validate`);
      refreshSupplies();
      addAudit("Validasi pasokan", "Koperasi memvalidasi pasokan petani.", "Validasi", "Koperasi")
      setBanner("Pasokan berhasil divalidasi.");
    } catch (err) {
      setBanner("Gagal memvalidasi pasokan.");
    }
  }

  const onIntervene = (row: any) => {
    addAudit("Intervensi pasar", `Intervensi distribusi dilakukan untuk ${row.commodity} di ${row.region}.`, "Inflasi", "Koperasi")
    setBanner(`Rencana intervensi untuk ${row.region} telah dibuat dan masuk antrean distribusi.`);
  }

  const onDownload = (title: string, data: any) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item: any) => Object.values(item).map(v => {
       const str = String(v);
       return `"${str.replace(/"/g, '""')}"`;
    }).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Dayapala_${title}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setBanner(`Laporan ${title} berhasil diunduh.`);
  }

  const onSubmitHarvest = async (form: any, fromPetani = false) => {
    try {
      const payload = {
        farmer: form.farmer,
        commodity: form.commodity,
        volume: form.volume,
        village: form.village,
        price: form.price.startsWith("Rp") ? form.price : `Rp${form.price}`,
        status: "Menunggu validasi koperasi",
      };
      await axios.post(`${API_BASE_URL}/supplies`, payload);
      refreshSupplies();
      addAudit("Input panen baru", `${form.commodity} dari ${form.farmer} dikirim ke sistem.`, "Input", fromPetani ? form.farmer : "Koperasi" )
      setBanner("Data panen berhasil disimpan dan menunggu validasi koperasi.")
      if (fromPetani) {
        setCurrentPageByRole((prev: any) => ({ ...prev, petani: "riwayat" }))
      }
    } catch (err) {
      setBanner("Gagal menyimpan data panen.");
    }
  }

  const onSubmitDemand = async (form: any) => {
    try {
      const payload = {
        buyer: form.buyer,
        commodity: form.commodity,
        amount: form.amount,
        schedule: form.schedule,
        priority: form.priority,
      };
      await axios.post(`${API_BASE_URL}/demands`, payload);
      refreshDemands();
      addAudit("Permintaan pasok baru", `${form.buyer} mengajukan kebutuhan ${form.commodity}.`, "Distribusi", form.buyer)
      setBanner("Permintaan pasok berhasil dibuat dan disimpan ke database Azure.")
      setCurrentPageByRole((prev: any) => ({ ...prev, vendor: "kandidat" }))
    } catch (err) {
      console.error("Error submitting demand:", err);
      setBanner("Gagal membuat permintaan pasok. Silakan cek koneksi API.");
    }
  }

  const runMatching = async () => {
    try {
      setBanner("AI sedang mencocokkan Supply & Demand...");
      await axios.post(`${API_BASE_URL}/trigger-match`);
      const { data: newMatches } = await axios.get(`${API_BASE_URL}/matches`);
      // Update local state or refresh
      window.location.reload(); // Simple way to refresh all data for the prototype
    } catch (err) {
      setBanner("Gagal menjalankan AI Matching.");
    }
  }

  const openMatchDetail = (id: number) => {
    setSelectedMatchId(id)
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "match-detail" }))
  }

  const onConfirmMatch = (match: any) => {
    addAudit("Distribusi dikonfirmasi", `${match.commodity} dikonfirmasi.`, "Distribusi", "Koperasi")
    setBanner("Distribusi berhasil dikonfirmasi.")
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "audit" }))
  }

  const openScoreDetail = (id: number) => {
    setSelectedScoreId(id)
    setCurrentPageByRole((prev: any) => ({ ...prev, koperasi: "scoring-detail", pembiayaan: "risk" }))
  }

  const onRecommendFinance = (score: any) => {
    addAudit("Rekomendasi pembiayaan", `${score.name} direkomendasikan.`, "Pembiayaan", "Alternative Credit Scoring")
    setBanner("Rekomendasi pembiayaan berhasil dicatat.")
  }

  const selectedMatch = matches.find((item: any) => item.id === selectedMatchId) || matches[0] || null
  const selectedScore = scores.find((item: any) => item.id === selectedScoreId) || scores[0] || null
  const petaniSupplies = supplies.filter((item: any) => item.farmer.toLowerCase().includes("kelompok tani") || item.farmer.toLowerCase().includes("gapoktan") || item.farmer.toLowerCase().includes("kwt"))

  const filteredState = {
    supplies: searchQuery
      ? supplies.filter((item: any) => `${item.farmer} ${item.commodity} ${item.village}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : supplies,
    demands,
    matches,
    inflationRows,
    scores: searchQuery ? scores.filter((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : scores,
    auditRows: searchQuery ? auditRows.filter((item: any) => `${item.actor} ${item.title} ${item.detail}`.toLowerCase().includes(searchQuery.toLowerCase())) : auditRows,
    notifications: notifications || [],
    selectedMatch,
    selectedScore,
    petaniSupplies,
    formatDate: formatDate || ((d: string) => d),
  }

  const handleLogin = async (data: any) => {
    // Check dummy users first
    const dummyUser = DUMMY_USERS.find(u => u.username === data.username && u.password === data.password);
    if (dummyUser) {
      setRole(dummyUser.role);
      setLoggedIn(true);
      setBanner(`Selamat datang kembali, ${dummyUser.full_name}!`);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      const user = response.data;
      setRole(user.role);
      setLoggedIn(true);
      setBanner(`Selamat datang kembali, ${user.full_name || user.username}!`);
    } catch (err: any) {
      alert(err.response?.data || "Login gagal");
    }
  }

  const handleRegister = async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      const user = response.data;
      setRole(user.role);
      setLoggedIn(true);
      setBanner(`Akun berhasil dibuat. Selamat datang, ${user.full_name || user.username}!`);
    } catch (err: any) {
      alert(err.response?.data || "Pendaftaran gagal");
    }
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
                <LoginPanel 
                  initialMode={authMode} 
                  onLogin={handleLogin} 
                  onRegister={handleRegister}
                  onBack={() => setAuthMode("none")} 
                />
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
                      runMatching,
                      onValidateSupply,
                      onIntervene,
                      onDownload,
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
