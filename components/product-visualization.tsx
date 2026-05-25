import {
  Bell,
  Building2,
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  MessageSquareWarning,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const rows = [
  ["A-204", "2/4", "Available", "Rs 14,000", "Ready"],
  ["B-112", "4/4", "Full", "Rs 0", "Clean"],
  ["C-018", "1/2", "Hold", "Rs 7,500", "Follow up"],
  ["D-301", "0/3", "Maintenance", "Rs 0", "Blocked"],
];

export function ProductVisualization() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden soft-mask" aria-hidden="true">
      <div className="absolute inset-0 dashboard-grid opacity-80" />
      <div className="absolute right-[-180px] top-28 hidden w-[760px] origin-top-right rotate-[-3deg] lg:block xl:right-[-230px] xl:top-32 xl:scale-[1.12] min-[1800px]:right-[-90px] min-[1800px]:scale-[1.24]">
        <div className="rounded-ui border border-white/70 bg-white/82 p-3 shadow-lift backdrop-blur xl:p-4">
          <div className="flex items-center justify-between border-b border-border pb-3 xl:pb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-ui bg-brand-800 text-white xl:h-10 xl:w-10">
                <Building2 className="h-5 w-5 xl:h-6 xl:w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Operations desk</p>
                <p className="text-sm font-black text-ink-900 xl:text-base">Today across 4 blocks</p>
              </div>
            </div>
            <div className="flex gap-2">
              {["New", "Follow up", "Converted"].map((item) => (
                <span key={item} className="rounded-ui border border-border bg-white px-2 py-1 text-xs font-bold text-ink-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.9fr] gap-3 pt-3 xl:gap-4 xl:pt-4">
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-2">
                <Metric icon={<Users />} label="Residents" value="428" tone="system" />
                <Metric icon={<IndianRupee />} label="Due" value="Rs 86k" tone="amber" />
                <Metric icon={<MessageSquareWarning />} label="SLA" value="6" tone="coral" />
                <Metric icon={<ShieldCheck />} label="Paid" value="92%" tone="mint" />
              </div>
              <div className="rounded-ui border border-border bg-[#F6F8FB] p-3 xl:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-black text-ink-900 xl:text-base">Room intelligence</p>
                  <span className="rounded-ui bg-brand-100 px-2 py-1 text-xs font-bold text-brand-800">Live</span>
                </div>
                <div className="grid gap-2 xl:gap-2.5">
                  {rows.map(([room, occupancy, status, due, action]) => (
                    <div key={room} className="grid grid-cols-[0.65fr_0.5fr_0.72fr_0.7fr_0.72fr] items-center gap-2 rounded-ui bg-white px-3 py-2 text-xs font-bold text-ink-700 xl:px-4 xl:py-2.5">
                      <span className="text-ink-900">{room}</span>
                      <span>{occupancy}</span>
                      <span>{status}</span>
                      <span>{due}</span>
                      <span className="text-brand-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-ui border border-border bg-white p-3 xl:p-4">
                <p className="text-sm font-black text-ink-900 xl:text-base">Inquiry pipeline</p>
                <div className="mt-3 grid gap-2">
                  {[
                    ["New lead", "Single seater, Block B", "8m"],
                    ["Follow-up", "Guardian requested fee breakup", "2h"],
                    ["Converted", "Student ID STU-1208", "Today"],
                  ].map(([title, body, time]) => (
                    <div key={title} className="rounded-ui border border-border p-3 xl:p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-black text-ink-900">{title}</p>
                        <span className="text-[11px] font-bold text-ink-500">{time}</span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-ink-600">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Signal icon={<Bell />} label="Email outbox" value="18 queued" />
                <Signal icon={<ClipboardList />} label="Audit trail" value="Clean" />
                <Signal icon={<CheckCircle2 />} label="Check-outs" value="Synced" />
                <Signal icon={<MessageSquareWarning />} label="Complaints" value="Routed" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-4 right-4 grid gap-2 sm:grid-cols-3 lg:hidden">
        <Signal icon={<Users />} label="Residents" value="428" />
        <Signal icon={<IndianRupee />} label="Collection rate" value="92%" />
        <Signal icon={<MessageSquareWarning />} label="Open SLAs" value="6" />
      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "system" | "amber" | "coral" | "mint";
}) {
  const color = {
    system: "text-signal-system bg-brand-50",
    amber: "text-signal-amber bg-[#fff7e8]",
    coral: "text-signal-coral bg-[#fff0ee]",
    mint: "text-signal-mint bg-[#eaf8f3]",
  };

  return (
    <div className="rounded-ui border border-border bg-white p-3">
      <div className={`mb-3 grid h-8 w-8 place-items-center rounded-ui ${color[tone]}`}>
        <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      </div>
      <p className="text-xl font-black text-ink-900 xl:text-2xl">{value}</p>
      <p className="text-xs font-bold text-ink-500">{label}</p>
    </div>
  );
}

function Signal({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-ui border border-white/70 bg-white/86 p-3 shadow-crisp backdrop-blur">
      <div className="flex items-center gap-2 text-brand-700 [&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      <p className="mt-3 text-lg font-black text-ink-900">{value}</p>
      <p className="text-xs font-bold text-ink-500">{label}</p>
    </div>
  );
}
