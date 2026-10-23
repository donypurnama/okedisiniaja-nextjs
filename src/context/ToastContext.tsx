"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, type, message, title };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2 sm:p-0">
        {toasts.map((toast) => {
          const typeConfig = {
            success: {
              border: "border-l-emerald-500",
              bgIcon: "bg-emerald-100 text-emerald-600",
              icon: <CheckCircle2 className="w-5 h-5" />,
              defaultTitle: "Berhasil!",
            },
            error: {
              border: "border-l-rose-500",
              bgIcon: "bg-rose-100 text-rose-600",
              icon: <AlertCircle className="w-5 h-5" />,
              defaultTitle: "Terjadi Kesalahan!",
            },
            warning: {
              border: "border-l-amber-500",
              bgIcon: "bg-amber-100 text-amber-600",
              icon: <AlertTriangle className="w-5 h-5" />,
              defaultTitle: "Perhatian!",
            },
            info: {
              border: "border-l-blue-500",
              bgIcon: "bg-blue-100 text-blue-600",
              icon: <Info className="w-5 h-5" />,
              defaultTitle: "Informasi",
            },
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 border-l-4 ${typeConfig.border} animate-in fade-in slide-in-from-top-2 duration-200 transition-all`}
            >
              <div className={`p-1.5 rounded-xl shrink-0 ${typeConfig.bgIcon}`}>
                {typeConfig.icon}
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {toast.title || typeConfig.defaultTitle}
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
