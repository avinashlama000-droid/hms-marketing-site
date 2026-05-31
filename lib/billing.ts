export interface BillingPlan {
  id: number;
  name: string;
  slug: string;
  package_key?: string | null;
  description?: string | null;
  price_minor: number;
  currency_code: string;
  billing_cycle: "monthly" | "yearly";
  features_json?: string[] | null;
  max_blocks?: number | null;
  max_students_per_block?: number | null;
  max_students_total?: number | null;
  is_active: boolean;
  is_highlighted?: boolean;
}

export interface BillingQuote {
  planPriceMinor: number;
  discountMinor: number;
  finalAmountMinor: number;
  currencyCode: string;
  planPrice: number;
  discount: number;
  finalAmount: number;
}

export function activeStudentLimit(plan?: BillingPlan | null): number | null {
  if (!plan) return null;
  return plan.max_students_total ?? (plan.max_blocks && plan.max_students_per_block ? plan.max_blocks * plan.max_students_per_block : null);
}

export interface SignupResult {
  message: string;
  tenant: { id: number; name: string; slug: string };
  subscription?: { id: number; status: string } | null;
  payment?: { id: number; status: string } | null;
  quote?: { id: number; status: string } | null;
  verification_token?: string | null;
}

type ValidationErrors = Record<string, string[] | string>;

export class BillingApiError extends Error {
  constructor(message: string, public readonly errors?: ValidationErrors) {
    super(message);
  }
}

async function billingRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/billing/${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new BillingApiError(payload.message || "Billing request failed.", payload.errors);
  }

  return payload as T;
}

export const marketingBillingApi = {
  async plans(): Promise<BillingPlan[]> {
    return (await billingRequest<{ data: BillingPlan[] }>("plans")).data;
  },
  async quote(plan: string, promoCode?: string): Promise<BillingQuote> {
    return billingRequest<BillingQuote>("subscriptions/quote", {
      method: "POST",
      body: JSON.stringify({ plan, promo_code: promoCode || undefined }),
    });
  },
  async signup(payload: Record<string, unknown>): Promise<SignupResult> {
    return billingRequest<SignupResult>("signups", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async verifyEmail(email: string, token: string): Promise<{ message: string }> {
    return billingRequest<{ message: string }>("signups/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, token }),
    });
  },
};

export function formatNpr(minor: number): string {
  return `NPR ${(minor / 100).toLocaleString("en-NP")}`;
}

export function firstBillingError(error: unknown): string {
  if (error instanceof BillingApiError) {
    const firstValidationError = error.errors
      ? Object.values(error.errors).flatMap((value) => Array.isArray(value) ? value : [value])[0]
      : undefined;

    return firstValidationError || error.message;
  }

  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
