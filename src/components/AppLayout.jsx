import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, Sparkles, Receipt,
  BarChart3, UserCog, MessageSquare, Settings, LogIn, Bell,
} from "lucide-react";
import { useStore } from "../lib/store.js";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/rooms", label: "Rooms", icon: BedDouble },
  { to: "/reservations", label: "Reservations", icon: CalendarCheck },
  { to: "/checkin", label: "Check-in / out", icon: LogIn },
  { to: "/guests", label: "Guests", icon: Users },
  { to: "/housekeeping", label: "Housekeeping", icon: Sparkles },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/staff", label: "Staff", icon: UserCog },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children, title, subtitle }) {
  const { pathname } = useLocation();
  const settings = useStore((s) => s.settings);
  const pendingTasks = useStore((s) => s.tasks.filter((t) => t.status !== "done").length);

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">LuxuryStay</div>
          <div className="font-display text-xl mt-1">Hospitality HMS</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{n.label}</span>
                {n.to === "/housekeeping" && pendingTasks > 0 && (
                  <span className="text-[10px] bg-gold text-gold-foreground rounded-full px-1.5 py-0.5 font-semibold">
                    {pendingTasks}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
          {settings.hotelName}
          <div className="mt-1">v1.0 · eProject demo</div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-display text-foreground">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-md hover:bg-muted text-muted-foreground">
              <Bell className="w-4 h-4" />
              {pendingTasks > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium leading-tight">Alex Morgan</div>
                <div className="text-xs text-muted-foreground">General Manager</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center font-semibold text-sm">
                AM
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-x-auto">{children}</div>
      </main>
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    available: "bg-success/15 text-success",
    occupied: "bg-info/15 text-info",
    cleaning: "bg-warning/20 text-warning-foreground",
    maintenance: "bg-destructive/15 text-destructive",
    confirmed: "bg-info/15 text-info",
    "checked-in": "bg-success/15 text-success",
    "checked-out": "bg-muted text-muted-foreground",
    cancelled: "bg-destructive/15 text-destructive",
    pending: "bg-warning/20 text-warning-foreground",
    "in-progress": "bg-info/15 text-info",
    done: "bg-success/15 text-success",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
