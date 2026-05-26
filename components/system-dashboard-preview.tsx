"use client";

import {
  ArrowDown,
  ArrowUp,
  Bell,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  IndianRupee,
  Home,
  ListChecks,
  Menu,
  MessageSquareWarning,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatTone = "brand" | "success" | "warning";
type ActivityTone = "brand" | "success" | "warning" | "danger";

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  tone: StatTone;
};

type Activity = {
  label: string;
  time: string;
  detail: string;
  tone: ActivityTone;
  icon: ComponentType<{ className?: string }>;
};

type MobileScreen = "dashboard" | "students" | "income" | "expense" | "checkin";
type MobileGesture = "none" | "tap" | "scroll" | "type" | "save";
type PreviewRole = "admin" | "student" | "staff";

type MobileTourStep = {
  screen: MobileScreen;
  activeNav: string;
  title: string;
  subtitle: string;
  gesture: MobileGesture;
  touch?: { x: number; y: number };
  sidebarOpen?: boolean;
  searchValue?: string;
  scrollY?: number;
  selectedStudent?: string;
  saveState?: "idle" | "saving" | "saved";
};

const dashboardStats: StatCard[] = [
  { title: "Total Student Capacity", value: "520", subtitle: "All Rooms", icon: BedDouble, tone: "brand" },
  { title: "Total Current Students", value: "428", subtitle: "Currently enrolled", icon: Users, tone: "brand" },
  { title: "Out of Hostel Students", value: "18", subtitle: "On leave", icon: UserPlus, tone: "warning" },
  { title: "Students in Hostel Today", value: "410", subtitle: "Currently present", icon: Home, tone: "success" },
];

const activities: Activity[] = [
  { label: "Payment received from Bibisha Acharya", time: "Today, 10:24 AM", detail: "Rs.14,000 monthly fee", tone: "brand", icon: CreditCard },
  { label: "Complaint routed to maintenance", time: "Today, 09:52 AM", detail: "Room B-112, water line", tone: "warning", icon: MessageSquareWarning },
  { label: "Student checked in", time: "Yesterday, 07:40 PM", detail: "Aayush Karki, Block A", tone: "success", icon: CheckCircle2 },
  { label: "Checkout deduction synced", time: "May 24, 2026", detail: "Room C-018 ledger updated", tone: "danger", icon: ArrowDown },
];

const roomRows = [
  ["Total Beds", "520", "brand"],
  ["Occupied", "428", "success"],
  ["Available", "92", "neutral"],
] as const;

const upcomingRows = [
  ["Monthly Fee", "Rs.14,000", "May 30, 2026"],
  ["Mess Charge", "Rs.5,500", "Jun 02, 2026"],
  ["Laundry", "Rs.1,200", "Jun 05, 2026"],
] as const;

const studentRows = [
  ["Bibisha Acharya", "B-112", "Active", "Rs.0"],
  ["Aayush Karki", "A-204", "Checked in", "Rs.14,000"],
  ["Sanjana Rai", "C-018", "Follow-up", "Rs.7,500"],
  ["Niraj Shrestha", "D-301", "Hold", "Rs.0"],
] as const;

const staffRows = [
  ["Maya Gurung", "Warden", "Morning", "Present"],
  ["Ramesh Thapa", "Cook", "Day", "Present"],
  ["Sita Lama", "Cleaner", "Evening", "Pending"],
  ["Kiran KC", "Security", "Night", "Present"],
] as const;

const checkRows = [
  ["Aayush Karki", "Check In", "07:40 PM", "Approved"],
  ["Bibisha Acharya", "Check Out", "08:15 AM", "Pending"],
  ["Sanjana Rai", "Check In", "09:05 AM", "Approved"],
] as const;

const mobileNavItems = ["Dashboard", "Students", "Staff", "Rooms", "Income", "Expenses", "Student Check-In/Out", "Reports"] as const;

const tourSteps: MobileTourStep[] = [
  {
    screen: "dashboard",
    activeNav: "Dashboard",
    title: "Dashboard",
    subtitle: "Block B Workspace",
    gesture: "none",
  },
  {
    screen: "dashboard",
    activeNav: "Dashboard",
    title: "Dashboard",
    subtitle: "Block B Workspace",
    gesture: "tap",
    touch: { x: 220, y: 32 },
    sidebarOpen: true,
  },
  {
    screen: "students",
    activeNav: "Students",
    title: "Students",
    subtitle: "Resident records",
    gesture: "tap",
    touch: { x: 84, y: 108 },
    sidebarOpen: true,
  },
  {
    screen: "students",
    activeNav: "Students",
    title: "Students",
    subtitle: "Resident records",
    gesture: "type",
    touch: { x: 116, y: 101 },
    searchValue: "Bibisha",
    selectedStudent: "Bibisha Acharya",
  },
  {
    screen: "income",
    activeNav: "Income",
    title: "Create Income",
    subtitle: "Payment entry",
    gesture: "tap",
    touch: { x: 76, y: 218 },
    sidebarOpen: true,
  },
  {
    screen: "income",
    activeNav: "Income",
    title: "Create Income",
    subtitle: "Payment entry",
    gesture: "save",
    touch: { x: 218, y: 102 },
    saveState: "saving",
  },
  {
    screen: "income",
    activeNav: "Income",
    title: "Create Income",
    subtitle: "Payment entry",
    gesture: "none",
    saveState: "saved",
  },
  {
    screen: "expense",
    activeNav: "Expenses",
    title: "Create Expense",
    subtitle: "Cost control",
    gesture: "scroll",
    touch: { x: 252, y: 330 },
    scrollY: 48,
  },
  {
    screen: "checkin",
    activeNav: "Student Check-In/Out",
    title: "Student Check-In/Out",
    subtitle: "Attendance flow",
    gesture: "tap",
    touch: { x: 197, y: 220 },
  },
];

const toneClass: Record<StatTone, string> = {
  brand: "border-brand-100 bg-brand-50 text-brand-700",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
  warning: "border-amber-100 bg-amber-50 text-amber-700",
};

const activityClass: Record<ActivityTone, string> = {
  brand: "bg-brand-100 text-brand-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
};

const previewRoles: { value: PreviewRole; label: string; description: string; icon: ComponentType<{ className?: string }> }[] = [
  { value: "admin", label: "Admin", description: "Operations desk", icon: ShieldCheck },
  { value: "student", label: "Student", description: "Resident portal", icon: Users },
  { value: "staff", label: "Staff", description: "Work portal", icon: UserCheck },
];

export function SystemDashboardPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-10 grid gap-3 xl:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] lg:items-stretch lg:gap-4 xl:gap-5">
      <DesktopViewsPreview />

      <motion.div
        className="flex flex-col justify-center rounded-ui border border-white/20 bg-gradient-to-br from-brand-900 via-brand-700 to-signal-cyan p-2 text-white shadow-glow"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
      >
        <div className="mx-auto w-full max-w-[220px] rounded-[20px] border border-white/24 bg-ink-900/90 p-1.5 shadow-deep backdrop-blur-xl">
          <div className="relative h-[470px] overflow-hidden rounded-[16px] bg-[#F6F8FB] text-ink-900">
            <MobileAdminTour reduceMotion={Boolean(reduceMotion)} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F6F8FB] to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroMobilePreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const heroStep: MobileTourStep = {
    screen: "income",
    activeNav: "Income",
    title: "Create Income",
    subtitle: "Payment entry",
    gesture: "none",
    saveState: "saved",
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto flex w-full max-w-[380px] justify-center rounded-ui bg-gradient-to-br from-brand-900 via-brand-700 to-signal-cyan p-3 shadow-glow sm:max-w-[430px] sm:p-4 lg:mx-0 lg:ml-auto xl:max-w-[470px] xl:p-5",
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0, x: 28, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: 0.08 }}
    >
      <div className="absolute inset-0 rounded-ui bg-[radial-gradient(circle_at_80%_80%,rgba(30,211,226,0.28),transparent_48%)]" aria-hidden="true" />
      <div className="relative w-full max-w-[300px] rounded-[28px] border border-white/60 bg-ink-900 p-2 shadow-deep sm:max-w-[320px] xl:max-w-[340px]">
        <div className="h-[560px] overflow-hidden rounded-[22px] bg-[#F6F8FB] text-ink-900 sm:h-[600px] xl:h-[640px]">
          <MobileTourTopbar step={heroStep} />
          <div className="h-[calc(100%-3rem)] overflow-hidden p-3">
            <IncomeCreatePage step={heroStep} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSystemPreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const heroStep: MobileTourStep = {
    screen: "income",
    activeNav: "Income",
    title: "Create Income",
    subtitle: "Payment entry",
    gesture: "none",
    saveState: "saved",
  };

  return (
    <motion.div
      className={cn("relative left-0 mx-auto w-full max-w-[720px] lg:left-[30px] lg:ml-auto", className)}
      initial={reduceMotion ? false : { opacity: 0, x: 32, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut", delay: 0.1 }}
      aria-label="HMS product command center preview"
    >
      <div className="relative z-10 pb-16 sm:pb-20">
        <HeroProofCard
          className="absolute -left-1 top-[18px] z-30 hidden sm:flex xl:-left-8"
          icon={BedDouble}
          label="Beds available"
          value="92"
          tone="brand"
        />
        <HeroProofCard
          className="absolute -right-4 top-16 z-30 hidden sm:flex xl:-right-10"
          icon={CreditCard}
          label="Collected today"
          value="Rs.14,000"
          tone="success"
        />
        <div className="relative mx-auto max-w-[680px]">
          <div className="rounded-[22px] border border-ink-900/10 bg-ink-900 p-2 shadow-deep">
            <div className="overflow-hidden rounded-[15px] border border-white/10 bg-[#F6F8FB]">
              <div className="flex h-9 items-center justify-between border-b border-gray-200 bg-white/95 px-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="hidden items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-brand-800 sm:flex">
                  <ShieldCheck className="h-3 w-3" />
                  Live admin desk
                </div>
              </div>
              <div className="h-[318px] overflow-hidden p-2 sm:h-[360px] xl:h-[408px] xl:p-3">
                <DashboardCanvas density="desktop" role="admin" />
              </div>
            </div>
          </div>
          <div className="mx-auto h-4 w-[76%] rounded-b-[26px] border-x border-b border-ink-900/10 bg-gradient-to-b from-slate-300 to-slate-500 shadow-lift" aria-hidden="true" />
        </div>

        <div className="absolute bottom-4 right-0 z-20 hidden w-[168px] rotate-[-3deg] sm:block xl:bottom-8 xl:w-[188px]">
          <div className="rounded-[26px] border border-white/60 bg-ink-900 p-1.5 shadow-deep">
            <div className="h-[342px] overflow-hidden rounded-[20px] bg-[#F6F8FB] text-ink-900 xl:h-[382px]">
              <MobileTourTopbar step={heroStep} />
              <div className="h-[calc(100%-3rem)] overflow-hidden p-2">
                <IncomeCreatePage step={heroStep} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
          <HeroProofCard icon={BedDouble} label="Beds available" value="92" tone="brand" />
          <HeroProofCard icon={CreditCard} label="Collected" value="Rs.14,000" tone="success" />
        </div>
      </div>
    </motion.div>
  );
}

function HeroProofCard({
  icon: Icon,
  label,
  value,
  tone,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: StatTone;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 rounded-ui border border-white/70 bg-white/88 px-3 py-2 shadow-deep backdrop-blur-xl", className)}>
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg border", toneClass[tone])}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-black leading-5 text-ink-900">{value}</span>
        <span className="block whitespace-nowrap text-[10px] font-black uppercase tracking-[0.12em] text-ink-500">{label}</span>
      </span>
    </div>
  );
}

export function DesktopViewsPreview({
  className,
  animationDelay = 0,
}: {
  className?: string;
  animationDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState<PreviewRole>("admin");

  return (
    <motion.div
      className={cn("hidden overflow-hidden rounded-ui border border-white/70 bg-white/58 p-1 shadow-deep backdrop-blur-2xl lg:block", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: animationDelay }}
    >
      <div className="h-full rounded-ui border border-white/70 bg-white/74 p-1.5">
        <RoleSwitcher activeRole={activeRole} onRoleChange={setActiveRole} />
        <motion.div
          key={activeRole}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
        >
          <DashboardCanvas density="desktop" role={activeRole} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function DesktopViewsScrollPreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelFrameRef = useRef<number | null>(null);
  const wheelDeltaRef = useRef(0);
  const [activeRole, setActiveRole] = useState<PreviewRole>("admin");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 30%", "end 70%"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const progress = Math.min(1, Math.max(0, latest));
      const nextIndex = Math.min(previewRoles.length - 1, Math.floor(progress * previewRoles.length));
      setActiveRole(previewRoles[nextIndex].value);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const handleWheel = (event: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const scrollingDown = event.deltaY > 0;
      const sectionCanSlowScroll = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
      const atEntryEdge = rect.top >= 0 && !scrollingDown;
      const atExitEdge = rect.bottom <= window.innerHeight && scrollingDown;

      if (!sectionCanSlowScroll || atEntryEdge || atExitEdge) return;

      event.preventDefault();
      wheelDeltaRef.current += event.deltaY * 0.58;

      if (wheelFrameRef.current !== null) return;

      wheelFrameRef.current = window.requestAnimationFrame(() => {
        window.scrollBy({ top: wheelDeltaRef.current, left: 0, behavior: "auto" });
        wheelDeltaRef.current = 0;
        wheelFrameRef.current = null;
      });
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (wheelFrameRef.current !== null) {
        window.cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = null;
      }
    };
  }, [reduceMotion]);

  const scrollToRole = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
    const targetProgress = (index + 0.5) / previewRoles.length;
    const targetTop = window.scrollY + rect.top + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div ref={sectionRef} className={cn("relative hidden min-h-[245vh] py-12 lg:block xl:py-16", className)}>
      <div className="sticky top-[7rem] grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-center lg:gap-4 xl:gap-6">
        <motion.div
          className="overflow-hidden rounded-ui border border-white/70 bg-white/58 p-1 shadow-deep backdrop-blur-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="h-full rounded-ui border border-white/70 bg-white/74 p-1.5">
            <motion.div
              key={activeRole}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            >
              <DashboardCanvas density="desktop" role={activeRole} />
            </motion.div>
          </div>
        </motion.div>

        <RoleSideSwitcher activeRole={activeRole} onRoleChange={setActiveRole} onRoleSelect={scrollToRole} progressScale={progressScale} />
      </div>
    </div>
  );
}

function RoleSwitcher({
  activeRole,
  onRoleChange,
}: {
  activeRole: PreviewRole;
  onRoleChange: (role: PreviewRole) => void;
}) {
  return (
    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/70 bg-white/66 p-1 shadow-crisp backdrop-blur-xl">
      <div className="px-2">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-700">Desktop views</p>
        <p className="text-xs font-semibold text-gray-500">Switch between the real portal roles</p>
      </div>
      <div className="grid min-w-[360px] grid-cols-3 gap-1">
        {previewRoles.map((role) => {
          const Icon = role.icon;
          const selected = activeRole === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onRoleChange(role.value)}
              className={cn(
                "flex h-10 items-center gap-2 rounded-lg px-2.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                selected
                  ? "border border-brand-700 bg-brand-700 text-white shadow-crisp hover:bg-brand-800"
                  : "bg-white/78 text-gray-700 shadow-crisp hover:bg-brand-50",
              )}
              aria-pressed={selected}
            >
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", selected ? "bg-white/20" : "bg-brand-50 text-brand-700")}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black leading-4">{role.label}</span>
                <span className={cn("block truncate text-[10px] font-semibold", selected ? "text-blue-100" : "text-gray-500")}>{role.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoleSideSwitcher({
  activeRole,
  onRoleChange,
  onRoleSelect,
  progressScale,
}: {
  activeRole: PreviewRole;
  onRoleChange: (role: PreviewRole) => void;
  onRoleSelect: (index: number) => void;
  progressScale: ReturnType<typeof useSpring>;
}) {
  return (
    <div className="relative self-center rounded-ui border border-white/70 bg-white/66 px-3 py-5 shadow-deep backdrop-blur-xl xl:px-4 xl:py-6">
      <div className="rounded-xl border border-white/70 bg-white/74 px-3 py-3">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-700">Desktop views</p>
        <p className="mt-0.5 text-xs font-semibold text-gray-500">Scroll to switch portals</p>
      </div>
      <div className="absolute bottom-6 left-5 top-[5.25rem] w-px bg-brand-100" aria-hidden="true" />
      <motion.div
        className="absolute bottom-6 left-5 top-[5.25rem] w-0.5 origin-top bg-brand-700"
        style={{ scaleY: progressScale }}
        aria-hidden="true"
      />
      <div className="relative mt-4 grid gap-2 pl-6">
        {previewRoles.map((role, index) => {
          const Icon = role.icon;
          const selected = activeRole === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => {
                onRoleChange(role.value);
                onRoleSelect(index);
              }}
              className={cn(
                "relative flex min-h-16 items-center gap-2 rounded-xl px-2.5 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                selected
                  ? "border border-brand-700 bg-brand-700 text-white shadow-crisp"
                  : "border border-white/70 bg-white/82 text-gray-700 shadow-crisp hover:bg-brand-50",
              )}
              aria-pressed={selected}
            >
              <span
                className={cn(
                  "absolute -left-[1.35rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-brand-200 bg-white ring-4 ring-[#F6F8FB]",
                  selected && "border-brand-700 bg-brand-700",
                )}
                aria-hidden="true"
              />
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", selected ? "bg-white/20" : "bg-brand-50 text-brand-700")}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black leading-5">{role.label}</span>
                <span className={cn("block truncate text-xs font-semibold", selected ? "text-blue-100" : "text-gray-500")}>{role.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileAdminTour({ reduceMotion }: { reduceMotion: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % tourSteps.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const step = reduceMotion
    ? {
        ...tourSteps[0],
        gesture: "none" as const,
      }
    : tourSteps[stepIndex];

  return (
    <div className="relative h-full overflow-hidden bg-[#F6F8FB]">
      <MobileTourTopbar step={step} />

      <div className="relative h-[414px] overflow-hidden">
        <motion.div
          key={step.screen}
          className="absolute inset-0 p-2"
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{
            opacity: 1,
            x: 0,
            y: reduceMotion ? 0 : -(step.scrollY ?? 0),
          }}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
        >
          <MobileTourScreen step={step} />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20 bg-ink-900/30"
          initial={false}
          animate={{ opacity: step.sidebarOpen && !reduceMotion ? 1 : 0, pointerEvents: step.sidebarOpen && !reduceMotion ? "auto" : "none" }}
          transition={{ duration: 0.25 }}
        />

        <motion.aside
          className="absolute bottom-0 left-0 top-0 z-30 flex w-[86%] flex-col border-r border-border bg-white/95 p-2 shadow-lift backdrop-blur-xl"
          initial={false}
          animate={{ x: step.sidebarOpen && !reduceMotion ? "0%" : "-105%" }}
          transition={{ duration: 0.34, ease: "easeOut" }}
        >
          <div className="mb-2 rounded-xl border border-border bg-gray-50 px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-brand-700">Block</p>
            <p className="mt-0.5 truncate text-xs font-bold text-gray-900">Block B Workspace</p>
          </div>
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
            {mobileNavItems.map((item) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-black transition-colors",
                  step.activeNav === item ? "bg-brand-600 text-white" : "text-gray-600",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", step.activeNav === item ? "bg-white" : "bg-gray-300")} />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-border pt-2">
            <div className="rounded-xl border border-border bg-gray-50 p-2">
              <div className="flex items-start gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                  <Users className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-black leading-5 text-gray-900">Admin</p>
                  <p className="truncate text-[10px] font-semibold text-gray-500">admin@hms.local</p>
                </div>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-black text-rose-600">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-rose-100">&gt;</span>
              <span>Sign out</span>
            </div>
          </div>
        </motion.aside>

        {step.saveState === "saved" && <MobileSuccessToast reduceMotion={reduceMotion} />}

        <TouchIndicator step={step} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function MobileTourTopbar({ step }: { step: MobileTourStep }) {
  return (
    <div className="flex h-12 border-b border-border bg-white/95 backdrop-blur-xl">
      <div className="relative flex h-full w-11 shrink-0 items-center justify-center overflow-hidden border-r border-brand-700 bg-brand-600">
        <div className="absolute left-0 top-0 h-16 w-16 -translate-x-8 -translate-y-8 rounded-full bg-white opacity-[0.04]" />
        <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-white/20 text-white">
          <Building2 className="h-4 w-4" />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-2.5">
        <div className="min-w-0">
          <h4 className="truncate text-xs font-bold text-gray-900">{step.title}</h4>
          <p className="mt-0.5 truncate text-[10px] font-medium text-gray-500">{step.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="relative grid h-7 w-7 place-items-center rounded-xl border border-gray-100 bg-white text-gray-600">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </span>
          <span className={cn("grid h-7 w-7 place-items-center rounded-xl text-gray-700", step.sidebarOpen ? "bg-brand-50 text-brand-700" : "bg-gray-100")}>
            <Menu className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileTourScreen({ step }: { step: MobileTourStep }) {
  if (step.screen === "students") return <StudentListPage step={step} />;
  if (step.screen === "income") return <IncomeCreatePage step={step} />;
  if (step.screen === "expense") return <ExpenseCreatePage />;
  if (step.screen === "checkin") return <StudentCheckPage step={step} />;
  return <MobileDashboardPage />;
}

function MobileDashboardPage() {
  return (
    <MobilePageContent eyebrow="Admin workspace" action="Live">
      <div className="rounded-xl bg-gradient-to-r from-[#235999] to-[#1e4d87] p-3 text-white">
        <p className="text-lg font-bold">Welcome back, Admin!</p>
        <p className="mt-1 text-xs font-medium text-blue-100">Today across active blocks</p>
        <div className="mt-2 grid gap-1.5">
          <MobileDashboardAction primary>Add Student</MobileDashboardAction>
          <MobileDashboardAction>Record Payment</MobileDashboardAction>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <MiniKpi label="Students" value="428" />
        <MiniKpi label="Beds free" value="92" tone="success" />
        <MiniKpi label="Dues" value="Rs.1.86L" tone="warning" />
        <MiniKpi label="Staff" value="32" />
      </div>
      <MobilePanel title="Recent Activity">
        {activities.slice(0, 2).map((activity) => (
          <MiniActivity key={activity.label} activity={activity} />
        ))}
      </MobilePanel>
    </MobilePageContent>
  );
}

function StudentListPage({ step }: { step: MobileTourStep }) {
  return (
    <MobilePageContent eyebrow="Resident records" action="Add">
      <div className="flex h-10 items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 text-xs font-semibold text-gray-500">
        <Search className="h-4 w-4 text-brand-700" />
        <span className={cn(step.searchValue ? "font-black text-gray-900" : "text-gray-500")}>
          {step.searchValue || "Search students, room, phone"}
        </span>
        {step.gesture === "type" && <span className="h-4 w-px animate-pulse bg-brand-600" />}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MiniKpi label="Active" value="428" />
        <MiniKpi label="Due" value="31" tone="warning" />
        <MiniKpi label="Out" value="18" tone="success" />
      </div>
      <MobilePanel title="Student list">
        {studentRows.map(([name, room, status, due]) => (
          <ListRow key={name} title={name} meta={`Room ${room}`} value={due} status={status} highlight={step.selectedStudent === name} />
        ))}
      </MobilePanel>
    </MobilePageContent>
  );
}

function IncomeCreatePage({ step }: { step: MobileTourStep }) {
  const saved = step.saveState === "saved";

  return (
    <MobilePageContent eyebrow="Payment entry" action={step.saveState === "saving" ? "Saving" : saved ? "Saved" : "Save"}>
      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Monthly fee posted to Bibisha&apos;s ledger
        </div>
      )}
      <FormCard>
        <FakeField label="Student" value="Bibisha Acharya - B-112" filled={Boolean(step.saveState)} />
        <FakeField label="Income Type" value="Monthly Fee" filled={Boolean(step.saveState)} />
        <div className="grid grid-cols-2 gap-2">
          <FakeField label="Amount" value="Rs.14,000" filled={Boolean(step.saveState)} />
          <FakeField label="Date" value="May 25, 2026" filled={Boolean(step.saveState)} />
        </div>
        <FakeField label="Payment Method" value="Cash counter" filled={Boolean(step.saveState)} />
      </FormCard>
      <MobilePanel title="Ledger impact">
        <SummaryRow label="Outstanding before" value="Rs.14,000" />
        <SummaryRow label={step.saveState === "saving" ? "Posting now" : "Collected now"} value="Rs.14,000" tone="success" />
        <SummaryRow label="Balance after" value={saved ? "Rs.0" : "Pending"} />
      </MobilePanel>
    </MobilePageContent>
  );
}

function ExpenseCreatePage() {
  return (
    <MobilePageContent eyebrow="Cost control" action="Save">
      <FormCard>
        <FakeField label="Category" value="Kitchen supplies" />
        <FakeField label="Supplier" value="Fresh Mart Traders" />
        <div className="grid grid-cols-2 gap-2">
          <FakeField label="Amount" value="Rs.8,450" />
          <FakeField label="Date" value="May 25, 2026" />
        </div>
        <FakeField label="Notes" value="Vegetables and dry goods" />
      </FormCard>
      <MobilePanel title="This month">
        <SummaryRow label="Expenses" value="Rs.3,42,000" tone="danger" />
        <SummaryRow label="Income" value="Rs.8,76,000" tone="success" />
        <SummaryRow label="Net" value="Rs.5,34,000" />
      </MobilePanel>
    </MobilePageContent>
  );
}

function StudentCheckPage({ step }: { step: MobileTourStep }) {
  return (
    <MobilePageContent eyebrow="Attendance flow" action="New">
      <FormCard>
        <FakeField label="Student" value="Aayush Karki - A-204" />
        <div className="grid grid-cols-2 gap-2">
          <FakeField label="Action" value="Check In" />
          <FakeField label="Time" value="07:40 PM" />
        </div>
        <FakeField label="Approval" value="Warden approved" />
      </FormCard>
      <MobilePanel title="Today">
        {checkRows.map(([name, action, time, status]) => (
          <ListRow key={`${name}-${action}`} title={name} meta={`${action} - ${time}`} value={status} status={status} highlight={step.gesture === "tap" && status === "Pending"} />
        ))}
      </MobilePanel>
    </MobilePageContent>
  );
}

function MobilePageContent({
  eyebrow,
  action,
  children,
}: {
  eyebrow: string;
  action: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[414px]">
      <div className="mb-1.5 flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-white px-2.5 py-1.5">
        <div className="min-w-0">
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-brand-700">{eyebrow}</p>
          <p className="truncate text-[11px] font-semibold text-gray-500">Block B Workspace</p>
        </div>
        <span className="inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-lg bg-brand-600 px-2 text-[10px] font-black text-white">
          <ListChecks className="h-3 w-3" />
          {action}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function MobileSuccessToast({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute left-2 right-2 top-2 z-40 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-2.5 py-1.5 text-[10px] font-black text-emerald-800 shadow-crisp"
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
    >
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
      <span className="truncate">Payment saved successfully</span>
    </motion.div>
  );
}

function TouchIndicator({ step, reduceMotion }: { step: MobileTourStep; reduceMotion: boolean }) {
  if (reduceMotion || step.gesture === "none" || !step.touch) return null;

  return (
    <motion.div
      key={`${step.screen}-${step.gesture}-${step.touch.x}-${step.touch.y}`}
      className="pointer-events-none absolute z-50"
      style={{ left: step.touch.x, top: step.touch.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 0.9, 1.15] }}
      transition={{ duration: 1.25, ease: "easeOut" }}
    >
      <span className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-brand-500 bg-brand-500/10" />
      <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-brand-600 shadow-lift" />
    </motion.div>
  );
}

function MobileDashboardAction({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-7 items-center justify-center gap-1.5 rounded-lg px-2 text-[10px] font-black",
        primary ? "bg-white text-brand-700" : "border border-white/20 bg-white/10 text-white",
      )}
    >
      <span className={cn("grid h-4 w-4 place-items-center rounded-md", primary ? "bg-brand-50" : "bg-white/15")}>
        {primary ? <Users className="h-3 w-3" /> : <CreditCard className="h-3 w-3" />}
      </span>
      {children}
    </div>
  );
}

function MiniKpi({ label, value, tone = "brand" }: { label: string; value: string; tone?: StatTone }) {
  const Icon = tone === "warning" ? IndianRupee : tone === "success" ? CheckCircle2 : Users;

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-2">
      <span className={cn("mb-1 grid h-6 w-6 place-items-center rounded-md border", toneClass[tone])}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p className="text-base font-black leading-none text-gray-900">{value}</p>
      <p className="mt-1 truncate text-[10px] font-bold text-gray-500">{label}</p>
    </div>
  );
}

function MobilePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <h5 className="text-xs font-black text-gray-900">{title}</h5>
        <span className="text-[10px] font-black text-brand-700">View all</span>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function MiniActivity({ activity }: { activity: Activity }) {
  const Icon = activity.icon;

  return (
    <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-1.5">
      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", activityClass[activity.tone])}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-gray-900">{activity.label}</p>
        <p className="mt-0.5 text-[10px] font-semibold text-gray-500">{activity.time}</p>
      </div>
    </div>
  );
}

function SearchBar({ label }: { label: string }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 text-xs font-semibold text-gray-500">
      <Search className="h-4 w-4 text-brand-700" />
      <span>{label}</span>
    </div>
  );
}

function ListRow({
  title,
  meta,
  value,
  status,
  highlight = false,
}: {
  title: string;
  meta: string;
  value: string;
  status: string;
  highlight?: boolean;
}) {
  const normalized = status.toLowerCase();
  const statusClass = normalized.includes("pending") || normalized.includes("follow")
    ? "bg-amber-100 text-amber-800"
    : normalized.includes("approved") || normalized.includes("present") || normalized.includes("active") || normalized.includes("checked")
      ? "bg-emerald-100 text-emerald-800"
      : "bg-brand-50 text-brand-800";

  return (
    <div className={cn("flex items-center justify-between gap-2 rounded-xl p-2.5 transition-colors", highlight ? "border border-brand-200 bg-brand-50" : "bg-gray-50")}>
      <div className="min-w-0">
        <p className="truncate text-xs font-black text-gray-900">{title}</p>
        <p className="mt-0.5 truncate text-[10px] font-semibold text-gray-500">{meta}</p>
      </div>
      <span className={cn("shrink-0 rounded-full px-2 py-1 text-[10px] font-black", value.startsWith("Rs.") ? "bg-brand-50 text-brand-800" : statusClass)}>
        {value}
      </span>
    </div>
  );
}

function FormCard({ children }: { children: ReactNode }) {
  return <div className="space-y-2 rounded-2xl border border-gray-100 bg-white p-3">{children}</div>;
}

function FakeField({ label, value, filled = false }: { label: string; value: string; filled?: boolean }) {
  return (
    <div className={cn("rounded-xl border px-3 py-2 transition-colors", filled ? "border-brand-100 bg-brand-50/60" : "border-gray-100 bg-gray-50")}>
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">{label}</p>
      <p className="mt-1 truncate text-xs font-black text-gray-900">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, tone = "brand" }: { label: string; value: string; tone?: ActivityTone }) {
  const color = {
    brand: "text-brand-800",
    success: "text-emerald-700",
    warning: "text-amber-700",
    danger: "text-rose-700",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
      <span className="text-xs font-bold text-gray-600">{label}</span>
      <span className={cn("text-xs font-black", color[tone])}>{value}</span>
    </div>
  );
}

function DashboardCanvas({ density, role = "admin" }: { density: "desktop" | "mobile"; role?: PreviewRole }) {
  const compact = density === "mobile";

  if (role === "student") return <StudentDashboardCanvas compact={compact} />;
  if (role === "staff") return <StaffDashboardCanvas compact={compact} />;

  return (
    <div className={cn("min-w-0", compact ? "space-y-2.5" : "space-y-1.5")}>
      {compact ? <HeroPanel compact={compact} /> : null}

      <div className={cn("grid gap-1.5", compact ? "grid-cols-1" : "grid-cols-4")}>
        {dashboardStats.map((stat, index) => (
          <DashboardStatCard key={stat.title} stat={stat} compact={compact} delay={index * 0.08} />
        ))}
      </div>

      <div className={cn("grid gap-1.5", compact ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_235px]")}>
        <div className={cn("space-y-1.5", compact && "space-y-2.5")}>
          <FinancialOverview compact={compact} />
          <RecentActivity compact={compact} />
        </div>
        <DashboardSidePanels compact={compact} />
      </div>
    </div>
  );
}

function StudentDashboardCanvas({ compact }: { compact: boolean }) {
  return (
    <div className={cn("min-w-0", compact ? "space-y-2.5" : "space-y-2")}>
      <PortalHero
        title="Welcome back, Student!"
        subtitle="Here's your hostel status and recent activities"
        primaryAction="Check In"
        secondaryAction="New Complaint"
      />

      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-3")}>
        <PortalStatCard title="Check-In Status" value="Checked In" subtitle="Room B-112 - In: 12, Out: 3, Pending: 1" icon={CheckCircle2} tone="success" action="Manage" />
        <PortalStatCard title="Notices" value="4" subtitle="Water maintenance notice" icon={FileText} tone="brand" action="View All" />
        <PortalStatCard title="My Complaints" value="2" subtitle="1 pending, 1 resolved" icon={MessageSquareWarning} tone="warning" action="View All" />
      </div>

      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_250px]")}>
        <Panel compact={compact}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900">Recent Activities</h4>
              <p className="mt-0.5 text-xs text-gray-500">Your latest check-ins, payments, and complaints</p>
            </div>
            <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700">View all</span>
          </div>
          <div className="space-y-2">
            <PortalActivity icon={CreditCard} title="Monthly fee payment received" time="Today, 10:24 AM" status="paid" tone="brand" />
            <PortalActivity icon={CheckCircle2} title="Checked in at hostel gate" time="Yesterday, 07:40 PM" status="approved" tone="success" />
            <PortalActivity icon={MessageSquareWarning} title="Complaint response from admin" time="May 24, 2026" status="pending" tone="warning" />
          </div>
        </Panel>

        <div className="space-y-2">
          <div className="rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100/40 p-3">
            <h4 className="text-sm font-bold text-gray-900">Outstanding Dues</h4>
            <div className="mt-2 flex items-center text-xs font-semibold text-amber-700">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-500" />
              Payment Required
            </div>
            <p className="mt-2 text-xl font-bold text-gray-900">Rs.14,000</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <MiniFinance label="Total Fee" value="Rs.42,000" />
              <MiniFinance label="Paid Amt" value="Rs.28,000" success />
            </div>
          </div>

          <Panel compact={compact}>
            <h4 className="mb-2 text-sm font-bold text-gray-900">Upcoming Payments</h4>
            <div className="space-y-2">
              {upcomingRows.slice(0, 2).map(([label, amount, date]) => (
                <div key={label} className="rounded-lg border border-brand-100 bg-brand-50/50 p-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-gray-900">{label}</p>
                      <p className="mt-0.5 text-[11px] font-semibold text-gray-500">{date}</p>
                    </div>
                    <p className="shrink-0 text-xs font-black text-brand-700">{amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function StaffDashboardCanvas({ compact }: { compact: boolean }) {
  return (
    <div className={cn("min-w-0", compact ? "space-y-2.5" : "space-y-2")}>
      <PortalHero
        title="Welcome back, Maya!"
        subtitle="Housekeeping - Warden operations"
        primaryAction="Check-in/Check-out"
        secondaryAction="Submit Complaint"
      />

      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-3")}>
        <PortalStatCard title="Room Capacity" value="520" subtitle="428 occupied - 92 vacant" icon={Home} tone="brand" />
        <PortalStatCard title="Students" value="428" subtitle="Total active students" icon={Users} tone="brand" />
        <PortalStatCard title="Salary Balance" value="Rs.32,000" subtitle="Since May 2026" icon={WalletCards} tone="success" />
      </div>

      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_250px]")}>
        <Panel compact={compact}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
              <p className="mt-0.5 text-xs text-gray-500">Your latest work activities and updates</p>
            </div>
            <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700">View all</span>
          </div>
          <div className="space-y-2">
            <PortalActivity icon={CheckCircle2} title="Checked in for morning shift" time="Today, 08:02 AM" status="approved" tone="success" />
            <PortalActivity icon={WalletCards} title="Salary payment generated" time="May 24, 2026" status="paid" tone="brand" />
            <PortalActivity icon={MessageSquareWarning} title="Maintenance complaint assigned" time="May 24, 2026" status="pending" tone="warning" />
          </div>
        </Panel>

        <div className="space-y-2">
          <Panel compact={compact}>
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Quick Actions</h4>
                <p className="mt-0.5 text-xs text-gray-500">Most-used staff tools</p>
              </div>
              <span className="rounded-full bg-brand-100 px-2 py-1 text-[11px] font-bold text-brand-800">Checked in</span>
            </div>
            <div className="space-y-2">
              <QuickAction icon={CalendarDays} title="Check-in/Check-out" detail="Checked in at 08:02 AM" />
              <QuickAction icon={MessageSquareWarning} title="Submit Complaint" detail="Report issues and track admin responses" />
              <QuickAction icon={Bell} title="View Notices" detail="Announcements and urgent updates" />
              <QuickAction icon={WalletCards} title="Payment History" detail="Salary, deductions, and payments" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function PortalHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  subtitle: string;
  primaryAction: string;
  secondaryAction: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#235999] to-[#1e4d87] p-4 text-white">
      <div className="absolute left-0 top-0 h-28 w-28 -translate-x-14 -translate-y-14 rounded-full bg-white opacity-10" />
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-white opacity-10" />
      <div className="relative z-10 grid gap-3 md:grid-cols-[minmax(0,1fr)_190px] md:items-center">
        <div className="min-w-0">
          <h3 className="truncate text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm font-medium text-blue-100">{subtitle}</p>
        </div>
        <div className="grid gap-2">
          <PreviewAction primary>{primaryAction}</PreviewAction>
          <PreviewAction>{secondaryAction}</PreviewAction>
        </div>
      </div>
    </div>
  );
}

function PortalStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone,
  action,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  tone: StatTone;
  action?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className={cn("mb-1.5 grid h-8 w-8 place-items-center rounded-lg border", toneClass[tone])}>
            <Icon className="h-4 w-4" />
          </span>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="mt-0.5 text-[11px] font-semibold text-gray-600">{title}</p>
          <p className="mt-0.5 truncate text-[11px] text-gray-500">{subtitle}</p>
        </div>
        {action && <span className="rounded-lg bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-700">{action}</span>}
      </div>
    </div>
  );
}

function PortalActivity({
  icon: Icon,
  title,
  time,
  status,
  tone,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  time: string;
  status: string;
  tone: ActivityTone;
}) {
  const statusClass = status === "pending" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800";

  return (
    <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-2">
      <span className={cn("grid h-8 w-8 flex-shrink-0 place-items-center rounded-full", activityClass[tone])}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-gray-900">{title}</p>
        <p className="mt-0.5 text-[11px] text-gray-500">{time}</p>
        <span className={cn("mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-black", statusClass)}>{status}</span>
      </div>
    </div>
  );
}

function MiniFinance({ label, value, success = false }: { label: string; value: string; success?: boolean }) {
  return (
    <div className="rounded-lg border border-white/60 bg-white/60 p-2">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">{label}</p>
      <p className={cn("mt-1 text-xs font-bold", success ? "text-emerald-700" : "text-gray-900")}>{value}</p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  detail,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-gray-100 bg-white px-2.5 py-2">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-gray-900">{title}</p>
        <p className="mt-0.5 line-clamp-2 text-[10px] font-semibold text-gray-500">{detail}</p>
      </div>
    </div>
  );
}

function HeroPanel({ compact }: { compact: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#235999] to-[#1e4d87] text-white", compact ? "p-3.5" : "p-4")}>
      <div className="absolute left-0 top-0 h-28 w-28 -translate-x-14 -translate-y-14 rounded-full bg-white opacity-10" />
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-white opacity-10" />
      <div className={cn("relative z-10 grid gap-3", compact ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_190px] items-center")}>
        <div>
          <h3 className={cn("font-bold", compact ? "text-xl" : "text-2xl")}>Welcome back, Admin!</h3>
          <p className="mt-2 text-sm font-medium text-blue-100">Here&apos;s what&apos;s happening at your hostel today</p>
        </div>
        <div className="grid gap-2">
          <PreviewAction primary>Add Student</PreviewAction>
          <PreviewAction>Record Payment</PreviewAction>
        </div>
      </div>
    </div>
  );
}

function PreviewAction({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold",
        primary
          ? "bg-white/95 text-brand-700 shadow-sm"
          : "border border-white/20 bg-white/10 text-white backdrop-blur-sm",
      )}
    >
      <span className={cn("grid h-6 w-6 place-items-center rounded-lg", primary ? "bg-brand-100" : "bg-white/15")}>
        {primary ? <Users className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
      </span>
      {children}
    </div>
  );
}

function DashboardStatCard({ stat, compact, delay }: { stat: StatCard; compact: boolean; delay: number }) {
  const Icon = stat.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("rounded-lg border border-gray-100 bg-white transition-shadow", compact ? "p-3.5" : "p-2")}
      animate={reduceMotion ? undefined : { scale: [1, 1.018, 1] }}
      transition={reduceMotion ? undefined : { duration: 4.8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className={cn("mb-1 grid place-items-center rounded-lg border", compact ? "h-9 w-9" : "h-6 w-6", toneClass[stat.tone])}>
            <Icon className={compact ? "h-4 w-4" : "h-3.5 w-3.5"} />
          </span>
          <p className={cn("font-bold leading-tight text-gray-900", compact ? "text-xl" : "text-lg")}>{stat.value}</p>
          <p className="mt-0.5 text-[11px] font-semibold text-gray-600">{stat.title}</p>
          <p className="mt-0.5 text-[11px] text-gray-500">{stat.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FinancialOverview({ compact }: { compact: boolean }) {
  return (
    <Panel compact={compact}>
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-gray-900">Financial Overview</h4>
          <p className="mt-0.5 text-[11px] text-gray-500">Last 30 days summary</p>
        </div>
        <span className="hidden items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-[11px] font-semibold text-gray-500 sm:inline-flex">
          <CalendarDays className="h-3.5 w-3.5" />
          This Month
        </span>
      </div>
      <div className={cn("grid gap-1.5", compact ? "grid-cols-1" : "grid-cols-2")}>
        <MoneyCard label="Monthly Income" value="Rs.8,76,000" trend="12%" positive icon={<ArrowUp className="h-5 w-5" />} />
        <MoneyCard label="Monthly Expenses" value="Rs.3,42,000" trend="5%" icon={<ArrowDown className="h-5 w-5" />} />
      </div>
    </Panel>
  );
}

function MoneyCard({
  label,
  value,
  trend,
  positive = false,
  icon,
}: {
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-2">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn("grid h-6 w-6 place-items-center rounded-lg text-white", positive ? "bg-emerald-500" : "bg-rose-500")}>
            {icon}
          </span>
          <p className="text-xs font-semibold text-gray-700">{label}</p>
        </div>
        <span className={cn("rounded-full px-2 py-1 text-[11px] font-bold", positive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800")}>
          {positive ? "up" : "down"} {trend}
        </span>
      </div>
      <p className="text-base font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-[11px] text-gray-500">vs last month</p>
    </div>
  );
}

function RecentActivity({ compact }: { compact: boolean }) {
  return (
    <Panel compact={compact}>
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-gray-900">Recent Activity</h4>
          <p className="mt-0.5 text-[11px] text-gray-500">Latest transactions and updates</p>
        </div>
        <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700">View all</span>
      </div>
      <div className="space-y-1.5">
        {(compact ? activities : activities.slice(0, 2)).map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.label} className="flex items-start gap-2 rounded-lg bg-gray-50 p-1.5">
              <span className={cn("grid h-7 w-7 flex-shrink-0 place-items-center rounded-full", activityClass[activity.tone])}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-gray-900">{activity.label}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">{activity.time}</p>
                <p className="mt-0.5 text-[10px] font-medium text-gray-600">{activity.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function DashboardSidePanels({ compact }: { compact: boolean }) {
  return (
    <div className={cn("space-y-1.5", compact && "space-y-2.5")}>
      <div className="rounded-xl border border-amber-200 bg-white p-2.5">
        <h4 className="text-sm font-bold text-gray-900">Outstanding Dues</h4>
        <div className="mt-2 flex items-center text-xs font-semibold text-amber-700">
          <span className="mr-2 h-2 w-2 rounded-full bg-amber-500" />
          31 students
        </div>
        <p className="mt-1.5 text-lg font-bold text-gray-900">Rs.1,86,000</p>
      </div>

      <Panel compact={compact}>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-gray-900">Room Status</h4>
          <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700">View all</span>
        </div>
        <div className="space-y-1.5">
          {roomRows.map(([label, value, tone]) => (
            <div key={label} className="flex items-center justify-between rounded-lg bg-gray-50 px-2.5 py-1.5">
              <span className="flex items-center text-xs font-semibold text-gray-700">
                <span
                  className={cn(
                    "mr-3 h-3 w-3 rounded-full",
                    tone === "brand" ? "bg-brand-600" : tone === "success" ? "bg-emerald-500" : "bg-gray-400",
                  )}
                />
                {label}
              </span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <div className="mb-1.5 flex justify-between text-xs text-gray-600">
            <span>Occupancy Rate</span>
            <span>82%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div className="h-2 w-[82%] rounded-full bg-brand-600" />
          </div>
        </div>
      </Panel>

      {compact && (
        <Panel compact={compact}>
          <h4 className="mb-3 text-base font-bold text-gray-900">Staff Overview</h4>
          <div className="space-y-2.5">
            <StaffRow label="Total Staff" value="32" tone="brand" />
            <StaffRow label="Active" value="29" tone="success" />
          </div>
        </Panel>
      )}

      {compact && (
        <Panel compact>
          <h4 className="mb-3 text-base font-bold text-gray-900">Upcoming Payments</h4>
          <div className="space-y-2.5">
            {upcomingRows.map(([label, amount, date]) => (
              <div key={label} className="rounded-xl border border-brand-100 bg-brand-50/50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{label}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">{date}</p>
                  </div>
                  <p className="text-sm font-black text-brand-700">{amount}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function StaffRow({ label, value, tone }: { label: string; value: string; tone: "brand" | "success" }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2.5">
      <span className="flex items-center text-sm font-semibold text-gray-700">
        <span className={cn("mr-3 grid h-7 w-7 place-items-center rounded-lg text-white", tone === "brand" ? "bg-brand-600" : "bg-emerald-500")}>
          {tone === "brand" ? <Users className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        </span>
        {label}
      </span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function Panel({ children, compact }: { children: ReactNode; compact: boolean }) {
  return (
    <div className={cn("rounded-xl border border-gray-100 bg-white", compact ? "p-3.5" : "p-2.5")}>
      {children}
    </div>
  );
}
