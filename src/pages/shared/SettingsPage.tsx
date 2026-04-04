import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Surface } from "@/components/shared/Surface"
import { PageHeader } from "@/components/shared/PageHeader"
import { ROLE_META } from "@/data/constants"

export function SettingsPage({ role, showBanner }: any) {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description={`Kelola preferensi dasar untuk peran ${ROLE_META[role].label.toLowerCase()}.`} />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Surface>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Ringkasan akun aktif</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200/70 border border-slate-100/50">Nama pengguna: Demo User</div>
            <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200/70 border border-slate-100/50">Role aktif: {ROLE_META[role].label}</div>
            <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200/70 border border-slate-100/50">Organisasi: Koperasi Merah Putih</div>
          </CardContent>
        </Surface>
        <Surface>
          <CardHeader>
            <CardTitle>Preferensi</CardTitle>
            <CardDescription>Pengaturan tampilan dan notifikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input className="h-11 rounded-2xl" placeholder="Nama tampilan" />
            <Input className="h-11 rounded-2xl" placeholder="Email notifikasi" />
            <div className="flex gap-3">
              <Button className="rounded-2xl shadow-sm transition-transform active:scale-95" onClick={() => showBanner && showBanner("Preferensi berhasil disimpan.")}>Simpan perubahan</Button>
              <Button variant="secondary" className="rounded-2xl transition-transform active:scale-95">Batalkan</Button>
            </div>
          </CardContent>
        </Surface>
      </div>
    </div>
  )
}
