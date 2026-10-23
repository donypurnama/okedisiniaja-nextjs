"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingCart,
  FileText,
  CreditCard,
  BarChart3,
  User as UserIcon,
  Bell,
  Users,
  ListTodo,
  Receipt,
  Sparkles,
  ArrowRightLeft,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAdmin, loginAs } = useAuth();

  const clientNav = [
    { name: "Ringkasan", href: "/ringkasan", icon: LayoutDashboard },
    { name: "Aktivitas Pekerjaan", href: "/aktivitas", icon: CheckSquare },
    { name: "Pesan Layanan", href: "/pesan", icon: ShoppingCart },
    { name: "Invoice & Tagihan", href: "/invoice", icon: FileText },
    { name: "Konfirmasi Bayar", href: "/pembayaran", icon: CreditCard },
    { name: "Laporan & Leads", href: "/laporan", icon: BarChart3 },
    { name: "Profil Akun", href: "/profil", icon: UserIcon },
  ];

  const adminNav = [
    { name: "Daftar Klien", href: "/admin/clients", icon: Users },
    { name: "Verifikasi Bayar", href: "/admin/payments", icon: CreditCard },
    { name: "Kelola Pekerjaan", href: "/admin/activities", icon: ListTodo },
    { name: "Rekap Invoice", href: "/admin/invoices", icon: Receipt },
    { name: "Profil Admin", href: "/profil", icon: UserIcon },
  ];

  const navItems = isAdmin ? adminNav : clientNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-200 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Branding Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
            <Link
              href="/ringkasan"
              onClick={onClose}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-none">
                  Oke<span className="text-brand-500">IniAja</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  {isAdmin ? "Portal Administrator" : "Portal Klien Terpadu"}
                </span>
              </div>
            </Link>
          </div>

          {/* Role Quick Switcher (Demo Feature) */}
          <div className="px-4 pt-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Mode Tampilan
                </span>
                <span className="text-xs font-bold text-white truncate block">
                  {isAdmin ? "🛠️ Administrator" : "🏢 Klien Bisnis"}
                </span>
              </div>
              <button
                onClick={() => loginAs(isAdmin ? "client" : "admin")}
                title="Ganti peran untuk pratinjau"
                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-brand-600 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {isAdmin ? "Menu Administrator" : "Menu Klien"}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/ringkasan" &&
                  item.href !== "/admin/clients" &&
                  pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    isActive
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Card / CS Support */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-none">
                  WhatsApp Support
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Online Setiap Hari
                </p>
              </div>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.contactWa}&text=Halo%20Admin%20OkeIniAja,%20saya%20butuh%20bantuan%20terkait%20dashboard`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Hubungi CS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
