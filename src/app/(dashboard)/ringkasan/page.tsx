"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Image as ImageIcon,
  Share2,
  Database,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

export default function RingkasanPage() {
  const { user, jobs, isAdmin } = useAuth();

  const userJobs = jobs.filter((j) => !user || j.user_id === user.id);
  const completedJobs = userJobs.filter((j) => j.status === "completed");

  // Summary counts
  const publishedArticles = completedJobs.reduce((acc, curr) => acc + (curr.article_count || 0), 0);
  const optimizedPhotos = completedJobs.reduce((acc, curr) => acc + (curr.photo_count || 0), 0);
  const socialPosts = completedJobs.reduce((acc, curr) => acc + (curr.social_post_count || 0), 0);
  const backups = completedJobs.filter((j) => j.check_backup).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Paket Aktif: {user?.package_active || "Standard Growth"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali, {user?.name || "Klien OkeIniAja"}!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Kelola dan pantau progres pengerjaan website & media sosial brand{" "}
              <strong className="text-white">{user?.business_name || "Usaha Anda"}</strong>{" "}
              secara transparan setiap hari.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/aktivitas"
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-brand-600/30 hover:scale-[1.02] active:scale-95"
            >
              <span>Lihat Detail Aktivitas</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pesan"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upgrade / Addon</span>
            </Link>
          </div>
        </div>

        {/* Package Expiry Pill */}
        <div className="mt-6 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>
              Masa aktif siklus:{" "}
              <strong className="text-white">
                {user?.package_expires_at || "23 November 2026"}
              </strong>{" "}
              (Sisa 31 hari lagi)
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Garansi pengerjaan & monitoring harian aktif</span>
          </div>
        </div>
      </div>

      {/* Quota Metric Cards (4 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Artikel SEO */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
              Bulan Ini
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Artikel SEO Terbit</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{publishedArticles}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 4 artikel kuota</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (publishedArticles / 4) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Foto Produk */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
              Kompresi WebP
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Foto Katalog Web</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{optimizedPhotos}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 20 foto kuota</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (optimizedPhotos / 20) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Post Medsos */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
              Instagram / FB
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Konten Medsos Tayang</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{socialPosts}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 12 post kuota</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (socialPosts / 12) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Backup Bulanan */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Cloud Storage
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Backup Rutin Website</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{backups}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 1x terjadwal</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (backups / 1) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Aktivitas Pekerjaan Terbaru
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar penanganan teknis dan publikasi konten yang dilakukan tim admin
            </p>
          </div>
          <Link
            href="/aktivitas"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Semua Pekerjaan ({userJobs.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {userJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/70 hover:border-brand-200 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      job.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {job.status === "completed" ? "✓ Selesai Tayang" : "⏳ Sedang Dikerjakan"}
                  </span>
                  <span className="text-xs text-slate-400">• Tanggal: {job.upload_date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{job.title}</h3>
                {job.notes && <p className="text-xs text-slate-500 line-clamp-2">{job.notes}</p>}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                {job.article_url && (
                  <a
                    href={job.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Buka Artikel Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {job.social_url && (
                  <a
                    href={job.social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Cek Medsos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
