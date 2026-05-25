import { z } from "zod";

export const inquirySchema = z.object({
  organizationName: z.string().trim().min(2, "Organization name is required").max(120),
  contactName: z.string().trim().min(2, "Contact name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Phone number is required").max(32),
  role: z.string().trim().min(2, "Role is required").max(80),
  propertyType: z.enum(["student-hostel", "staff-hostel", "co-living", "training-campus", "multi-branch"]),
  beds: z.string().trim().min(1, "Select a bed range"),
  locations: z.string().trim().min(1, "Select a location count"),
  currentSystem: z.string().trim().max(160).optional(),
  priorities: z.array(z.string()).min(1, "Choose at least one priority"),
  modules: z.array(z.string()).min(1, "Choose at least one module"),
  timeline: z.string().trim().min(1, "Select a timeline"),
  budget: z.string().trim().min(1, "Select a budget range"),
  message: z.string().trim().max(1200).optional(),
  consent: z.literal(true, { message: "Consent is required" }),
});

export type InquiryPayload = z.infer<typeof inquirySchema>;

export const priorityOptions = [
  "Room occupancy clarity",
  "Dues and payment discipline",
  "Admissions and inquiry follow-up",
  "Complaint SLA visibility",
  "Staff attendance and salary",
  "Supplier and expense control",
  "Multi-branch reporting",
];

export const moduleOptions = [
  "Inquiries CRM",
  "Students",
  "Rooms and blocks",
  "Payments and dues",
  "Check-in/out rules",
  "Complaints",
  "Notices",
  "Staff and salary",
  "Suppliers",
  "Email notifications",
  "Reports",
];
