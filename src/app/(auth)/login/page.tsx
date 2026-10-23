"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAs } = useAuth();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        showToast("success", "Selamat datang di Portal Klien OkeIniAja!", "Login Berhasil");
        router.push("/ringkasan");
      } else {
        setErrorMsg(res.message || "Email/WhatsApp atau password salah.");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan teknis saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: "client" | "admin") => {
    loginAs(role);
    showToast(
      "info",
      role === "admin"
        ? "Masuk sebagai Administrator Demo"
        : "Masuk sebagai Klien Demo (Kopi Senja Nusantara)",
      "Mode Demo Aktif"
    );
    router.push(role === "admin" ? "/admin/clients" : "/ringkasan");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Kolom Kiri: Visual Branding & Value Proposition */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand-600/25 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-white block leading-none">
                    Oke<span className="text-brand-500">IniAja</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Managed Web & Social Retainer
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                  Pantau Pertumbuhan Bisnis Anda Tanpa Repot
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Portal resmi klien untuk memonitor artikel SEO, kalender media sosial, pembaruan katalog produk, dan laporan performa harian.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Artikel SEO bulanan teroptimasi Google",
                  "Desain feed & story media sosial berkala",
                  "Backup database & kompresi foto WebP",
                  "Monitoring respon leads langsung ke WhatsApp",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-slate-700/60 mt-8 text-xs text-slate-400">
              <p>Butuh bantuan login akun?</p>
              <a
                href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.contactWa}&text=Halo%20Admin%20OkeIniAja,%20saya%20butuh%20bantuan%20login%20portal%20klien`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 font-bold inline-flex items-center gap-1 mt-1"
              >
                <span>Chat WhatsApp CS</span>
                <PhoneCall className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Form Login */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="space-y-1 mb-8">
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  Masuk Portal Klien
                </h1>
                <p className="text-xs text-slate-500">
                  Silakan masukkan email atau nomor WhatsApp yang telah terdaftar.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email atau No. WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="contoh: klien@bisnis.com atau 081291311218"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Password Akun
                    </label>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.contactWa}&text=Halo%20Admin%20OkeIniAja,%20saya%20lupa%20password%20akun%20saya`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
                    >
                      Lupa Password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-600/30 hover:scale-[1.01] active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Demo Login Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-3 uppercase tracking-wider text-center">
                  Akses Cepat (Demo Preview)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("client")}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-slate-700 hover:text-brand-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-brand-600" />
                    <span>Demo Klien</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("admin")}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-600 group-hover:text-white" />
                    <span>Demo Admin</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 text-center text-xs text-slate-500">
              Belum memiliki akun klien?{" "}
              <Link href="/register" className="font-bold text-brand-600 hover:text-brand-700">
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
