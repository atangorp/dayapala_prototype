import {
  ArrowRight,
  Bell,
  ClipboardList,
  FileClock,
  HandCoins,
  LayoutDashboard,
  Leaf,
  PackageCheck,
  Route,
  Settings,
  ShieldCheck,
  Store,
  Truck,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
} from "lucide-react"

export const OFFICIAL_MODULES = [
  "Input Panen",
  "AI Matching Supply-Demand",
  "Dashboard Pemantauan Inflasi",
  "Alternative Credit Scoring",
  "Immutable Audit Log",
]

export const ROLE_META: Record<string, { label: string; icon: any }> = {
  koperasi: { label: "Koperasi", icon: Store },
  petani: { label: "Petani", icon: UserRound },
  vendor: { label: "Vendor MBG / SPPG", icon: PackageCheck },
  pembiayaan: { label: "Mitra Pembiayaan", icon: Wallet },
}

export const NAV_ITEMS: Record<string, any[]> = {
  koperasi: [
    { key: "dashboard", label: "Dashboard Koperasi", icon: LayoutDashboard },
    { key: "input-panen", label: "Input Panen", icon: Leaf },
    { key: "demand", label: "Demand Vendor / SPPG", icon: PackageCheck },
    { key: "matching", label: "AI Matching Supply-Demand", icon: Route },
    { key: "match-detail", label: "Detail Match", icon: ArrowRight },
    { key: "inflasi", label: "Dashboard Pemantauan Inflasi", icon: TrendingUp },
    { key: "scoring", label: "Alternative Credit Scoring", icon: HandCoins },
    { key: "scoring-detail", label: "Detail Scoring", icon: ShieldCheck },
    { key: "audit", label: "Immutable Audit Log", icon: FileClock },
    { key: "supplier", label: "Profil Supplier", icon: Users },
    { key: "notifikasi", label: "Notifikasi & Rekomendasi", icon: Bell },
    { key: "settings", label: "Settings", icon: Settings },
  ],
  petani: [
    { key: "home", label: "Home Petani", icon: UserRound },
    { key: "tambah", label: "Tambah Input Panen", icon: Leaf },
    { key: "riwayat", label: "Riwayat Pasokan", icon: ClipboardList },
    { key: "skor", label: "Skor Pembiayaan", icon: HandCoins },
    { key: "status", label: "Status Penjualan / Pengiriman", icon: Truck },
    { key: "settings", label: "Settings", icon: Settings },
  ],
  vendor: [
    { key: "overview", label: "Dashboard Vendor", icon: PackageCheck },
    { key: "ajukan", label: "Ajukan Permintaan Pasok", icon: ClipboardList },
    { key: "kandidat", label: "Kandidat Match", icon: Route },
    { key: "settings", label: "Settings", icon: Settings },
  ],
  pembiayaan: [
    { key: "overview", label: "Dashboard Pembiayaan", icon: Wallet },
    { key: "risk", label: "Risk Summary", icon: ShieldCheck },
    { key: "riwayat", label: "Riwayat Keputusan", icon: FileClock },
    { key: "settings", label: "Settings", icon: Settings },
  ],
}
