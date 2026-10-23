const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; token?: string; user?: any }> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    console.warn(`[API] Fetch failed for ${endpoint}:`, err.message);
    return {
      success: false,
      message: "Tidak dapat terhubung ke server API. Pastikan okeiniaja-api aktif di http://localhost:5001.",
    };
  }
}

export const authApi = {
  login: (identifier: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    }),

  register: (data: { name: string; business_name: string; whatsapp: string; email: string; password: string }) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: () => request("/auth/me"),

  updateProfile: (data: any) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  changePassword: (old_password: string, new_password: string) =>
    request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ old_password, new_password }),
    }),
};

export const clientApi = {
  getOverview: () => request("/client/overview"),
  getActivities: () => request("/client/activities"),
  getOrders: () => request("/client/orders"),
  createOrder: (data: any) =>
    request("/client/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  confirmPayment: (formData: FormData) =>
    request("/client/payments", {
      method: "POST",
      body: formData,
    }),
  getNotifications: () => request("/client/notifications"),
  markNotificationRead: (id: number) =>
    request(`/client/notifications/${id}/read`, {
      method: "PUT",
    }),
  markAllNotificationsRead: () =>
    request("/client/notifications/read-all", {
      method: "PUT",
    }),
};

export const adminApi = {
  getClients: () => request("/admin/clients"),
  getClientDetail: (id: number) => request(`/admin/clients/${id}`),
  resetClientPassword: (id: number, new_password: string) =>
    request(`/admin/clients/${id}/password`, {
      method: "PUT",
      body: JSON.stringify({ new_password }),
    }),
  getPayments: () => request("/admin/payments"),
  verifyPayment: (id: number, decision: string, admin_notes?: string) =>
    request(`/admin/payments/${id}/verify`, {
      method: "POST",
      body: JSON.stringify({ decision, admin_notes }),
    }),
  getActivities: () => request("/admin/activities"),
  createActivity: (data: any) =>
    request("/admin/activities", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateActivity: (id: number, data: any) =>
    request(`/admin/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteActivity: (id: number) =>
    request(`/admin/activities/${id}`, {
      method: "DELETE",
    }),
  getInvoices: () => request("/admin/invoices"),
};
