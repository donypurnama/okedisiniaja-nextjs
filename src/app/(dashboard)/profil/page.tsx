"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200/60 mb-2">
            <Sparkles className="w-3 h-3 text-brand-500" />
            <span>Profil & Pengaturan Akun</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Profil & Pengaturan Akun
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola informasi bisnis, kontak WhatsApp, URL website, dan ganti password.
          </p>
        </div>
        <Link
          href="/ringkasan"
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Ringkasan</span>
        </Link>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center py-16">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Halaman Profil & Pengaturan Akun Siap Diimplementasikan
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
          Struktur layout, tema Tailwind, dan autentikasi telah terpasang. Fitur spesifik ini dapat kita slicing pada langkah berikutnya.
        </p>
      </div>
    </div>
  );
}
