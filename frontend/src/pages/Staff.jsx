import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

const ROLES = ["manager", "receptionist", "housekeeping", "maintenance"];

export default function Staff() {
  const staff = useStore((s) => s.staff);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "receptionist", active: true });

  const submit = (e) => {
    e.preventDefault();
    store.addStaff(form);
    setForm({ name: "", email: "", role: "receptionist", active: true });
    setOpen(false);
  };

  return (
    <AppLayout title="Staff & Roles" subtitle="Admin: create, modify or deactivate accounts.">
      <div className="flex justify-end mb-4">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> Add staff
        </button>
      </div>
      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                <td className="px-4 py-3 capitalize">{s.role}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => store.toggleStaff(s.id)} className="text-xs text-accent hover:underline">
                    {s.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="card-elevated w-full max-w-md p-6 space-y-3">
            <h2 className="font-display text-xl">Add staff</h2>
            <label className="block text-sm">Name
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
            </label>
            <label className="block text-sm">Email
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
            </label>
            <label className="block text-sm">Role
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2">
                {ROLES.map((r) => <option key={r} value={r} className="capitalize">{r}</option>)}
              </select>
            </label>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm hover:bg-muted rounded-md">Cancel</button>
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">Save</button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
}
