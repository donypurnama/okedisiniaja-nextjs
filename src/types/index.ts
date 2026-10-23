export type UserRole = "client" | "admin";
export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  business_name: string;
  website_url?: string;
  instagram_handle?: string;
  package_active?: string;
  package_billing?: "monthly" | "yearly" | "custom";
  package_expires_at?: string;
  role: UserRole;
  status: UserStatus;
  last_login_at?: string;
  created_at: string;
}

export type OrderStatus =
  | "pending_payment"
  | "reviewing"
  | "active"
  | "cancelled"
  | "expired";

export type BillingCycle = "monthly" | "yearly" | "custom";

export interface Order {
  id: number;
  order_code: string;
  user_id: number;
  package_name: string;
  billing_cycle: BillingCycle;
  amount: number;
  discount: number;
  total_amount: number;
  voucher_code?: string;
  notes?: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "refunded"
  | "returned";

export interface Payment {
  id: number;
  order_id: number;
  user_id: number;
  bank_destination: string;
  sender_bank?: string;
  sender_name: string;
  transfer_amount: number;
  transfer_date: string;
  proof_file?: string;
  notes?: string;
  admin_notes?: string;
  refund_amount?: number;
  refund_bank?: string;
  refund_account?: string;
  refund_date?: string;
  status: PaymentStatus;
  verified_at?: string;
  created_at: string;
}

export type JobStatus = "draft" | "in_progress" | "scheduled" | "completed";

export interface JobActivity {
  id: number;
  user_id: number;
  title: string;
  task_type: string;
  upload_date: string;
  article_url?: string;
  social_url?: string;
  check_image_opt: boolean;
  check_social_post: boolean;
  check_social_link: boolean;
  article_count: number;
  photo_count: number;
  social_post_count: number;
  check_backup: boolean;
  status: JobStatus;
  notes?: string;
  created_at: string;
}

export type NotificationType =
  | "payment"
  | "order"
  | "activity"
  | "job"
  | "request"
  | "account"
  | "client"
  | "system";

export interface NotificationItem {
  id: number;
  recipient_id: number;
  client_id?: number;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
  client_business?: string;
  client_name?: string;
}

export interface PackageQuota {
  article: number | null;
  photo: number | null;
  social: number | null;
  backup: number | null;
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyMonthlyPrice: number;
  popular?: boolean;
  quota: PackageQuota;
  features: string[];
}
