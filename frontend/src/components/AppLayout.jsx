import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, Sparkles, Receipt,
  BarChart3, UserCog, MessageSquare, Settings, LogIn, Bell, LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const navigate = useNavigate();

  // ✅ USER STATE
  const [user, setUser] = useState(null);

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">

      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r flex flex-col">

        <div className="px-6 py-6 border-b">
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            LuxuryStay
          </div>
          <div className="font-display text-xl mt-1">
            Hospitality HMS
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t text-xs text-sidebar-foreground/60">
          LuxuryStay Hotel
          <div className="mt-1">v1.0 · static UI</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">

          <div>
            <h1 className="text-xl font-display">{title}</h1>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>

          <div className="flex items-center gap-4">

            {/* NOTIFICATION */}
            <button className="p-2 rounded-md hover:bg-muted relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* USER INFO */}
            <div className="flex items-center gap-3">

              <div className="text-right">
                <div className="text-sm font-medium">
                  {user?.name || "Guest User"}
                </div>
                <div className="text-xs text-primary">
                  {user?.role || "User"}
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-primary text-white grid place-items-center text-sm font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-muted"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>

            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>

      </main>
    </div>
  );
}

/* STATUS BADGE */
export function StatusPill({ status, className = "" }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded capitalize border ${className}`}
    >
      {status}
    </span>
  );
}