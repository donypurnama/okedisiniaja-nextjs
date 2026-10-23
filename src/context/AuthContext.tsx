"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, UserRole, Order, Payment, JobActivity, NotificationItem } from "@/types";
import { authApi, clientApi, adminApi, setToken } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  allClients: User[];
  orders: Order[];
  payments: Payment[];
  jobs: JobActivity[];
  notifications: NotificationItem[];
  unreadNotifCount: number;
  login: (emailOrWa: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    business_name: string;
    whatsapp: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  updateProfile: (updated: Partial<User>) => void;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [allClients, setAllClients] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [jobs, setJobs] = useState<JobActivity[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const isAdmin = user?.role === "admin";

  const unreadNotifCount = notifications.filter(
    (n) => n.recipient_id === user?.id && !n.is_read
  ).length;

  // Fetch all dashboard data based on user role
  const fetchDashboardData = useCallback(async (currentUser: User) => {
    if (!currentUser) return;

    try {
      // Client-specific data
      if (currentUser.role === "client") {
        const [activitiesRes, ordersRes, notifRes] = await Promise.allSettled([
          clientApi.getActivities(),
          clientApi.getOrders(),
          clientApi.getNotifications(),
        ]);

        if (activitiesRes.status === "fulfilled" && activitiesRes.value.success) {
          setJobs((activitiesRes.value as any).data || []);
        }
        if (ordersRes.status === "fulfilled" && ordersRes.value.success) {
          setOrders((ordersRes.value as any).data || []);
        }
        if (notifRes.status === "fulfilled" && notifRes.value.success) {
          setNotifications((notifRes.value as any).data || []);
        }
      }

      // Admin-specific data
      if (currentUser.role === "admin") {
        const [clientsRes, activitiesRes, paymentsRes, invoicesRes] = await Promise.allSettled([
          adminApi.getClients(),
          adminApi.getActivities(),
          adminApi.getPayments(),
          adminApi.getInvoices(),
        ]);

        if (clientsRes.status === "fulfilled" && clientsRes.value.success) {
          setAllClients((clientsRes.value as any).data || []);
        }
        if (activitiesRes.status === "fulfilled" && activitiesRes.value.success) {
          setJobs((activitiesRes.value as any).data || []);
        }
        if (paymentsRes.status === "fulfilled" && paymentsRes.value.success) {
          setPayments((paymentsRes.value as any).data || []);
        }
        if (invoicesRes.status === "fulfilled" && invoicesRes.value.success) {
          setOrders((invoicesRes.value as any).data || []);
        }
      }
    } catch (err) {
      console.warn("[AuthContext] Error fetching dashboard data:", err);
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await authApi.getMe();
        if (res.success && res.user) {
          setUser(res.user);
          await fetchDashboardData(res.user);
        } else {
          // Token expired or invalid
          setToken(null);
        }
      } catch {
        // API unreachable
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [fetchDashboardData]);

  const login = async (
    emailOrWa: string,
    pass: string
  ): Promise<{ success: boolean; message?: string }> => {
    const res = await authApi.login(emailOrWa, pass);
    if (res.success && res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      await fetchDashboardData(res.user);
      return { success: true };
    }

    return {
      success: false,
      message: res.message || "Email/No. WhatsApp atau password tidak sesuai.",
    };
  };

  const register = async (data: {
    name: string;
    business_name: string;
    whatsapp: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await authApi.register(data);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        await fetchDashboardData(res.user);
        return { success: true, message: res.message };
      }
      return {
        success: false,
        message: res.message || "Pendaftaran akun gagal. Silakan coba lagi.",
      };
    } catch {
      return {
        success: false,
        message: "Tidak dapat terhubung ke server API.",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAllClients([]);
    setOrders([]);
    setPayments([]);
    setJobs([]);
    setNotifications([]);
  };

  const markNotificationAsRead = (id: number) => {
    clientApi.markNotificationRead(id).catch(() => {});
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    if (!user) return;
    clientApi.markAllNotificationsRead().catch(() => {});
    setNotifications((prev) =>
      prev.map((n) => (n.recipient_id === user.id ? { ...n, is_read: true } : n))
    );
  };

  const updateProfile = async (updated: Partial<User>) => {
    if (!user) return;
    try {
      const res = await authApi.updateProfile(updated);
      if (res.success && res.user) {
        setUser(res.user);
        return;
      }
    } catch {}
    setUser({ ...user, ...updated });
  };

  const refreshData = async () => {
    if (user) {
      await fetchDashboardData(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        allClients,
        orders,
        payments,
        jobs,
        notifications,
        unreadNotifCount,
        login,
        register,
        logout,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateProfile,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
