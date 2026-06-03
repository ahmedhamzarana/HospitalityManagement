import { Hotel, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            LuxuryStay
          </div>
          <div className="font-display text-3xl mt-2">
            Hospitality HMS
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl leading-tight">
            Welcome back to <span className="text-gold">LuxuryStay</span>
          </h2>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Manage rooms, reservations, billing and guest experiences from a single dashboard.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} LuxuryStay Hospitality
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 text-primary mb-6">
            <Hotel className="w-6 h-6" />
            <span className="font-display text-xl">Sign in</span>
          </div>

          <h1 className="font-display text-3xl text-foreground">
            Staff Portal
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Enter your credentials to continue.
          </p>

          {/* EMAIL */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@luxurystay.com"
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm"
              />
            </div>
          </div>

          {/* BUTTON (ONLY UI NAVIGATION) */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/90"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </button>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            New staff member?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}