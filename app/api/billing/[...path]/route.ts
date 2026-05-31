import { NextResponse } from "next/server";

const publicBillingPaths = new Set([
  "plans",
  "subscriptions/quote",
  "signups",
  "signups/verify-email",
]);

type RouteContext = { params: Promise<{ path: string[] }> };

async function forward(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const billingPath = path.join("/");

  if (!publicBillingPaths.has(billingPath)) {
    return NextResponse.json({ message: "Billing endpoint not found." }, { status: 404 });
  }

  const backend = (process.env.HMS_BILLING_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();

  try {
    const response = await fetch(`${backend}/billing/${billingPath}`, {
      method: request.method,
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body,
      cache: "no-store",
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" },
    });
  } catch {
    return NextResponse.json({ message: "Billing service is temporarily unavailable." }, { status: 502 });
  }
}

export const GET = forward;
export const POST = forward;
