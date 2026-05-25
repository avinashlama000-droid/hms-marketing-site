import { Building2, Download, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-grid grid gap-10 py-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-lg font-black text-brand-800">{site.name}</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-ink-500">
                Made for hostels
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-600">
            Hostel operations software for teams that need admissions, rooms, payments, complaints,
            staff, suppliers, and reporting to stay connected.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-ui border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-black text-brand-800">
            <Download className="h-4 w-4" />
            Download implementation checklist
          </div>
        </div>
        <FooterGroup title="Product" links={["Inquiries", "Students", "Rooms", "Payments", "Complaints"]} />
        <FooterGroup title="Company" links={["Book demo", "Implementation", "Pricing", "Contact"]} />
        <div>
          <p className="text-sm font-black text-ink-900">Contact Us</p>
          <div className="mt-3 grid gap-3 text-sm font-semibold text-ink-600">
            <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-2 hover:text-brand-700">
              <Mail className="h-4 w-4" />
              {site.contactEmail}
            </a>
            <a href={`tel:${site.contactPhone}`} className="flex items-center gap-2 hover:text-brand-700">
              <Phone className="h-4 w-4" />
              {site.contactPhone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {site.address}
            </span>
          </div>
          <div className="mt-5 grid gap-2 text-sm font-semibold text-ink-600">
            <a href="/privacy" className="hover:text-brand-700">Privacy</a>
            <a href="/terms" className="hover:text-brand-700">Terms</a>
            <a href="/security" className="hover:text-brand-700">Security</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-grid flex flex-col gap-2 py-4 text-xs font-semibold text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} HMS. All rights reserved.</p>
          <p>Built for multi-role hostel operations.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-black text-ink-900">{title}</p>
      <div className="mt-3 grid gap-2 text-sm font-semibold text-ink-600">
        {links.map((link) => (
          <a key={link} href={hrefFor(link)} className="hover:text-brand-700">
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

function hrefFor(link: string) {
  if (link === "Book demo") return "#book";
  if (link === "Pricing") return "#pricing";
  if (link === "Contact") return "#contact";
  if (link === "Security") return "/security";
  return "#modules";
}
