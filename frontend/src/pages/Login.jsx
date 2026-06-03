import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Hotel, LogIn } from "lucide-react";
import { useAuth } from "../lib/auth.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("admin@luxurystay.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios.post()
    try {
      login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">LuxuryStay</div>
          <div className="font-display text-3xl mt-2">Hospitality HMS</div>
        </div>
        <div>
          <h2 className="font-display text-4xl leading-tight">
            Welcome back to <span className="text-gold">LuxuryStay</span>
          </h2>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Manage rooms, reservations, billing and guest experiences from a single, elegant dashboard.
          </p>
        </div>
        <div className="text-xs text-sidebar-foreground/60">© {new Date().getFullYear()} LuxuryStay Hospitality</div>
      </div>

      <div className="flex items-center justify-center p-8">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <div className="flex items-center gap-2 text-primary mb-6">
            <Hotel className="w-6 h-6" />
            <span className="font-display text-xl">Sign in</span>
          </div>
          <h1 className="font-display text-3xl text-foreground">Staff Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue.</p>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/90"
          >
            <LogIn className="w-4 h-4" /> Sign in
          </button>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            New staff member?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-6 p-3 rounded-md bg-muted text-xs text-muted-foreground">
            Demo: <b>admin@luxurystay.com</b> / <b>admin123</b>
          </div>
        </form>
      </div>
    </div>
  );
}
