import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { AppLayout } from "../components/AppLayout.jsx";
import { store, useStore } from "../lib/store.js";

export default function Guests() {
  const guests = useStore((s) => s.guests);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", vip: false, preferences: "" });

  const submit = (e) => {
    e.preventDefault();
    store.addGuest(form);
    setForm({ name: "", email: "", phone: "", vip: false, preferences: "" });
    setOpen(false);
  };

  return (
    <AppLayout title="Guests" subtitle={`${guests.length} profiles · ${guests.filter((g) => g.vip).length} VIP`}>
      <div className="flex justify-end mb-4">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90">
          <Plus className="w-4 h-4" /> New guest
        </button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {guests.map((g) => (
          <div key={g.id} className="card-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg flex items-center gap-2">
                  {g.name}
                  {g.vip && <Star className="w-4 h-4 fill-gold text-gold" />}
                </div>
                <div className="text-xs text-muted-foreground">Member since {g.joined}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary text-primary grid place-items-center font-semibold text-sm">
                {g.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
            </div>
            <div className="text-sm mt-3 space-y-0.5">
              <div className="text-muted-foreground">{g.email}</div>
              <div className="text-muted-foreground">{g.phone}</div>
            </div>
            {g.preferences && (
              <div className="text-xs mt-3 bg-secondary px-3 py-2 rounded-md text-secondary-foreground">
                <span className="font-medium">Preferences: </span>{g.preferences}
              </div>
            )}
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-primary/40 grid place-items-center p-4 z-50" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="card-elevated w-full max-w-md p-6 space-y-3">
            <h2 className="font-display text-xl">New guest</h2>
            {["name", "email", "phone", "preferences"].map((k) => (
              <label key={k} className="block text-sm capitalize">
                {k}
                <input required={k !== "preferences"} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2" />
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.checked })} />
              VIP guest
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
