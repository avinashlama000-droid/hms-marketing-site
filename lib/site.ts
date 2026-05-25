export const site = {
  name: "HMS System",
  title: "HMS | Hostel management software for operations, finance, and resident experience",
  description:
    "HMS connects hostel admissions, rooms, dues, staff operations, complaints, notices, suppliers, and reporting in one calm operating system.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hms.example.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sales@hmssystem.local",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+977-9800000000",
  address: "Kathmandu, Nepal",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#contact",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#contact",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#contact",
  },
};
