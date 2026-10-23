import { PackagePlan } from "@/types";

export const SITE_CONFIG = {
  name: "OkeIniAja.com",
  tagline: "Layanan Pengelolaan Website & Media Sosial Profesional untuk Bisnis & UMKM",
  siteUrl: "https://okeiniaja.com",
  contactWa: "6281291311218",
  contactWaFormatted: "+62 812-9131-1218",
  supportEmail: "halo@okeiniaja.com",
  currentYear: 2026,
};

export const PACKAGES: PackagePlan[] = [
  {
    id: "basic",
    name: "Basic Maintenance",
    tagline: "Pondasi tepat untuk website aktif & terawat",
    monthlyPrice: 75000,
    yearlyMonthlyPrice: 63750, // Diskon 15%
    quota: {
      article: 2,
      photo: 10,
      social: 8,
      backup: 0,
    },
    features: [
      "2 Artikel SEO Bulanan",
      "10 Foto / Katalog Produk",
      "8 Konten Media Sosial",
      "Optimasi Kecepatan Standar",
      "Monitoring Keamanan Berkala",
      "WhatsApp Support Standard",
    ],
  },
  {
    id: "standard",
    name: "Standard Growth",
    tagline: "Paling populer untuk akselerasi UMKM & Brand",
    monthlyPrice: 199000,
    yearlyMonthlyPrice: 169150, // Diskon 15%
    popular: true,
    quota: {
      article: 4,
      photo: 20,
      social: 12,
      backup: 1,
    },
    features: [
      "4 Artikel SEO Berkualitas Tinggi",
      "20 Foto Produk & Kompresi WebP",
      "12 Desain Konten Instagram / FB",
      "1x Backup Rutin Bulanan",
      "Integrasi Tombol WhatsApp Leads",
      "Laporan Performa Bulanan",
      "Prioritas WhatsApp CS Support",
    ],
  },
  {
    id: "premium",
    name: "Premium Pro",
    tagline: "Solusi terlengkap dominasi pasar & penjualan",
    monthlyPrice: 450000,
    yearlyMonthlyPrice: 382500, // Diskon 15%
    quota: {
      article: 8,
      photo: null, // Unlimited
      social: 20,
      backup: 4,
    },
    features: [
      "8 Artikel SEO Pilar & Riset Kata Kunci",
      "Foto Produk Tanpa Batas (Unlimited)",
      "20 Konten Medsos (Feed, Story, Reels)",
      "4x Backup Bulanan (Setiap Minggu)",
      "Audit Teknis & Kecepatan Google Core Web",
      "Konsultasi Strategi Digital Bulanan",
      "Dedicated Account Manager VIP",
    ],
  },
  {
    id: "custom",
    name: "Custom Project & Photoshoot",
    tagline: "Sesuai kebutuhan spesifik & skala korporat",
    monthlyPrice: 850000,
    yearlyMonthlyPrice: 722500,
    quota: {
      article: null,
      photo: null,
      social: null,
      backup: null,
    },
    features: [
      "Kuota artikel & konten fleksibel",
      "Sesi foto produk on-site / studio",
      "Redesain & fitur website kustom",
      "Manajemen kampanye Meta Ads & Google Ads",
      "SLA penanganan kendala < 2 jam",
      "Kontrak resmi & faktur pajak",
    ],
  },
];

export const BANK_ACCOUNTS = [
  {
    bank: "BCA (Bank Central Asia)",
    accountNumber: "8691-311-218",
    holder: "PT OKE INI AJA INDONESIA",
  },
  {
    bank: "Bank Mandiri",
    accountNumber: "131-00-9131121-8",
    holder: "PT OKE INI AJA INDONESIA",
  },
  {
    bank: "Bank BNI",
    accountNumber: "0913-112-180",
    holder: "PT OKE INI AJA INDONESIA",
  },
];
