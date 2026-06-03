import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hotel, UserPlus } from "lucide-react";
import { useAuth } from "../lib/auth.jsx";

const ROLES = ["General Manager", "Front Desk", "Housekeeping", "Accounting", "Reservations"];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", role: "Front Desk",
  });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    try {
      register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      navigate("/", { replace: true });
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
            Join the <span className="text-gold">LuxuryStay</span> team
          </h2>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Create your staff account to access the property management system.
          </p>
        </div>
        <div className="text-xs text-sidebar-foreground/60">© {new Date().getFullYear()} LuxuryStay Hospitality</div>
      </div>

      <div className="flex items-center justify-center p-8">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <div className="flex items-center gap-2 text-primary mb-6">
            <Hotel className="w-6 h-6" />
            <span className="font-display text-xl">Create account</span>
          </div>
          <h1 className="font-display text-3xl text-foreground">Staff Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">Set up your access to the HMS.</p>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input required value={form.name} onChange={set("name")}
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" required value={form.email} onChange={set("email")}
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <select value={form.role} onChange={set("role")}
                className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Password</label>
                <input type="password" required value={form.password} onChange={set("password")}
                  className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm</label>
                <input type="password" required value={form.confirm} onChange={set("confirm")}
                  className="mt-1 w-full h-10 px-3 rounded-md border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          <button type="submit"
            className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/90">
            <UserPlus className="w-4 h-4" /> Create account
          </button>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            Already registered?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
