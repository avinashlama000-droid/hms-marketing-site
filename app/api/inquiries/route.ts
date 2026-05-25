import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid inquiry payload",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const hmsEndpoint = process.env.HMS_INQUIRY_API_URL;
  const token = process.env.HMS_INQUIRY_API_TOKEN;
  const inquiryNumber = `WEB-${Date.now()}`;
  const payload = {
    ...parsed.data,
    inquiryNumber,
    source: "marketing_website",
    status: "new",
    priority: parsed.data.timeline === "Immediately" ? "high" : "normal",
    submittedAt: new Date().toISOString(),
    backendSuggestion: {
      name: parsed.data.contactName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      seater_type: null,
      block_id: null,
      staff_id: null,
      description: [
        `Organization: ${parsed.data.organizationName}`,
        `Role: ${parsed.data.role}`,
        `Property type: ${parsed.data.propertyType}`,
        `Beds: ${parsed.data.beds}`,
        `Locations: ${parsed.data.locations}`,
        `Timeline: ${parsed.data.timeline}`,
        `Budget: ${parsed.data.budget}`,
        `Current system: ${parsed.data.currentSystem || "Not provided"}`,
        `Priorities: ${parsed.data.priorities.join(", ")}`,
        `Modules: ${parsed.data.modules.join(", ")}`,
        `Message: ${parsed.data.message || "Not provided"}`,
      ].join("\n"),
    },
  };

  if (hmsEndpoint) {
    const response = await fetch(hmsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "HMS inquiry service rejected the request" },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(
    {
      message: "Inquiry accepted",
      inquiryNumber,
      nextStatus: "new",
      recommendedAdminStatusFlow: ["new", "contacted", "follow_up", "qualified", "converted", "closed", "lost"],
    },
    { status: 202 },
  );
}
